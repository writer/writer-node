// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'retrieve_graphs',
  description: 'Retrieve a Knowledge Graph.',
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
  return client.graphs.retrieve(graph_id);
};

export default { tool, handler };
