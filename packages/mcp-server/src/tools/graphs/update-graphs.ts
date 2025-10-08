// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/graphs/{graph_id}',
  operationId: 'updateGraph',
};

export const tool: Tool = {
  name: 'update_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate the name and description of a Knowledge Graph.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/graph_update_response',\n  $defs: {\n    graph_update_response: {\n      type: 'object',\n      title: 'graph_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'A unique identifier of the Knowledge Graph.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the Knowledge Graph was created.',\n          format: 'date-time'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the Knowledge Graph (max 255 characters).'\n        },\n        description: {\n          type: 'string',\n          description: 'A description of the Knowledge Graph (max 255 characters).'\n        },\n        urls: {\n          type: 'array',\n          description: 'An array of web connector URLs associated with this Knowledge Graph.',\n          items: {\n            type: 'object',\n            title: 'web_connector_url',\n            properties: {\n              status: {\n                type: 'object',\n                title: 'web_connector_url_state',\n                description: 'The current status of the URL processing.',\n                properties: {\n                  status: {\n                    type: 'string',\n                    title: 'web_connector_url_status',\n                    description: 'The current status of the URL processing.',\n                    enum: [                      'validating',\n                      'success',\n                      'error'\n                    ]\n                  },\n                  error_type: {\n                    type: 'string',\n                    title: 'web_connector_url_error_type',\n                    description: 'The type of error that occurred during processing, if any.',\n                    enum: [                      'invalid_url',\n                      'not_searchable',\n                      'not_found',\n                      'paywall_or_login_page',\n                      'unexpected_error'\n                    ]\n                  }\n                },\n                required: [                  'status'\n                ]\n              },\n              type: {\n                type: 'string',\n                title: 'web_connector_url_type',\n                description: 'The type of web connector processing for this URL.',\n                enum: [                  'single_page',\n                  'sub_pages'\n                ]\n              },\n              url: {\n                type: 'string',\n                description: 'The URL to be processed by the web connector.'\n              },\n              exclude_urls: {\n                type: 'array',\n                description: 'An array of URLs to exclude from processing within this web connector.',\n                items: {\n                  type: 'string'\n                }\n              }\n            },\n            required: [              'status',\n              'type',\n              'url'\n            ]\n          }\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      graph_id: {
        type: 'string',
      },
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
      urls: {
        type: 'array',
        description:
          'An array of web connector URLs to update for this Knowledge Graph. You can only connect URLs to Knowledge Graphs with the type `web`. To clear the list of URLs, set this field to an empty array.',
        items: {
          type: 'object',
          title: 'update_graph_web_url',
          properties: {
            type: {
              type: 'string',
              title: 'web_connector_url_type',
              description: 'The type of web connector processing for this URL.',
              enum: ['single_page', 'sub_pages'],
            },
            url: {
              type: 'string',
              description: 'The URL to be processed by the web connector.',
            },
            exclude_urls: {
              type: 'array',
              description: 'An array of URLs to exclude from processing within this web connector.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['type', 'url'],
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['graph_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { graph_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.graphs.update(graph_id, body)));
};

export default { metadata, tool, handler };
