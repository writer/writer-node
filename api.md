# Chat

Types:

- <code><a href="./src/resources/chat.ts">Chat</a></code>
- <code><a href="./src/resources/chat.ts">ChatStreamingData</a></code>

Methods:

- <code title="post /v1/chat">client.chat.<a href="./src/resources/chat.ts">chat</a>({ ...params }) -> Chat</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">Completion</a></code>
- <code><a href="./src/resources/completions.ts">StreamingData</a></code>

Methods:

- <code title="post /v1/completions">client.completions.<a href="./src/resources/completions.ts">create</a>({ ...params }) -> Completion</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>() -> ModelListResponse</code>

# Graphs

Types:

- <code><a href="./src/resources/graphs.ts">Graph</a></code>
- <code><a href="./src/resources/graphs.ts">GraphCreateResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphUpdateResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphDeleteResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphRemoveFileFromGraphResponse</a></code>

Methods:

- <code title="post /v1/graphs">client.graphs.<a href="./src/resources/graphs.ts">create</a>({ ...params }) -> GraphCreateResponse</code>
- <code title="get /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">retrieve</a>(graphId) -> Graph</code>
- <code title="put /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">update</a>(graphId, { ...params }) -> GraphUpdateResponse</code>
- <code title="get /v1/graphs">client.graphs.<a href="./src/resources/graphs.ts">list</a>({ ...params }) -> GraphsCursorPage</code>
- <code title="delete /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">delete</a>(graphId) -> GraphDeleteResponse</code>
- <code title="post /v1/graphs/{graph_id}/file">client.graphs.<a href="./src/resources/graphs.ts">addFileToGraph</a>(graphId, { ...params }) -> File</code>
- <code title="delete /v1/graphs/{graph_id}/file/{file_id}">client.graphs.<a href="./src/resources/graphs.ts">removeFileFromGraph</a>(graphId, fileId) -> GraphRemoveFileFromGraphResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>

Methods:

- <code title="get /v1/files/{fileId}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileId) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorPage</code>
- <code title="delete /v1/files/{fileId}">client.files.<a href="./src/resources/files.ts">delete</a>(fileId) -> FileDeleteResponse</code>
- <code title="get /v1/files/{fileId}/download">client.files.<a href="./src/resources/files.ts">download</a>(fileId) -> Response</code>
- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> File</code>
