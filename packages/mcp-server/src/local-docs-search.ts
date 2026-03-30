// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/v1/applications/{application_id}',
    httpMethod: 'get',
    summary: 'Application details',
    description:
      'Retrieves detailed information for a specific no-code agent (formerly called no-code applications), including its configuration and current status.',
    stainlessPath: '(resource) applications > (method) retrieve',
    qualified: 'client.applications.retrieve',
    params: ['application_id: string;'],
    response:
      "{ id: string; created_at: string; inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }",
    markdown:
      "## retrieve\n\n`client.applications.retrieve(application_id: string): { id: string; created_at: string; inputs: object[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }`\n\n**get** `/v1/applications/{application_id}`\n\nRetrieves detailed information for a specific no-code agent (formerly called no-code applications), including its configuration and current status.\n\n### Parameters\n\n- `application_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }`\n  Detailed application object including its input configuration.\n\n  - `id: string`\n  - `created_at: string`\n  - `inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]`\n  - `name: string`\n  - `status: 'deployed' | 'draft'`\n  - `type: 'generation'`\n  - `updated_at: string`\n  - `last_deployed_at?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst application = await client.applications.retrieve('application_id');\n\nconsole.log(application);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/applications',
    httpMethod: 'get',
    summary: 'List applications',
    description:
      'Retrieves a paginated list of no-code agents (formerly called no-code applications) with optional filtering and sorting capabilities.',
    stainlessPath: '(resource) applications > (method) list',
    qualified: 'client.applications.list',
    params: [
      'after?: string;',
      'before?: string;',
      'limit?: number;',
      "order?: 'asc' | 'desc';",
      "type?: 'generation';",
    ],
    response:
      "{ id: string; created_at: string; inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }",
    markdown:
      "## list\n\n`client.applications.list(after?: string, before?: string, limit?: number, order?: 'asc' | 'desc', type?: 'generation'): { id: string; created_at: string; inputs: object[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }`\n\n**get** `/v1/applications`\n\nRetrieves a paginated list of no-code agents (formerly called no-code applications) with optional filtering and sorting capabilities.\n\n### Parameters\n\n- `after?: string`\n  Return results after this application ID for pagination.\n\n- `before?: string`\n  Return results before this application ID for pagination.\n\n- `limit?: number`\n  Maximum number of applications to return in the response.\n\n- `order?: 'asc' | 'desc'`\n  Sort order for the results based on creation time.\n\n- `type?: 'generation'`\n  Filter applications by their type.\n\n### Returns\n\n- `{ id: string; created_at: string; inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]; name: string; status: 'deployed' | 'draft'; type: 'generation'; updated_at: string; last_deployed_at?: string; }`\n  Detailed application object including its input configuration.\n\n  - `id: string`\n  - `created_at: string`\n  - `inputs: { input_type: 'text' | 'dropdown' | 'file' | 'media'; name: string; required: boolean; description?: string; options?: { list: string[]; } | { file_types: string[]; max_file_size_mb: number; max_files: number; max_word_count: number; upload_types: 'url' | 'file_id'[]; } | { file_types: string[]; max_image_size_mb: number; } | { max_fields: number; min_fields: number; }; }[]`\n  - `name: string`\n  - `status: 'deployed' | 'draft'`\n  - `type: 'generation'`\n  - `updated_at: string`\n  - `last_deployed_at?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\n// Automatically fetches more pages as needed.\nfor await (const applicationListResponse of client.applications.list()) {\n  console.log(applicationListResponse);\n}\n```",
  },
  {
    name: 'generate_content',
    endpoint: '/v1/applications/{application_id}',
    httpMethod: 'post',
    summary: 'Generate from application',
    description:
      'Generate content from an existing no-code agent (formerly called no-code applications) with inputs.',
    stainlessPath: '(resource) applications > (method) generate_content',
    qualified: 'client.applications.generateContent',
    params: ['application_id: string;', 'inputs: { id: string; value: string[]; }[];', 'stream?: boolean;'],
    response: '{ suggestion: string; title?: string; }',
    markdown:
      "## generate_content\n\n`client.applications.generateContent(application_id: string, inputs: { id: string; value: string[]; }[], stream?: boolean): { suggestion: string; title?: string; }`\n\n**post** `/v1/applications/{application_id}`\n\nGenerate content from an existing no-code agent (formerly called no-code applications) with inputs.\n\n### Parameters\n\n- `application_id: string`\n\n- `inputs: { id: string; value: string[]; }[]`\n\n- `stream?: boolean`\n  Indicates whether the response should be streamed. Currently only supported for research assistant applications.\n\n### Returns\n\n- `{ suggestion: string; title?: string; }`\n\n  - `suggestion: string`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst stream = await client.applications.generateContent('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { inputs: [{ id: 'id', value: ['string'] }] });\nfor await (const applicationGenerateContentChunk of stream) {\n  console.log(applicationGenerateContentChunk);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/applications/{application_id}/jobs',
    httpMethod: 'post',
    summary: 'Generate from application (async)',
    description:
      'Generate content asynchronously from an existing no-code agent (formerly called no-code applications) with inputs.',
    stainlessPath: '(resource) applications.jobs > (method) create',
    qualified: 'client.applications.jobs.create',
    params: ['application_id: string;', 'inputs: { id: string; value: string[]; }[];'],
    response: "{ id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }",
    markdown:
      "## create\n\n`client.applications.jobs.create(application_id: string, inputs: { id: string; value: string[]; }[]): { id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }`\n\n**post** `/v1/applications/{application_id}/jobs`\n\nGenerate content asynchronously from an existing no-code agent (formerly called no-code applications) with inputs.\n\n### Parameters\n\n- `application_id: string`\n\n- `inputs: { id: string; value: string[]; }[]`\n  A list of input objects to generate content for.\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'in_progress' | 'failed' | 'completed'`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst job = await client.applications.jobs.create('application_id', { inputs: [{ id: 'id', value: ['string'] }] });\n\nconsole.log(job);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/applications/jobs/{job_id}',
    httpMethod: 'get',
    summary: 'Retrieve a single job',
    description: 'Retrieves a single job created via the Async API.',
    stainlessPath: '(resource) applications.jobs > (method) retrieve',
    qualified: 'client.applications.jobs.retrieve',
    params: ['job_id: string;'],
    response:
      "{ id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: { suggestion: string; title?: string; }; error?: string; updated_at?: string; }",
    markdown:
      "## retrieve\n\n`client.applications.jobs.retrieve(job_id: string): { id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: application_generate_content_response; error?: string; updated_at?: string; }`\n\n**get** `/v1/applications/jobs/{job_id}`\n\nRetrieves a single job created via the Async API.\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `{ id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: { suggestion: string; title?: string; }; error?: string; updated_at?: string; }`\n\n  - `id: string`\n  - `application_id: string`\n  - `created_at: string`\n  - `status: 'in_progress' | 'failed' | 'completed'`\n  - `completed_at?: string`\n  - `data?: { suggestion: string; title?: string; }`\n  - `error?: string`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst applicationGenerateAsyncResponse = await client.applications.jobs.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(applicationGenerateAsyncResponse);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/applications/{application_id}/jobs',
    httpMethod: 'get',
    summary: 'Retrieve all jobs',
    description:
      'Retrieve all jobs created via the async API, linked to the provided application ID (or alias).',
    stainlessPath: '(resource) applications.jobs > (method) list',
    qualified: 'client.applications.jobs.list',
    params: [
      'application_id: string;',
      'limit?: number;',
      'offset?: number;',
      "status?: 'in_progress' | 'failed' | 'completed';",
    ],
    response:
      "{ id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: { suggestion: string; title?: string; }; error?: string; updated_at?: string; }",
    markdown:
      "## list\n\n`client.applications.jobs.list(application_id: string, limit?: number, offset?: number, status?: 'in_progress' | 'failed' | 'completed'): { id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: application_generate_content_response; error?: string; updated_at?: string; }`\n\n**get** `/v1/applications/{application_id}/jobs`\n\nRetrieve all jobs created via the async API, linked to the provided application ID (or alias).\n\n### Parameters\n\n- `application_id: string`\n\n- `limit?: number`\n  The pagination limit for retrieving the jobs.\n\n- `offset?: number`\n  The pagination offset for retrieving the jobs.\n\n- `status?: 'in_progress' | 'failed' | 'completed'`\n  The status of the job.\n\n### Returns\n\n- `{ id: string; application_id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; completed_at?: string; data?: { suggestion: string; title?: string; }; error?: string; updated_at?: string; }`\n\n  - `id: string`\n  - `application_id: string`\n  - `created_at: string`\n  - `status: 'in_progress' | 'failed' | 'completed'`\n  - `completed_at?: string`\n  - `data?: { suggestion: string; title?: string; }`\n  - `error?: string`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\n// Automatically fetches more pages as needed.\nfor await (const applicationGenerateAsyncResponse of client.applications.jobs.list('application_id')) {\n  console.log(applicationGenerateAsyncResponse);\n}\n```",
  },
  {
    name: 'retry',
    endpoint: '/v1/applications/jobs/{job_id}/retry',
    httpMethod: 'post',
    summary: 'Retry job execution',
    description:
      'Re-triggers the async execution of a single job previously created via the Async api and terminated in error.',
    stainlessPath: '(resource) applications.jobs > (method) retry',
    qualified: 'client.applications.jobs.retry',
    params: ['job_id: string;'],
    response: "{ id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }",
    markdown:
      "## retry\n\n`client.applications.jobs.retry(job_id: string): { id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }`\n\n**post** `/v1/applications/jobs/{job_id}/retry`\n\nRe-triggers the async execution of a single job previously created via the Async api and terminated in error.\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; status: 'in_progress' | 'failed' | 'completed'; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `status: 'in_progress' | 'failed' | 'completed'`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.applications.jobs.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/applications/{application_id}/graphs',
    httpMethod: 'put',
    summary: 'Associate graphs',
    description: 'Updates the list of Knowledge Graphs associated with a no-code chat agent.',
    stainlessPath: '(resource) applications.graphs > (method) update',
    qualified: 'client.applications.graphs.update',
    params: ['application_id: string;', 'graph_ids: string[];'],
    response: '{ graph_ids: string[]; }',
    markdown:
      "## update\n\n`client.applications.graphs.update(application_id: string, graph_ids: string[]): { graph_ids: string[]; }`\n\n**put** `/v1/applications/{application_id}/graphs`\n\nUpdates the list of Knowledge Graphs associated with a no-code chat agent.\n\n### Parameters\n\n- `application_id: string`\n\n- `graph_ids: string[]`\n  A list of Knowledge Graph IDs to associate with the application. Note that this will replace the existing list of Knowledge Graphs associated with the application, not add to it.\n\n### Returns\n\n- `{ graph_ids: string[]; }`\n\n  - `graph_ids: string[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst applicationGraphsResponse = await client.applications.graphs.update('application_id', { graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(applicationGraphsResponse);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/applications/{application_id}/graphs',
    httpMethod: 'get',
    summary: 'Retrieve graphs',
    description: 'Retrieve Knowledge Graphs associated with a no-code agent that has chat capabilities.',
    stainlessPath: '(resource) applications.graphs > (method) list',
    qualified: 'client.applications.graphs.list',
    params: ['application_id: string;'],
    response: '{ graph_ids: string[]; }',
    markdown:
      "## list\n\n`client.applications.graphs.list(application_id: string): { graph_ids: string[]; }`\n\n**get** `/v1/applications/{application_id}/graphs`\n\nRetrieve Knowledge Graphs associated with a no-code agent that has chat capabilities.\n\n### Parameters\n\n- `application_id: string`\n\n### Returns\n\n- `{ graph_ids: string[]; }`\n\n  - `graph_ids: string[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst applicationGraphsResponse = await client.applications.graphs.list('application_id');\n\nconsole.log(applicationGraphsResponse);\n```",
  },
  {
    name: 'chat',
    endpoint: '/v1/chat',
    httpMethod: 'post',
    summary: 'Chat completion',
    description:
      'Generate a chat completion based on the provided messages. The response shown below is for non-streaming. To learn about streaming responses, see the [chat completion guide](https://dev.writer.com/home/chat-completion).',
    stainlessPath: '(resource) chat > (method) chat',
    qualified: 'client.chat.chat',
    params: [
      "messages: { role: 'user' | 'assistant' | 'system' | 'tool'; content?: string | { text: string; type: 'text'; } | { image_url: { url: string; }; type: 'image_url'; }[]; graph_data?: { references?: { files?: object[]; web?: object[]; }; sources?: object[]; status?: 'processing' | 'finished'; subqueries?: { answer: string; query: string; sources: source[]; }[]; }; name?: string; refusal?: string; tool_call_id?: string; tool_calls?: { id: string; function: { arguments: string; name?: string; }; type: 'function'; index?: number; }[]; }[];",
      'model: string;',
      'logprobs?: boolean;',
      'max_tokens?: number;',
      'n?: number;',
      "response_format?: { type: 'text' | 'json_schema'; json_schema?: object; };",
      'stop?: string[] | string;',
      'stream?: boolean;',
      'stream_options?: { include_usage: boolean; };',
      'temperature?: number;',
      "tool_choice?: { value: 'none' | 'auto' | 'required'; } | { value: object; };",
      "tools?: { function: { name: string; description?: string; parameters?: function_params; }; type: 'function'; } | { function: { graph_ids: string[]; subqueries: boolean; description?: string; query_config?: { grounding_level?: number; inline_citations?: boolean; keyword_threshold?: number; max_snippets?: number; max_subquestions?: number; max_tokens?: number; search_weight?: number; semantic_threshold?: number; }; }; type: 'graph'; } | { function: { description: string; model: string; }; type: 'llm'; } | { function: { formality: boolean; length_control: boolean; mask_profanity: boolean; model: 'palmyra-translate'; source_language_code?: string; target_language_code?: string; }; type: 'translation'; } | { function: { model: 'palmyra-vision'; variables: { file_id: string; name: string; }[]; }; type: 'vision'; } | { function: { exclude_domains: string[]; include_domains: string[]; }; type: 'web_search'; }[];",
      'top_p?: number;',
    ],
    response:
      "{ id: string; choices: { finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls'; index: number; message: chat_completion_message; logprobs?: logprobs; }[]; created: number; model: string; object: 'chat.completion'; service_tier?: string; system_fingerprint?: string; usage?: { completion_tokens: number; prompt_tokens: number; total_tokens: number; completion_tokens_details?: object; prompt_token_details?: object; }; }",
    markdown:
      "## chat\n\n`client.chat.chat(messages: { role: 'user' | 'assistant' | 'system' | 'tool'; content?: string | { text: string; type: 'text'; } | { image_url: object; type: 'image_url'; }[]; graph_data?: object; name?: string; refusal?: string; tool_call_id?: string; tool_calls?: object[]; }[], model: string, logprobs?: boolean, max_tokens?: number, n?: number, response_format?: { type: 'text' | 'json_schema'; json_schema?: object; }, stop?: string[] | string, stream?: boolean, stream_options?: { include_usage: boolean; }, temperature?: number, tool_choice?: { value: 'none' | 'auto' | 'required'; } | { value: object; }, tools?: { function: function_definition; type: 'function'; } | { function: object; type: 'graph'; } | { function: object; type: 'llm'; } | { function: object; type: 'translation'; } | { function: object; type: 'vision'; } | { function: object; type: 'web_search'; }[], top_p?: number): { id: string; choices: chat_completion_choice[]; created: number; model: string; object: 'chat.completion'; service_tier?: string; system_fingerprint?: string; usage?: chat_completion_usage; }`\n\n**post** `/v1/chat`\n\nGenerate a chat completion based on the provided messages. The response shown below is for non-streaming. To learn about streaming responses, see the [chat completion guide](https://dev.writer.com/home/chat-completion).\n\n### Parameters\n\n- `messages: { role: 'user' | 'assistant' | 'system' | 'tool'; content?: string | { text: string; type: 'text'; } | { image_url: { url: string; }; type: 'image_url'; }[]; graph_data?: { references?: { files?: object[]; web?: object[]; }; sources?: object[]; status?: 'processing' | 'finished'; subqueries?: { answer: string; query: string; sources: source[]; }[]; }; name?: string; refusal?: string; tool_call_id?: string; tool_calls?: { id: string; function: { arguments: string; name?: string; }; type: 'function'; index?: number; }[]; }[]`\n  An array of message objects that form the conversation history or context for the model to respond to. The array must contain at least one message.\n\n- `model: string`\n  The [ID of the model](https://dev.writer.com/home/models) to use for creating the chat completion. Supports `palmyra-x5`, `palmyra-x4`, `palmyra-fin`, `palmyra-med`, `palmyra-creative`, and `palmyra-x-003-instruct`.\n\n- `logprobs?: boolean`\n  Specifies whether to return log probabilities of the output tokens.\n\n- `max_tokens?: number`\n  Defines the maximum number of tokens (words and characters) that the model can generate in the response. This can be adjusted to allow for longer or shorter responses as needed. The maximum value varies by model. See the [models overview](/home/models) for more information about the maximum number of tokens for each model.\n\n- `n?: number`\n  Specifies the number of completions (responses) to generate from the model in a single request. This parameter allows for generating multiple responses, offering a variety of potential replies from which to choose.\n\n- `response_format?: { type: 'text' | 'json_schema'; json_schema?: object; }`\n  The response format to use for the chat completion, available with `palmyra-x4` and `palmyra-x5`.\n\n`text` is the default response format. [JSON Schema](https://json-schema.org/) is supported for structured responses. If you specify `json_schema`, you must also provide a `json_schema` object.\n  - `type: 'text' | 'json_schema'`\n    The type of response format to use.\n  - `json_schema?: object`\n    The JSON schema to use for the response format.\n\n- `stop?: string[] | string`\n  A token or sequence of tokens that, when generated, will cause the model to stop producing further content. This can be a single token or an array of tokens, acting as a signal to end the output.\n\n- `stream?: boolean`\n  Indicates whether the response should be streamed incrementally as it is generated or only returned once fully complete. Streaming can be useful for providing real-time feedback in interactive applications.\n\n- `stream_options?: { include_usage: boolean; }`\n  Additional options for streaming.\n  - `include_usage: boolean`\n    Indicate whether to include usage information.\n\n- `temperature?: number`\n  Controls the randomness or creativity of the model's responses. A higher temperature results in more varied and less predictable text, while a lower temperature produces more deterministic and conservative outputs.\n\n- `tool_choice?: { value: 'none' | 'auto' | 'required'; } | { value: object; }`\n  Configure how the model will call functions:\n- `auto`: allows the model to automatically choose the tool to use, or not call a tool\n- `none`: disables tool calling; the model will instead generate a message\n- `required`: requires the model to call one or more tools\n\nYou can also use a JSON object to force the model to call a specific tool. For example, `{\"type\": \"function\", \"function\": {\"name\": \"get_current_weather\"}}` requires the model to call the `get_current_weather` function, regardless of the prompt.\n\n- `tools?: { function: { name: string; description?: string; parameters?: function_params; }; type: 'function'; } | { function: { graph_ids: string[]; subqueries: boolean; description?: string; query_config?: { grounding_level?: number; inline_citations?: boolean; keyword_threshold?: number; max_snippets?: number; max_subquestions?: number; max_tokens?: number; search_weight?: number; semantic_threshold?: number; }; }; type: 'graph'; } | { function: { description: string; model: string; }; type: 'llm'; } | { function: { formality: boolean; length_control: boolean; mask_profanity: boolean; model: 'palmyra-translate'; source_language_code?: string; target_language_code?: string; }; type: 'translation'; } | { function: { model: 'palmyra-vision'; variables: { file_id: string; name: string; }[]; }; type: 'vision'; } | { function: { exclude_domains: string[]; include_domains: string[]; }; type: 'web_search'; }[]`\n  An array containing tool definitions for tools that the model can use to generate responses. The tool definitions use JSON schema. You can define your own functions or use one of the built-in `graph`, `llm`, `translation`, or `vision` tools. Note that you can only use one built-in tool type in the array (only one of `graph`, `llm`, `translation`, or `vision`). You can pass multiple [custom tools](https://dev.writer.com/home/tool-calling) of type `function` in the same request.\n\n- `top_p?: number`\n  Sets the threshold for \"nucleus sampling,\" a technique to focus the model's token generation on the most likely subset of tokens. Only tokens with cumulative probability above this threshold are considered, controlling the trade-off between creativity and coherence.\n\n### Returns\n\n- `{ id: string; choices: { finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls'; index: number; message: chat_completion_message; logprobs?: logprobs; }[]; created: number; model: string; object: 'chat.completion'; service_tier?: string; system_fingerprint?: string; usage?: { completion_tokens: number; prompt_tokens: number; total_tokens: number; completion_tokens_details?: object; prompt_token_details?: object; }; }`\n\n  - `id: string`\n  - `choices: { finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls'; index: number; message: { content: string; refusal: string; role: 'assistant'; graph_data?: graph_data; llm_data?: object; tool_calls?: tool_call[]; translation_data?: object; web_search_data?: object; }; logprobs?: { content: logprobs_token[]; refusal: logprobs_token[]; }; }[]`\n  - `created: number`\n  - `model: string`\n  - `object: 'chat.completion'`\n  - `service_tier?: string`\n  - `system_fingerprint?: string`\n  - `usage?: { completion_tokens: number; prompt_tokens: number; total_tokens: number; completion_tokens_details?: { reasoning_tokens: number; }; prompt_token_details?: { cached_tokens: number; }; }`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst stream = await client.chat.chat({ messages: [{ role: 'user' }], model: 'model' });\nfor await (const chatCompletionChunk of stream) {\n  console.log(chatCompletionChunk);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/completions',
    httpMethod: 'post',
    summary: 'Text generation',
    description:
      "Generate text completions using the specified model and prompt. This endpoint is useful for text generation tasks that don't require conversational context.",
    stainlessPath: '(resource) completions > (method) create',
    qualified: 'client.completions.create',
    params: [
      'model: string;',
      'prompt: string;',
      'best_of?: number;',
      'max_tokens?: number;',
      'random_seed?: number;',
      'stop?: string[] | string;',
      'stream?: boolean;',
      'temperature?: number;',
      'top_p?: number;',
    ],
    response: '{ choices: { text: string; log_probs?: object; }[]; model?: string; }',
    markdown:
      "## create\n\n`client.completions.create(model: string, prompt: string, best_of?: number, max_tokens?: number, random_seed?: number, stop?: string[] | string, stream?: boolean, temperature?: number, top_p?: number): { choices: object[]; model?: string; }`\n\n**post** `/v1/completions`\n\nGenerate text completions using the specified model and prompt. This endpoint is useful for text generation tasks that don't require conversational context.\n\n### Parameters\n\n- `model: string`\n  The [ID of the model](https://dev.writer.com/home/models) to use for generating text. Supports `palmyra-x5`, `palmyra-x4`, `palmyra-fin`, `palmyra-med`, `palmyra-creative`, and `palmyra-x-003-instruct`.\n\n- `prompt: string`\n  The input text that the model will process to generate a response.\n\n- `best_of?: number`\n  Specifies the number of completions to generate and return the best one. Useful for generating multiple outputs and choosing the best based on some criteria.\n\n- `max_tokens?: number`\n  The maximum number of tokens that the model can generate in the response.\n\n- `random_seed?: number`\n  A seed used to initialize the random number generator for the model, ensuring reproducibility of the output when the same inputs are provided.\n\n- `stop?: string[] | string`\n  Specifies stopping conditions for the model's output generation. This can be an array of strings or a single string that the model will look for as a signal to stop generating further tokens.\n\n- `stream?: boolean`\n  Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.\n\n- `temperature?: number`\n  Controls the randomness of the model's outputs. Higher values lead to more random outputs, while lower values make the model more deterministic.\n\n- `top_p?: number`\n  Used to control the nucleus sampling, where only the most probable tokens with a cumulative probability of top_p are considered for sampling, providing a way to fine-tune the randomness of predictions.\n\n### Returns\n\n- `{ choices: { text: string; log_probs?: object; }[]; model?: string; }`\n\n  - `choices: { text: string; log_probs?: { content: object[]; refusal: object[]; }; }[]`\n  - `model?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst stream = await client.completions.create({ model: 'palmyra-x-003-instruct', prompt: 'Write me an SEO article about...' });\nfor await (const completionChunk of stream) {\n  console.log(completionChunk);\n}\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/models',
    httpMethod: 'get',
    summary: 'List models',
    description:
      'Retrieve a list of available models that can be used for text generation, chat completions, and other AI tasks.',
    stainlessPath: '(resource) models > (method) list',
    qualified: 'client.models.list',
    response: '{ models: { id: string; name: string; }[]; }',
    markdown:
      "## list\n\n`client.models.list(): { models: object[]; }`\n\n**get** `/v1/models`\n\nRetrieve a list of available models that can be used for text generation, chat completions, and other AI tasks.\n\n### Returns\n\n- `{ models: { id: string; name: string; }[]; }`\n\n  - `models: { id: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst models = await client.models.list();\n\nconsole.log(models);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/graphs',
    httpMethod: 'post',
    summary: 'Create graph',
    description: 'Create a new Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) create',
    qualified: 'client.graphs.create',
    params: ['description?: string;', 'name?: string;'],
    response:
      "{ id: string; created_at: string; name: string; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }",
    markdown:
      "## create\n\n`client.graphs.create(description?: string, name?: string): { id: string; created_at: string; name: string; description?: string; urls?: object[]; }`\n\n**post** `/v1/graphs`\n\nCreate a new Knowledge Graph.\n\n### Parameters\n\n- `description?: string`\n  A description of the Knowledge Graph (max 255 characters). Omitting this field leaves the description unchanged.\n\n- `name?: string`\n  The name of the Knowledge Graph (max 255 characters). Omitting this field leaves the name unchanged.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `description?: string`\n  - `urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst graph = await client.graphs.create();\n\nconsole.log(graph);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/graphs/{graph_id}',
    httpMethod: 'get',
    summary: 'Retrieve graph',
    description: 'Retrieve a Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) retrieve',
    qualified: 'client.graphs.retrieve',
    params: ['graph_id: string;'],
    response:
      "{ id: string; created_at: string; file_status: { completed: number; failed: number; in_progress: number; total: number; }; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }",
    markdown:
      "## retrieve\n\n`client.graphs.retrieve(graph_id: string): { id: string; created_at: string; file_status: object; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: object[]; }`\n\n**get** `/v1/graphs/{graph_id}`\n\nRetrieve a Knowledge Graph.\n\n### Parameters\n\n- `graph_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; file_status: { completed: number; failed: number; in_progress: number; total: number; }; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `file_status: { completed: number; failed: number; in_progress: number; total: number; }`\n  - `name: string`\n  - `type: 'manual' | 'connector' | 'web'`\n  - `description?: string`\n  - `urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst graph = await client.graphs.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/graphs/{graph_id}',
    httpMethod: 'put',
    summary: 'Update graph',
    description: 'Update the name and description of a Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) update',
    qualified: 'client.graphs.update',
    params: [
      'graph_id: string;',
      'description?: string;',
      'name?: string;',
      "urls?: { type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[];",
    ],
    response:
      "{ id: string; created_at: string; name: string; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }",
    markdown:
      "## update\n\n`client.graphs.update(graph_id: string, description?: string, name?: string, urls?: { type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]): { id: string; created_at: string; name: string; description?: string; urls?: object[]; }`\n\n**put** `/v1/graphs/{graph_id}`\n\nUpdate the name and description of a Knowledge Graph.\n\n### Parameters\n\n- `graph_id: string`\n\n- `description?: string`\n  A description of the Knowledge Graph (max 255 characters). Omitting this field leaves the description unchanged.\n\n- `name?: string`\n  The name of the Knowledge Graph (max 255 characters). Omitting this field leaves the name unchanged.\n\n- `urls?: { type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]`\n  An array of web connector URLs to update for this Knowledge Graph. You can only connect URLs to Knowledge Graphs with the type `web`. To clear the list of URLs, set this field to an empty array.\n\n### Returns\n\n- `{ id: string; created_at: string; name: string; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `name: string`\n  - `description?: string`\n  - `urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst graph = await client.graphs.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/graphs',
    httpMethod: 'get',
    summary: 'List graphs',
    description: 'Retrieve a list of Knowledge Graphs.',
    stainlessPath: '(resource) graphs > (method) list',
    qualified: 'client.graphs.list',
    params: ['after?: string;', 'before?: string;', 'limit?: number;', "order?: 'asc' | 'desc';"],
    response:
      "{ id: string; created_at: string; file_status: { completed: number; failed: number; in_progress: number; total: number; }; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }",
    markdown:
      "## list\n\n`client.graphs.list(after?: string, before?: string, limit?: number, order?: 'asc' | 'desc'): { id: string; created_at: string; file_status: object; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: object[]; }`\n\n**get** `/v1/graphs`\n\nRetrieve a list of Knowledge Graphs.\n\n### Parameters\n\n- `after?: string`\n  The ID of the last object in the previous page. This parameter instructs the API to return the next page of results.\n\n- `before?: string`\n  The ID of the first object in the previous page. This parameter instructs the API to return the previous page of results.\n\n- `limit?: number`\n  Specifies the maximum number of objects returned in a page. The default value is 50. The minimum value is 1, and the maximum value is 100.\n\n- `order?: 'asc' | 'desc'`\n  Specifies the order of the results. Valid values are asc for ascending and desc for descending.\n\n### Returns\n\n- `{ id: string; created_at: string; file_status: { completed: number; failed: number; in_progress: number; total: number; }; name: string; type: 'manual' | 'connector' | 'web'; description?: string; urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `file_status: { completed: number; failed: number; in_progress: number; total: number; }`\n  - `name: string`\n  - `type: 'manual' | 'connector' | 'web'`\n  - `description?: string`\n  - `urls?: { status: { status: 'validating' | 'success' | 'error'; error_type?: 'invalid_url' | 'not_searchable' | 'not_found' | 'paywall_or_login_page' | 'unexpected_error'; }; type: 'single_page' | 'sub_pages'; url: string; exclude_urls?: string[]; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\n// Automatically fetches more pages as needed.\nfor await (const graph of client.graphs.list()) {\n  console.log(graph);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/graphs/{graph_id}',
    httpMethod: 'delete',
    summary: 'Delete graph',
    description: 'Delete a Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) delete',
    qualified: 'client.graphs.delete',
    params: ['graph_id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.graphs.delete(graph_id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1/graphs/{graph_id}`\n\nDelete a Knowledge Graph.\n\n### Parameters\n\n- `graph_id: string`\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst graph = await client.graphs.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph);\n```",
  },
  {
    name: 'add_file_to_graph',
    endpoint: '/v1/graphs/{graph_id}/file',
    httpMethod: 'post',
    summary: 'Add file to graph',
    description: 'Add a file to a Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) add_file_to_graph',
    qualified: 'client.graphs.addFileToGraph',
    params: ['graph_id: string;', 'file_id: string;'],
    response: '{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }',
    markdown:
      "## add_file_to_graph\n\n`client.graphs.addFileToGraph(graph_id: string, file_id: string): { id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n**post** `/v1/graphs/{graph_id}/file`\n\nAdd a file to a Knowledge Graph.\n\n### Parameters\n\n- `graph_id: string`\n\n- `file_id: string`\n  The unique identifier of the file.\n\n### Returns\n\n- `{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `graph_ids: string[]`\n  - `name: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst file = await client.graphs.addFileToGraph('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { file_id: 'file_id' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'question',
    endpoint: '/v1/graphs/question',
    httpMethod: 'post',
    summary: 'Question',
    description: 'Ask a question to specified Knowledge Graphs.',
    stainlessPath: '(resource) graphs > (method) question',
    qualified: 'client.graphs.question',
    params: [
      'graph_ids: string[];',
      'question: string;',
      'query_config?: { grounding_level?: number; inline_citations?: boolean; keyword_threshold?: number; max_snippets?: number; max_subquestions?: number; max_tokens?: number; search_weight?: number; semantic_threshold?: number; };',
      'stream?: boolean;',
      'subqueries?: boolean;',
    ],
    response:
      '{ answer: string; question: string; sources: { file_id: string; snippet: string; }[]; references?: { files?: { fileId: string; score: number; text: string; cite?: string; page?: number; }[]; web?: { score: number; text: string; title: string; url: string; }[]; }; subqueries?: { answer: string; query: string; sources: object[]; }[]; }',
    markdown:
      "## question\n\n`client.graphs.question(graph_ids: string[], question: string, query_config?: { grounding_level?: number; inline_citations?: boolean; keyword_threshold?: number; max_snippets?: number; max_subquestions?: number; max_tokens?: number; search_weight?: number; semantic_threshold?: number; }, stream?: boolean, subqueries?: boolean): { answer: string; question: string; sources: source[]; references?: object; subqueries?: object[]; }`\n\n**post** `/v1/graphs/question`\n\nAsk a question to specified Knowledge Graphs.\n\n### Parameters\n\n- `graph_ids: string[]`\n  The unique identifiers of the Knowledge Graphs to query.\n\n- `question: string`\n  The question to answer using the Knowledge Graph.\n\n- `query_config?: { grounding_level?: number; inline_citations?: boolean; keyword_threshold?: number; max_snippets?: number; max_subquestions?: number; max_tokens?: number; search_weight?: number; semantic_threshold?: number; }`\n  Configuration options for Knowledge Graph queries, including search parameters and citation settings.\n  - `grounding_level?: number`\n    Level of grounding required for responses, controlling how closely answers must be tied to source material. Set lower for grounded outputs, higher for creativity. Higher values (closer to 1.0) allow more creative interpretation, while lower values (closer to 0.0) stick more closely to source material. Range: 0.0-1.0, Default: 0.0.\n  - `inline_citations?: boolean`\n    Whether to include inline citations in the response, showing which Knowledge Graph sources were used. Default: false.\n  - `keyword_threshold?: number`\n    Threshold for keyword-based matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger keyword matches, while lower values (closer to 0.0) allow more lenient matching. Range: 0.0-1.0, Default: 0.7.\n  - `max_snippets?: number`\n    Maximum number of text snippets to retrieve from the Knowledge Graph for context. Works in concert with `search_weight` to control best matches vs broader coverage. While technically supports 1-60, values below 5 may return no results due to RAG implementation. Recommended range: 5-25. Due to RAG system behavior, you may see more snippets than requested. Range: 1-60, Default: 30.\n  - `max_subquestions?: number`\n    Maximum number of subquestions to generate when processing complex queries. Set higher to improve detail, set lower to reduce response time. Range: 1-10, Default: 6.\n  - `max_tokens?: number`\n    Maximum number of tokens the model can generate in the response. This controls the length of the AI's answer. Set higher for longer answers, set lower for shorter, faster answers. Range: 100-8000, Default: 4000.\n  - `search_weight?: number`\n    Weight given to search results when ranking and selecting relevant information. Higher values (closer to 100) prioritize keyword-based matching, while lower values (closer to 0) prioritize semantic similarity matching. Use higher values for exact keyword searches, lower values for conceptual similarity searches. Range: 0-100, Default: 50.\n  - `semantic_threshold?: number`\n    Threshold for semantic similarity matching when searching Knowledge Graph content. Set higher for stricter relevance, lower for broader range. Higher values (closer to 1.0) require stronger semantic similarity, while lower values (closer to 0.0) allow more lenient semantic matching. Range: 0.0-1.0, Default: 0.7.\n\n- `stream?: boolean`\n  Determines whether the model's output should be streamed. If true, the output is generated and sent incrementally, which can be useful for real-time applications.\n\n- `subqueries?: boolean`\n  Specify whether to include subqueries.\n\n### Returns\n\n- `{ answer: string; question: string; sources: { file_id: string; snippet: string; }[]; references?: { files?: { fileId: string; score: number; text: string; cite?: string; page?: number; }[]; web?: { score: number; text: string; title: string; url: string; }[]; }; subqueries?: { answer: string; query: string; sources: object[]; }[]; }`\n\n  - `answer: string`\n  - `question: string`\n  - `sources: { file_id: string; snippet: string; }[]`\n  - `references?: { files?: { fileId: string; score: number; text: string; cite?: string; page?: number; }[]; web?: { score: number; text: string; title: string; url: string; }[]; }`\n  - `subqueries?: { answer: string; query: string; sources: { file_id: string; snippet: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst stream = await client.graphs.question({ graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'], question: 'question' });\nfor await (const questionResponseChunk of stream) {\n  console.log(questionResponseChunk);\n}\n```",
  },
  {
    name: 'remove_file_from_graph',
    endpoint: '/v1/graphs/{graph_id}/file/{file_id}',
    httpMethod: 'delete',
    summary: 'Remove file from graph',
    description: 'Remove a file from a Knowledge Graph.',
    stainlessPath: '(resource) graphs > (method) remove_file_from_graph',
    qualified: 'client.graphs.removeFileFromGraph',
    params: ['graph_id: string;', 'file_id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## remove_file_from_graph\n\n`client.graphs.removeFileFromGraph(graph_id: string, file_id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1/graphs/{graph_id}/file/{file_id}`\n\nRemove a file from a Knowledge Graph.\n\n### Parameters\n\n- `graph_id: string`\n\n- `file_id: string`\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.graphs.removeFileFromGraph('file_id', { graph_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/files/{file_id}',
    httpMethod: 'get',
    summary: 'Retrieve file',
    description:
      'Retrieve detailed information about a specific file, including its metadata, status, and associated graphs.',
    stainlessPath: '(resource) files > (method) retrieve',
    qualified: 'client.files.retrieve',
    params: ['file_id: string;'],
    response: '{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }',
    markdown:
      "## retrieve\n\n`client.files.retrieve(file_id: string): { id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n**get** `/v1/files/{file_id}`\n\nRetrieve detailed information about a specific file, including its metadata, status, and associated graphs.\n\n### Parameters\n\n- `file_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `graph_ids: string[]`\n  - `name: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst file = await client.files.retrieve('file_id');\n\nconsole.log(file);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/files',
    httpMethod: 'get',
    summary: 'List files',
    description:
      'Retrieve a paginated list of files with optional filtering by status, graph association, and file type.',
    stainlessPath: '(resource) files > (method) list',
    qualified: 'client.files.list',
    params: [
      'after?: string;',
      'before?: string;',
      'file_types?: string;',
      'graph_id?: string;',
      'limit?: number;',
      "order?: 'asc' | 'desc';",
      "status?: 'in_progress' | 'completed' | 'failed';",
    ],
    response: '{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }',
    markdown:
      "## list\n\n`client.files.list(after?: string, before?: string, file_types?: string, graph_id?: string, limit?: number, order?: 'asc' | 'desc', status?: 'in_progress' | 'completed' | 'failed'): { id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n**get** `/v1/files`\n\nRetrieve a paginated list of files with optional filtering by status, graph association, and file type.\n\n### Parameters\n\n- `after?: string`\n  The ID of the last object in the previous page. This parameter instructs the API to return the next page of results.\n\n- `before?: string`\n  The ID of the first object in the previous page. This parameter instructs the API to return the previous page of results.\n\n- `file_types?: string`\n  The extensions of the files to retrieve. Separate multiple extensions with a comma. For example: `pdf,jpg,docx`.\n\n- `graph_id?: string`\n  The unique identifier of the graph to which the files belong.\n\n- `limit?: number`\n  Specifies the maximum number of objects returned in a page. The default value is 50. The minimum value is 1, and the maximum value is 100.\n\n- `order?: 'asc' | 'desc'`\n  Specifies the order of the results. Valid values are asc for ascending and desc for descending.\n\n- `status?: 'in_progress' | 'completed' | 'failed'`\n  Specifies the status of the files to retrieve. Valid values are in_progress, completed or failed.\n\n### Returns\n\n- `{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `graph_ids: string[]`\n  - `name: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\n// Automatically fetches more pages as needed.\nfor await (const file of client.files.list()) {\n  console.log(file);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/files/{file_id}',
    httpMethod: 'delete',
    summary: 'Delete file',
    description: 'Permanently delete a file from the system. This action cannot be undone.',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['file_id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.files.delete(file_id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1/files/{file_id}`\n\nPermanently delete a file from the system. This action cannot be undone.\n\n### Parameters\n\n- `file_id: string`\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst file = await client.files.delete('file_id');\n\nconsole.log(file);\n```",
  },
  {
    name: 'download',
    endpoint: '/v1/files/{file_id}/download',
    httpMethod: 'get',
    summary: 'Download file',
    description:
      'Download the binary content of a file. The response will contain the file data in the appropriate MIME type.',
    stainlessPath: '(resource) files > (method) download',
    qualified: 'client.files.download',
    params: ['file_id: string;'],
    response: 'string',
    markdown:
      "## download\n\n`client.files.download(file_id: string): string`\n\n**get** `/v1/files/{file_id}/download`\n\nDownload the binary content of a file. The response will contain the file data in the appropriate MIME type.\n\n### Parameters\n\n- `file_id: string`\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.files.download('file_id');\n\nconsole.log(response);\n\nconst content = await response.blob()\nconsole.log(content)\n```",
  },
  {
    name: 'retry',
    endpoint: '/v1/files/retry',
    httpMethod: 'post',
    summary: 'Retry failed files',
    description:
      'Retry processing of files that previously failed to process. This will re-attempt the processing of the specified files.',
    stainlessPath: '(resource) files > (method) retry',
    qualified: 'client.files.retry',
    params: ['file_ids: string[];'],
    response: '{ success?: boolean; }',
    markdown:
      "## retry\n\n`client.files.retry(file_ids: string[]): { success?: boolean; }`\n\n**post** `/v1/files/retry`\n\nRetry processing of files that previously failed to process. This will re-attempt the processing of the specified files.\n\n### Parameters\n\n- `file_ids: string[]`\n  The unique identifier of the files to retry.\n\n### Returns\n\n- `{ success?: boolean; }`\n\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.files.retry({ file_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'upload',
    endpoint: '/v1/files',
    httpMethod: 'post',
    summary: 'Upload file',
    description:
      'Upload a new file to the system. Supports various file formats including PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.',
    stainlessPath: '(resource) files > (method) upload',
    qualified: 'client.files.upload',
    params: ['content: string;', 'Content-Disposition: string;', 'graphId?: string;'],
    response: '{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }',
    markdown:
      "## upload\n\n`client.files.upload(content: string, Content-Disposition: string, graphId?: string): { id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n**post** `/v1/files`\n\nUpload a new file to the system. Supports various file formats including PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.\n\n### Parameters\n\n- `content: string`\n\n- `Content-Disposition: string`\n\n- `graphId?: string`\n  The unique identifier of the Knowledge Graph to associate the uploaded file with.\n\nNote: The response from the upload endpoint does not include the `graphId` field, but the association will be visible when you retrieve the file using the file retrieval endpoint.\n\n### Returns\n\n- `{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `graph_ids: string[]`\n  - `name: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst file = await client.files.upload({ content: fs.createReadStream('path/to/file'), 'Content-Disposition': 'Content-Disposition' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'ai_detect',
    endpoint: '/v1/tools/ai-detect',
    httpMethod: 'post',
    summary: 'AI detection',
    description:
      'Detects if content is AI- or human-generated, with a confidence score. Content must have at least 350 characters',
    stainlessPath: '(resource) tools > (method) ai_detect',
    qualified: 'client.tools.aiDetect',
    params: ['input: string;'],
    response: "{ label: 'fake' | 'real'; score: number; }",
    markdown:
      "## ai_detect\n\n`client.tools.aiDetect(input: string): { label: 'fake' | 'real'; score: number; }`\n\n**post** `/v1/tools/ai-detect`\n\nDetects if content is AI- or human-generated, with a confidence score. Content must have at least 350 characters\n\n### Parameters\n\n- `input: string`\n  The content to determine if it is AI- or human-generated. Content must have at least 350 characters.\n\n### Returns\n\n- `{ label: 'fake' | 'real'; score: number; }`\n\n  - `label: 'fake' | 'real'`\n  - `score: number`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.tools.aiDetect({ input: 'AI and ML continue to be at the forefront of technological advancements. In 2025, we can expect more sophisticated AI systems that can handle complex tasks with greater efficiency. AI will play a crucial role in various sectors, including healthcare, finance, and manufacturing. For instance, AI-powered diagnostic tools will become more accurate, helping doctors detect diseases at an early stage. In finance, AI algorithms will enhance fraud detection and risk management.' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'context_aware_splitting',
    endpoint: '/v1/tools/context-aware-splitting',
    httpMethod: 'post',
    summary: 'Context-aware text splitting',
    description:
      'Splits a long block of text (maximum 4000 words) into smaller chunks while preserving the semantic meaning of the text and context between the chunks.',
    stainlessPath: '(resource) tools > (method) context_aware_splitting',
    qualified: 'client.tools.contextAwareSplitting',
    params: ["strategy: 'llm_split' | 'fast_split' | 'hybrid_split';", 'text: string;'],
    response: '{ chunks: string[]; }',
    markdown:
      "## context_aware_splitting\n\n`client.tools.contextAwareSplitting(strategy: 'llm_split' | 'fast_split' | 'hybrid_split', text: string): { chunks: string[]; }`\n\n**post** `/v1/tools/context-aware-splitting`\n\nSplits a long block of text (maximum 4000 words) into smaller chunks while preserving the semantic meaning of the text and context between the chunks.\n\n### Parameters\n\n- `strategy: 'llm_split' | 'fast_split' | 'hybrid_split'`\n  The strategy to use for splitting the text into chunks. `llm_split` uses the language model to split the text, `fast_split` uses a fast heuristic-based approach, and `hybrid_split` combines both strategies.\n\n- `text: string`\n  The text to split into chunks.\n\n### Returns\n\n- `{ chunks: string[]; }`\n\n  - `chunks: string[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.tools.contextAwareSplitting({ strategy: 'llm_split', text: 'text' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'parse_pdf',
    endpoint: '/v1/tools/pdf-parser/{file_id}',
    httpMethod: 'post',
    summary: 'Parse PDF',
    description: 'Parse PDF to other formats.',
    stainlessPath: '(resource) tools > (method) parse_pdf',
    qualified: 'client.tools.parsePdf',
    params: ['file_id: string;', "format: 'text' | 'markdown';"],
    response: '{ content: string; }',
    markdown:
      "## parse_pdf\n\n`client.tools.parsePdf(file_id: string, format: 'text' | 'markdown'): { content: string; }`\n\n**post** `/v1/tools/pdf-parser/{file_id}`\n\nParse PDF to other formats.\n\n### Parameters\n\n- `file_id: string`\n\n- `format: 'text' | 'markdown'`\n  The format into which the PDF content should be converted.\n\n### Returns\n\n- `{ content: string; }`\n\n  - `content: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.tools.parsePdf('file_id', { format: 'text' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'web_search',
    endpoint: '/v1/tools/web-search',
    httpMethod: 'post',
    summary: 'Web search',
    description:
      'Search the web for information about a given query and return relevant results with source URLs.',
    stainlessPath: '(resource) tools > (method) web_search',
    qualified: 'client.tools.webSearch',
    params: [
      'chunks_per_source?: number;',
      'country?: string;',
      'days?: number;',
      'exclude_domains?: string[];',
      'include_answer?: boolean;',
      'include_domains?: string[];',
      "include_raw_content?: 'text' | 'markdown' | boolean;",
      'max_results?: number;',
      'query?: string;',
      "search_depth?: 'basic' | 'advanced';",
      'stream?: boolean;',
      "time_range?: 'day' | 'week' | 'month' | 'year' | 'd' | 'w' | 'm' | 'y';",
      "topic?: 'general' | 'news';",
    ],
    response: '{ query: string; sources: { raw_content?: string; url?: string; }[]; answer?: string; }',
    markdown:
      "## web_search\n\n`client.tools.webSearch(chunks_per_source?: number, country?: string, days?: number, exclude_domains?: string[], include_answer?: boolean, include_domains?: string[], include_raw_content?: 'text' | 'markdown' | boolean, max_results?: number, query?: string, search_depth?: 'basic' | 'advanced', stream?: boolean, time_range?: 'day' | 'week' | 'month' | 'year' | 'd' | 'w' | 'm' | 'y', topic?: 'general' | 'news'): { query: string; sources: object[]; answer?: string; }`\n\n**post** `/v1/tools/web-search`\n\nSearch the web for information about a given query and return relevant results with source URLs.\n\n### Parameters\n\n- `chunks_per_source?: number`\n  Only applies when `search_depth` is `advanced`. Specifies how many text segments to extract from each source. Limited to 3 chunks maximum.\n\n- `country?: string`\n  Localizes search results to a specific country. Only applies to general topic searches.\n\n- `days?: number`\n  For news topic searches, specifies how many days of news coverage to include.\n\n- `exclude_domains?: string[]`\n  Domains to exclude from the search. If unset, the search includes all domains.\n\n- `include_answer?: boolean`\n  Whether to include a generated answer to the query in the response. If `false`, only search results are returned.\n\n- `include_domains?: string[]`\n  Domains to include in the search. If unset, the search includes all domains.\n\n- `include_raw_content?: 'text' | 'markdown' | boolean`\n  Controls how raw content is included in search results:\n\n- `text`: Returns plain text without formatting markup\n- `markdown`: Returns structured content with markdown formatting (headers, links, bold text)\n- `true`: Same as `markdown`\n- `false`: Raw content is not included (default if unset)\n\n- `max_results?: number`\n  Limits the number of search results returned. Cannot exceed 20 sources.\n\n- `query?: string`\n  The search query.\n\n- `search_depth?: 'basic' | 'advanced'`\n  Controls search comprehensiveness:\n\n- `basic`: Returns fewer but highly relevant results\n- `advanced`: Performs a deeper search with more results\n\n- `stream?: boolean`\n  Enables streaming of search results as they become available.\n\n- `time_range?: 'day' | 'week' | 'month' | 'year' | 'd' | 'w' | 'm' | 'y'`\n  Filters results to content published within the specified time range back from the current date. For example, `week` or `w` returns results from the past 7 days.\n\n- `topic?: 'general' | 'news'`\n  The search topic category. Use `news` for current events and news articles, or `general` for broader web search.\n\n### Returns\n\n- `{ query: string; sources: { raw_content?: string; url?: string; }[]; answer?: string; }`\n\n  - `query: string`\n  - `sources: { raw_content?: string; url?: string; }[]`\n  - `answer?: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.tools.webSearch();\n\nconsole.log(response);\n```",
  },
  {
    name: 'medical',
    endpoint: '/v1/tools/comprehend/medical',
    httpMethod: 'post',
    summary: 'Medical comprehend',
    description:
      'Analyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.',
    stainlessPath: '(resource) tools.comprehend > (method) medical',
    qualified: 'client.tools.comprehend.medical',
    params: ['content: string;', "response_type: 'Entities' | 'RxNorm' | 'ICD-10-CM' | 'SNOMED CT';"],
    response:
      '{ entities: { attributes: { begin_offset: number; concepts: object[]; end_offset: number; relationship_score: number; score: number; text: string; traits: object[]; type: string; category?: string; relationship_type?: string; }[]; begin_offset: number; category: string; concepts: { code: string; description: string; score: number; }[]; end_offset: number; score: number; text: string; traits: { name: string; score: number; }[]; type: string; }[]; }',
    markdown:
      "## medical\n\n`client.tools.comprehend.medical(content: string, response_type: 'Entities' | 'RxNorm' | 'ICD-10-CM' | 'SNOMED CT'): { entities: object[]; }`\n\n**post** `/v1/tools/comprehend/medical`\n\nAnalyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.\n\n### Parameters\n\n- `content: string`\n  The text to analyze.\n\n- `response_type: 'Entities' | 'RxNorm' | 'ICD-10-CM' | 'SNOMED CT'`\n  The structure of the response to return. `Entities` returns medical entities, `RxNorm` returns medication information, `ICD-10-CM` returns diagnosis codes, and `SNOMED CT` returns medical concepts.\n\n### Returns\n\n- `{ entities: { attributes: { begin_offset: number; concepts: object[]; end_offset: number; relationship_score: number; score: number; text: string; traits: object[]; type: string; category?: string; relationship_type?: string; }[]; begin_offset: number; category: string; concepts: { code: string; description: string; score: number; }[]; end_offset: number; score: number; text: string; traits: { name: string; score: number; }[]; type: string; }[]; }`\n\n  - `entities: { attributes: { begin_offset: number; concepts: { code: string; description: string; score: number; }[]; end_offset: number; relationship_score: number; score: number; text: string; traits: { name: string; score: number; }[]; type: string; category?: string; relationship_type?: string; }[]; begin_offset: number; category: string; concepts: { code: string; description: string; score: number; }[]; end_offset: number; score: number; text: string; traits: { name: string; score: number; }[]; type: string; }[]`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst response = await client.tools.comprehend.medical({ content: 'content', response_type: 'Entities' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'translate',
    endpoint: '/v1/translation',
    httpMethod: 'post',
    summary: 'Translate text',
    description: 'Translate text from one language to another.',
    stainlessPath: '(resource) translation > (method) translate',
    qualified: 'client.translation.translate',
    params: [
      'formality: boolean;',
      'length_control: boolean;',
      'mask_profanity: boolean;',
      "model: 'palmyra-translate';",
      'source_language_code: string;',
      'target_language_code: string;',
      'text: string;',
    ],
    response: '{ data: string; }',
    markdown:
      "## translate\n\n`client.translation.translate(formality: boolean, length_control: boolean, mask_profanity: boolean, model: 'palmyra-translate', source_language_code: string, target_language_code: string, text: string): { data: string; }`\n\n**post** `/v1/translation`\n\nTranslate text from one language to another.\n\n### Parameters\n\n- `formality: boolean`\n  Whether to use formal or informal language in the translation. See the [list of languages that support formality](https://dev.writer.com/api-reference/translation-api/language-support#formality). If the language does not support formality, this parameter is ignored.\n\n- `length_control: boolean`\n  Whether to control the length of the translated text. See the [list of languages that support length control](https://dev.writer.com/api-reference/translation-api/language-support#length-control). If the language does not support length control, this parameter is ignored.\n\n- `mask_profanity: boolean`\n  Whether to mask profane words in the translated text. See the [list of languages that do not support profanity masking](https://dev.writer.com/api-reference/translation-api/language-support#profanity-masking). If the language does not support profanity masking, this parameter is ignored.\n\n- `model: 'palmyra-translate'`\n  The model to use for translation.\n\n- `source_language_code: string`\n  The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code of the original text to translate. For example, `en` for English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a variant, the code appends the two-digit [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). For example, Mexican Spanish is `es-MX`. See the [list of supported languages and language codes](https://dev.writer.com/api-reference/translation-api/language-support).\n\n- `target_language_code: string`\n  The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code of the target language for the translation. For example, `en` for English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a variant, the code appends the two-digit [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). For example, Mexican Spanish is `es-MX`. See the [list of supported languages and language codes](https://dev.writer.com/api-reference/translation-api/language-support).\n\n- `text: string`\n  The text to translate. Maximum of 100,000 words.\n\n### Returns\n\n- `{ data: string; }`\n\n  - `data: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst translationResponse = await client.translation.translate({\n  formality: true,\n  length_control: true,\n  mask_profanity: true,\n  model: 'palmyra-translate',\n  source_language_code: 'en',\n  target_language_code: 'es',\n  text: 'Hello, world!',\n});\n\nconsole.log(translationResponse);\n```",
  },
  {
    name: 'analyze',
    endpoint: '/v1/vision',
    httpMethod: 'post',
    summary: 'Analyze images',
    description:
      'Submit images and documents with a prompt to generate an analysis. Supports JPG, PNG, PDF, and TXT files up to 7MB each.',
    stainlessPath: '(resource) vision > (method) analyze',
    qualified: 'client.vision.analyze',
    params: [
      "model: 'palmyra-vision';",
      'prompt: string;',
      'variables: { file_id: string; name: string; }[];',
    ],
    response: '{ data: string; }',
    markdown:
      "## analyze\n\n`client.vision.analyze(model: 'palmyra-vision', prompt: string, variables: { file_id: string; name: string; }[]): { data: string; }`\n\n**post** `/v1/vision`\n\nSubmit images and documents with a prompt to generate an analysis. Supports JPG, PNG, PDF, and TXT files up to 7MB each.\n\n### Parameters\n\n- `model: 'palmyra-vision'`\n  The model to use for image analysis.\n\n- `prompt: string`\n  The prompt to use for the image analysis. The prompt must include the name of each image variable, surrounded by double curly braces (`{{}}`). For example, `Describe the difference between the image {{image_1}} and the image {{image_2}}`.\n\n- `variables: { file_id: string; name: string; }[]`\n\n### Returns\n\n- `{ data: string; }`\n\n  - `data: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst visionResponse = await client.vision.analyze({\n  model: 'palmyra-vision',\n  prompt: 'Describe the difference between the image {{image_1}} and the image {{image_2}}.',\n  variables: [{ file_id: 'f1234', name: 'image_1' }, { file_id: 'f9876', name: 'image_2' }],\n});\n\nconsole.log(visionResponse);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
