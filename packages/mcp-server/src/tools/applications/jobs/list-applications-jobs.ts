// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.jobs',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_applications_jobs',
  description:
    'Retrieve all jobs created via the async API, linked to the provided application ID (or alias).',
  inputSchema: {
    type: 'object',
    properties: {
      application_id: {
        type: 'string',
      },
      limit: {
        type: 'integer',
        description: 'The pagination limit for retrieving the jobs.',
      },
      offset: {
        type: 'integer',
        description: 'The pagination offset for retrieving the jobs.',
      },
      status: {
        type: 'string',
        title: 'api_job_status',
        description: 'The status of the job.',
        enum: ['in_progress', 'failed', 'completed'],
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { application_id, ...body } = args;
  return client.applications.jobs.list(application_id, body);
};

export default { metadata, tool, handler };
