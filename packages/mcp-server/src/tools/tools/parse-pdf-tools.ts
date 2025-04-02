// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'parse_pdf_tools',
  description: 'Parse PDF to other formats.',
  inputSchema: {
    type: 'object',
    properties: {
      file_id: {
        type: 'string',
      },
      format: {
        type: 'string',
        title: 'pdf_conversion_format',
        description: 'The format into which the PDF content should be converted.',
        enum: ['text', 'markdown'],
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { file_id, ...body } = args;
  return client.tools.parsePdf(file_id, body);
};

export default { metadata, tool, handler };
