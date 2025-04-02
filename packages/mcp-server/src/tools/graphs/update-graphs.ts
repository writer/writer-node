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
  name: 'update_graphs',
  description: 'Update the name and description of a Knowledge Graph.',
  inputSchema: {
    type: 'object',
    properties: {
      graph_id: {
        type: 'string',
      },
      description: {
        type: 'string',
        description:
          'A description of the Knowledge Graph (max 255 characters). Omitting this field leaves the description unchanged.',
      },
      name: {
        type: 'string',
        description:
          'The name of the Knowledge Graph (max 255 characters). Omitting this field leaves the name unchanged.',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { graph_id, ...body } = args;
  return client.graphs.update(graph_id, body);
};

export default { metadata, tool, handler };
