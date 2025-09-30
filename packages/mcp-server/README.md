# Writer TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export WRITER_API_KEY="My API Key"
npx -y writer-sdk-mcp@latest
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
      "args": ["-y", "writer-sdk-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "WRITER_API_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------ | ------------------------ | --------------- |
| `x-writer-api-key` | `apiKey` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "writer_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

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

- `retrieve_applications` (`read`): Retrieves detailed information for a specific no-code agent (formerly called no-code applications), including its configuration and current status.
- `list_applications` (`read`): Retrieves a paginated list of no-code agents (formerly called no-code applications) with optional filtering and sorting capabilities.
- `generate_content_applications` (`write`): Generate content from an existing no-code agent (formerly called no-code applications) with inputs.

### Resource `applications.jobs`:

- `create_applications_jobs` (`write`): Generate content asynchronously from an existing no-code agent (formerly called no-code applications) with inputs.
- `retrieve_applications_jobs` (`read`): Retrieves a single job created via the Async API.
- `list_applications_jobs` (`read`): Retrieve all jobs created via the async API, linked to the provided application ID (or alias).
- `retry_applications_jobs` (`write`): Re-triggers the async execution of a single job previously created via the Async api and terminated in error.

### Resource `applications.graphs`:

- `update_applications_graphs` (`write`): Updates the list of Knowledge Graphs associated with a no-code chat agent.
- `list_applications_graphs` (`read`): Retrieve Knowledge Graphs associated with a no-code agent that has chat capabilities.

### Resource `chat`:

- `chat_chat` (`write`): Generate a chat completion based on the provided messages. The response shown below is for non-streaming. To learn about streaming responses, see the [chat completion guide](https://dev.writer.com/home/chat-completion).

### Resource `completions`:

- `create_completions` (`write`): Generate text completions using the specified model and prompt. This endpoint is useful for text generation tasks that don't require conversational context.

### Resource `models`:

- `list_models` (`read`): Retrieve a list of available models that can be used for text generation, chat completions, and other AI tasks.

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

- `retrieve_files` (`read`): Retrieve detailed information about a specific file, including its metadata, status, and associated graphs.
- `list_files` (`read`): Retrieve a paginated list of files with optional filtering by status, graph association, and file type.
- `delete_files` (`write`): Permanently delete a file from the system. This action cannot be undone.
- `download_files` (`read`): Download the binary content of a file. The response will contain the file data in the appropriate MIME type.
- `retry_files` (`write`): Retry processing of files that previously failed to process. This will re-attempt the processing of the specified files.
- `upload_files` (`write`): Upload a new file to the system. Supports various file formats including PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.

### Resource `tools`:

- `ai_detect_tools` (`write`): Detects if content is AI- or human-generated, with a confidence score. Content must have at least 350 characters
- `context_aware_splitting_tools` (`write`): Splits a long block of text (maximum 4000 words) into smaller chunks while preserving the semantic meaning of the text and context between the chunks.
- `parse_pdf_tools` (`write`): Parse PDF to other formats.
- `web_search_tools` (`write`): Search the web for information about a given query and return relevant results with source URLs.

### Resource `tools.comprehend`:

- `medical_tools_comprehend` (`write`): Analyze unstructured medical text to extract entities labeled with standardized medical codes and confidence scores.

### Resource `translation`:

- `translate_translation` (`write`): Translate text from one language to another.

### Resource `vision`:

- `analyze_vision` (`write`): Submit images and a prompt to generate an analysis of the images.
