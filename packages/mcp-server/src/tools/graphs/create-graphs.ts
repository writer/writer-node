// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'create_graphs',
  description: 'Create a new Knowledge Graph.',
  inputSchema: {
    type: 'object',
    properties: {
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
  const { ...body } = args;
  return client.graphs.create(body);
};

export default { tool, handler };
