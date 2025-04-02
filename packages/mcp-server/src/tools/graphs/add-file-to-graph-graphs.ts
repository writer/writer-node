// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'add_file_to_graph_graphs',
  description: 'Add a file to a Knowledge Graph.',
  inputSchema: {
    type: 'object',
    properties: {
      graph_id: {
        type: 'string',
      },
      file_id: {
        type: 'string',
        description: 'The unique identifier of the file.',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { graph_id, ...body } = args;
  return client.graphs.addFileToGraph(graph_id, body);
};

export default { tool, handler };
