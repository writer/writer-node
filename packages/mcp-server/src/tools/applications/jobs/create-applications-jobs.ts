// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'create_applications_jobs',
  description: 'Generate content asynchronously from an existing application with inputs.',
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
                'The value for the input field. \n\nIf the input type is "File upload", you must pass the `file_id` of an uploaded file. You cannot pass a file object directly. See the [file upload endpoint](/api-guides/api-reference/file-api/upload-files) for instructions on uploading files or the [list files endpoint](/api-guides/api-reference/file-api/get-all-files) for how to see a list of uploaded files and their IDs.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['id', 'value'],
        },
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { application_id, ...body } = args;
  return client.applications.jobs.create(application_id, body);
};

export default { tool, handler };
