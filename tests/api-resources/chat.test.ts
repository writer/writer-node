// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';
import { Response } from 'node-fetch';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('chat: only required params', async () => {
    const responsePromise = client.chat.chat({
      messages: [{ content: 'Write a memo summarizing this earnings report.', role: 'user' }],
      model: 'palmyra-x-004',
    });
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
      messages: [{ content: 'Write a memo summarizing this earnings report.', role: 'user', name: 'name' }],
      model: 'palmyra-x-004',
      max_tokens: 0,
      n: 0,
      stop: ['string', 'string', 'string'],
      stream: false,
      temperature: 0,
      tool_choice: { value: {} },
      tools: [
        { function: { name: 'name', description: 'description', parameters: {} }, type: 'type' },
        { function: { name: 'name', description: 'description', parameters: {} }, type: 'type' },
        { function: { name: 'name', description: 'description', parameters: {} }, type: 'type' },
      ],
      top_p: 0,
    });
  });
});
