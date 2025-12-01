// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/graphs',
  operationId: 'findGraphsWithFileStatus',
};

export const tool: Tool = {
  name: 'list_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet all available Knowledge Graphs in your account. Knowledge Graphs are collections of documents and files that can be queried using AI. Use this to discover which knowledge bases are available before querying them.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'graphs_response',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/graph'\n      }\n    },\n    has_more: {\n      type: 'boolean',\n      description: 'Indicates if there are more Knowledge Graphs available beyond the current page.'\n    },\n    first_id: {\n      type: 'string',\n      description: 'The ID of the first Knowledge Graph in the current response.'\n    },\n    last_id: {\n      type: 'string',\n      description: 'The ID of the last Knowledge Graph in the current response.'\n    }\n  },\n  required: [    'data',\n    'has_more'\n  ],\n  $defs: {\n    graph: {\n      type: 'object',\n      title: 'graph',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier of the Knowledge Graph.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the Knowledge Graph was created.',\n          format: 'date-time'\n        },\n        file_status: {\n          type: 'object',\n          title: 'graph_file_status',\n          description: 'The processing status of files in the Knowledge Graph.',\n          properties: {\n            completed: {\n              type: 'integer',\n              description: 'The number of files that have been successfully processed.'\n            },\n            failed: {\n              type: 'integer',\n              description: 'The number of files that failed to process.'\n            },\n            in_progress: {\n              type: 'integer',\n              description: 'The number of files currently being processed.'\n            },\n            total: {\n              type: 'integer',\n              description: 'The total number of files associated with the Knowledge Graph.'\n            }\n          },\n          required: [            'completed',\n            'failed',\n            'in_progress',\n            'total'\n          ]\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Knowledge Graph.'\n        },\n        type: {\n          type: 'string',\n          title: 'graph_type',\n          description: 'The type of Knowledge Graph.\\n\\n- `manual`: files are uploaded via UI or API\\n- `connector`: files are uploaded via a data connector such as Google Drive or Confluence\\n- `web`: URLs are connected to the Knowledge Graph',\n          enum: [            'manual',\n            'connector',\n            'web'\n          ]\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the Knowledge Graph.'\n        },\n        urls: {\n          type: 'array',\n          description: 'An array of web connector URLs associated with this Knowledge Graph.',\n          items: {\n            type: 'object',\n            title: 'web_connector_url',\n            properties: {\n              status: {\n                type: 'object',\n                title: 'web_connector_url_state',\n                description: 'The current status of the URL processing.',\n                properties: {\n                  status: {\n                    type: 'string',\n                    title: 'web_connector_url_status',\n                    description: 'The current status of the URL processing.',\n                    enum: [                      'validating',\n                      'success',\n                      'error'\n                    ]\n                  },\n                  error_type: {\n                    type: 'string',\n                    title: 'web_connector_url_error_type',\n                    description: 'The type of error that occurred during processing, if any.',\n                    enum: [                      'invalid_url',\n                      'not_searchable',\n                      'not_found',\n                      'paywall_or_login_page',\n                      'unexpected_error'\n                    ]\n                  }\n                },\n                required: [                  'status'\n                ]\n              },\n              type: {\n                type: 'string',\n                title: 'web_connector_url_type',\n                description: 'The type of web connector processing for this URL.',\n                enum: [                  'single_page',\n                  'sub_pages'\n                ]\n              },\n              url: {\n                type: 'string',\n                description: 'The URL to be processed by the web connector.'\n              },\n              exclude_urls: {\n                type: 'array',\n                description: 'An array of URLs to exclude from processing within this web connector.',\n                items: {\n                  type: 'string'\n                }\n              }\n            },\n            required: [              'status',\n              'type',\n              'url'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'file_status',\n        'name',\n        'type'\n      ]\n    }\n  }\n}\n```",
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
  const response = await client.graphs.list(body).asResponse();
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
