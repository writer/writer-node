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
    perLanguage: {
      typescript: {
        method: 'client.applications.generateContent',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst applicationGenerateContentResponse = await client.applications.generateContent(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  { inputs: [{ id: 'id', value: ['string'] }] },\n);\n\nconsole.log(applicationGenerateContentResponse.suggestion);",
      },
      python: {
        method: 'applications.generate_content',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfor application in client.applications.generate_content(\n    application_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    inputs=[{\n        "id": "id",\n        "value": ["string"],\n    }],\n):\n  print(application)',
      },
      go: {
        method: 'client.Applications.GenerateContent',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapplicationGenerateContentResponse, err := client.Applications.GenerateContent(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\twritersdk.ApplicationGenerateContentParams{\n\t\t\tInputs: writersdk.F([]writersdk.ApplicationGenerateContentParamsInput{{\n\t\t\t\tID:    writersdk.F("id"),\n\t\t\t\tValue: writersdk.F([]string{"string"}),\n\t\t\t}}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", applicationGenerateContentResponse.Suggestion)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "inputs": [\n            {\n              "id": "id",\n              "value": [\n                "string"\n              ]\n            }\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const applicationListResponse of client.applications.list()) {\n  console.log(applicationListResponse.id);\n}",
      },
      python: {
        method: 'applications.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\npage = client.applications.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Applications.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Applications.List(context.TODO(), writersdk.ApplicationListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
  },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.retrieve',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst application = await client.applications.retrieve('application_id');\n\nconsole.log(application.id);",
      },
      python: {
        method: 'applications.retrieve',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\napplication = client.applications.retrieve(\n    "application_id",\n)\nprint(application.id)',
      },
      go: {
        method: 'client.Applications.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapplication, err := client.Applications.Get(context.TODO(), "application_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", application.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.jobs.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const applicationGenerateAsyncResponse of client.applications.jobs.list(\n  'application_id',\n)) {\n  console.log(applicationGenerateAsyncResponse.id);\n}",
      },
      python: {
        method: 'applications.jobs.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\npage = client.applications.jobs.list(\n    application_id="application_id",\n)\npage = page.result[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Applications.Jobs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Applications.Jobs.List(\n\t\tcontext.TODO(),\n\t\t"application_id",\n\t\twritersdk.ApplicationJobListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID/jobs \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.jobs.create',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst job = await client.applications.jobs.create('application_id', {\n  inputs: [{ id: 'id', value: ['string'] }],\n});\n\nconsole.log(job.id);",
      },
      python: {
        method: 'applications.jobs.create',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\njob = client.applications.jobs.create(\n    application_id="application_id",\n    inputs=[{\n        "id": "id",\n        "value": ["string"],\n    }],\n)\nprint(job.id)',
      },
      go: {
        method: 'client.Applications.Jobs.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tjob, err := client.Applications.Jobs.New(\n\t\tcontext.TODO(),\n\t\t"application_id",\n\t\twritersdk.ApplicationJobNewParams{\n\t\t\tInputs: writersdk.F([]writersdk.ApplicationJobNewParamsInput{{\n\t\t\t\tID:    writersdk.F("id"),\n\t\t\t\tValue: writersdk.F([]string{"string"}),\n\t\t\t}}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", job.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID/jobs \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "inputs": [\n            {\n              "id": "id",\n              "value": [\n                "string"\n              ]\n            }\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.jobs.retry',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.applications.jobs.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'applications.jobs.retry',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.applications.jobs.retry(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Applications.Jobs.Retry',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Applications.Jobs.Retry(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/jobs/$JOB_ID/retry \\\n    -X POST \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.jobs.retrieve',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst applicationGenerateAsyncResponse = await client.applications.jobs.retrieve(\n  '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n);\n\nconsole.log(applicationGenerateAsyncResponse.id);",
      },
      python: {
        method: 'applications.jobs.retrieve',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\napplication_generate_async_response = client.applications.jobs.retrieve(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(application_generate_async_response.id)',
      },
      go: {
        method: 'client.Applications.Jobs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapplicationGenerateAsyncResponse, err := client.Applications.Jobs.Get(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", applicationGenerateAsyncResponse.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/jobs/$JOB_ID \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.graphs.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst applicationGraphsResponse = await client.applications.graphs.list('application_id');\n\nconsole.log(applicationGraphsResponse.graph_ids);",
      },
      python: {
        method: 'applications.graphs.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\napplication_graphs_response = client.applications.graphs.list(\n    "application_id",\n)\nprint(application_graphs_response.graph_ids)',
      },
      go: {
        method: 'client.Applications.Graphs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapplicationGraphsResponse, err := client.Applications.Graphs.List(context.TODO(), "application_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", applicationGraphsResponse.GraphIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID/graphs \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.applications.graphs.update',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst applicationGraphsResponse = await client.applications.graphs.update('application_id', {\n  graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n});\n\nconsole.log(applicationGraphsResponse.graph_ids);",
      },
      python: {
        method: 'applications.graphs.update',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\napplication_graphs_response = client.applications.graphs.update(\n    application_id="application_id",\n    graph_ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(application_graphs_response.graph_ids)',
      },
      go: {
        method: 'client.Applications.Graphs.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tapplicationGraphsResponse, err := client.Applications.Graphs.Update(\n\t\tcontext.TODO(),\n\t\t"application_id",\n\t\twritersdk.ApplicationGraphUpdateParams{\n\t\t\tGraphIDs: writersdk.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", applicationGraphsResponse.GraphIDs)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/applications/$APPLICATION_ID/graphs \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "graph_ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.chat.chat',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst chatCompletion = await client.chat.chat({ messages: [{ role: 'user' }], model: 'model' });\n\nconsole.log(chatCompletion.id);",
      },
      python: {
        method: 'chat.chat',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfor chat in client.chat.chat(\n    messages=[{\n        "role": "user"\n    }],\n    model="model",\n):\n  print(chat)',
      },
      go: {
        method: 'client.Chat.Chat',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tchatCompletion, err := client.Chat.Chat(context.TODO(), writersdk.ChatChatParams{\n\t\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\t\tRole: writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t\t}}),\n\t\tModel: writersdk.F("model"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chatCompletion.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/chat \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "messages": [\n            {\n              "role": "user"\n            }\n          ],\n          "model": "model"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.completions.create',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst completion = await client.completions.create({\n  model: 'palmyra-x-003-instruct',\n  prompt: 'Write me an SEO article about...',\n});\n\nconsole.log(completion.choices);",
      },
      python: {
        method: 'completions.create',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfor completion in client.completions.create(\n    model="palmyra-x-003-instruct",\n    prompt="Write me an SEO article about...",\n):\n  print(completion)',
      },
      go: {
        method: 'client.Completions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompletion, err := client.Completions.New(context.TODO(), writersdk.CompletionNewParams{\n\t\tModel:  writersdk.F("palmyra-x-003-instruct"),\n\t\tPrompt: writersdk.F("Write me an SEO article about..."),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", completion.Choices)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/completions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "model": "palmyra-x-003-instruct",\n          "prompt": "Write me an SEO article about...",\n          "best_of": 1,\n          "max_tokens": 150,\n          "random_seed": 42,\n          "stop": [\n            "."\n          ],\n          "stream": false,\n          "temperature": 0.7,\n          "top_p": 0.9\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.models.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst models = await client.models.list();\n\nconsole.log(models.models);",
      },
      python: {
        method: 'models.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nmodels = client.models.list()\nprint(models.models)',
      },
      go: {
        method: 'client.Models.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmodels, err := client.Models.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", models.Models)\n}\n',
      },
      http: {
        example: 'curl https://api.writer.com/v1/models \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const graph of client.graphs.list()) {\n  console.log(graph.id);\n}",
      },
      python: {
        method: 'graphs.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\npage = client.graphs.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Graphs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Graphs.List(context.TODO(), writersdk.GraphListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.writer.com/v1/graphs \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.create',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst graph = await client.graphs.create();\n\nconsole.log(graph.id);",
      },
      python: {
        method: 'graphs.create',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\ngraph = client.graphs.create()\nprint(graph.id)',
      },
      go: {
        method: 'client.Graphs.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgraph, err := client.Graphs.New(context.TODO(), writersdk.GraphNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", graph.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.writer.com/v1/graphs \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $WRITER_API_KEY\" \\\n    -d '{}'",
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.retrieve',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst graph = await client.graphs.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph.id);",
      },
      python: {
        method: 'graphs.retrieve',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\ngraph = client.graphs.retrieve(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(graph.id)',
      },
      go: {
        method: 'client.Graphs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgraph, err := client.Graphs.Get(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", graph.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/graphs/$GRAPH_ID \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.update',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst graph = await client.graphs.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph.id);",
      },
      python: {
        method: 'graphs.update',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\ngraph = client.graphs.update(\n    graph_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(graph.id)',
      },
      go: {
        method: 'client.Graphs.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgraph, err := client.Graphs.Update(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\twritersdk.GraphUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", graph.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.writer.com/v1/graphs/$GRAPH_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $WRITER_API_KEY\" \\\n    -d '{}'",
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.delete',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst graph = await client.graphs.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(graph.id);",
      },
      python: {
        method: 'graphs.delete',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\ngraph = client.graphs.delete(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(graph.id)',
      },
      go: {
        method: 'client.Graphs.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgraph, err := client.Graphs.Delete(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", graph.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/graphs/$GRAPH_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.addFileToGraph',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.graphs.addFileToGraph('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  file_id: 'file_id',\n});\n\nconsole.log(file.id);",
      },
      python: {
        method: 'graphs.add_file_to_graph',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.graphs.add_file_to_graph(\n    graph_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    file_id="file_id",\n)\nprint(file.id)',
      },
      go: {
        method: 'client.Graphs.AddFileToGraph',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfile, err := client.Graphs.AddFileToGraph(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\twritersdk.GraphAddFileToGraphParams{\n\t\t\tFileID: writersdk.F("file_id"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/graphs/$GRAPH_ID/file \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "file_id": "file_id"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.removeFileFromGraph',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.graphs.removeFileFromGraph('file_id', {\n  graph_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(response.id);",
      },
      python: {
        method: 'graphs.remove_file_from_graph',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.graphs.remove_file_from_graph(\n    file_id="file_id",\n    graph_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      go: {
        method: 'client.Graphs.RemoveFileFromGraph',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Graphs.RemoveFileFromGraph(\n\t\tcontext.TODO(),\n\t\t"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n\t\t"file_id",\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/graphs/$GRAPH_ID/file/$FILE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.graphs.question',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst question = await client.graphs.question({\n  graph_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],\n  question: 'question',\n});\n\nconsole.log(question.answer);",
      },
      python: {
        method: 'graphs.question',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfor graph in client.graphs.question(\n    graph_ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n    question="question",\n):\n  print(graph)',
      },
      go: {
        method: 'client.Graphs.Question',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tquestion, err := client.Graphs.Question(context.TODO(), writersdk.GraphQuestionParams{\n\t\tGraphIDs: writersdk.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t\tQuestion: writersdk.F("question"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", question.Answer)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/graphs/question \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "graph_ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ],\n          "question": "question"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.retrieve',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.retrieve('file_id');\n\nconsole.log(file.id);",
      },
      python: {
        method: 'files.retrieve',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.retrieve(\n    "file_id",\n)\nprint(file.id)',
      },
      go: {
        method: 'client.Files.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfile, err := client.Files.Get(context.TODO(), "file_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/files/$FILE_ID \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.delete',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.delete('file_id');\n\nconsole.log(file.id);",
      },
      python: {
        method: 'files.delete',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.delete(\n    "file_id",\n)\nprint(file.id)',
      },
      go: {
        method: 'client.Files.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfile, err := client.Files.Delete(context.TODO(), "file_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/files/$FILE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.list',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const file of client.files.list()) {\n  console.log(file.id);\n}",
      },
      python: {
        method: 'files.list',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\npage = client.files.list()\npage = page.data[0]\nprint(page.id)',
      },
      go: {
        method: 'client.Files.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Files.List(context.TODO(), writersdk.FileListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.writer.com/v1/files \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
      "## upload\n\n`client.files.upload(content: string, Content-Disposition: string, graphId?: string): { id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n**post** `/v1/files`\n\nUpload a new file to the system. Supports various file formats including PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.\n\n### Parameters\n\n- `content: string`\n\n- `Content-Disposition: string`\n\n- `graphId?: string`\n  The unique identifier of the Knowledge Graph to associate the uploaded file with.\n\nNote: The response from the upload endpoint does not include the `graphId` field, but the association will be visible when you retrieve the file using the file retrieval endpoint.\n\n### Returns\n\n- `{ id: string; created_at: string; graph_ids: string[]; name: string; status: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `graph_ids: string[]`\n  - `name: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst file = await client.files.upload(fs.createReadStream('path/to/file'), { 'Content-Disposition': 'Content-Disposition' });\n\nconsole.log(file);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.upload',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.upload(fs.createReadStream('path/to/file'), {\n  'Content-Disposition': 'Content-Disposition',\n});\n\nconsole.log(file.id);",
      },
      python: {
        method: 'files.upload',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.upload(\n    content=b"Example data",\n    content_disposition="Content-Disposition",\n)\nprint(file.id)',
      },
      go: {
        method: 'client.Files.Upload',
        example:
          'package main\n\nimport (\n\t"bytes"\n\t"context"\n\t"fmt"\n\t"io"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfile, err := client.Files.Upload(\n\t\tcontext.TODO(),\n\t\tio.Reader(bytes.NewBuffer([]byte("Example data"))),\n\t\twritersdk.FileUploadParams{\n\t\t\tContentDisposition: writersdk.F("Content-Disposition"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", file.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.writer.com/v1/files \\\n    -H 'Content-Type: text/plain' \\\n    -H \"Authorization: Bearer $WRITER_API_KEY\" \\\n    -F 'content=@/path/to/content'",
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.download',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.files.download('file_id');\n\nconsole.log(response);\n\nconst content = await response.blob();\nconsole.log(content);",
      },
      python: {
        method: 'files.download',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.files.download(\n    "file_id",\n)\nprint(response)\ncontent = response.read()\nprint(content)',
      },
      go: {
        method: 'client.Files.Download',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Files.Download(context.TODO(), "file_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/files/$FILE_ID/download \\\n    -H "Authorization: Bearer $WRITER_API_KEY"',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.files.retry',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.files.retry({ file_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'] });\n\nconsole.log(response.success);",
      },
      python: {
        method: 'files.retry',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.files.retry(\n    file_ids=["182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"],\n)\nprint(response.success)',
      },
      go: {
        method: 'client.Files.Retry',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Files.Retry(context.TODO(), writersdk.FileRetryParams{\n\t\tFileIDs: writersdk.F([]string{"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Success)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/files/retry \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "file_ids": [\n            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n          ]\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.tools.parsePdf',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tools.parsePdf('file_id', { format: 'text' });\n\nconsole.log(response.content);",
      },
      python: {
        method: 'tools.parse_pdf',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tools.parse_pdf(\n    file_id="file_id",\n    format="text",\n)\nprint(response.content)',
      },
      go: {
        method: 'client.Tools.ParsePdf',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tools.ParsePdf(\n\t\tcontext.TODO(),\n\t\t"file_id",\n\t\twritersdk.ToolParsePdfParams{\n\t\t\tFormat: writersdk.F(writersdk.ToolParsePdfParamsFormatText),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Content)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/tools/pdf-parser/$FILE_ID \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "format": "text"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.tools.webSearch',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.tools.webSearch({\n  include_domains: ['dev.writer.com'],\n  query: 'How do I get an API key for the Writer API?',\n});\n\nconsole.log(response.query);",
      },
      python: {
        method: 'tools.web_search',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.tools.web_search(\n    include_domains=["dev.writer.com"],\n    query="How do I get an API key for the Writer API?",\n)\nprint(response.query)',
      },
      go: {
        method: 'client.Tools.WebSearch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Tools.WebSearch(context.TODO(), writersdk.ToolWebSearchParams{\n\t\tIncludeDomains: writersdk.F([]string{"dev.writer.com"}),\n\t\tQuery:          writersdk.F("How do I get an API key for the Writer API?"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Query)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/tools/web-search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "include_domains": [\n            "dev.writer.com"\n          ],\n          "query": "How do I get an API key for the Writer API?"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.translation.translate',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst translationResponse = await client.translation.translate({\n  formality: true,\n  length_control: true,\n  mask_profanity: true,\n  model: 'palmyra-translate',\n  source_language_code: 'en',\n  target_language_code: 'es',\n  text: 'Hello, world!',\n});\n\nconsole.log(translationResponse.data);",
      },
      python: {
        method: 'translation.translate',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\ntranslation_response = client.translation.translate(\n    formality=True,\n    length_control=True,\n    mask_profanity=True,\n    model="palmyra-translate",\n    source_language_code="en",\n    target_language_code="es",\n    text="Hello, world!",\n)\nprint(translation_response.data)',
      },
      go: {
        method: 'client.Translation.Translate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttranslationResponse, err := client.Translation.Translate(context.TODO(), writersdk.TranslationTranslateParams{\n\t\tTranslationRequest: writersdk.TranslationRequestParam{\n\t\t\tFormality:          writersdk.F(true),\n\t\t\tLengthControl:      writersdk.F(true),\n\t\t\tMaskProfanity:      writersdk.F(true),\n\t\t\tModel:              writersdk.F(writersdk.TranslationRequestModelPalmyraTranslate),\n\t\t\tSourceLanguageCode: writersdk.F("en"),\n\t\t\tTargetLanguageCode: writersdk.F("es"),\n\t\t\tText:               writersdk.F("Hello, world!"),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", translationResponse.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/translation \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "formality": true,\n          "length_control": true,\n          "mask_profanity": true,\n          "model": "palmyra-translate",\n          "source_language_code": "en",\n          "target_language_code": "es",\n          "text": "Hello, world!"\n        }\'',
      },
    },
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
    perLanguage: {
      typescript: {
        method: 'client.vision.analyze',
        example:
          "import Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst visionResponse = await client.vision.analyze({\n  model: 'palmyra-vision',\n  prompt: 'Describe the difference between the image {{image_1}} and the image {{image_2}}.',\n  variables: [\n    { name: 'image_1', file_id: 'f1234' },\n    { name: 'image_2', file_id: 'f9876' },\n  ],\n});\n\nconsole.log(visionResponse.data);",
      },
      python: {
        method: 'vision.analyze',
        example:
          'import os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\nvision_response = client.vision.analyze(\n    model="palmyra-vision",\n    prompt="Describe the difference between the image {{image_1}} and the image {{image_2}}.",\n    variables=[{\n        "name": "image_1",\n        "file_id": "f1234",\n    }, {\n        "name": "image_2",\n        "file_id": "f9876",\n    }],\n)\nprint(vision_response.data)',
      },
      go: {
        method: 'client.Vision.Analyze',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tvisionResponse, err := client.Vision.Analyze(context.TODO(), writersdk.VisionAnalyzeParams{\n\t\tVisionRequest: writersdk.VisionRequestParam{\n\t\t\tModel:  writersdk.F(writersdk.VisionRequestModelPalmyraVision),\n\t\t\tPrompt: writersdk.F("Describe the difference between the image {{image_1}} and the image {{image_2}}."),\n\t\t\tVariables: writersdk.F([]writersdk.VisionRequestVariableParam{{\n\t\t\t\tFileID: writersdk.F("f1234"),\n\t\t\t\tName:   writersdk.F("image_1"),\n\t\t\t}, {\n\t\t\t\tFileID: writersdk.F("f9876"),\n\t\t\t\tName:   writersdk.F("image_2"),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", visionResponse.Data)\n}\n',
      },
      http: {
        example:
          'curl https://api.writer.com/v1/vision \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $WRITER_API_KEY" \\\n    -d \'{\n          "model": "palmyra-vision",\n          "prompt": "Describe the difference between the image {{image_1}} and the image {{image_2}}.",\n          "variables": [\n            {\n              "file_id": "f1234",\n              "name": "image_1"\n            },\n            {\n              "file_id": "f9876",\n              "name": "image_2"\n            }\n          ]\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Writer Go API Library\n\n<a href="https://pkg.go.dev/github.com/stainless-sdks/writer-go"><img src="https://pkg.go.dev/badge/github.com/stainless-sdks/writer-go.svg" alt="Go Reference"></a>\n\nThe Writer Go library provides convenient access to the [Writer REST API](https://dev.writer.com/api-guides/introduction)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Writer MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=writer-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIndyaXRlci1zZGstbWNwIl0sImVudiI6eyJXUklURVJfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22writer-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22writer-sdk-mcp%22%5D%2C%22env%22%3A%7B%22WRITER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n\n\n```go\nimport (\n\t"github.com/stainless-sdks/writer-go" // imported as SDK_PackageName\n)\n```\n\n\n\nOr to pin the version:\n\n\n\n```sh\ngo get -u \'github.com/stainless-sdks/writer-go@v0.0.1\'\n```\n\n\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/writer-go"\n\t"github.com/stainless-sdks/writer-go/option"\n\t"github.com/stainless-sdks/writer-go/shared"\n)\n\nfunc main() {\n\tclient := writersdk.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("WRITER_API_KEY")\n\t)\n\tchatCompletion, err := client.Chat.Chat(context.TODO(), writersdk.ChatChatParams{\n\t\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\t\tContent: writersdk.F[writersdk.ChatChatParamsMessagesContentUnion](shared.UnionString("Write a haiku about programming")),\n\t\t\tRole:    writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t\t}}),\n\t\tModel: writersdk.F("palmyra-x5"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", chatCompletion.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Chat.Chat(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/stainless-sdks/writer-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Graphs.ListAutoPaging(context.TODO(), writersdk.GraphListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tgraph := iter.Current()\n\tfmt.Printf("%+v\\n", graph)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Graphs.List(context.TODO(), writersdk.GraphListParams{})\nfor page != nil {\n\tfor _, graph := range page.Data {\n\t\tfmt.Printf("%+v\\n", graph)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Chat.Chat(context.TODO(), writersdk.ChatChatParams{\n\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\tContent: writersdk.F[writersdk.ChatChatParamsMessagesContentUnion](shared.UnionString("Write a haiku about programming")),\n\t\tRole:    writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t}}),\n\tModel: writersdk.F("palmyra-x5"),\n})\nif err != nil {\n\tvar apierr *writersdk.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/chat": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Chat.Chat(\n\tctx,\n\twritersdk.ChatChatParams{\n\t\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\t\tContent: writersdk.F[writersdk.ChatChatParamsMessagesContentUnion](shared.UnionString("Write a haiku about programming")),\n\t\t\tRole:    writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t\t}}),\n\t\tModel: writersdk.F("palmyra-x5"),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 7 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := writersdk.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Chat.Chat(\n\tcontext.TODO(),\n\twritersdk.ChatChatParams{\n\t\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\t\tContent: writersdk.F[writersdk.ChatChatParamsMessagesContentUnion](shared.UnionString("Write a haiku about programming")),\n\t\t\tRole:    writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t\t}}),\n\t\tModel: writersdk.F("palmyra-x5"),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nchatCompletion, err := client.Chat.Chat(\n\tcontext.TODO(),\n\twritersdk.ChatChatParams{\n\t\tMessages: writersdk.F([]writersdk.ChatChatParamsMessage{{\n\t\t\tContent: writersdk.F[writersdk.ChatChatParamsMessagesContentUnion](shared.UnionString("Write a haiku about programming")),\n\t\t\tRole:    writersdk.F(writersdk.ChatChatParamsMessagesRoleUser),\n\t\t}}),\n\t\tModel: writersdk.F("palmyra-x5"),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", chatCompletion)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/writer-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Writer Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/writer-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/writer-sdk/)\n\nThe Writer Python library provides convenient access to the Writer REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Writer MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=writer-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIndyaXRlci1zZGstbWNwIl0sImVudiI6eyJXUklURVJfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22writer-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22writer-sdk-mcp%22%5D%2C%22env%22%3A%7B%22WRITER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [dev.writer.com](https://dev.writer.com/api-guides/introduction). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install writer-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom writerai import Writer\n\nclient = Writer(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\n\nchat_completion = client.chat.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n)\nprint(chat_completion.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `WRITER_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncWriter` instead of `Writer` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom writerai import AsyncWriter\n\nclient = AsyncWriter(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  chat_completion = await client.chat.chat(\n      messages=[{\n          "content": "Write a haiku about programming",\n          "role": "user",\n      }],\n      model="palmyra-x5",\n  )\n  print(chat_completion.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install writer-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom writerai import DefaultAioHttpClient\nfrom writerai import AsyncWriter\n\nasync def main() -> None:\n  async with AsyncWriter(\n    api_key=os.environ.get("WRITER_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    chat_completion = await client.chat.chat(\n        messages=[{\n            "content": "Write a haiku about programming",\n            "role": "user",\n        }],\n        model="palmyra-x5",\n    )\n    print(chat_completion.id)\n\nasyncio.run(main())\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Side Events (SSE).\n\n```python\nfrom writerai import Writer\n\nclient = Writer()\n\nstream = client.chat.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n    stream=True,\n)\nfor chat_completion in stream:\n  print(chat_completion.id)\n```\n\nThe async client uses the exact same interface.\n\n```python\nfrom writerai import AsyncWriter\n\nclient = AsyncWriter()\n\nstream = await client.chat.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n    stream=True,\n)\nasync for chat_completion in stream:\n  print(chat_completion.id)\n```\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Writer API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom writerai import Writer\n\nclient = Writer()\n\nall_graphs = []\n# Automatically fetches more pages as needed.\nfor graph in client.graphs.list():\n    # Do something with graph here\n    all_graphs.append(graph)\nprint(all_graphs)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom writerai import AsyncWriter\n\nclient = AsyncWriter()\n\nasync def main() -> None:\n    all_graphs = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for graph in client.graphs.list():\n        all_graphs.append(graph)\n    print(all_graphs)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.graphs.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.data)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.graphs.list()\n\nprint(f"next page cursor: {first_page.after}") # => "next page cursor: ..."\nfor graph in first_page.data:\n    print(graph.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom writerai import Writer\n\nclient = Writer()\n\nchat_completion = client.chat.chat(\n    messages=[{\n        "role": "user"\n    }],\n    model="model",\n    response_format={\n        "type": "text"\n    },\n)\nprint(chat_completion.response_format)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `writerai.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `writerai.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `writerai.APIError`.\n\n```python\nimport writerai\nfrom writerai import Writer\n\nclient = Writer()\n\ntry:\n    client.chat.chat(\n        messages=[{\n            "content": "Write a haiku about programming",\n            "role": "user",\n        }],\n        model="palmyra-x5",\n    )\nexcept writerai.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept writerai.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept writerai.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 7 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom writerai import Writer\n\n# Configure the default for all requests:\nclient = Writer(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).chat.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 3 minutes. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom writerai import Writer\n\n# Configure the default for all requests:\nclient = Writer(\n    # 20 seconds (default is 3 minutes)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Writer(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).chat.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `WRITER_LOG` to `info`.\n\n```shell\n$ export WRITER_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom writerai import Writer\n\nclient = Writer()\nresponse = client.chat.with_raw_response.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nchat = response.parse()  # get the object that `chat.chat()` would have returned\nprint(chat.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/writer/writer-python/tree/main/src/writerai/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/writer/writer-python/tree/main/src/writerai/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.chat.with_streaming_response.chat(\n    messages=[{\n        "content": "Write a haiku about programming",\n        "role": "user",\n    }],\n    model="palmyra-x5",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom writerai import Writer, DefaultHttpxClient\n\nclient = Writer(\n    # Or use the `WRITER_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom writerai import Writer\n\nwith Writer() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/writer/writer-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport writerai\nprint(writerai.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Writer TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/writer-sdk.svg?label=npm%20(stable))](https://npmjs.org/package/writer-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/writer-sdk)\n\nThis library provides convenient access to the Writer REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [dev.writer.com](https://dev.writer.com/api-guides/introduction). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Writer MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=writer-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIndyaXRlci1zZGstbWNwIl0sImVudiI6eyJXUklURVJfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22writer-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22writer-sdk-mcp%22%5D%2C%22env%22%3A%7B%22WRITER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install writer-sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst chatCompletion = await client.chat.chat({\n  messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n  model: 'palmyra-x5',\n});\n\nconsole.log(chatCompletion.id);\n```\n\n## Streaming responses\n\nWe provide support for streaming responses using Server Sent Events (SSE).\n\n```ts\nimport Writer from 'writer-sdk';\n\nconst client = new Writer();\n\nconst stream = await client.chat.chat({\n  messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n  model: 'palmyra-x5',\n  stream: true,\n});\nfor await (const chatCompletionChunk of stream) {\n  console.log(chatCompletionChunk.id);\n}\n```\n\nIf you need to cancel a stream, you can `break` from the loop\nor call `stream.controller.abort()`.\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Writer from 'writer-sdk';\n\nconst client = new Writer({\n  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Writer.ChatChatParams = {\n  messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n  model: 'palmyra-x5',\n};\nconst chatCompletion: Writer.ChatCompletion = await client.chat.chat(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst chatCompletion = await client.chat\n  .chat({\n    messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n    model: 'palmyra-x5',\n  })\n  .catch(async (err) => {\n    if (err instanceof Writer.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 7 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Writer({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.chat.chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 3 minutes by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Writer({\n  timeout: 20 * 1000, // 20 seconds (default is 3 minutes)\n});\n\n// Override per-request:\nawait client.chat.chat({ messages: [{ content: 'Write a haiku about programming', role: 'user' }], model: 'palmyra-x5' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Writer API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllGraphs(params) {\n  const allGraphs = [];\n  // Automatically fetches more pages as needed.\n  for await (const graph of client.graphs.list()) {\n    allGraphs.push(graph);\n  }\n  return allGraphs;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.graphs.list();\nfor (const graph of page.data) {\n  console.log(graph);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Writer();\n\nconst response = await client.chat\n  .chat({\n    messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n    model: 'palmyra-x5',\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: chatCompletion, response: raw } = await client.chat\n  .chat({\n    messages: [{ content: 'Write a haiku about programming', role: 'user' }],\n    model: 'palmyra-x5',\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(chatCompletion.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `WRITER_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Writer from 'writer-sdk';\n\nconst client = new Writer({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Writer from 'writer-sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Writer({\n  logger: logger.child({ name: 'Writer' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.chat.chat({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Writer from 'writer-sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Writer({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Writer from 'writer-sdk';\n\nconst client = new Writer({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Writer from 'writer-sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Writer({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Writer from 'writer-sdk';\n\nconst client = new Writer({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Writer from 'npm:writer-sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Writer({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/writer/writer-node/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

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
