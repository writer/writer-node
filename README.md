# Writer Node API Library

[![NPM version](https://img.shields.io/npm/v/writer-sdk.svg)](https://npmjs.org/package/writer-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/writer-sdk)

This library provides access to the Writer REST API from server-side TypeScript(>=4.5) or JavaScript.

The REST API documentation can be found on [dev.writer.com](https://dev.writer.com/api-guides/introduction). The full API of this library can be found in [api.md](api.md).

It is generated with [Stainless](https://www.stainlessapi.com/).

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
    messages: [{ content: 'Write a poem about Python', role: 'user' }],
    model: 'palmyra-x-004',
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
```

## Streaming responses

We provide support for streaming responses using Server Sent Events (SSE).

```ts
import Writer from 'writer-sdk';

const client = new Writer();

const stream = await client.chat.chat({
  messages: [{ content: 'Write a poem about Python', role: 'user' }],
  model: 'palmyra-x-004',
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
    messages: [{ content: 'Write a poem about Python', role: 'user' }],
    model: 'palmyra-x-004',
  };
  const chatCompletion: Writer.ChatCompletion = await client.chat.chat(params);
}

main();
```

Documentation for each method, request parameter, and response field are available in docstrings and will appear on hover in most modern editors.

## Error handling

When the library is unable to connect to the API (for example, due to a network connectivity problem or a firewall that doesn't allow the connection),
or if the API returns a non-success status code (`4xx` or `5xx` response),
a subclass of `APIError` will be thrown.

> If you are behind a firewall, you may need to configure it to allow connections to the Writer API at `https://api.writer.com/v1.`

<!-- prettier-ignore -->
```ts
async function main() {
  const chatCompletion = await client.chat
    .chat({ messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' })
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

// Or, configure per request:
await client.chat.chat({ messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' }, {
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

// Override per request:
await client.chat.chat({ messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' }, {
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

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- prettier-ignore -->
```ts
const client = new Writer();

const response = await client.chat
  .chat({ messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: chatCompletion, response: raw } = await client.chat
  .chat({ messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(chatCompletion.id);
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

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you prefer to use a global, web-standards-compliant `fetch` function even in a Node environment—for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`—add the following import before your first import `from "Writer"`:

```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import 'writer-sdk/shims/web';
import Writer from 'writer-sdk';
```

To do the inverse, add `import "writer-sdk/shims/node"`, which does import polyfills.
This can also be useful if you are getting the wrong TypeScript types for `Response` ([more details](https://github.com/writer/writer-node/tree/main/src/_shims#readme)).

### Logging and middleware

You can also provide a custom `fetch` function when instantiating the client,
which you can use to inspect or alter the `Request` or `Response` before or after each request:

```ts
import { fetch } from 'undici'; // as one example
import Writer from 'writer-sdk';

const client = new Writer({
  fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('About to make a request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

If you set the `DEBUG=true` environment variable, this library will log all requests and responses automatically. This is intended for debugging purposes only and may change in the future without notice.

### Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP and TLS handshakes and reducing most requests by 100ms.

If you would like to disable or customize this behavior—for example, to use the API behind a proxy—you can pass an `httpAgent`, which is used for all http and https requests:

<!-- prettier-ignore -->
```ts
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const client = new Writer({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await client.chat.chat(
  { messages: [{ content: 'Write a poem about Python', role: 'user' }], model: 'palmyra-x-004' },
  {
    httpAgent: new http.Agent({ keepAlive: false }),
  },
);
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

## Feedback

We welcome feedback! Please open an [issue](https://www.github.com/writer/writer-node/issues) with questions, bugs, or suggestions.
