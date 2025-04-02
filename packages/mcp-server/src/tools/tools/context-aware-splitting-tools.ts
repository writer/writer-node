// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'context_aware_splitting_tools',
  description:
    'Splits a long block of text (maximum 4000 words) into smaller chunks while preserving the semantic meaning of the text and context between the chunks.',
  inputSchema: {
    type: 'object',
    properties: {
      strategy: {
        type: 'string',
        title: 'splitting_strategy',
        description:
          'The strategy to be used for splitting the text into chunks. `llm_split` uses the language model to split the text, `fast_split` uses a fast heuristic-based approach, and `hybrid_split` combines both strategies.',
        enum: ['llm_split', 'fast_split', 'hybrid_split'],
      },
      text: {
        type: 'string',
        description: 'The text to be split into chunks.',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.tools.contextAwareSplitting(body);
};

export default { tool, handler };
