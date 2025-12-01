// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload documents and files to Writer. Supports PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, XLSX, MP3, and MP4 formats. Once uploaded, files can be added to Knowledge Graphs for querying or used with Vision API for image analysis. Returns a file ID for subsequent operations.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file',\n  $defs: {\n    file: {\n      type: 'object',\n      title: 'file_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the file.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the file was uploaded.',\n          format: 'date-time'\n        },\n        graph_ids: {\n          type: 'array',\n          description: 'A list of Knowledge Graph IDs that the file is associated with.\\n\\nIf you provided a `graphId` during upload, the file is associated with that Knowledge Graph. However, the `graph_ids` field in the upload response is an empty list. The association will be visible in the `graph_ids` list when you retrieve the file using the file retrieval endpoint.',\n          items: {\n            type: 'string'\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the file.'\n        },\n        status: {\n          type: 'string',\n          description: 'The processing status of the file.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'graph_ids',\n        'name',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
      },
      'Content-Disposition': {
        type: 'string',
      },
      graphId: {
        type: 'string',
        description:
          'The unique identifier of the Knowledge Graph to associate the uploaded file with.\n\nNote: The response from the upload endpoint does not include the `graphId` field, but the association will be visible when you retrieve the file using the file retrieval endpoint.',
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.files.upload(body)));
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
