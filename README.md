# Writer TypeScript API Library

[![NPM version](https://img.shields.io/npm/v/writer-sdk.svg)](https://npmjs.org/package/writer-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/writer-sdk)

This library provides convenient access to the Writer REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [dev.writer.com](https://dev.writer.com/api-guides/introduction). The full API of this library can be found in [api.md](api.md).

It is generated with [Stainless](https://www.stainlessapi.com/).

## Installation

```sh
npm install git+ssh://git@github.com:stainless-sdks/writer-typescript.git
```

> [!NOTE]
> Once this package is [published to npm](https://app.stainlessapi.com/docs/guides/publish), this will become: `npm install writer-sdk`

## Usage

The full API of this library can be found in [api.md](api.md).

<!-- prettier-ignore -->
```js
import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await client.chat.chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' });

  console.log(chatCompletion.id);
}

main();
```

## Streaming responses

We provide support for streaming responses using Server Sent Events (SSE).

```ts
import Writer from 'writer-sdk';

const client = new Writer();

const stream = await client.completions.create({
  model: 'palmyra-x-003-instruct',
  prompt: 'Hi, my name is',
  stream: true,
});
for await (const completionChunk of stream) {
  console.log(completionChunk.choices);
}
```

If you need to cancel a stream, you can `break` from the loop
or call `stream.controller.abort()`.

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const params: Writer.ChatChatParams = { messages: [{ role: 'user' }], model: 'palmyra-x-004' };
  const chatCompletion: Writer.ChatCompletion = await client.chat.chat(params);
}

main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## File uploads

Request parameters that correspond to file uploads can be passed in many different forms:

- `File` (or an object with the same structure)
- a `fetch` `Response` (or an object with the same structure)
- an `fs.ReadStream`
- the return value of our `toFile` helper

```ts
import fs from 'fs';
import Writer, { toFile } from 'writer-sdk';

const client = new Writer();

// If you have access to Node `fs` we recommend using `fs.createReadStream()`:
await client.files.upload({
  content: fs.createReadStream('/path/to/file'),
  'Content-Disposition': 'Content-Disposition',
});

// Or if you have the web `File` API you can pass a `File` instance:
await client.files.upload({
  content: new File(['my bytes'], 'file'),
  'Content-Disposition': 'Content-Disposition',
});

// You can also pass a `fetch` `Response`:
await client.files.upload({
  content: await fetch('https://somesite/file'),
  'Content-Disposition': 'Content-Disposition',
});

// Finally, if none of the above are convenient, you can use our `toFile` helper:
await client.files.upload({
  content: await toFile(Buffer.from('my bytes'), 'file'),
  'Content-Disposition': 'Content-Disposition',
});
await client.files.upload({
  content: await toFile(new Uint8Array([0, 1, 2]), 'file'),
  'Content-Disposition': 'Content-Disposition',
});
```

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
async function main() {
  const chatCompletion = await client.chat
    .chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' })
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

Error codes are as followed:

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

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new Writer({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.chat.chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 3 minutes by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new Writer({
  timeout: 20 * 1000, // 20 seconds (default is 3 minutes)
});

// Override per-request:
await client.chat.chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

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

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- prettier-ignore -->
```ts
const client = new Writer();

const response = await client.chat
  .chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: chatCompletion, response: raw } = await client.chat
  .chat({ messages: [{ role: 'user' }], model: 'palmyra-x-004' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(chatCompletion.id);
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

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

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
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
import fetch from 'my-fetch';

const client = new Writer({ fetch });
```

### Logging and middleware

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

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

Note that if given a `WRITER_LOG=debug` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

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

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/writer-typescript/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
