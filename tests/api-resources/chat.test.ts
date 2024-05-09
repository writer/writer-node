// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import WriterAI from 'writerai';
import { Response } from 'node-fetch';

const writerAI = new WriterAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('chat: only required params', async () => {
    const responsePromise = writerAI.chat.chat({
      messages: [{ content: 'Hello!', role: 'user' }],
      model: 'palmyra-x-chat-v2-32k',
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
    const response = await writerAI.chat.chat({
      messages: [{ content: 'Hello!', role: 'user', name: 'string' }],
      model: 'palmyra-x-chat-v2-32k',
      max_tokens: 0,
      n: 0,
      stop: ['string', 'string', 'string'],
      stream: false,
      temperature: 0,
      top_p: 0,
    });
  });
});
