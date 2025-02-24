// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer, { toFile } from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  test('retrieve', async () => {
    const responsePromise = client.files.retrieve('file_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.files.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.files.list(
        {
          after: 'after',
          before: 'before',
          graph_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 0,
          order: 'asc',
          status: 'in_progress',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Writer.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.files.delete('file_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retry: only required params', async () => {
    const responsePromise = client.files.retry({ file_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retry: required and optional params', async () => {
    const response = await client.files.retry({ file_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });
  });

  // requests with binary data not yet supported in test environment
  test.skip('upload: only required params', async () => {
    const responsePromise = client.files.upload({
      content: await toFile(Buffer.from('# my file contents'), 'README.md'),
      'Content-Disposition': 'Content-Disposition',
      'Content-Type': 'Content-Type',
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
    const response = await client.files.upload({
      content: await toFile(Buffer.from('# my file contents'), 'README.md'),
      'Content-Disposition': 'Content-Disposition',
      'Content-Type': 'Content-Type',
    });
  });
});
