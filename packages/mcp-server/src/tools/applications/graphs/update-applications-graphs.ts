// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.graphs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_applications_graphs',
  description:
    'Updates the Knowledge Graphs listed and associates them with the no-code chat app to be used.',
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      graph_ids: {
        type: 'array',
        description:
          'A list of Knowledge Graph IDs to associate with the application. Note that this will replace the existing list of Knowledge Graphs associated with the application, not add to it.',
        items: {
          type: 'string',
          description: 'The unique identifier for the Knowledge Graph.',
        },
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { application_id, ...body } = args;
  return client.applications.graphs.update(application_id, body);
};

export default { metadata, tool, handler };
