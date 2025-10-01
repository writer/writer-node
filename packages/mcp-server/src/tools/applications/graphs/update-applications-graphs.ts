// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.graphs',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/applications/{application_id}/graphs',
};

export const tool: Tool = {
  name: 'update_applications_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdates the list of Knowledge Graphs associated with a no-code chat agent.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/application_graphs_response',\n  $defs: {\n    application_graphs_response: {\n      type: 'object',\n      title: 'application_graphs_response',\n      properties: {\n        graph_ids: {\n          type: 'array',\n          description: 'A list of Knowledge Graphs associated with the application.',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'graph_ids'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      graph_ids: {
        type: 'array',
        description:
          'A list of Knowledge Graph IDs to associate with the application. Note that this will replace the existing list of Knowledge Graphs associated with the application, not add to it.',
        items: {
          type: 'string',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['application_id', 'graph_ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { application_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.applications.graphs.update(application_id, body)),
  );
};

export default { metadata, tool, handler };
