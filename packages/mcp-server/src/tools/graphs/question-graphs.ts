// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'graphs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'question_graphs',
  description: 'Ask a question to specified Knowledge Graphs.',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          graph_ids: {
            type: 'array',
            description: 'The unique identifiers of the Knowledge Graphs to be queried.',
            items: {
              type: 'string',
            },
          },
          question: {
            type: 'string',
            description: 'The question to be answered using the Knowledge Graph.',
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
      },
      {
        type: 'object',
        properties: {
          graph_ids: {
            type: 'array',
            description: 'The unique identifiers of the Knowledge Graphs to be queried.',
            items: {
              type: 'string',
            },
          },
          question: {
            type: 'string',
            description: 'The question to be answered using the Knowledge Graph.',
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
      },
    ],
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.graphs.question(body);
};

export default { metadata, tool, handler };
