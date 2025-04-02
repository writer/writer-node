// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'vision',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'analyze_vision',
  description: 'Submit images and a prompt to generate an analysis of the images.',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        description: 'The model to be used for image analysis. Currently only supports `palmyra-vision`.',
      },
      prompt: {
        type: 'string',
        description:
          'The prompt to use for the image analysis. The prompt must include the name of each image variable, surrounded by double curly braces (`{{}}`). For example, `Describe the difference between the image {{image_1}} and the image {{image_2}}`.',
      },
      variables: {
        type: 'array',
        items: {
          type: 'object',
          title: 'Vision Request File Variable',
          description:
            'An array of file variables required for the analysis. The image files must be uploaded to the Writer platform before they can be used in a vision request. Learn how to upload files using the [Files API](/api-guides/api-reference/file-api/upload-files).',
          properties: {
            file_id: {
              type: 'string',
              description:
                'The File ID of the image to be analyzed. The file must be uploaded to the Writer platform before it can be used in a vision request.',
            },
            name: {
              type: 'string',
              description:
                'The name of the file variable. You must reference this name in the prompt with double curly braces (`{{}}`). For example, `Describe the difference between the image {{image_1}} and the image {{image_2}}`.',
            },
          },
          required: ['file_id', 'name'],
        },
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.vision.analyze(body);
};

export default { metadata, tool, handler };
