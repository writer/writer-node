// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tools/pdf-parser/{file_id}',
};

export const tool: Tool = {
  name: 'parse_pdf_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nParse PDF to other formats.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'parse_pdf_response',\n  properties: {\n    content: {\n      type: 'string',\n      description: 'The extracted content from the PDF file, converted to the specified format.'\n    }\n  },\n  required: [    'content'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['file_id', 'format'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { file_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.tools.parsePdf(file_id, body)));
};

export default { metadata, tool, handler };
