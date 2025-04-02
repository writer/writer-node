// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'remove_file_from_graph_graphs',
  description: 'Remove a file from a Knowledge Graph.',
  inputSchema: {
    type: 'object',
    properties: {
      graph_id: {
        type: 'string',
      },
      file_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { file_id, ...body } = args;
  return client.graphs.removeFileFromGraph(file_id, body);
};

export default { metadata, tool, handler };
