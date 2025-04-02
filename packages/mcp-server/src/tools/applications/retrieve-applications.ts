// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_applications',
  description:
    'Retrieves detailed information for a specific no-code application, including its configuration and current status.',
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
  return client.applications.retrieve(application_id);
};

export default { metadata, tool, handler };
