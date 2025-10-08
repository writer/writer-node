// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'files',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/files/retry',
  operationId: 'gatewayRetryFailedFiles',
};

export const tool: Tool = {
  name: 'retry_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetry processing of files that previously failed to process. This will re-attempt the processing of the specified files.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/file_retry_response',\n  $defs: {\n    file_retry_response: {\n      type: 'object',\n      title: 'retry_files_response',\n      properties: {\n        success: {\n          type: 'boolean',\n          description: 'Indicates whether the retry operation was successful.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      file_ids: {
        type: 'array',
        description: 'The unique identifier of the files to retry.',
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
    required: ['file_ids'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.files.retry(body)));
};

export default { metadata, tool, handler };
