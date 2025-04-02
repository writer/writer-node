// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.graphs',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_applications_graphs',
  description: 'Retrieve Knowledge Graphs associated with a no-code chat application.',
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { application_id } = args;
  return client.applications.graphs.list(application_id);
};

export default { metadata, tool, handler };
