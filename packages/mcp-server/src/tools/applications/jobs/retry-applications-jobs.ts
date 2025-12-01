// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.jobs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/applications/jobs/{job_id}/retry',
};

export const tool: Tool = {
  name: 'retry_applications_jobs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRe-triggers the async execution of a single job previously created via the Async api and terminated in error.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/job_retry_response',\n  $defs: {\n    job_retry_response: {\n      type: 'object',\n      title: 'generate_application_async_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier for the async job created.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the job was created.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          title: 'api_job_status',\n          description: 'The status of the job.',\n          enum: [            'in_progress',\n            'failed',\n            'completed'\n          ]\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      job_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['job_id'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { job_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.applications.jobs.retry(job_id)));
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
