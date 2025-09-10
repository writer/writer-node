// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/graphs/question',
  operationId: 'question',
};

export const tool: Tool = {
  name: 'question_graphs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAsk a question to specified Knowledge Graphs.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/question',\n  $defs: {\n    question: {\n      type: 'object',\n      title: 'question_response',\n      properties: {\n        answer: {\n          type: 'string',\n          description: 'The answer to the question.'\n        },\n        question: {\n          type: 'string',\n          description: 'The question that was asked.'\n        },\n        sources: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/source'\n          }\n        },\n        subqueries: {\n          type: 'array',\n          items: {\n            type: 'object',\n            title: 'sub_query',\n            properties: {\n              answer: {\n                type: 'string',\n                description: 'The answer to the subquery.'\n              },\n              query: {\n                type: 'string',\n                description: 'The subquery that was asked.'\n              },\n              sources: {\n                type: 'array',\n                items: {\n                  $ref: '#/$defs/source'\n                }\n              }\n            },\n            required: [              'answer',\n              'query',\n              'sources'\n            ]\n          }\n        }\n      },\n      required: [        'answer',\n        'question',\n        'sources'\n      ]\n    },\n    source: {\n      type: 'object',\n      title: 'source',\n      properties: {\n        file_id: {\n          type: 'string',\n          description: 'The unique identifier of the file.'\n        },\n        snippet: {\n          type: 'string',\n          description: 'A snippet of text from the source file.'\n        }\n      },\n      required: [        'file_id',\n        'snippet'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          graph_ids: {
            type: 'array',
            description: 'The unique identifiers of the Knowledge Graphs to query.',
            items: {
              type: 'string',
            },
          },
          question: {
            type: 'string',
            description: 'The question to answer using the Knowledge Graph.',
          },
          stream: {
            type: 'string',
            description:
              "Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.",
            enum: [false],
          },
          subqueries: {
            type: 'boolean',
            description: 'Specify whether to include subqueries.',
          },
        },
        required: ['graph_ids', 'question'],
      },
      {
        type: 'object',
        properties: {
          graph_ids: {
            type: 'array',
            description: 'The unique identifiers of the Knowledge Graphs to query.',
            items: {
              type: 'string',
            },
          },
          question: {
            type: 'string',
            description: 'The question to answer using the Knowledge Graph.',
          },
          stream: {
            type: 'string',
            description:
              "Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.",
            enum: [true],
          },
          subqueries: {
            type: 'boolean',
            description: 'Specify whether to include subqueries.',
          },
        },
        required: ['graph_ids', 'question', 'stream'],
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
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.graphs.question(body)));
};

export default { metadata, tool, handler };
