// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asBinaryContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/files/{file_id}/download',
  operationId: 'gatewayDownloadFile',
};

export const tool: Tool = {
  name: 'download_files',
  description:
    'Download the binary content of a file. The response will contain the file data in the appropriate MIME type.',
  inputSchema: {
    type: 'object',
    properties: {
      file_id: {
        type: 'string',
      },
    },
    required: ['file_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { file_id, ...body } = args as any;
  return asBinaryContentResult(await client.files.download(file_id));
};

export default { metadata, tool, handler };
