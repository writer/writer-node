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
  httpPath: '/v1/applications',
};

export const tool: Tool = {
  name: 'list_applications',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet all available no-code agents (applications) in your account. No-code agents are pre-configured AI workflows built in Writer's AI Studio. Use this to discover which agents are available before generating content from them.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'get_applications_response',\n  description: 'Response object containing a paginated list of applications.',\n  properties: {\n    data: {\n      type: 'array',\n      description: 'List of application objects with their configurations.',\n      items: {\n        $ref: '#/$defs/application_list_response'\n      }\n    },\n    has_more: {\n      type: 'boolean',\n      description: 'Indicates if there are more results available in subsequent pages.'\n    },\n    first_id: {\n      type: 'string',\n      description: 'UUID of the first application in the current page.'\n    },\n    last_id: {\n      type: 'string',\n      description: 'UUID of the last application in the current page.'\n    }\n  },\n  required: [    'data',\n    'has_more'\n  ],\n  $defs: {\n    application_list_response: {\n      type: 'object',\n      title: 'application_with_inputs',\n      description: 'Detailed application object including its input configuration.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'Unique identifier for the application.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Timestamp when the application was created.',\n          format: 'date-time'\n        },\n        inputs: {\n          type: 'array',\n          description: 'List of input configurations for the application.',\n          items: {\n            type: 'object',\n            title: 'application_input',\n            description: 'Configuration for an individual input field in the application.',\n            properties: {\n              input_type: {\n                type: 'string',\n                title: 'application_input_type',\n                description: 'Type of input field determining its behavior and validation rules.',\n                enum: [                  'text',\n                  'dropdown',\n                  'file',\n                  'media'\n                ]\n              },\n              name: {\n                type: 'string',\n                description: 'Identifier for the input field.'\n              },\n              required: {\n                type: 'boolean',\n                description: 'Indicates if this input field is mandatory.'\n              },\n              description: {\n                type: 'string',\n                description: 'Human-readable description of the input field\\'s purpose.'\n              },\n              options: {\n                anyOf: [                  {\n                    type: 'object',\n                    title: 'Dropdown',\n                    description: 'Configuration options specific to dropdown-type input fields.',\n                    properties: {\n                      list: {\n                        type: 'array',\n                        description: 'List of available options in the dropdown menu.',\n                        items: {\n                          type: 'string'\n                        }\n                      }\n                    },\n                    required: [                      'list'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'File',\n                    description: 'Configuration options specific to file upload input fields.',\n                    properties: {\n                      file_types: {\n                        type: 'array',\n                        description: 'List of allowed file extensions.',\n                        items: {\n                          type: 'string'\n                        }\n                      },\n                      max_file_size_mb: {\n                        type: 'integer',\n                        description: 'Maximum file size allowed in megabytes.'\n                      },\n                      max_files: {\n                        type: 'integer',\n                        description: 'Maximum number of files that can be uploaded.'\n                      },\n                      max_word_count: {\n                        type: 'integer',\n                        description: 'Maximum number of words allowed in text files.'\n                      },\n                      upload_types: {\n                        type: 'array',\n                        description: 'List of allowed upload types for file inputs.',\n                        items: {\n                          type: 'string',\n                          title: 'file_upload_type',\n                          description: 'Type of file upload method supported by the application.',\n                          enum: [                            'url',\n                            'file_id'\n                          ]\n                        }\n                      }\n                    },\n                    required: [                      'file_types',\n                      'max_file_size_mb',\n                      'max_files',\n                      'max_word_count',\n                      'upload_types'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'Media',\n                    description: 'Configuration options specific to media upload input fields.',\n                    properties: {\n                      file_types: {\n                        type: 'array',\n                        description: 'List of allowed media file types.',\n                        items: {\n                          type: 'string'\n                        }\n                      },\n                      max_image_size_mb: {\n                        type: 'integer',\n                        description: 'Maximum media file size allowed in megabytes.'\n                      }\n                    },\n                    required: [                      'file_types',\n                      'max_image_size_mb'\n                    ]\n                  },\n                  {\n                    type: 'object',\n                    title: 'Text',\n                    description: 'Configuration options specific to text input fields.',\n                    properties: {\n                      max_fields: {\n                        type: 'integer',\n                        description: 'Maximum number of text fields allowed.'\n                      },\n                      min_fields: {\n                        type: 'integer',\n                        description: 'Minimum number of text fields required.'\n                      }\n                    },\n                    required: [                      'max_fields',\n                      'min_fields'\n                    ]\n                  }\n                ],\n                description: 'Type-specific configuration options for input fields.'\n              }\n            },\n            required: [              'input_type',\n              'name',\n              'required'\n            ]\n          }\n        },\n        name: {\n          type: 'string',\n          description: 'Display name of the application.'\n        },\n        status: {\n          type: 'string',\n          title: 'application_status',\n          description: 'Current deployment status of the application. Note: currently only `deployed` applications are returned.',\n          enum: [            'deployed',\n            'draft'\n          ]\n        },\n        type: {\n          type: 'string',\n          title: 'application_type',\n          description: 'The type of no-code application.',\n          enum: [            'generation'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          description: 'Timestamp when the application was last updated.',\n          format: 'date-time'\n        },\n        last_deployed_at: {\n          type: 'string',\n          description: 'Timestamp when the application was last deployed.',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'inputs',\n        'name',\n        'status',\n        'type',\n        'updated_at'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      after: {
        type: 'string',
        description: 'Return results after this application ID for pagination.',
      },
      before: {
        type: 'string',
        description: 'Return results before this application ID for pagination.',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of applications to return in the response.',
      },
      order: {
        type: 'string',
        description: 'Sort order for the results based on creation time.',
        enum: ['asc', 'desc'],
      },
      type: {
        type: 'string',
        title: 'application_type',
        description: 'Filter applications by their type.',
        enum: ['generation'],
      },
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
  const { jq_filter, ...body } = args as any;
  const response = await client.applications.list(body).asResponse();
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
