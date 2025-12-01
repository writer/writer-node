// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'chat',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/chat',
  operationId: 'chat',
};

export const tool: Tool = {
  name: 'chat_chat',
  description:
    'Generate AI responses for conversational interactions. Use this for chat-based tasks, Q&A, content generation, and any natural language processing. Supports tools like Knowledge Graphs, web search, translation, and vision. Choose from models like palmyra-x5, palmyra-x4, palmyra-creative, palmyra-med, or palmyra-fin depending on the task.',
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
              title: 'chat_message',
              properties: {
                role: {
                  type: 'string',
                  description:
                    'The role of the chat message. You can provide a system prompt by setting the role to `system`, or specify that a message is the result of a [tool call](https://dev.writer.com/home/tool-calling) by setting the role to `tool`.',
                  enum: ['user', 'assistant', 'system', 'tool'],
                },
                content: {
                  anyOf: [
                    {
                      type: 'string',
                      title: 'TextContent',
                    },
                    {
                      type: 'array',
                      title: 'MixedContent',
                      items: {
                        anyOf: [
                          {
                            type: 'object',
                            title: 'Text',
                            description: 'Represents a text content fragment within a chat message.',
                            properties: {
                              text: {
                                type: 'string',
                                description: 'The actual text content of the message fragment.',
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of content fragment. Must be `text` for text fragments.',
                                enum: ['text'],
                              },
                            },
                            required: ['text', 'type'],
                          },
                          {
                            type: 'object',
                            title: 'Image',
                            description:
                              'Represents an image content fragment within a chat message. Note: This content type is only supported with the Palmyra X5 model.',
                            properties: {
                              image_url: {
                                type: 'object',
                                description: 'The image URL object containing the location of the image.',
                                properties: {
                                  url: {
                                    type: 'string',
                                    description:
                                      'The URL pointing to the image file. Supports common image formats like JPEG, PNG, GIF, etc.',
                                  },
                                },
                                required: ['url'],
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of content fragment. Must be `image_url` for image fragments.',
                                enum: ['image_url'],
                              },
                            },
                            required: ['image_url', 'type'],
                          },
                        ],
                        title: 'composite_content',
                        description:
                          'A union type that can contain either text or image content fragments. This enables chat messages to include mixed content types, allowing users to send both text and images in a single message. Note: Image fragments are only supported with the Palmyra X5 model.',
                      },
                    },
                  ],
                  description:
                    'The content of the message. Can be either a string (for text-only messages) or an array of content fragments (for mixed text and image messages).',
                },
                graph_data: {
                  $ref: '#/$defs/graph_data',
                },
                name: {
                  type: 'string',
                  description:
                    'An optional name for the message sender. Useful for identifying different users, personas, or tools in multi-participant conversations.',
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
                    $ref: '#/$defs/tool_call',
                  },
                },
              },
              required: ['role'],
            },
          },
          model: {
            type: 'string',
            description:
              'The [ID of the model](https://dev.writer.com/home/models) to use for creating the chat completion. Supports `palmyra-x5`, `palmyra-x4`, `palmyra-fin`, `palmyra-med`, `palmyra-creative`, and `palmyra-x-003-instruct`.',
          },
          logprobs: {
            type: 'boolean',
            description: 'Specifies whether to return log probabilities of the output tokens.',
          },
          max_tokens: {
            type: 'integer',
            description:
              'Defines the maximum number of tokens (words and characters) that the model can generate in the response. This can be adjusted to allow for longer or shorter responses as needed. The maximum value varies by model. See the [models overview](/home/models) for more information about the maximum number of tokens for each model.',
          },
          n: {
            type: 'integer',
            description:
              'Specifies the number of completions (responses) to generate from the model in a single request. This parameter allows for generating multiple responses, offering a variety of potential replies from which to choose.',
          },
          response_format: {
            type: 'object',
            title: 'response_format',
            description:
              'The response format to use for the chat completion, available with `palmyra-x4` and `palmyra-x5`.\n\n`text` is the default response format. [JSON Schema](https://json-schema.org/) is supported for structured responses. If you specify `json_schema`, you must also provide a `json_schema` object.',
            properties: {
              type: {
                type: 'string',
                description: 'The type of response format to use.',
                enum: ['text', 'json_schema'],
              },
              json_schema: {
                type: 'object',
                description: 'The JSON schema to use for the response format.',
                additionalProperties: true,
              },
            },
            required: ['type'],
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
                $ref: '#/$defs/tool_choice_string',
              },
              {
                $ref: '#/$defs/tool_choice_json_object',
              },
            ],
            description:
              'Configure how the model will call functions:\n- `auto`: allows the model to automatically choose the tool to use, or not call a tool\n- `none`: disables tool calling; the model will instead generate a message\n- `required`: requires the model to call one or more tools\n\nYou can also use a JSON object to force the model to call a specific tool. For example, `{"type": "function", "function": {"name": "get_current_weather"}}` requires the model to call the `get_current_weather` function, regardless of the prompt.',
          },
          tools: {
            type: 'array',
            description:
              'An array containing tool definitions for tools that the model can use to generate responses. The tool definitions use JSON schema. You can define your own functions or use one of the built-in `graph`, `llm`, `translation`, or `vision` tools. Note that you can only use one built-in tool type in the array (only one of `graph`, `llm`, `translation`, or `vision`). You can pass multiple [custom tools](https://dev.writer.com/home/tool-calling) of type `function` in the same request.',
            items: {
              $ref: '#/$defs/tool_param',
            },
          },
          top_p: {
            type: 'number',
            description:
              'Sets the threshold for "nucleus sampling," a technique to focus the model\'s token generation on the most likely subset of tokens. Only tokens with cumulative probability above this threshold are considered, controlling the trade-off between creativity and coherence.',
          },
        },
        required: ['messages', 'model'],
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
              title: 'chat_message',
              properties: {
                role: {
                  type: 'string',
                  description:
                    'The role of the chat message. You can provide a system prompt by setting the role to `system`, or specify that a message is the result of a [tool call](https://dev.writer.com/home/tool-calling) by setting the role to `tool`.',
                  enum: ['user', 'assistant', 'system', 'tool'],
                },
                content: {
                  anyOf: [
                    {
                      type: 'string',
                      title: 'TextContent',
                    },
                    {
                      type: 'array',
                      title: 'MixedContent',
                      items: {
                        anyOf: [
                          {
                            type: 'object',
                            title: 'Text',
                            description: 'Represents a text content fragment within a chat message.',
                            properties: {
                              text: {
                                type: 'string',
                                description: 'The actual text content of the message fragment.',
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of content fragment. Must be `text` for text fragments.',
                                enum: ['text'],
                              },
                            },
                            required: ['text', 'type'],
                          },
                          {
                            type: 'object',
                            title: 'Image',
                            description:
                              'Represents an image content fragment within a chat message. Note: This content type is only supported with the Palmyra X5 model.',
                            properties: {
                              image_url: {
                                type: 'object',
                                description: 'The image URL object containing the location of the image.',
                                properties: {
                                  url: {
                                    type: 'string',
                                    description:
                                      'The URL pointing to the image file. Supports common image formats like JPEG, PNG, GIF, etc.',
                                  },
                                },
                                required: ['url'],
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of content fragment. Must be `image_url` for image fragments.',
                                enum: ['image_url'],
                              },
                            },
                            required: ['image_url', 'type'],
                          },
                        ],
                        title: 'composite_content',
                        description:
                          'A union type that can contain either text or image content fragments. This enables chat messages to include mixed content types, allowing users to send both text and images in a single message. Note: Image fragments are only supported with the Palmyra X5 model.',
                      },
                    },
                  ],
                  description:
                    'The content of the message. Can be either a string (for text-only messages) or an array of content fragments (for mixed text and image messages).',
                },
                graph_data: {
                  $ref: '#/$defs/graph_data',
                },
                name: {
                  type: 'string',
                  description:
                    'An optional name for the message sender. Useful for identifying different users, personas, or tools in multi-participant conversations.',
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
                    $ref: '#/$defs/tool_call',
                  },
                },
              },
              required: ['role'],
            },
          },
          model: {
            type: 'string',
            description:
              'The [ID of the model](https://dev.writer.com/home/models) to use for creating the chat completion. Supports `palmyra-x5`, `palmyra-x4`, `palmyra-fin`, `palmyra-med`, `palmyra-creative`, and `palmyra-x-003-instruct`.',
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
              'Defines the maximum number of tokens (words and characters) that the model can generate in the response. This can be adjusted to allow for longer or shorter responses as needed. The maximum value varies by model. See the [models overview](/home/models) for more information about the maximum number of tokens for each model.',
          },
          n: {
            type: 'integer',
            description:
              'Specifies the number of completions (responses) to generate from the model in a single request. This parameter allows for generating multiple responses, offering a variety of potential replies from which to choose.',
          },
          response_format: {
            type: 'object',
            title: 'response_format',
            description:
              'The response format to use for the chat completion, available with `palmyra-x4` and `palmyra-x5`.\n\n`text` is the default response format. [JSON Schema](https://json-schema.org/) is supported for structured responses. If you specify `json_schema`, you must also provide a `json_schema` object.',
            properties: {
              type: {
                type: 'string',
                description: 'The type of response format to use.',
                enum: ['text', 'json_schema'],
              },
              json_schema: {
                type: 'object',
                description: 'The JSON schema to use for the response format.',
                additionalProperties: true,
              },
            },
            required: ['type'],
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
                $ref: '#/$defs/tool_choice_string',
              },
              {
                $ref: '#/$defs/tool_choice_json_object',
              },
            ],
            description:
              'Configure how the model will call functions:\n- `auto`: allows the model to automatically choose the tool to use, or not call a tool\n- `none`: disables tool calling; the model will instead generate a message\n- `required`: requires the model to call one or more tools\n\nYou can also use a JSON object to force the model to call a specific tool. For example, `{"type": "function", "function": {"name": "get_current_weather"}}` requires the model to call the `get_current_weather` function, regardless of the prompt.',
          },
          tools: {
            type: 'array',
            description:
              'An array containing tool definitions for tools that the model can use to generate responses. The tool definitions use JSON schema. You can define your own functions or use one of the built-in `graph`, `llm`, `translation`, or `vision` tools. Note that you can only use one built-in tool type in the array (only one of `graph`, `llm`, `translation`, or `vision`). You can pass multiple [custom tools](https://dev.writer.com/home/tool-calling) of type `function` in the same request.',
            items: {
              $ref: '#/$defs/tool_param',
            },
          },
          top_p: {
            type: 'number',
            description:
              'Sets the threshold for "nucleus sampling," a technique to focus the model\'s token generation on the most likely subset of tokens. Only tokens with cumulative probability above this threshold are considered, controlling the trade-off between creativity and coherence.',
          },
        },
        required: ['messages', 'model', 'stream'],
      },
    ],
    $defs: {
      graph_data: {
        type: 'object',
        title: 'graph_data',
        properties: {
          references: {
            type: 'object',
            title: 'references',
            description:
              'Detailed source information organized by reference type, providing comprehensive metadata about the sources used to generate the response.',
            properties: {
              files: {
                type: 'array',
                description: 'Array of file-based references from uploaded documents in the Knowledge Graph.',
                items: {
                  type: 'object',
                  title: 'file',
                  description:
                    'A file-based reference containing text snippets from uploaded documents in the Knowledge Graph.',
                  properties: {
                    fileId: {
                      type: 'string',
                      description: 'The unique identifier of the file in your Writer account.',
                    },
                    score: {
                      type: 'number',
                      description:
                        'Internal score used during the retrieval process for ranking and selecting relevant snippets.',
                    },
                    text: {
                      type: 'string',
                      description:
                        'The exact text snippet from the source document that was used to support the response.',
                    },
                    cite: {
                      type: 'string',
                      description:
                        'Unique citation ID that appears in inline citations within the response text (null if not cited).',
                    },
                    page: {
                      type: 'integer',
                      description: 'Page number where this snippet was found in the source document.',
                    },
                  },
                  required: ['fileId', 'score', 'text'],
                },
              },
              web: {
                type: 'array',
                description: 'Array of web-based references from online sources accessed during the query.',
                items: {
                  type: 'object',
                  title: 'web',
                  description:
                    'A web-based reference containing text snippets from online sources accessed during the query.',
                  properties: {
                    score: {
                      type: 'number',
                      description:
                        'Internal score used during the retrieval process for ranking and selecting relevant snippets.',
                    },
                    text: {
                      type: 'string',
                      description:
                        'The exact text snippet from the web source that was used to support the response.',
                    },
                    title: {
                      type: 'string',
                      description: 'The title of the web page where this content was found.',
                    },
                    url: {
                      type: 'string',
                      description: 'The URL of the web page where this content was found.',
                    },
                  },
                  required: ['score', 'text', 'title', 'url'],
                },
              },
            },
          },
          sources: {
            type: 'array',
            items: {
              $ref: '#/$defs/source',
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
              description:
                'A sub-question generated to break down complex queries into more manageable parts, along with its answer and supporting sources.',
              properties: {
                answer: {
                  type: 'string',
                  description: 'The answer to the subquery based on Knowledge Graph content.',
                },
                query: {
                  type: 'string',
                  description: 'The subquery that was generated to help answer the main question.',
                },
                sources: {
                  type: 'array',
                  description: 'Array of source snippets that were used to answer this subquery.',
                  items: {
                    $ref: '#/$defs/source',
                  },
                },
              },
              required: ['answer', 'query', 'sources'],
            },
          },
        },
      },
      source: {
        type: 'object',
        title: 'source',
        description: 'A source snippet containing text and fileId from Knowledge Graph content.',
        properties: {
          file_id: {
            type: 'string',
            description: 'The unique identifier of the file in your Writer account.',
          },
          snippet: {
            type: 'string',
            description:
              'The exact text snippet from the source document that was used to support the response.',
          },
        },
        required: ['file_id', 'snippet'],
      },
      tool_call: {
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
      tool_choice_string: {
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
      tool_choice_json_object: {
        type: 'object',
        title: 'JSON object',
        properties: {
          value: {
            type: 'object',
            description:
              'A JSON object that specifies the tool to call. For example, `{"type": "function", "function": {"name": "get_current_weather"}}`',
            additionalProperties: true,
          },
        },
        required: ['value'],
      },
      tool_param: {
        anyOf: [
          {
            type: 'object',
            title: 'Function tool',
            properties: {
              function: {
                $ref: '#/$defs/function_definition',
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
                    description: 'An array of graph IDs to use in the tool.',
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
                    description: 'A description of the model to use.',
                  },
                  model: {
                    type: 'string',
                    description: 'The model to use.',
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
            title: 'Translation tool',
            description:
              'A tool that uses Palmyra Translate to translate text. Note that this tool does not stream results. The response is returned after the translation is complete.',
            properties: {
              function: {
                type: 'object',
                title: 'Translation function',
                description: 'A tool that uses Palmyra Translate to translate text.',
                properties: {
                  formality: {
                    type: 'boolean',
                    description:
                      'Whether to use formal or informal language in the translation. See the [list of languages that support formality](https://dev.writer.com/api-reference/translation-api/language-support#formality). If the language does not support formality, this parameter is ignored.',
                  },
                  length_control: {
                    type: 'boolean',
                    description:
                      'Whether to control the length of the translated text. See the [list of languages that support length control](https://dev.writer.com/api-reference/translation-api/language-support#length-control). If the language does not support length control, this parameter is ignored.',
                  },
                  mask_profanity: {
                    type: 'boolean',
                    description:
                      'Whether to mask profane words in the translated text. See the [list of languages that do not support profanity masking](https://dev.writer.com/api-reference/translation-api/language-support#profanity-masking). If the language does not support profanity masking, this parameter is ignored.',
                  },
                  model: {
                    type: 'string',
                    description: 'The model to use for translation.',
                    enum: ['palmyra-translate'],
                  },
                  source_language_code: {
                    type: 'string',
                    description:
                      'Optional. The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code of the original text to translate. For example, `en` for English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a variant, the code appends the two-digit [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). If you do not provide a language code, the LLM detects the language of the text.',
                  },
                  target_language_code: {
                    type: 'string',
                    description:
                      'Optional. The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code of the target language for the translation. For example, `en` for English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a variant, the code appends the two-digit [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). If you do not provide a language code, the LLM uses the content of the chat message to determine the target language.',
                  },
                },
                required: ['formality', 'length_control', 'mask_profanity', 'model'],
              },
              type: {
                type: 'string',
                description: 'The type of tool.',
                enum: ['translation'],
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
                description:
                  'A tool that uses Palmyra Vision to analyze images and documents. Supports JPG, PNG, PDF, and TXT files up to 7MB each.',
                properties: {
                  model: {
                    type: 'string',
                    description: 'The model to use for image analysis.',
                    enum: ['palmyra-vision'],
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
                            'The File ID of the file to analyze. The file must be uploaded to the Writer platform before you use it with the Vision tool. Supported file types: JPG, PNG, PDF, TXT. The maximum allowed file size is 7MB.',
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
          {
            type: 'object',
            title: 'Web search tool',
            properties: {
              function: {
                type: 'object',
                title: 'web_search_function',
                description: 'A tool that uses web search to find information.',
                properties: {
                  exclude_domains: {
                    type: 'array',
                    description: 'An array of domains to exclude from the search results.',
                    items: {
                      type: 'string',
                    },
                  },
                  include_domains: {
                    type: 'array',
                    description: 'An array of domains to include in the search results.',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['exclude_domains', 'include_domains'],
              },
              type: {
                type: 'string',
                description: 'The type of tool.',
                enum: ['web_search'],
              },
            },
            required: ['function', 'type'],
          },
        ],
        description:
          'A tool that uses Palmyra Translate to translate text. Note that this tool does not stream results. The response is returned after the translation is complete.',
      },
      function_definition: {
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
            $ref: '#/$defs/function_params',
          },
        },
        required: ['name'],
      },
      function_params: {
        type: 'object',
        description: 'The parameters of the function.',
        additionalProperties: true,
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.chat.chat(body));
  } catch (error) {
    if (error instanceof Writer.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
