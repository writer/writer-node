// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/models',
  operationId: 'models',
};

export const tool: Tool = {
  name: 'list_models',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a list of available models that can be used for text generation, chat completions, and other AI tasks.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/model_list_response',\n  $defs: {\n    model_list_response: {\n      type: 'object',\n      properties: {\n        models: {\n          type: 'array',\n          description: 'The [ID of the model](https://dev.writer.com/home/models) to use for processing the request.',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'The ID of the particular LLM that you want to use'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the particular LLM that you want to use.'\n              }\n            },\n            required: [              'id',\n              'name'\n            ]\n          }\n        }\n      },\n      required: [        'models'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.models.list()));
};

export default { metadata, tool, handler };
