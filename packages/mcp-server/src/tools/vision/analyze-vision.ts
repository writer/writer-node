// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'vision',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/vision',
};

export const tool: Tool = {
  name: 'analyze_vision',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSubmit images and a prompt to generate an analysis of the images.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/vision_response',\n  $defs: {\n    vision_response: {\n      type: 'object',\n      title: 'Vision Response',\n      properties: {\n        data: {\n          type: 'string',\n          description: 'The result of the image analysis.'\n        }\n      },\n      required: [        'data'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        description: 'The model to use for image analysis.',
        enum: ['palmyra-vision'],
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
            'An array of file variables required for the analysis. The image files must be uploaded to the Writer platform before they can be used in a vision request. Learn how to upload files using the [Files API](https://dev.writer.com/api-reference/file-api/upload-files).\n\nThe maximum allowed file size for each image is 7MB.',
          properties: {
            file_id: {
              type: 'string',
              description:
                'The File ID of the image to analyze. The file must be uploaded to the Writer platform before it can be used in a vision request.',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['model', 'prompt', 'variables'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.vision.analyze(body)));
};

export default { metadata, tool, handler };
