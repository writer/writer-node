// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'download_files',
  description: 'Download file',
  inputSchema: {
    type: 'object',
    properties: {
      file_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { file_id } = args;
  return client.files.download(file_id);
};

export default { tool, handler };
