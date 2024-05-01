// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer';
import { Response } from 'node-fetch';

const writer = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('create: only required params', async () => {
    const responsePromise = writer.v1.chat.create({
      messages: [{ content: 'string', role: 'user' }],
      model: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await writer.v1.chat.create({
      messages: [{ content: 'string', role: 'user', name: 'string' }],
      model: 'string',
      max_tokens: 0,
      n: 0,
      stop: ['string', 'string', 'string'],
      temperature: 0,
      top_p: 0,
    });
  });
});
