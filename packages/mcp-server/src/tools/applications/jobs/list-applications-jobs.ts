// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.jobs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}/jobs',
};

export const tool: Tool = {
  name: 'list_applications_jobs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve all jobs created via the async API, linked to the provided application ID (or alias).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/application_jobs_list_response',\n  $defs: {\n    application_jobs_list_response: {\n      type: 'object',\n      title: 'get_async_application_jobs_response',\n      properties: {\n        result: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/application_generate_async_response'\n          }\n        },\n        pagination: {\n          type: 'object',\n          properties: {\n            limit: {\n              type: 'integer',\n              description: 'The pagination limit for retrieving the jobs.'\n            },\n            offset: {\n              type: 'integer',\n              description: 'The pagination offset for retrieving the jobs.'\n            }\n          }\n        },\n        totalCount: {\n          type: 'integer',\n          description: 'The total number of jobs associated with the application.'\n        }\n      },\n      required: [        'result'\n      ]\n    },\n    application_generate_async_response: {\n      type: 'object',\n      title: 'get_async_application_job_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier for the job.'\n        },\n        application_id: {\n          type: 'string',\n          description: 'The ID of the application associated with this job.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the job was created.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          title: 'api_job_status',\n          description: 'The status of the job.',\n          enum: [            'in_progress',\n            'failed',\n            'completed'\n          ]\n        },\n        completed_at: {\n          type: 'string',\n          description: 'The timestamp when the job was completed.',\n          format: 'date-time'\n        },\n        data: {\n          $ref: '#/$defs/application_generate_content_response'\n        },\n        error: {\n          type: 'string',\n          description: 'The error message if the job failed.'\n        },\n        updated_at: {\n          type: 'string',\n          description: 'The timestamp when the job was last updated.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'application_id',\n        'created_at',\n        'status'\n      ]\n    },\n    application_generate_content_response: {\n      type: 'object',\n      title: 'generate_application_response',\n      properties: {\n        suggestion: {\n          type: 'string',\n          description: 'The response from the model specified in the application.'\n        },\n        title: {\n          type: 'string',\n          description: 'The name of the output field.'\n        }\n      },\n      required: [        'suggestion'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      limit: {
        type: 'integer',
        description: 'The pagination limit for retrieving the jobs.',
      },
      offset: {
        type: 'integer',
        description: 'The pagination offset for retrieving the jobs.',
      },
      status: {
        type: 'string',
        title: 'api_job_status',
        description: 'The status of the job.',
        enum: ['in_progress', 'failed', 'completed'],
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
  const response = await client.applications.jobs.list(application_id, body).asResponse();
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
