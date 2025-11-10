// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
    'Ask questions and get AI-generated answers based on your Knowledge Graph content. Queries your uploaded documents, PDFs, and files to retrieve accurate, source-cited information. Returns answers with supporting snippets and file references. Ideal for RAG (Retrieval-Augmented Generation) applications and knowledge base queries.',
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
          query_config: {
            type: 'object',
            title: 'graph_query_config',
            description:
              'Configuration options for Knowledge Graph queries, including search parameters and citation settings.',
            properties: {
              grounding_level: {
                type: 'number',
                description:
                  'Level of grounding required for responses, controlling how closely answers must be tied to source material. Set lower for grounded outputs, higher for creativity. Higher values (closer to 1.0) allow more creative interpretation, while lower values (closer to 0.0) stick more closely to source material. Range: 0.0-1.0, Default: 0.0.',
              },
              inline_citations: {
                type: 'boolean',
                description:
                  'Whether to include inline citations in the response, showing which Knowledge Graph sources were used. Default: false.',
              },
              keyword_threshold: {
                type: 'number',
                description:
                  'Threshold for keyword-based matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger keyword matches, while lower values (closer to 0.0) allow more lenient matching. Range: 0.0-1.0, Default: 0.7.',
              },
              max_snippets: {
                type: 'integer',
                description:
                  'Maximum number of text snippets to retrieve from the Knowledge Graph for context. Works in concert with `search_weight` to control best matches vs broader coverage. While technically supports 1-60, values below 5 may return no results due to RAG implementation. Recommended range: 5-25. Due to RAG system behavior, you may see more snippets than requested. Range: 1-60, Default: 30.',
              },
              max_subquestions: {
                type: 'integer',
                description:
                  'Maximum number of subquestions to generate when processing complex queries. Set higher to improve detail, set lower to reduce response time. Range: 1-10, Default: 6.',
              },
              max_tokens: {
                type: 'integer',
                description:
                  "Maximum number of tokens the model can generate in the response. This controls the length of the AI's answer. Set higher for longer answers, set lower for shorter, faster answers. Range: 100-8000, Default: 4000.",
              },
              search_weight: {
                type: 'integer',
                description:
                  'Weight given to search results when ranking and selecting relevant information. Higher values (closer to 100) prioritize keyword-based matching, while lower values (closer to 0) prioritize semantic similarity matching. Use higher values for exact keyword searches, lower values for conceptual similarity searches. Range: 0-100, Default: 50.',
              },
              semantic_threshold: {
                type: 'number',
                description:
                  'Threshold for semantic similarity matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger semantic similarity, while lower values (closer to 0.0) allow more lenient semantic matching. Range: 0.0-1.0, Default: 0.7.',
              },
            },
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
          query_config: {
            type: 'object',
            title: 'graph_query_config',
            description:
              'Configuration options for Knowledge Graph queries, including search parameters and citation settings.',
            properties: {
              grounding_level: {
                type: 'number',
                description:
                  'Level of grounding required for responses, controlling how closely answers must be tied to source material. Set lower for grounded outputs, higher for creativity. Higher values (closer to 1.0) allow more creative interpretation, while lower values (closer to 0.0) stick more closely to source material. Range: 0.0-1.0, Default: 0.0.',
              },
              inline_citations: {
                type: 'boolean',
                description:
                  'Whether to include inline citations in the response, showing which Knowledge Graph sources were used. Default: false.',
              },
              keyword_threshold: {
                type: 'number',
                description:
                  'Threshold for keyword-based matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger keyword matches, while lower values (closer to 0.0) allow more lenient matching. Range: 0.0-1.0, Default: 0.7.',
              },
              max_snippets: {
                type: 'integer',
                description:
                  'Maximum number of text snippets to retrieve from the Knowledge Graph for context. Works in concert with `search_weight` to control best matches vs broader coverage. While technically supports 1-60, values below 5 may return no results due to RAG implementation. Recommended range: 5-25. Due to RAG system behavior, you may see more snippets than requested. Range: 1-60, Default: 30.',
              },
              max_subquestions: {
                type: 'integer',
                description:
                  'Maximum number of subquestions to generate when processing complex queries. Set higher to improve detail, set lower to reduce response time. Range: 1-10, Default: 6.',
              },
              max_tokens: {
                type: 'integer',
                description:
                  "Maximum number of tokens the model can generate in the response. This controls the length of the AI's answer. Set higher for longer answers, set lower for shorter, faster answers. Range: 100-8000, Default: 4000.",
              },
              search_weight: {
                type: 'integer',
                description:
                  'Weight given to search results when ranking and selecting relevant information. Higher values (closer to 100) prioritize keyword-based matching, while lower values (closer to 0) prioritize semantic similarity matching. Use higher values for exact keyword searches, lower values for conceptual similarity searches. Range: 0-100, Default: 50.',
              },
              semantic_threshold: {
                type: 'number',
                description:
                  'Threshold for semantic similarity matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger semantic similarity, while lower values (closer to 0.0) allow more lenient semantic matching. Range: 0.0-1.0, Default: 0.7.',
              },
            },
          },
          subqueries: {
            type: 'boolean',
            description: 'Specify whether to include subqueries.',
          },
        },
        required: ['graph_ids', 'question', 'stream'],
      },
    ],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.graphs.question(body));
};

export default { metadata, tool, handler };
