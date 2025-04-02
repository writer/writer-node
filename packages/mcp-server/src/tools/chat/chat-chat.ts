// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'chat_chat',
  description:
    'Generate a chat completion based on the provided messages. The response shown below is for non-streaming. To learn about streaming responses, see the [chat completion guide](/api-guides/chat-completion).',
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          messages: {
            type: 'array',
            description:
              'An array of message objects that form the conversation history or context for the model to respond to. The array must contain at least one message.',
            items: {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                  description:
                    'The role of the chat message. You can provide a system prompt by setting the role to `system`, or specify that a message is the result of a [tool call](/api-guides/tool-calling) by setting the role to `tool`.',
                  enum: ['user', 'assistant', 'system', 'tool'],
                },
                content: {
                  type: 'string',
                },
                graph_data: {
                  type: 'object',
                  title: 'graph_data',
                  properties: {
                    sources: {
                      type: 'array',
                      items: {
                        type: 'object',
                        title: 'source',
                        properties: {
                          file_id: {
                            type: 'string',
                            description: 'The unique identifier of the file.',
                          },
                          snippet: {
                            type: 'string',
                            description: 'A snippet of text from the source file.',
                          },
                        },
                        required: ['file_id', 'snippet'],
                      },
                    },
                    status: {
                      type: 'string',
                      title: 'graph_stage_status',
                      enum: ['processing', 'finished'],
                    },
                    subqueries: {
                      type: 'array',
                      items: {
                        type: 'object',
                        title: 'sub_query',
                        properties: {
                          answer: {
                            type: 'string',
                            description: 'The answer to the subquery.',
                          },
                          query: {
                            type: 'string',
                            description: 'The subquery that was asked.',
                          },
                          sources: {
                            type: 'array',
                            items: {
                              $ref: '#/anyOf/0/properties/messages/items/graph_data/sources/items',
                            },
                          },
                        },
                        required: ['answer', 'query', 'sources'],
                      },
                    },
                  },
                  required: [],
                },
                name: {
                  type: 'string',
                },
                refusal: {
                  type: 'string',
                },
                tool_call_id: {
                  type: 'string',
                },
                tool_calls: {
                  type: 'array',
                  items: {
                    type: 'object',
                    title: 'tool_call',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      function: {
                        type: 'object',
                        title: 'function',
                        properties: {
                          arguments: {
                            type: 'string',
                          },
                          name: {
                            type: 'string',
                          },
                        },
                        required: ['arguments'],
                      },
                      type: {
                        type: 'string',
                        enum: ['function'],
                      },
                      index: {
                        type: 'integer',
                      },
                    },
                    required: ['id', 'function', 'type'],
                  },
                },
              },
              required: ['role'],
            },
          },
          model: {
            type: 'string',
            description:
              'Specifies the model to be used for generating responses. The chat model is always `palmyra-x-004` for conversational use.',
          },
          logprobs: {
            type: 'boolean',
            description: 'Specifies whether to return log probabilities of the output tokens.',
          },
          max_tokens: {
            type: 'integer',
            description:
              'Defines the maximum number of tokens (words and characters) that the model can generate in the response. The default value is set to 16, but it can be adjusted to allow for longer or shorter responses as needed.',
          },
          n: {
            type: 'integer',
            description:
              'Specifies the number of completions (responses) to generate from the model in a single request. This parameter allows multiple responses to be generated, offering a variety of potential replies from which to choose.',
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
              'A token or sequence of tokens that, when generated, will cause the model to stop producing further content. This can be a single token or an array of tokens, acting as a signal to end the output.',
          },
          stream: {
            type: 'string',
            description:
              'Indicates whether the response should be streamed incrementally as it is generated or only returned once fully complete. Streaming can be useful for providing real-time feedback in interactive applications.',
            enum: [false],
          },
          stream_options: {
            type: 'object',
            title: 'stream_options',
            description: 'Additional options for streaming.',
            properties: {
              include_usage: {
                type: 'boolean',
                description: 'Indicate whether to include usage information.',
              },
            },
            required: ['include_usage'],
          },
          temperature: {
            type: 'number',
            description:
              "Controls the randomness or creativity of the model's responses. A higher temperature results in more varied and less predictable text, while a lower temperature produces more deterministic and conservative outputs.",
          },
          tool_choice: {
            anyOf: [
              {
                type: 'object',
                title: 'String',
                properties: {
                  value: {
                    type: 'string',
                    title: 'string_tool_choice_options',
                    enum: ['none', 'auto', 'required'],
                  },
                },
                required: ['value'],
              },
              {
                type: 'object',
                title: 'JSON object',
                properties: {
                  value: {
                    type: 'object',
                  },
                },
                required: ['value'],
              },
            ],
            description:
              'Configure how the model will call functions: `auto` will allow the model to automatically choose the best tool, `none` disables tool calling. You can also pass a specific previously defined function.',
          },
          tools: {
            type: 'array',
            description:
              'An array containing tool definitions for tools that the model can use to generate responses. The tool definitions use JSON schema. You can define your own functions or use one of the built-in `graph`, `llm`, or `vision` tools. Note that you can only use one built-in tool type in the array (only one of `graph`, `llm`, or `vision`).',
            items: {
              anyOf: [
                {
                  type: 'object',
                  title: 'Function tool',
                  properties: {
                    function: {
                      type: 'object',
                      title: 'tool_function',
                      description: 'A tool that uses a custom function.',
                      properties: {
                        name: {
                          type: 'string',
                          description: 'Name of the function.',
                        },
                        description: {
                          type: 'string',
                          description: 'Description of the function.',
                        },
                        parameters: {
                          type: 'object',
                          description: 'The parameters of the function.',
                        },
                      },
                      required: ['name'],
                    },
                    type: {
                      type: 'string',
                      description: 'The type of tool.',
                      enum: ['function'],
                    },
                  },
                  required: ['function', 'type'],
                },
                {
                  type: 'object',
                  title: 'Graph tool',
                  properties: {
                    function: {
                      type: 'object',
                      title: 'graph_function',
                      description: 'A tool that uses Knowledge Graphs as context for responses.',
                      properties: {
                        graph_ids: {
                          type: 'array',
                          description: 'An array of graph IDs to be used in the tool.',
                          items: {
                            type: 'string',
                          },
                        },
                        subqueries: {
                          type: 'boolean',
                          description: 'Boolean to indicate whether to include subqueries in the response.',
                        },
                        description: {
                          type: 'string',
                          description: 'A description of the graph content.',
                        },
                      },
                      required: ['graph_ids', 'subqueries'],
                    },
                    type: {
                      type: 'string',
                      description: 'The type of tool.',
                      enum: ['graph'],
                    },
                  },
                  required: ['function', 'type'],
                },
                {
                  type: 'object',
                  title: 'LLM tool',
                  properties: {
                    function: {
                      type: 'object',
                      title: 'LLM function',
                      description: 'A tool that uses another Writer model to generate a response.',
                      properties: {
                        description: {
                          type: 'string',
                          description: 'A description of the model to be used.',
                        },
                        model: {
                          type: 'string',
                          description: 'The model to be used.',
                        },
                      },
                      required: ['description', 'model'],
                    },
                    type: {
                      type: 'string',
                      description: 'The type of tool.',
                      enum: ['llm'],
                    },
                  },
                  required: ['function', 'type'],
                },
                {
                  type: 'object',
                  title: 'Vision tool',
                  properties: {
                    function: {
                      type: 'object',
                      title: 'Vision function',
                      description: 'A tool that uses Palmyra Vision to analyze images.',
                      properties: {
                        model: {
                          type: 'string',
                          description: 'The model to be used for image analysis. Must be `palmyra-vision`.',
                        },
                        variables: {
                          type: 'array',
                          items: {
                            type: 'object',
                            title: 'Vision Tool Request File Variable',
                            properties: {
                              file_id: {
                                type: 'string',
                                description:
                                  'The File ID of the image to be analyzed. The file must be uploaded to the Writer platform before you use it with the Vision tool.',
                              },
                              name: {
                                type: 'string',
                                description:
                                  'The name of the file variable. You must reference this name in the `message.content` field of the request to the chat completions endpoint. Use double curly braces (`{{}}`) to reference the file. For example, `Describe the difference between the image {{image_1}} and the image {{image_2}}`.',
                              },
                            },
                            required: ['file_id', 'name'],
                          },
                        },
                      },
                      required: ['model', 'variables'],
                    },
                    type: {
                      type: 'string',
                      description: 'The type of tool.',
                      enum: ['vision'],
                    },
                  },
                  required: ['function', 'type'],
                },
              ],
            },
          },
          top_p: {
            type: 'number',
            description:
              'Sets the threshold for "nucleus sampling," a technique to focus the model\'s token generation on the most likely subset of tokens. Only tokens with cumulative probability above this threshold are considered, controlling the trade-off between creativity and coherence.',
          },
        },
      },
      {
        type: 'object',
        properties: {
          messages: {
            type: 'array',
            description:
              'An array of message objects that form the conversation history or context for the model to respond to. The array must contain at least one message.',
            items: {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                  description:
                    'The role of the chat message. You can provide a system prompt by setting the role to `system`, or specify that a message is the result of a [tool call](/api-guides/tool-calling) by setting the role to `tool`.',
                  enum: ['user', 'assistant', 'system', 'tool'],
                },
                content: {
                  type: 'string',
                },
                graph_data: {
                  $ref: '#/anyOf/0/properties/messages/items/graph_data',
                },
                name: {
                  type: 'string',
                },
                refusal: {
                  type: 'string',
                },
                tool_call_id: {
                  type: 'string',
                },
                tool_calls: {
                  type: 'array',
                  items: {
                    $ref: '#/anyOf/0/properties/messages/items/tool_calls/items',
                  },
                },
              },
              required: ['role'],
            },
          },
          model: {
            type: 'string',
            description:
              'Specifies the model to be used for generating responses. The chat model is always `palmyra-x-004` for conversational use.',
          },
          stream: {
            type: 'string',
            description:
              'Indicates whether the response should be streamed incrementally as it is generated or only returned once fully complete. Streaming can be useful for providing real-time feedback in interactive applications.',
            enum: [true],
          },
          logprobs: {
            type: 'boolean',
            description: 'Specifies whether to return log probabilities of the output tokens.',
          },
          max_tokens: {
            type: 'integer',
            description:
              'Defines the maximum number of tokens (words and characters) that the model can generate in the response. The default value is set to 16, but it can be adjusted to allow for longer or shorter responses as needed.',
          },
          n: {
            type: 'integer',
            description:
              'Specifies the number of completions (responses) to generate from the model in a single request. This parameter allows multiple responses to be generated, offering a variety of potential replies from which to choose.',
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
              'A token or sequence of tokens that, when generated, will cause the model to stop producing further content. This can be a single token or an array of tokens, acting as a signal to end the output.',
          },
          stream_options: {
            type: 'object',
            title: 'stream_options',
            description: 'Additional options for streaming.',
            properties: {
              include_usage: {
                type: 'boolean',
                description: 'Indicate whether to include usage information.',
              },
            },
            required: ['include_usage'],
          },
          temperature: {
            type: 'number',
            description:
              "Controls the randomness or creativity of the model's responses. A higher temperature results in more varied and less predictable text, while a lower temperature produces more deterministic and conservative outputs.",
          },
          tool_choice: {
            anyOf: [
              {
                $ref: '#/anyOf/0/properties/tool_choice/anyOf/0',
              },
              {
                $ref: '#/anyOf/0/properties/tool_choice/anyOf/1',
              },
            ],
            description:
              'Configure how the model will call functions: `auto` will allow the model to automatically choose the best tool, `none` disables tool calling. You can also pass a specific previously defined function.',
          },
          tools: {
            type: 'array',
            description:
              'An array containing tool definitions for tools that the model can use to generate responses. The tool definitions use JSON schema. You can define your own functions or use one of the built-in `graph`, `llm`, or `vision` tools. Note that you can only use one built-in tool type in the array (only one of `graph`, `llm`, or `vision`).',
            items: {
              $ref: '#/anyOf/0/properties/tools/items',
            },
          },
          top_p: {
            type: 'number',
            description:
              'Sets the threshold for "nucleus sampling," a technique to focus the model\'s token generation on the most likely subset of tokens. Only tokens with cumulative probability above this threshold are considered, controlling the trade-off between creativity and coherence.',
          },
        },
      },
    ],
  },
};

export const handler = (client: Writer, args: any) => {
  const { ...body } = args;
  return client.chat.chat(body);
};

export default { tool, handler };
