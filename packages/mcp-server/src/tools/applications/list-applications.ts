// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'list_applications',
  description:
    'Retrieves a paginated list of no-code applications with optional filtering and sorting capabilities.',
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        description: 'Return results after this application ID for pagination.',
      },
      before: {
        type: 'string',
        description: 'Return results before this application ID for pagination.',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of applications to return in the response.',
      },
      order: {
        type: 'string',
        description: 'Sort order for the results based on creation time.',
        enum: ['asc', 'desc'],
      },
      type: {
        type: 'string',
        title: 'application_type',
        description: 'Filter applications by their type.',
        enum: ['generation'],
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.applications.list(body);
};

export default { tool, handler };
