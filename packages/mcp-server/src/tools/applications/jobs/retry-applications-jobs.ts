// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'applications.jobs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'retry_applications_jobs',
  description:
    'Re-triggers the async execution of a single job previously created via the Async api and terminated in error.',
  inputSchema: {
    type: 'object',
    properties: {
      job_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: Writer, args: any) => {
  const { job_id } = args;
  return client.applications.jobs.retry(job_id);
};

export default { metadata, tool, handler };
