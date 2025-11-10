// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/graphs',
  operationId: 'createGraph',
};

export const tool: Tool = {
  name: 'create_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new Knowledge Graph to organize and query documents. Knowledge Graphs are containers for files that enable AI-powered search and question answering. After creation, add files to the graph using add-file-to-graph, then query it using query-knowledge-graph.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/graph_create_response',\n  $defs: {\n    graph_create_response: {\n      type: 'object',\n      title: 'graph_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the Knowledge Graph.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the Knowledge Graph was created.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Knowledge Graph (max 255 characters).'\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the Knowledge Graph (max 255 characters).'\n        },\n        urls: {\n          type: 'array',\n          description: 'An array of web connector URLs associated with this Knowledge Graph.',\n          items: {\n            type: 'object',\n            title: 'web_connector_url',\n            properties: {\n              status: {\n                type: 'object',\n                title: 'web_connector_url_state',\n                description: 'The current status of the URL processing.',\n                properties: {\n                  status: {\n                    type: 'string',\n                    title: 'web_connector_url_status',\n                    description: 'The current status of the URL processing.',\n                    enum: [                      'validating',\n                      'success',\n                      'error'\n                    ]\n                  },\n                  error_type: {\n                    type: 'string',\n                    title: 'web_connector_url_error_type',\n                    description: 'The type of error that occurred during processing, if any.',\n                    enum: [                      'invalid_url',\n                      'not_searchable',\n                      'not_found',\n                      'paywall_or_login_page',\n                      'unexpected_error'\n                    ]\n                  }\n                },\n                required: [                  'status'\n                ]\n              },\n              type: {\n                type: 'string',\n                title: 'web_connector_url_type',\n                description: 'The type of web connector processing for this URL.',\n                enum: [                  'single_page',\n                  'sub_pages'\n                ]\n              },\n              url: {\n                type: 'string',\n                description: 'The URL to be processed by the web connector.'\n              },\n              exclude_urls: {\n                type: 'array',\n                description: 'An array of URLs to exclude from processing within this web connector.',\n                items: {\n                  type: 'string'\n                }\n              }\n            },\n            required: [              'status',\n              'type',\n              'url'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description:
          'A description of the Knowledge Graph (max 255 characters). Omitting this field leaves the description unchanged.',
      },
      name: {
        type: 'string',
        description:
          'The name of the Knowledge Graph (max 255 characters). Omitting this field leaves the name unchanged.',
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
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.graphs.create(body)));
};

export default { metadata, tool, handler };
