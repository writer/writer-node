// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.completions.create({
      model: 'palmyra-x-003-instruct',
      prompt: 'Write me an SEO article about...',
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
    const response = await client.completions.create({
      model: 'palmyra-x-003-instruct',
      prompt: 'Write me an SEO article about...',
      best_of: 1,
      max_tokens: 150,
      random_seed: 42,
      stop: ['.'],
      stream: false,
      temperature: 0.7,
      top_p: 0.9,
    });
  });
});
