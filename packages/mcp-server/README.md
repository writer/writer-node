# Writer TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export WRITER_API_KEY = "My API Key"
npx -y writer-sdk-mcp
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "writer_sdk_api": {
      "command": "npx",
      "args": ["-y", "writer-sdk-mcp"],
      "env": {
        "WRITER_API_KEY": "My API Key"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "writer-sdk-mcp/server";

// import a specific tool
import retrieveApplications from "writer-sdk-mcp/tools/applications/retrieve-applications";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveApplications, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `applications`:

- `retrieve_applications` (`read`): Retrieves detailed information for a specific no-code application, including its configuration and current status.
- `list_applications` (`read`): Retrieves a paginated list of no-code applications with optional filtering and sorting capabilities.
- `generate_content_applications` (`write`): Generate content from an existing no-code application with inputs.

### Resource `applications.jobs`:

- `create_applications_jobs` (`write`): Generate content asynchronously from an existing application with inputs.
- `retrieve_applications_jobs` (`read`): Retrieves a single job created via the Async API.
- `list_applications_jobs` (`read`): Retrieve all jobs created via the async API, linked to the provided application ID (or alias).
- `retry_applications_jobs` (`write`): Re-triggers the async execution of a single job previously created via the Async api and terminated in error.

### Resource `applications.graphs`:

- `update_applications_graphs` (`write`): Updates the Knowledge Graphs listed and associates them with the no-code chat app to be used.
- `list_applications_graphs` (`read`): Retrieve Knowledge Graphs associated with a no-code chat application.

### Resource `chat`:

- `chat_chat` (`write`): Generate a chat completion based on the provided messages. The response shown below is for non-streaming. To learn about streaming responses, see the [chat completion guide](/api-guides/chat-completion).

### Resource `completions`:

- `create_completions` (`write`): Text generation

### Resource `models`:

- `list_models` (`read`): List models

### Resource `graphs`:

- `create_graphs` (`write`): Create a new Knowledge Graph.
- `retrieve_graphs` (`read`): Retrieve a Knowledge Graph.
- `update_graphs` (`write`): Update the name and description of a Knowledge Graph.
- `list_graphs` (`read`): Retrieve a list of Knowledge Graphs.
- `delete_graphs` (`write`): Delete a Knowledge Graph.
- `add_file_to_graph_graphs` (`write`): Add a file to a Knowledge Graph.
- `question_graphs` (`write`): Ask a question to specified Knowledge Graphs.
- `remove_file_from_graph_graphs` (`write`): Remove a file from a Knowledge Graph.

### Resource `files`:

- `retrieve_files` (`read`): Retrieve file
- `list_files` (`read`): List files
- `delete_files` (`write`): Delete file
- `download_files` (`read`): Download file
- `retry_files` (`write`): Retry failed files
- `upload_files` (`write`): Upload file

### Resource `tools`:

- `context_aware_splitting_tools` (`write`): Splits a long block of text (maximum 4000 words) into smaller chunks while preserving the semantic meaning of the text and context between the chunks.
- `parse_pdf_tools` (`write`): Parse PDF to other formats.

### Resource `tools.comprehend`:

- `medical_tools_comprehend` (`write`): Analyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.

### Resource `vision`:

- `analyze_vision` (`write`): Submit images and a prompt to generate an analysis of the images.
