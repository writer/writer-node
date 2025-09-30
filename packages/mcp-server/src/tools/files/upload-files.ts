// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files',
  operationId: 'gatewayUploadFile',
};

export const tool: Tool = {
  name: 'upload_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload a new file to the system. Supports various file formats including PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file',\n  $defs: {\n    file: {\n      type: 'object',\n      title: 'file_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the file.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the file was uploaded.',\n          format: 'date-time'\n        },\n        graph_ids: {\n          type: 'array',\n          description: 'A list of Knowledge Graph IDs that the file is associated with.',\n          items: {\n            type: 'string'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the file.'\n        },\n        status: {\n          type: 'string',\n          description: 'The processing status of the file.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'graph_ids',\n        'name',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
      },
      'Content-Disposition': {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['content', 'Content-Disposition'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.upload(body)));
};

export default { metadata, tool, handler };
