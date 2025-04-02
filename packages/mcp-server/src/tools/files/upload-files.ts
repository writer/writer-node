// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'upload_files',
  description: 'Upload file',
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
      },
      'Content-Disposition': {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.files.upload(body);
};

export default { tool, handler };
