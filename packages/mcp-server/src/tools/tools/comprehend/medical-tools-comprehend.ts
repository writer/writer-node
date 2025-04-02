// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools.comprehend',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'medical_tools_comprehend',
  description:
    'Analyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.',
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: 'The text to be analyzed.',
      },
      response_type: {
        type: 'string',
        title: 'comprehend_medical_type',
        description:
          'The structure of the response to be returned. `Entities` returns medical entities, `RxNorm` returns medication information, `ICD-10-CM` returns diagnosis codes, and `SNOMED CT` returns medical concepts.',
        enum: ['Entities', 'RxNorm', 'ICD-10-CM', 'SNOMED CT'],
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.tools.comprehend.medical(body);
};

export default { metadata, tool, handler };
