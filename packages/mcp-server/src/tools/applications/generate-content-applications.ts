// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/applications/{application_id}',
  operationId: 'generateContent',
};

export const tool: Tool = {
  name: 'generate_content_applications',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGenerate content using a pre-configured no-code agent. No-code agents are custom AI workflows you've built in AI Studio with specific prompts, models, and settings. Provide the application ID and required inputs to get tailored content. Useful for consistent, repeatable AI tasks like content generation, data extraction, or custom workflows.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/application_generate_content_response',\n  $defs: {\n    application_generate_content_response: {\n      type: 'object',\n      title: 'generate_application_response',\n      properties: {\n        suggestion: {\n          type: 'string',\n          description: 'The response from the model specified in the application.'\n        },\n        title: {\n          type: 'string',\n          description: 'The name of the output field.'\n        }\n      },\n      required: [        'suggestion'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
          },
          inputs: {
            type: 'array',
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
          stream: {
            type: 'string',
            description:
              'Indicates whether the response should be streamed. Currently only supported for research assistant applications.',
            enum: [false],
          },
        },
        required: ['application_id', 'inputs'],
      },
      {
        type: 'object',
        properties: {
          application_id: {
            type: 'string',
          },
          inputs: {
            type: 'array',
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
          stream: {
            type: 'string',
            description:
              'Indicates whether the response should be streamed. Currently only supported for research assistant applications.',
            enum: [true],
          },
        },
        required: ['application_id', 'inputs', 'stream'],
      },
    ],
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { application_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.applications.generateContent(application_id, body)),
    );
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
