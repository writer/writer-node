// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/files',
  operationId: 'gatewayGetFiles',
};

export const tool: Tool = {
  name: 'list_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a paginated list of all uploaded files. Filter by processing status (in_progress, completed, failed), Knowledge Graph association, or file type. Use this to discover available files, monitor processing status, or find files to add to Knowledge Graphs.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'files_response',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/file'\n      }\n    },\n    has_more: {\n      type: 'boolean',\n      description: 'Indicates if there are more files available beyond the current page.'\n    },\n    first_id: {\n      type: 'string',\n      description: 'The ID of the first file in the current response.'\n    },\n    last_id: {\n      type: 'string',\n      description: 'The ID of the last file in the current response.'\n    }\n  },\n  required: [    'data',\n    'has_more'\n  ],\n  $defs: {\n    file: {\n      type: 'object',\n      title: 'file_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the file.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the file was uploaded.',\n          format: 'date-time'\n        },\n        graph_ids: {\n          type: 'array',\n          description: 'A list of Knowledge Graph IDs that the file is associated with.\\n\\nIf you provided a `graphId` during upload, the file is associated with that Knowledge Graph. However, the `graph_ids` field in the upload response is an empty list. The association will be visible in the `graph_ids` list when you retrieve the file using the file retrieval endpoint.',\n          items: {\n            type: 'string'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the file.'\n        },\n        status: {\n          type: 'string',\n          description: 'The processing status of the file.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'graph_ids',\n        'name',\n        'status'\n      ]\n    }\n  }\n}\n```",
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
      file_types: {
        type: 'string',
        description:
          'The extensions of the files to retrieve. Separate multiple extensions with a comma. For example: `pdf,jpg,docx`.',
      },
      graph_id: {
        type: 'string',
        description: 'The unique identifier of the graph to which the files belong.',
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
      status: {
        type: 'string',
        description:
          'Specifies the status of the files to retrieve. Valid values are in_progress, completed or failed.',
        enum: ['in_progress', 'completed', 'failed'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.files.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
