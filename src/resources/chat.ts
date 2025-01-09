// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as ChatAPI from './chat';
import * as Shared from './shared';
import { Stream } from '../streaming';

export class Chat extends APIResource {
  /**
   * Generate a chat completion based on the provided messages. The response shown
   * below is for non-streaming. To learn about streaming responses, see the
   * [chat completion guide](/api-guides/chat-completion).
   */
  chat(body: ChatChatParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ChatCompletion>;
  chat(body: ChatChatParamsStreaming, options?: Core.RequestOptions): APIPromise<Stream<ChatCompletionChunk>>;
  chat(
    body: ChatChatParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>;
  chat(
    body: ChatChatParams,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletionChunk>> {
    return this._client.post('/v1/chat', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatCompletion>
      | APIPromise<Stream<ChatCompletionChunk>>;
  }
}

export interface ChatCompletion {
  /**
   * A globally unique identifier (UUID) for the response generated by the API. This
   * ID can be used to reference the specific operation or transaction within the
   * system for tracking or debugging purposes.
   */
  id: string;

  /**
   * An array of objects representing the different outcomes or results produced by
   * the model based on the input provided.
   */
  choices: Array<ChatCompletionChoice>;

  /**
   * The Unix timestamp (in seconds) when the response was created. This timestamp
   * can be used to verify the timing of the response relative to other events or
   * operations.
   */
  created: number;

  /**
   * Identifies the specific model used to generate the response.
   */
  model: string;

  /**
   * The type of object returned, which is always `chat.completion` for chat
   * responses.
   */
  object: 'chat.completion';

  /**
   * The service tier used for processing the request.
   */
  service_tier?: string;

  /**
   * A string representing the backend configuration that the model runs with.
   */
  system_fingerprint?: string;

  /**
   * Usage information for the chat completion response. Please note that at this
   * time Knowledge Graph tool usage is not included in this object.
   */
  usage?: ChatCompletionUsage;
}

export interface ChatCompletionChoice {
  /**
   * Describes the condition under which the model ceased generating content. Common
   * reasons include 'length' (reached the maximum output size), 'stop' (encountered
   * a stop sequence), 'content_filter' (harmful content filtered out), or
   * 'tool_calls' (encountered tool calls).
   */
  finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls';

  /**
   * The index of the choice in the list of completions generated by the model.
   */
  index: number;

  /**
   * The chat completion message from the model. Note: this field is deprecated for
   * streaming. Use `delta` instead.
   */
  message: ChatCompletionMessage;

  /**
   * Log probability information for the choice.
   */
  logprobs?: Shared.Logprobs | null;
}

export interface ChatCompletionChunk {
  /**
   * A globally unique identifier (UUID) for the response generated by the API. This
   * ID can be used to reference the specific operation or transaction within the
   * system for tracking or debugging purposes.
   */
  id: string;

  /**
   * An array of objects representing the different outcomes or results produced by
   * the model based on the input provided.
   */
  choices: Array<ChatCompletionChunk.Choice>;

  /**
   * The Unix timestamp (in seconds) when the response was created. This timestamp
   * can be used to verify the timing of the response relative to other events or
   * operations.
   */
  created: number;

  /**
   * Identifies the specific model used to generate the response.
   */
  model: string;

  /**
   * The type of object returned, which is always `chat.completion.chunk` for
   * streaming chat responses.
   */
  object: 'chat.completion.chunk';

  service_tier?: string;

  system_fingerprint?: string;

  /**
   * Usage information for the chat completion response. Please note that at this
   * time Knowledge Graph tool usage is not included in this object.
   */
  usage?: ChatCompletionUsage;
}

export namespace ChatCompletionChunk {
  export interface Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;

    /**
     * Describes the condition under which the model ceased generating content. Common
     * reasons include 'length' (reached the maximum output size), 'stop' (encountered
     * a stop sequence), 'content_filter' (harmful content filtered out), or
     * 'tool_calls' (encountered tool calls).
     */
    finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls' | null;

    /**
     * The index of the choice in the list of completions generated by the model.
     */
    index: number;

    /**
     * Log probability information for the choice.
     */
    logprobs?: Shared.Logprobs | null;

    /**
     * The chat completion message from the model. Note: this field is deprecated for
     * streaming. Use `delta` instead.
     */
    message?: ChatAPI.ChatCompletionMessage;
  }

  export namespace Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    export interface Delta {
      /**
       * The text content produced by the model. This field contains the actual output
       * generated, reflecting the model's response to the input query or command.
       */
      content?: string;

      graph_data?: Shared.GraphData;

      refusal?: string | null;

      /**
       * Specifies the role associated with the content, indicating whether the message
       * is from the 'assistant' or another defined role, helping to contextualize the
       * output within the interaction flow.
       */
      role?: 'user' | 'assistant' | 'system';

      tool_calls?: Array<Shared.ToolCallStreaming> | null;
    }
  }
}

/**
 * The chat completion message from the model. Note: this field is deprecated for
 * streaming. Use `delta` instead.
 */
export interface ChatCompletionMessage {
  /**
   * The text content produced by the model. This field contains the actual output
   * generated, reflecting the model's response to the input query or command.
   */
  content: string;

  refusal: string | null;

  /**
   * Specifies the role associated with the content.
   */
  role: 'assistant';

  graph_data?: Shared.GraphData;

  tool_calls?: Array<Shared.ToolCall> | null;
}

export interface ChatCompletionParams {
  /**
   * An array of message objects that form the conversation history or context for
   * the model to respond to. The array must contain at least one message.
   */
  messages: Array<ChatCompletionParams.Message>;

  /**
   * Specifies the model to be used for generating responses. The chat model is
   * always `palmyra-x-004` for conversational use.
   */
  model: string;

  /**
   * Specifies whether to return log probabilities of the output tokens.
   */
  logprobs?: boolean;

  /**
   * Defines the maximum number of tokens (words and characters) that the model can
   * generate in the response. The default value is set to 16, but it can be adjusted
   * to allow for longer or shorter responses as needed.
   */
  max_tokens?: number;

  /**
   * Specifies the number of completions (responses) to generate from the model in a
   * single request. This parameter allows multiple responses to be generated,
   * offering a variety of potential replies from which to choose.
   */
  n?: number;

  /**
   * A token or sequence of tokens that, when generated, will cause the model to stop
   * producing further content. This can be a single token or an array of tokens,
   * acting as a signal to end the output.
   */
  stop?: Array<string> | string;

  /**
   * Indicates whether the response should be streamed incrementally as it is
   * generated or only returned once fully complete. Streaming can be useful for
   * providing real-time feedback in interactive applications.
   */
  stream?: boolean;

  /**
   * Additional options for streaming.
   */
  stream_options?: ChatCompletionParams.StreamOptions;

  /**
   * Controls the randomness or creativity of the model's responses. A higher
   * temperature results in more varied and less predictable text, while a lower
   * temperature produces more deterministic and conservative outputs.
   */
  temperature?: number;

  /**
   * Configure how the model will call functions: `auto` will allow the model to
   * automatically choose the best tool, `none` disables tool calling. You can also
   * pass a specific previously defined function.
   */
  tool_choice?: Shared.ToolChoiceString | Shared.ToolChoiceJsonObject;

  /**
   * An array of tools described to the model using JSON schema that the model can
   * use to generate responses. Passing graph IDs will automatically use the
   * Knowledge Graph tool.
   */
  tools?: Array<Shared.ToolParam>;

  /**
   * Sets the threshold for "nucleus sampling," a technique to focus the model's
   * token generation on the most likely subset of tokens. Only tokens with
   * cumulative probability above this threshold are considered, controlling the
   * trade-off between creativity and coherence.
   */
  top_p?: number;
}

export namespace ChatCompletionParams {
  export interface Message {
    role: 'user' | 'assistant' | 'system' | 'tool';

    content?: string | null;

    graph_data?: Shared.GraphData | null;

    name?: string | null;

    refusal?: string | null;

    tool_call_id?: string | null;

    tool_calls?: Array<Shared.ToolCall> | null;
  }

  /**
   * Additional options for streaming.
   */
  export interface StreamOptions {
    /**
     * Indicate whether to include usage information.
     */
    include_usage: boolean;
  }
}

/**
 * Usage information for the chat completion response. Please note that at this
 * time Knowledge Graph tool usage is not included in this object.
 */
export interface ChatCompletionUsage {
  completion_tokens: number;

  prompt_tokens: number;

  total_tokens: number;

  completion_tokens_details?: ChatCompletionUsage.CompletionTokensDetails;

  prompt_token_details?: ChatCompletionUsage.PromptTokenDetails;
}

export namespace ChatCompletionUsage {
  export interface CompletionTokensDetails {
    reasoning_tokens: number;
  }

  export interface PromptTokenDetails {
    cached_tokens: number;
  }
}

export type ChatChatParams = ChatChatParamsNonStreaming | ChatChatParamsStreaming;

export interface ChatChatParamsBase {
  /**
   * An array of message objects that form the conversation history or context for
   * the model to respond to. The array must contain at least one message.
   */
  messages: Array<ChatChatParams.Message>;

  /**
   * Specifies the model to be used for generating responses. The chat model is
   * always `palmyra-x-004` for conversational use.
   */
  model: string;

  /**
   * Specifies whether to return log probabilities of the output tokens.
   */
  logprobs?: boolean;

  /**
   * Defines the maximum number of tokens (words and characters) that the model can
   * generate in the response. The default value is set to 16, but it can be adjusted
   * to allow for longer or shorter responses as needed.
   */
  max_tokens?: number;

  /**
   * Specifies the number of completions (responses) to generate from the model in a
   * single request. This parameter allows multiple responses to be generated,
   * offering a variety of potential replies from which to choose.
   */
  n?: number;

  /**
   * A token or sequence of tokens that, when generated, will cause the model to stop
   * producing further content. This can be a single token or an array of tokens,
   * acting as a signal to end the output.
   */
  stop?: Array<string> | string;

  /**
   * Indicates whether the response should be streamed incrementally as it is
   * generated or only returned once fully complete. Streaming can be useful for
   * providing real-time feedback in interactive applications.
   */
  stream?: boolean;

  /**
   * Additional options for streaming.
   */
  stream_options?: ChatChatParams.StreamOptions;

  /**
   * Controls the randomness or creativity of the model's responses. A higher
   * temperature results in more varied and less predictable text, while a lower
   * temperature produces more deterministic and conservative outputs.
   */
  temperature?: number;

  /**
   * Configure how the model will call functions: `auto` will allow the model to
   * automatically choose the best tool, `none` disables tool calling. You can also
   * pass a specific previously defined function.
   */
  tool_choice?: Shared.ToolChoiceString | Shared.ToolChoiceJsonObject;

  /**
   * An array of tools described to the model using JSON schema that the model can
   * use to generate responses. Passing graph IDs will automatically use the
   * Knowledge Graph tool.
   */
  tools?: Array<Shared.ToolParam>;

  /**
   * Sets the threshold for "nucleus sampling," a technique to focus the model's
   * token generation on the most likely subset of tokens. Only tokens with
   * cumulative probability above this threshold are considered, controlling the
   * trade-off between creativity and coherence.
   */
  top_p?: number;
}

export namespace ChatChatParams {
  export interface Message {
    role: 'user' | 'assistant' | 'system' | 'tool';

    content?: string | null;

    graph_data?: Shared.GraphData | null;

    name?: string | null;

    refusal?: string | null;

    tool_call_id?: string | null;

    tool_calls?: Array<Shared.ToolCall> | null;
  }

  /**
   * Additional options for streaming.
   */
  export interface StreamOptions {
    /**
     * Indicate whether to include usage information.
     */
    include_usage: boolean;
  }

  export type ChatChatParamsNonStreaming = ChatAPI.ChatChatParamsNonStreaming;
  export type ChatChatParamsStreaming = ChatAPI.ChatChatParamsStreaming;
}

export interface ChatChatParamsNonStreaming extends ChatChatParamsBase {
  /**
   * Indicates whether the response should be streamed incrementally as it is
   * generated or only returned once fully complete. Streaming can be useful for
   * providing real-time feedback in interactive applications.
   */
  stream?: false;
}

export interface ChatChatParamsStreaming extends ChatChatParamsBase {
  /**
   * Indicates whether the response should be streamed incrementally as it is
   * generated or only returned once fully complete. Streaming can be useful for
   * providing real-time feedback in interactive applications.
   */
  stream: true;
}

export declare namespace Chat {
  export {
    type ChatCompletion as ChatCompletion,
    type ChatCompletionChoice as ChatCompletionChoice,
    type ChatCompletionChunk as ChatCompletionChunk,
    type ChatCompletionMessage as ChatCompletionMessage,
    type ChatCompletionParams as ChatCompletionParams,
    type ChatCompletionUsage as ChatCompletionUsage,
    type ChatChatParams as ChatChatParams,
    type ChatChatParamsNonStreaming as ChatChatParamsNonStreaming,
    type ChatChatParamsStreaming as ChatChatParamsStreaming,
  };
}
