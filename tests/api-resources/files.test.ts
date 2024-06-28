// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer, { toFile } from 'writer-sdk';
import { Response } from 'node-fetch';

const writer = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  test('retrieve', async () => {
    const responsePromise = writer.files.retrieve('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(writer.files.retrieve('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Writer.NotFoundError,
    );
  });

  test('list', async () => {
    const responsePromise = writer.files.list();
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
    await expect(writer.files.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Writer.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      writer.files.list(
        {
          after: 'string',
          before: 'string',
          graph_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 0,
          order: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Writer.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = writer.files.delete('string');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(writer.files.delete('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Writer.NotFoundError,
    );
  });

  // requests with binary data not yet supported in test environment
  test.skip('download: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(writer.files.download('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Writer.NotFoundError,
    );
  });

  // requests with binary data not yet supported in test environment
  test.skip('upload: only required params', async () => {
    const responsePromise = writer.files.upload({
      content: await toFile(Buffer.from('# my file contents'), 'README.md'),
      'Content-Disposition': 'string',
      'Content-Length': 0,
      'Content-Type': 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // requests with binary data not yet supported in test environment
  test.skip('upload: required and optional params', async () => {
    const response = await writer.files.upload({
      content: await toFile(Buffer.from('# my file contents'), 'README.md'),
      'Content-Disposition': 'string',
      'Content-Length': 0,
      'Content-Type': 'string',
    });
  });
});
