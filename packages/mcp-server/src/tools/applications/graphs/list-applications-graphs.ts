// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.graphs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}/graphs',
};

export const tool: Tool = {
  name: 'list_applications_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve Knowledge Graphs associated with a no-code agent that has chat capabilities.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/application_graphs_response',\n  $defs: {\n    application_graphs_response: {\n      type: 'object',\n      title: 'application_graphs_response',\n      properties: {\n        graph_ids: {\n          type: 'array',\n          description: 'A list of Knowledge Graphs associated with the application.',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'graph_ids'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['application_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { application_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.applications.graphs.list(application_id)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
