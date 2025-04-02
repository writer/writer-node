// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'retry_files',
  description: 'Retry failed files',
  inputSchema: {
    type: 'object',
    properties: {
      file_ids: {
        type: 'array',
        description: 'The unique identifier of the files to be retried.',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.files.retry(body);
};

export default { metadata, tool, handler };
