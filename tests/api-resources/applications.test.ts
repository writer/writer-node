// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';
import { Response } from 'node-fetch';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource applications', () => {
  test('generateContent: only required params', async () => {
    const responsePromise = client.applications.generateContent('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      inputs: [{ id: 'id', value: ['string'] }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateContent: required and optional params', async () => {
    const response = await client.applications.generateContent('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      inputs: [{ id: 'id', value: ['string'] }],
      stream: true,
    });
  });
});
