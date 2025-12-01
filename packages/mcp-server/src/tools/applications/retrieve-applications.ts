// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}',
};

export const tool: Tool = {
  name: 'retrieve_applications',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieves detailed information for a specific no-code agent (formerly called no-code applications), including its configuration and current status.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/application_retrieve_response',\n  $defs: {\n    application_retrieve_response: {\n      type: 'object',\n      title: 'application_with_inputs',\n      description: 'Detailed application object including its input configuration.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the application.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Timestamp when the application was created.',\n          format: 'date-time'\n        },\n        inputs: {\n          type: 'array',\n          description: 'List of input configurations for the application.',\n          items: {\n            type: 'object',\n            title: 'application_input',\n            description: 'Configuration for an individual input field in the application.',\n            properties: {\n              input_type: {\n                type: 'string',\n                title: 'application_input_type',\n                description: 'Type of input field determining its behavior and validation rules.',\n                enum: [                  'text',\n                  'dropdown',\n                  'file',\n                  'media'\n                ]\n              },\n              name: {\n                type: 'string',\n                description: 'Identifier for the input field.'\n              },\n              required: {\n                type: 'boolean',\n                description: 'Indicates if this input field is mandatory.'\n              },\n              description: {\n                type: 'string',\n                description: 'Human-readable description of the input field\\'s purpose.'\n              },\n              options: {\n                anyOf: [                  {\n                    type: 'object',\n                    title: 'Dropdown',\n                    description: 'Configuration options specific to dropdown-type input fields.',\n                    properties: {\n                      list: {\n                        type: 'array',\n                        description: 'List of available options in the dropdown menu.',\n                        items: {\n                          type: 'string'\n                        }\n                      }\n                    },\n                    required: [                      'list'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'File',\n                    description: 'Configuration options specific to file upload input fields.',\n                    properties: {\n                      file_types: {\n                        type: 'array',\n                        description: 'List of allowed file extensions.',\n                        items: {\n                          type: 'string'\n                        }\n                      },\n                      max_file_size_mb: {\n                        type: 'integer',\n                        description: 'Maximum file size allowed in megabytes.'\n                      },\n                      max_files: {\n                        type: 'integer',\n                        description: 'Maximum number of files that can be uploaded.'\n                      },\n                      max_word_count: {\n                        type: 'integer',\n                        description: 'Maximum number of words allowed in text files.'\n                      },\n                      upload_types: {\n                        type: 'array',\n                        description: 'List of allowed upload types for file inputs.',\n                        items: {\n                          type: 'string',\n                          title: 'file_upload_type',\n                          description: 'Type of file upload method supported by the application.',\n                          enum: [                            'url',\n                            'file_id'\n                          ]\n                        }\n                      }\n                    },\n                    required: [                      'file_types',\n                      'max_file_size_mb',\n                      'max_files',\n                      'max_word_count',\n                      'upload_types'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'Media',\n                    description: 'Configuration options specific to media upload input fields.',\n                    properties: {\n                      file_types: {\n                        type: 'array',\n                        description: 'List of allowed media file types.',\n                        items: {\n                          type: 'string'\n                        }\n                      },\n                      max_image_size_mb: {\n                        type: 'integer',\n                        description: 'Maximum media file size allowed in megabytes.'\n                      }\n                    },\n                    required: [                      'file_types',\n                      'max_image_size_mb'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'Text',\n                    description: 'Configuration options specific to text input fields.',\n                    properties: {\n                      max_fields: {\n                        type: 'integer',\n                        description: 'Maximum number of text fields allowed.'\n                      },\n                      min_fields: {\n                        type: 'integer',\n                        description: 'Minimum number of text fields required.'\n                      }\n                    },\n                    required: [                      'max_fields',\n                      'min_fields'\n                    ]\n                  }\n                ],\n                description: 'Type-specific configuration options for input fields.'\n              }\n            },\n            required: [              'input_type',\n              'name',\n              'required'\n            ]\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'Display name of the application.'\n        },\n        status: {\n          type: 'string',\n          title: 'application_status',\n          description: 'Current deployment status of the application. Note: currently only `deployed` applications are returned.',\n          enum: [            'deployed',\n            'draft'\n          ]\n        },\n        type: {\n          type: 'string',\n          title: 'application_type',\n          description: 'The type of no-code application.',\n          enum: [            'generation'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Timestamp when the application was last updated.',\n          format: 'date-time'\n        },\n        last_deployed_at: {\n          type: 'string',\n          description: 'Timestamp when the application was last deployed.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'inputs',\n        'name',\n        'status',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
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
      await maybeFilter(jq_filter, await client.applications.retrieve(application_id)),
    );
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
