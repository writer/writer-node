// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/files/{file_id}',
  operationId: 'gatewayDeleteFile',
};

export const tool: Tool = {
  name: 'delete_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPermanently delete a file from the system. This action cannot be undone.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file_delete_response',\n  $defs: {\n    file_delete_response: {\n      type: 'object',\n      title: 'delete_file_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the deleted file.'\n        },\n        deleted: {\n          type: 'boolean',\n          description: 'Indicates whether the file was successfully deleted.'\n        }\n      },\n      required: [        'id',\n        'deleted'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      file_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['file_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { file_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.delete(file_id)));
};

export default { metadata, tool, handler };
