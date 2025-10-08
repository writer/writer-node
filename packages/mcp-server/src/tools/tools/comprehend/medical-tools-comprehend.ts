// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools.comprehend',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tools/comprehend/medical',
};

export const tool: Tool = {
  name: 'medical_tools_comprehend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAnalyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/comprehend_medical_response',\n  $defs: {\n    comprehend_medical_response: {\n      type: 'object',\n      title: 'medical_comprehend_response',\n      properties: {\n        entities: {\n          type: 'array',\n          description: 'An array of medical entities extracted from the input text.',\n          items: {\n            type: 'object',\n            title: 'medical_comprehend_entity',\n            properties: {\n              attributes: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  title: 'medical_comprehend_attribute',\n                  properties: {\n                    begin_offset: {\n                      type: 'integer'\n                    },\n                    concepts: {\n                      type: 'array',\n                      items: {\n                        type: 'object',\n                        title: 'medical_comprehend_concept',\n                        properties: {\n                          code: {\n                            type: 'string'\n                          },\n                          description: {\n                            type: 'string'\n                          },\n                          score: {\n                            type: 'number'\n                          }\n                        },\n                        required: [                          'code',\n                          'description',\n                          'score'\n                        ]\n                      }\n                    },\n                    end_offset: {\n                      type: 'integer'\n                    },\n                    relationship_score: {\n                      type: 'number'\n                    },\n                    score: {\n                      type: 'number'\n                    },\n                    text: {\n                      type: 'string'\n                    },\n                    traits: {\n                      type: 'array',\n                      items: {\n                        type: 'object',\n                        title: 'medical_comprehend_trait',\n                        properties: {\n                          name: {\n                            type: 'string'\n                          },\n                          score: {\n                            type: 'number'\n                          }\n                        },\n                        required: [                          'name',\n                          'score'\n                        ]\n                      }\n                    },\n                    type: {\n                      type: 'string'\n                    },\n                    category: {\n                      type: 'string'\n                    },\n                    relationship_type: {\n                      type: 'string'\n                    }\n                  },\n                  required: [                    'begin_offset',\n                    'concepts',\n                    'end_offset',\n                    'relationship_score',\n                    'score',\n                    'text',\n                    'traits',\n                    'type'\n                  ]\n                }\n              },\n              begin_offset: {\n                type: 'integer'\n              },\n              category: {\n                type: 'string'\n              },\n              concepts: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  title: 'medical_comprehend_concept',\n                  properties: {\n                    code: {\n                      type: 'string'\n                    },\n                    description: {\n                      type: 'string'\n                    },\n                    score: {\n                      type: 'number'\n                    }\n                  },\n                  required: [                    'code',\n                    'description',\n                    'score'\n                  ]\n                }\n              },\n              end_offset: {\n                type: 'integer'\n              },\n              score: {\n                type: 'number'\n              },\n              text: {\n                type: 'string'\n              },\n              traits: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  title: 'medical_comprehend_trait',\n                  properties: {\n                    name: {\n                      type: 'string'\n                    },\n                    score: {\n                      type: 'number'\n                    }\n                  },\n                  required: [                    'name',\n                    'score'\n                  ]\n                }\n              },\n              type: {\n                type: 'string'\n              }\n            },\n            required: [              'attributes',\n              'begin_offset',\n              'category',\n              'concepts',\n              'end_offset',\n              'score',\n              'text',\n              'traits',\n              'type'\n            ]\n          }\n        }\n      },\n      required: [        'entities'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: 'The text to analyze.',
      },
      response_type: {
        type: 'string',
        title: 'comprehend_medical_type',
        description:
          'The structure of the response to return. `Entities` returns medical entities, `RxNorm` returns medication information, `ICD-10-CM` returns diagnosis codes, and `SNOMED CT` returns medical concepts.',
        enum: ['Entities', 'RxNorm', 'ICD-10-CM', 'SNOMED CT'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['content', 'response_type'],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.tools.comprehend.medical(body)));
};

export default { metadata, tool, handler };
