// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { tools, handlers, HandlerFunction } from './tools';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';
export { tools, handlers } from './tools';

// Create server instance
export const server = new McpServer(
  {
    name: 'writer_sdk_api',
    version: '2.1.0-rc.1',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

/**
 * Initializes the provided MCP Server with the given tools and handlers.
 * If not provided, the default client, tools and handlers will be used.
 */
export function init(params: {
  server: Server | McpServer;
  client?: Writer;
  tools?: Tool[];
  handlers?: Record<string, HandlerFunction>;
}) {
  const server = params.server instanceof McpServer ? params.server.server : params.server;
  const providedTools = params.tools || tools;
  const providedHandlers = params.handlers || handlers;
  const client = params.client || new Writer({});

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: providedTools,
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    const handler = providedHandlers[name];
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    return executeHandler(handler, client, args);
  });
}

/**
 * Runs the provided handler with the given client and arguments.
 */
export async function executeHandler(
  handler: HandlerFunction,
  client: Writer,
  args: Record<string, unknown> | undefined,
) {
  const result = await handler(client, args || {});
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export const readEnv = (env: string): string => {
  let envValue = undefined;
  if (typeof (globalThis as any).process !== 'undefined') {
    envValue = (globalThis as any).process.env?.[env]?.trim();
  } else if (typeof (globalThis as any).Deno !== 'undefined') {
    envValue = (globalThis as any).Deno.env?.get?.(env)?.trim();
  }
  if (envValue === undefined) {
    throw new Error(`Environment variable ${env} is not set`);
  }
  return envValue;
};
