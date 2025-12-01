// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tools/ai-detect',
};

export const tool: Tool = {
  name: 'ai_detect_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDetects if content is AI- or human-generated, with a confidence score. Content must have at least 350 characters\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/tool_ai_detect_response',\n  $defs: {\n    tool_ai_detect_response: {\n      type: 'object',\n      title: 'ai_detection_response',\n      properties: {\n        label: {\n          type: 'string',\n          enum: [            'fake',\n            'real'\n          ]\n        },\n        score: {\n          type: 'number'\n        }\n      },\n      required: [        'label',\n        'score'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      input: {
        type: 'string',
        description:
          'The content to determine if it is AI- or human-generated. Content must have at least 350 characters.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['input'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.tools.aiDetect(body)));
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
