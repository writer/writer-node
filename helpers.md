# Streaming Helpers

Writer supports streaming responses when interacting with the [Chat](#chat-streaming) API.

## Chat Streaming

### Streaming Responses

```ts
writer.chat.stream({ stream?: false, … }, options?): ChatCompletionStreamingRunner
```

`writer.chat.stream()` returns a `ChatCompletionStreamingRunner`, which emits events, has an async
iterator, and exposes helper methods to accumulate chunks into a convenient shape and make it easy to reason
about the conversation.

Alternatively, you can use `writer.chat.chat({ stream: true, … })` which returns an async
iterable of the chunks in the stream and uses less memory (most notably, it does not accumulate a final chat
completion object for you).

If you need to cancel a stream, you can `break` from a `for await` loop or call `stream.abort()`.

See an example of streaming helpers in action in
[`examples/chat-streaming-helper.ts`](examples/chat-streaming-helper.ts).

### Chat Events

#### `.on('connect', () => …)`

The first event that is fired when the connection with the Writer API is established.

#### `.on('chunk', (chunk: ChatCompletionChunk, snapshot: ChatCompletionSnapshot) => …)` (with `stream`)

The event fired when a chunk is received from the API. Not fired when it is not streaming. The snapshot
returns an accumulated `ChatCompletionSnapshot`, which has a similar shape to `ChatCompletion` with optional
fields and is built up from the chunks.

#### `.on('chatCompletion', (completion: ChatCompletion) => …)`

The event fired when a chat completion is returned or done being streamed by the API.

#### `.on('message', (message: ChatCompletionMessageParam) => …)`

The event fired when a new message is either sent or received from the API. Does not fire for the messages
sent as the parameter to either `.runTools()` or `.stream()`

#### `.on('content', (content: string) => …)` (without `stream`)

The event fired when a message from the `assistant` is received from the API.

#### `.on('content', (delta: string, snapshot: string) => …)` (with `stream`)

The event fired when a chunk from the `assistant` is received from the API. The `delta` argument contains the
content of the chunk, while the `snapshot` returns the accumulated content for the current message.

#### `.on('content.delta', (props: ContentDeltaEvent) => ...)`

The event fired for every chunk containing new content. The `props` object contains:

- `delta`: The new content string received in this chunk
- `snapshot`: The accumulated content so far
- `parsed`: The partially parsed content (if applicable)

#### `.on('content.done', (props: ContentDoneEvent<ParsedT>) => ...)`

The event fired when the content generation is complete. The `props` object contains:

- `content`: The full generated content
- `parsed`: The fully parsed content (if applicable)

#### `.on('refusal.delta', (props: RefusalDeltaEvent) => ...)`

The event fired when a chunk contains part of a content refusal. The `props` object contains:

- `delta`: The new refusal content string received in this chunk
- `snapshot`: The accumulated refusal content string so far

#### `.on('refusal.done', (props: RefusalDoneEvent) => ...)`

The event fired when the refusal content is complete. The `props` object contains:

- `refusal`: The full refusal content

#### `.on('tool_calls.function.arguments.delta', (props: FunctionToolCallArgumentsDeltaEvent) => ...)`

The event fired when a chunk contains part of a function tool call's arguments. The `props` object contains:

- `name`: The name of the function being called
- `index`: The index of the tool call
- `arguments`: The accumulated raw JSON string of arguments
- `parsed_arguments`: The partially parsed arguments object
- `arguments_delta`: The new JSON string fragment received in this chunk

#### `.on('tool_calls.function.arguments.done', (props: FunctionToolCallArgumentsDoneEvent) => ...)`

The event fired when a function tool call's arguments are complete. The `props` object contains:

- `name`: The name of the function being called
- `index`: The index of the tool call
- `arguments`: The full raw JSON string of arguments
- `parsed_arguments`: The fully parsed arguments object

#### `.on('logprobs.content.delta', (props: LogProbsContentDeltaEvent) => ...)`

The event fired when a chunk contains new content log probabilities. The `props` object contains:

- `content`: A list of the new log probabilities received in this chunk
- `snapshot`: A list of the accumulated log probabilities so far

#### `.on('logprobs.content.done', (props: LogProbsContentDoneEvent) => ...)`

The event fired when all content log probabilities have been received. The `props` object contains:

- `content`: The full list of token log probabilities for the content

#### `.on('logprobs.refusal.delta', (props: LogProbsRefusalDeltaEvent) => ...)`

The event fired when a chunk contains new refusal log probabilities. The `props` object contains:

- `refusal`: A list of the new log probabilities received in this chunk
- `snapshot`: A list of the accumulated log probabilities so far

#### `.on('logprobs.refusal.done', (props: LogProbsRefusalDoneEvent) => ...)`

The event fired when all refusal log probabilities have been received. The `props` object contains:

- `refusal`: The full list of token log probabilities for the refusal

#### `.on('finalChatCompletion', (completion: ChatCompletion) => …)`

The event fired for the final chat completion. If the function call runner exceeds the number
`maxChatCompletions`, then the last chat completion is given.

#### `.on('finalContent', (contentSnapshot: string) => …)`

The event fired for the `content` of the last `role: "assistant"` message. Not fired if there is no `assistant`
message.

#### `.on('finalMessage', (message: ChatCompletionMessage) => …)`

The event fired for the last message.

#### `.on('finalFunctionCall', (functionCall: ChatCompletionMessage.FunctionCall) => …)`

The event fired for the last message with a defined `function_call`.

#### `.on('finalFunctionCallResult', (content: string) => …)`

The event fired for the last message with a `role: "function"`.

#### `.on('error', (error: WriterError) => …)`

The event fired when an error is encountered outside of a `parse` function or an abort.

#### `.on('abort', (error: APIUserAbortError) => …)`

The event fired when the stream receives a signal to abort.

#### `.on('totalUsage', (usage: CompletionUsage) => …)` (without `stream`, usage is not currently reported with `stream`)

The event fired at the end, returning the total usage of the call.

#### `.on('end', () => …)`

The last event fired in the stream.

### Chat Methods

#### `.abort()`

Aborts the runner and the streaming request, equivalent to `.controller.abort()`. Calling `.abort()` on a
`ChatCompletionStreamingRunner` will also abort any in-flight network requests.

#### `await .done()`

An empty promise which resolves when the stream is done.

#### `await .finalChatCompletion()`

A promise which resolves with the final chat completion that was received from the API. Throws if the request
ends before a complete chat completion is returned.

#### `await .allChatCompletions()`

A promise which resolves with The array of all chat completions that were received from the API.

#### `await .finalContent()`

A promise which resolves with the `content` of the last `role: "assistant"` message. Throws if no such message
can be found.

#### `await .finalMessage()`

A promise which resolves with the last message.

#### `await .totalUsage()` (without `stream`, usage is not currently reported with `stream`)

A promise which resolves with the total usage.

### Chat Fields

#### `.messages`

A mutable array of all messages in the conversation.

#### `.controller`

The underlying `AbortController` for the runner.

### Chat Examples

#### Abort on a function call

```ts
import Writer from 'writer-sdk';

const writer = new Writer();

async function main() {
  const runner = writer.chat
    .stream({
      model: 'palmyra-x-003-instruct',
      messages: [{ role: 'user', content: 'Hi, today I want to write about' }],
    })
    .on('message', (msg) => console.log(msg))
    .on('content', (diff) => process.stdout.write(diff));

  const result = await runner.finalChatCompletion();
  console.log(result);
}

main().catch(console.error);
```
