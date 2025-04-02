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
  name: 'delete_graphs',
  description: 'Delete a Knowledge Graph.',
  inputSchema: {
    type: 'object',
    properties: {
      graph_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { graph_id } = args;
  return client.graphs.delete(graph_id);
};

export default { metadata, tool, handler };
