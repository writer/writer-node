# Writer TypeScript API Library

[![NPM version](https://img.shields.io/npm/v/writer-sdk.svg)](https://npmjs.org/package/writer-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/writer-sdk)

This library provides access to the Writer REST API from server-side TypeScript(>=4.9) or JavaScript.

The REST API documentation can be found on [dev.writer.com](https://dev.writer.com/api-guides/introduction). The full API of this library can be found in [api.md](api.md).

It is generated with [Stainless](https://www.stainless.com/).

## Installation

```sh
npm install writer-sdk
```

## Requirements

You need a [Writer API](https://dev.writer.com/api-guides/quickstart#generate-a-new-api-key) key to use this library.

### Supported runtimes

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

> React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Authentication

To authenticate with the Writer API, set the `WRITER_API_KEY` environment variable.

```shell
$ export WRITER_API_KEY="my-api-key"
```

The `Writer` class automatically infers your API key from the `WRITER_API_KEY` environment variable.

```js
import Writer from 'writer-sdk';

const client = new Writer();
```

You can also explicitly set the API key with the `apiKey` parameter:

```js
import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'my-api-key',
});
```

> Never hard-code your API keys in source code or commit them to version control systems like GitHub.
> We recommend adding `WRITER_API_KEY="My API Key"` to your `.env` file so that your API Key is not stored in source control. 

## Usage

You can find the full API for this library in [api.md](api.md).

<!-- prettier-ignore -->
```js
import Writer from 'writer-sdk';

const client = new Writer();

async function main() {
  const chatCompletion = await client.chat.chat({
    messages: [{ content: 'Write a haiku about programming', role: 'user' }],
    model: 'palmyra-x5',
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
```

### Streaming Helpers

The SDK also includes helpers to process streams and handle the incoming events.

```ts
const runner = writer.chat
  .stream({
    model: 'palmyra-x-003-instruct',
    messages: [{ role: 'user', content: 'Hi, today I want to write about' }],
  })
  .on('message', (msg) => console.log(msg))
  .on('content', (diff) => process.stdout.write(diff));

const result = await runner.finalChatCompletion();
console.log(result);
```

More information on streaming helpers can be found in the dedicated documentation: [helpers.md](helpers.md)

## Streaming responses

We provide support for streaming responses using Server Sent Events (SSE).

```ts
import Writer from 'writer-sdk';

const client = new Writer();

const stream = await client.chat.chat({
  messages: [{ content: 'Write a haiku about programming', role: 'user' }],
  model: 'palmyra-x5',
  stream: true,
});
let outputText = "";
for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
        outputText += chunk.choices[0].delta.content;
    } else {
        continue;
    }
}
console.log(outputText);
```

If you need to cancel a stream, you can `break` from the loop
or call `stream.controller.abort()`.

### Request and response types

This library includes TypeScript definitions for all request params and response fields. Import and use them like so:

<!-- prettier-ignore -->
```ts
import Writer from 'writer-sdk';

const client = new Writer();

async function main() {
  const params: Writer.ChatChatParams = {
    messages: [{ content: 'Write a haiku about programming', role: 'user' }],
    model: 'palmyra-x5',
  };
  const chatCompletion: Writer.ChatCompletion = await client.chat.chat(params);
}

main();
```

Documentation for each method, request parameter, and response field are available in docstrings and will appear on hover in most modern editors.

## File uploads

Request parameters that correspond to file uploads can be passed in many different forms:

- `File` (or an object with the same structure)
- a `fetch` `Response` (or an object with the same structure)
- an `fs.ReadStream`
- the return value of our `toFile` helper

The `Content-Type` parameter is the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types) of the file being uploaded. The file upload supports `txt`, `doc`, `docx`, `ppt`, `pptx`, `jpg`, `png`, `eml`, `html`, `pdf`, `srt`, `csv`, `xls`, and `xlsx` file extensions.

```ts
import fs from 'fs';
import Writer, { toFile } from 'writer-sdk';

const client = new Writer();

// If you have access to Node `fs` we recommend using `fs.createReadStream()`:
await client.files.upload({
  content: fs.createReadStream('/path/to/file.pdf'),
  'Content-Disposition': 'attachment; filename="example.pdf"',
  'Content-Type': 'application/pdf',
});

// If you have the web `File` API you can pass a `File` instance:
await client.files.upload({
  content: new File(['my bytes'], 'example.txt'),
  'Content-Disposition': 'attachment; filename="example.txt"',
  'Content-Type': 'text/plain',
});

// You can also pass a `fetch` `Response`:
await client.files.upload({
  content: await fetch('https://example.com/example.pdf'),
  'Content-Disposition': 'attachment; filename="example.pdf"',
  'Content-Type': 'application/pdf',
});

// Finally, if none of the above are convenient, you can use our `toFile` helper:
await client.files.upload({
  content: await toFile(Buffer.from('my bytes'), 'example.txt'),
  'Content-Disposition': 'attachment; filename="example.txt"',
  'Content-Type': 'text/plain',
});
await client.files.upload({
  content: await toFile(new Uint8Array([0, 1, 2]), 'example.txt'),
  'Content-Disposition': 'attachment; filename="example.txt"',
  'Content-Type': 'text/plain',
});
```

## Error handling

When the library is unable to connect to the API (for example, due to a network connectivity problem or a firewall that doesn't allow the connection),
or if the API returns a non-success status code (`4xx` or `5xx` response),
a subclass of `APIError` will be thrown.

> If you are behind a firewall, you may need to configure it to allow connections to the Writer API at `https://api.writer.com/v1.`

<!-- prettier-ignore -->
```ts
async function main() {
  const chatCompletion = await client.chat
    .chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' })
    .catch(async (err) => {
      if (err instanceof Writer.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
      } else {
        throw err;
      }
    });
}

main();
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

The library automatically retries certain errors two times by default, with a short exponential backoff. Connection errors, `408 Request Timeout`, `409 Conflict`, `429 Rate Limit`, and `>=500 Internal errors` are all retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new Writer({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.chat.chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' }, {

  maxRetries: 5,
});
```

### Timeouts

Requests time out after three minutes by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new Writer({
  timeout: 20 * 1000, // 20 seconds (default is 3 minutes)
});

// Override per-request:
await client.chat.chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Requests that time out will be [retried twice by default](#retries).

## Pagination

List methods in the Writer API are paginated.
You can use the `for await … of` syntax to iterate through items across all pages:

```ts
async function fetchAllGraphs(params) {
  const allGraphs = [];
  // Automatically fetches more pages as needed.
  for await (const graph of client.graphs.list()) {
    allGraphs.push(graph);
  }
  return allGraphs;
}
```

Alternatively, you can request a single page at a time:

```ts
let page = await client.graphs.list();
for (const graph of page.data) {
  console.log(graph);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = await page.getNextPage();
  // ...
}
```

## Advanced Usage

### Accessing raw response data

When you use `fetch()` to make requests, you can access the raw `Response` through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

<!-- prettier-ignore -->
```ts
const client = new Writer();

const response = await client.chat
  .chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: chatCompletion, response: raw } = await client.chat
  .chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(chatCompletion.id);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `WRITER_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import Writer from 'writer-sdk';

const client = new Writer({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import Writer from 'writer-sdk';
import pino from 'pino';

const logger = pino();

const client = new Writer({
  logger: logger.child({ name: 'Writer' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, parameters, or response properties, you can still use the library.

#### Undocumented endpoints

To make requests to undocumented endpoints, use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request parameters

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.foo.create({
  foo: 'my_param',
  bar: 12,
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra parameters will be in the query. All other requests will send the
extra parameter in the body of the request.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request parameters, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import Writer from 'writer-sdk';
import fetch from 'my-fetch';

const client = new Writer({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import Writer from 'writer-sdk';

const client = new Writer({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import Writer from 'writer-sdk';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new Writer({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import Writer from 'writer-sdk';

const client = new Writer({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import Writer from 'npm:writer-sdk';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new Writer({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Frequently Asked Questions

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

## Feedback

We welcome feedback! Please open an [issue](https://www.github.com/writer/writer-node/issues) with questions, bugs, or suggestions.
