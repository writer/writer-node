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
  httpPath: '/v1/applications/{application_id}/jobs',
};

export const tool: Tool = {
  name: 'create_applications_jobs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGenerate content asynchronously from an existing no-code agent (formerly called no-code applications) with inputs.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/job_create_response',\n  $defs: {\n    job_create_response: {\n      type: 'object',\n      title: 'generate_application_async_response',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier for the async job created.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp when the job was created.',\n          format: 'date-time'\n        },\n        status: {\n          type: 'string',\n          title: 'api_job_status',\n          description: 'The status of the job.',\n          enum: [            'in_progress',\n            'failed',\n            'completed'\n          ]\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      inputs: {
        type: 'array',
        description: 'A list of input objects to generate content for.',
        items: {
          type: 'object',
          title: 'generate_application_input',
          properties: {
            id: {
              type: 'string',
              description:
                'The unique identifier for the input field from the application. All input types from the No-code application are supported (i.e. Text input, Dropdown, File upload, Image input). The identifier should be the name of the input type.',
            },
            value: {
              type: 'array',
              description:
                'The value for the input field. \n\nIf the input type is "File upload", you must pass the `file_id` of an uploaded file. You cannot pass a file object directly. See the [file upload endpoint](https://dev.writer.com/api-reference/file-api/upload-files) for instructions on uploading files or the [list files endpoint](https://dev.writer.com/api-reference/file-api/get-all-files) for how to see a list of uploaded files and their IDs.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['id', 'value'],
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['application_id', 'inputs'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { application_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.applications.jobs.create(application_id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
