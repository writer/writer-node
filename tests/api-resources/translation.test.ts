// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource translation', () => {
  test('translate: only required params', async () => {
    const responsePromise = client.translation.translate({
      formality: true,
      length_control: true,
      mask_profanity: true,
      model: 'palmyra-translate',
      source_language_code: 'en',
      target_language_code: 'es',
      text: 'Hello, world!',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('translate: required and optional params', async () => {
    const response = await client.translation.translate({
      formality: true,
      length_control: true,
      mask_profanity: true,
      model: 'palmyra-translate',
      source_language_code: 'en',
      target_language_code: 'es',
      text: 'Hello, world!',
    });
  });
});
