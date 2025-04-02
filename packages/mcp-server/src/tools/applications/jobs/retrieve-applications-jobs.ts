// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const tool: Tool = {
  name: 'retrieve_applications_jobs',
  description: 'Retrieves a single job created via the Async API.',
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
  return client.applications.jobs.retrieve(job_id);
};

export default { tool, handler };
