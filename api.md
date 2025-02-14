# Shared

Types:

- <code><a href="./src/resources/shared.ts">ErrorMessage</a></code>
- <code><a href="./src/resources/shared.ts">ErrorObject</a></code>
- <code><a href="./src/resources/shared.ts">FunctionDefinition</a></code>
- <code><a href="./src/resources/shared.ts">FunctionParams</a></code>
- <code><a href="./src/resources/shared.ts">GraphData</a></code>
- <code><a href="./src/resources/shared.ts">Logprobs</a></code>
- <code><a href="./src/resources/shared.ts">LogprobsToken</a></code>
- <code><a href="./src/resources/shared.ts">Source</a></code>
- <code><a href="./src/resources/shared.ts">ToolCall</a></code>
- <code><a href="./src/resources/shared.ts">ToolCallStreaming</a></code>
- <code><a href="./src/resources/shared.ts">ToolChoiceJsonObject</a></code>
- <code><a href="./src/resources/shared.ts">ToolChoiceString</a></code>
- <code><a href="./src/resources/shared.ts">ToolParam</a></code>

# Applications

Types:

- <code><a href="./src/resources/applications/applications.ts">ApplicationGenerateContentChunk</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationGenerateContentResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationRetrieveResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationListResponse</a></code>

Methods:

- <code title="get /v1/applications/{application_id}">client.applications.<a href="./src/resources/applications/applications.ts">retrieve</a>(applicationID) -> ApplicationRetrieveResponse</code>
- <code title="get /v1/applications">client.applications.<a href="./src/resources/applications/applications.ts">list</a>({ ...params }) -> ApplicationListResponsesCursorPage</code>
- <code title="post /v1/applications/{application_id}">client.applications.<a href="./src/resources/applications/applications.ts">generateContent</a>(applicationID, { ...params }) -> ApplicationGenerateContentResponse</code>

## Jobs

Types:

- <code><a href="./src/resources/applications/jobs.ts">ApplicationGenerateAsyncResponse</a></code>
- <code><a href="./src/resources/applications/jobs.ts">ApplicationJobsListResponse</a></code>
- <code><a href="./src/resources/applications/jobs.ts">JobCreateResponse</a></code>
- <code><a href="./src/resources/applications/jobs.ts">JobRetryResponse</a></code>

Methods:

- <code title="post /v1/applications/{application_id}/jobs">client.applications.jobs.<a href="./src/resources/applications/jobs.ts">create</a>(applicationID, { ...params }) -> JobCreateResponse</code>
- <code title="get /v1/applications/jobs/{job_id}">client.applications.jobs.<a href="./src/resources/applications/jobs.ts">retrieve</a>(jobID) -> ApplicationGenerateAsyncResponse</code>
- <code title="get /v1/applications/{application_id}/jobs">client.applications.jobs.<a href="./src/resources/applications/jobs.ts">list</a>(applicationID, { ...params }) -> ApplicationGenerateAsyncResponsesApplicationJobsOffset</code>
- <code title="post /v1/applications/jobs/{job_id}/retry">client.applications.jobs.<a href="./src/resources/applications/jobs.ts">retry</a>(jobID) -> JobRetryResponse</code>

## Graphs

Types:

- <code><a href="./src/resources/applications/graphs.ts">ApplicationGraphsResponse</a></code>

Methods:

- <code title="put /v1/applications/{application_id}/graphs">client.applications.graphs.<a href="./src/resources/applications/graphs.ts">update</a>(applicationID, { ...params }) -> ApplicationGraphsResponse</code>
- <code title="get /v1/applications/{application_id}/graphs">client.applications.graphs.<a href="./src/resources/applications/graphs.ts">list</a>(applicationID) -> ApplicationGraphsResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat.ts">ChatCompletion</a></code>
- <code><a href="./src/resources/chat.ts">ChatCompletionChoice</a></code>
- <code><a href="./src/resources/chat.ts">ChatCompletionChunk</a></code>
- <code><a href="./src/resources/chat.ts">ChatCompletionMessage</a></code>
- <code><a href="./src/resources/chat.ts">ChatCompletionParams</a></code>
- <code><a href="./src/resources/chat.ts">ChatCompletionUsage</a></code>

Methods:

- <code title="post /v1/chat">client.chat.<a href="./src/resources/chat.ts">chat</a>({ ...params }) -> ChatCompletion</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">Completion</a></code>
- <code><a href="./src/resources/completions.ts">CompletionChunk</a></code>
- <code><a href="./src/resources/completions.ts">CompletionParams</a></code>

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
- <code><a href="./src/resources/graphs.ts">Question</a></code>
- <code><a href="./src/resources/graphs.ts">QuestionResponseChunk</a></code>
- <code><a href="./src/resources/graphs.ts">GraphCreateResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphUpdateResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphDeleteResponse</a></code>
- <code><a href="./src/resources/graphs.ts">GraphRemoveFileFromGraphResponse</a></code>

Methods:

- <code title="post /v1/graphs">client.graphs.<a href="./src/resources/graphs.ts">create</a>({ ...params }) -> GraphCreateResponse</code>
- <code title="get /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">retrieve</a>(graphID) -> Graph</code>
- <code title="put /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">update</a>(graphID, { ...params }) -> GraphUpdateResponse</code>
- <code title="get /v1/graphs">client.graphs.<a href="./src/resources/graphs.ts">list</a>({ ...params }) -> GraphsCursorPage</code>
- <code title="delete /v1/graphs/{graph_id}">client.graphs.<a href="./src/resources/graphs.ts">delete</a>(graphID) -> GraphDeleteResponse</code>
- <code title="post /v1/graphs/{graph_id}/file">client.graphs.<a href="./src/resources/graphs.ts">addFileToGraph</a>(graphID, { ...params }) -> File</code>
- <code title="post /v1/graphs/question">client.graphs.<a href="./src/resources/graphs.ts">question</a>({ ...params }) -> Question</code>
- <code title="delete /v1/graphs/{graph_id}/file/{file_id}">client.graphs.<a href="./src/resources/graphs.ts">removeFileFromGraph</a>(fileID, { ...params }) -> GraphRemoveFileFromGraphResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/files.ts">FileRetryResponse</a></code>

Methods:

- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorPage</code>
- <code title="delete /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> FileDeleteResponse</code>
- <code title="get /v1/files/{file_id}/download">client.files.<a href="./src/resources/files.ts">download</a>(fileID) -> Response</code>
- <code title="post /v1/files/retry">client.files.<a href="./src/resources/files.ts">retry</a>({ ...params }) -> FileRetryResponse</code>
- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> File</code>

# Tools

Types:

- <code><a href="./src/resources/tools/tools.ts">ToolContextAwareSplittingResponse</a></code>
- <code><a href="./src/resources/tools/tools.ts">ToolParsePdfResponse</a></code>

Methods:

- <code title="post /v1/tools/context-aware-splitting">client.tools.<a href="./src/resources/tools/tools.ts">contextAwareSplitting</a>({ ...params }) -> ToolContextAwareSplittingResponse</code>
- <code title="post /v1/tools/pdf-parser/{file_id}">client.tools.<a href="./src/resources/tools/tools.ts">parsePdf</a>(fileID, { ...params }) -> ToolParsePdfResponse</code>

## Comprehend

Types:

- <code><a href="./src/resources/tools/comprehend.ts">ComprehendMedicalResponse</a></code>

Methods:

- <code title="post /v1/tools/comprehend/medical">client.tools.comprehend.<a href="./src/resources/tools/comprehend.ts">medical</a>({ ...params }) -> ComprehendMedicalResponse</code>
