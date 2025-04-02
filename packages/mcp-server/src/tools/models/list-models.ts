// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_models',
  description: 'List models',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Writer, args: any) => {
  const {} = args;
  return client.models.list();
};

export default { metadata, tool, handler };
