// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'create_completions',
  description: 'Text generation',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            description: 'The identifier of the model to be used for processing the request.',
          },
          prompt: {
            type: 'string',
            description: 'The input text that the model will process to generate a response.',
          },
          best_of: {
            type: 'integer',
            description:
              'Specifies the number of completions to generate and return the best one. Useful for generating multiple outputs and choosing the best based on some criteria.',
          },
          max_tokens: {
            type: 'integer',
            description: 'The maximum number of tokens that the model can generate in the response.',
          },
          random_seed: {
            type: 'integer',
            description:
              'A seed used to initialize the random number generator for the model, ensuring reproducibility of the output when the same inputs are provided.',
          },
          stop: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description:
              "Specifies stopping conditions for the model's output generation. This can be an array of strings or a single string that the model will look for as a signal to stop generating further tokens.",
          },
          stream: {
            type: 'string',
            description:
              "Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.",
            enum: [false],
          },
          temperature: {
            type: 'number',
            description:
              "Controls the randomness of the model's outputs. Higher values lead to more random outputs, while lower values make the model more deterministic.",
          },
          top_p: {
            type: 'number',
            description:
              'Used to control the nucleus sampling, where only the most probable tokens with a cumulative probability of top_p are considered for sampling, providing a way to fine-tune the randomness of predictions.',
          },
        },
      },
      {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            description: 'The identifier of the model to be used for processing the request.',
          },
          prompt: {
            type: 'string',
            description: 'The input text that the model will process to generate a response.',
          },
          stream: {
            type: 'string',
            description:
              "Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.",
            enum: [true],
          },
          best_of: {
            type: 'integer',
            description:
              'Specifies the number of completions to generate and return the best one. Useful for generating multiple outputs and choosing the best based on some criteria.',
          },
          max_tokens: {
            type: 'integer',
            description: 'The maximum number of tokens that the model can generate in the response.',
          },
          random_seed: {
            type: 'integer',
            description:
              'A seed used to initialize the random number generator for the model, ensuring reproducibility of the output when the same inputs are provided.',
          },
          stop: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
            description:
              "Specifies stopping conditions for the model's output generation. This can be an array of strings or a single string that the model will look for as a signal to stop generating further tokens.",
          },
          temperature: {
            type: 'number',
            description:
              "Controls the randomness of the model's outputs. Higher values lead to more random outputs, while lower values make the model more deterministic.",
          },
          top_p: {
            type: 'number',
            description:
              'Used to control the nucleus sampling, where only the most probable tokens with a cumulative probability of top_p are considered for sampling, providing a way to fine-tune the randomness of predictions.',
          },
        },
      },
    ],
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.completions.create(body);
};

export default { tool, handler };
