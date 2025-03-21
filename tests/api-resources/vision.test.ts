// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource vision', () => {
  test('analyzeImages: only required params', async () => {
    const responsePromise = client.vision.analyzeImages({
      model: 'palmyra-vision',
      prompt: 'Describe the difference between the image {{image_1}} and the image {{image_2}}.',
      variables: [
        { file_id: 'f1234', name: 'image_1' },
        { file_id: 'f9876', name: 'image_2' },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('analyzeImages: required and optional params', async () => {
    const response = await client.vision.analyzeImages({
      model: 'palmyra-vision',
      prompt: 'Describe the difference between the image {{image_1}} and the image {{image_2}}.',
      variables: [
        { file_id: 'f1234', name: 'image_1' },
        { file_id: 'f9876', name: 'image_2' },
      ],
    });
  });
});
