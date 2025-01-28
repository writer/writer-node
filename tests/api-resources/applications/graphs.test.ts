// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';
import { Response } from 'node-fetch';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource graphs', () => {
  test('update: only required params', async () => {
    const responsePromise = client.applications.graphs.update('application_id', {
      graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.applications.graphs.update('application_id', {
      graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
    });
  });

  test('list', async () => {
    const responsePromise = client.applications.graphs.list('application_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.applications.graphs.list('application_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Writer.NotFoundError);
  });
});
