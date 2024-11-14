// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';
import { Response } from 'node-fetch';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource comprehend', () => {
  test('medical: only required params', async () => {
    const responsePromise = client.tools.comprehend.medical({
      content: 'content',
      response_type: 'Entities',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('medical: required and optional params', async () => {
    const response = await client.tools.comprehend.medical({ content: 'content', response_type: 'Entities' });
  });
});
