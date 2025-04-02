// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'list_graphs',
  description: 'Retrieve a list of Knowledge Graphs.',
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        description:
          'The ID of the last object in the previous page. This parameter instructs the API to return the next page of results.',
      },
      before: {
        type: 'string',
        description:
          'The ID of the first object in the previous page. This parameter instructs the API to return the previous page of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Specifies the maximum number of objects returned in a page. The default value is 50. The minimum value is 1, and the maximum value is 100.',
      },
      order: {
        type: 'string',
        description:
          'Specifies the order of the results. Valid values are asc for ascending and desc for descending.',
        enum: ['asc', 'desc'],
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.graphs.list(body);
};

export default { tool, handler };
