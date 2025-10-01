// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('chat: only required params', async () => {
    const responsePromise = client.chat.chat({ messages: [{ role: 'user' }], model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('chat: required and optional params', async () => {
    const response = await client.chat.chat({
      messages: [
        {
          role: 'user',
          content: 'string',
          graph_data: {
            references: {
              files: [{ fileId: 'fileId', score: 0, text: 'text', cite: 'cite', page: 0 }],
              web: [{ score: 0, text: 'text', title: 'title', url: 'https://example.com' }],
            },
            sources: [{ file_id: 'file_id', snippet: 'snippet' }],
            status: 'processing',
            subqueries: [
              { answer: 'answer', query: 'query', sources: [{ file_id: 'file_id', snippet: 'snippet' }] },
            ],
          },
          name: 'name',
          refusal: 'refusal',
          tool_call_id: 'tool_call_id',
          tool_calls: [
            { id: 'id', function: { arguments: 'arguments', name: 'name' }, type: 'function', index: 0 },
          ],
        },
      ],
      model: 'model',
      logprobs: true,
      max_tokens: 0,
      n: 0,
      response_format: { type: 'text', json_schema: {} },
      stop: ['string'],
      stream: false,
      stream_options: { include_usage: true },
      temperature: 0,
      tool_choice: { value: 'none' },
      tools: [
        {
          function: { name: 'name', description: 'description', parameters: { foo: 'bar' } },
          type: 'function',
        },
      ],
      top_p: 0,
    });
  });
});
