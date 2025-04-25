// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  test('aiDetect: only required params', async () => {
    const responsePromise = client.tools.aiDetect({
      input:
        'AI and ML continue to be at the forefront of technological advancements. In 2025, we can expect more sophisticated AI systems that can handle complex tasks with greater efficiency. AI will play a crucial role in various sectors, including healthcare, finance, and manufacturing. For instance, AI-powered diagnostic tools will become more accurate, helping doctors detect diseases at an early stage. In finance, AI algorithms will enhance fraud detection and risk management.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('aiDetect: required and optional params', async () => {
    const response = await client.tools.aiDetect({
      input:
        'AI and ML continue to be at the forefront of technological advancements. In 2025, we can expect more sophisticated AI systems that can handle complex tasks with greater efficiency. AI will play a crucial role in various sectors, including healthcare, finance, and manufacturing. For instance, AI-powered diagnostic tools will become more accurate, helping doctors detect diseases at an early stage. In finance, AI algorithms will enhance fraud detection and risk management.',
    });
  });

  test('contextAwareSplitting: only required params', async () => {
    const responsePromise = client.tools.contextAwareSplitting({ strategy: 'llm_split', text: 'text' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('contextAwareSplitting: required and optional params', async () => {
    const response = await client.tools.contextAwareSplitting({ strategy: 'llm_split', text: 'text' });
  });

  test('parsePdf: only required params', async () => {
    const responsePromise = client.tools.parsePdf('file_id', { format: 'text' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('parsePdf: required and optional params', async () => {
    const response = await client.tools.parsePdf('file_id', { format: 'text' });
  });
});
