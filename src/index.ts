// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type CursorPageParams, CursorPageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  ApplicationGenerateContentChunk,
  ApplicationGenerateContentParams,
  ApplicationGenerateContentParamsNonStreaming,
  ApplicationGenerateContentParamsStreaming,
  ApplicationGenerateContentResponse,
  Applications,
} from './resources/applications';
import {
  Chat,
  ChatChatParams,
  ChatChatParamsNonStreaming,
  ChatChatParamsStreaming,
  ChatCompletion,
  ChatCompletionChoice,
  ChatCompletionChunk,
  ChatCompletionMessage,
  ChatCompletionParams,
  ChatCompletionUsage,
} from './resources/chat';
import {
  Completion,
  CompletionChunk,
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  CompletionParams,
  Completions,
} from './resources/completions';
import {
  File,
  FileDeleteResponse,
  FileListParams,
  FileRetryParams,
  FileRetryResponse,
  FileUploadParams,
  Files,
  FilesCursorPage,
} from './resources/files';
import {
  Graph,
  GraphAddFileToGraphParams,
  GraphCreateParams,
  GraphCreateResponse,
  GraphDeleteResponse,
  GraphListParams,
  GraphQuestionParams,
  GraphQuestionParamsNonStreaming,
  GraphQuestionParamsStreaming,
  GraphRemoveFileFromGraphResponse,
  GraphUpdateParams,
  GraphUpdateResponse,
  Graphs,
  GraphsCursorPage,
  Question,
  QuestionResponseChunk,
} from './resources/graphs';
import { ModelListResponse, Models } from './resources/models';
import {
  ToolContextAwareSplittingParams,
  ToolContextAwareSplittingResponse,
  ToolParsePdfParams,
  ToolParsePdfResponse,
  Tools,
} from './resources/tools/tools';

export interface ClientOptions {
  /**
   * Defaults to process.env['WRITER_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['WRITER_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Writer API.
 */
export class Writer extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Writer API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['WRITER_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['WRITER_BASE_URL'] ?? https://api.writer.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=3 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('WRITER_BASE_URL'),
    apiKey = Core.readEnv('WRITER_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.WriterError(
        "The WRITER_API_KEY environment variable is missing or empty; either provide it, or instantiate the Writer client with an apiKey option, like new Writer({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.writer.com`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 180000 /* 3 minutes */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  applications: API.Applications = new API.Applications(this);
  chat: API.Chat = new API.Chat(this);
  completions: API.Completions = new API.Completions(this);
  models: API.Models = new API.Models(this);
  graphs: API.Graphs = new API.Graphs(this);
  files: API.Files = new API.Files(this);
  tools: API.Tools = new API.Tools(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Writer = this;
  static DEFAULT_TIMEOUT = 180000; // 3 minutes

  static WriterError = Errors.WriterError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Writer.Applications = Applications;
Writer.Chat = Chat;
Writer.Completions = Completions;
Writer.Models = Models;
Writer.Graphs = Graphs;
Writer.GraphsCursorPage = GraphsCursorPage;
Writer.Files = Files;
Writer.FilesCursorPage = FilesCursorPage;
Writer.Tools = Tools;
export declare namespace Writer {
  export type RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export {
    Applications as Applications,
    type ApplicationGenerateContentChunk as ApplicationGenerateContentChunk,
    type ApplicationGenerateContentResponse as ApplicationGenerateContentResponse,
    type ApplicationGenerateContentParams as ApplicationGenerateContentParams,
    type ApplicationGenerateContentParamsNonStreaming as ApplicationGenerateContentParamsNonStreaming,
    type ApplicationGenerateContentParamsStreaming as ApplicationGenerateContentParamsStreaming,
  };

  export {
    Chat as Chat,
    type ChatCompletion as ChatCompletion,
    type ChatCompletionChoice as ChatCompletionChoice,
    type ChatCompletionChunk as ChatCompletionChunk,
    type ChatCompletionMessage as ChatCompletionMessage,
    type ChatCompletionParams as ChatCompletionParams,
    type ChatCompletionUsage as ChatCompletionUsage,
    type ChatChatParams as ChatChatParams,
    type ChatChatParamsNonStreaming as ChatChatParamsNonStreaming,
    type ChatChatParamsStreaming as ChatChatParamsStreaming,
  };

  export {
    Completions as Completions,
    type Completion as Completion,
    type CompletionChunk as CompletionChunk,
    type CompletionParams as CompletionParams,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };

  export { Models as Models, type ModelListResponse as ModelListResponse };

  export {
    Graphs as Graphs,
    type Graph as Graph,
    type Question as Question,
    type QuestionResponseChunk as QuestionResponseChunk,
    type GraphCreateResponse as GraphCreateResponse,
    type GraphUpdateResponse as GraphUpdateResponse,
    type GraphDeleteResponse as GraphDeleteResponse,
    type GraphRemoveFileFromGraphResponse as GraphRemoveFileFromGraphResponse,
    GraphsCursorPage as GraphsCursorPage,
    type GraphCreateParams as GraphCreateParams,
    type GraphUpdateParams as GraphUpdateParams,
    type GraphListParams as GraphListParams,
    type GraphAddFileToGraphParams as GraphAddFileToGraphParams,
    type GraphQuestionParams as GraphQuestionParams,
    type GraphQuestionParamsNonStreaming as GraphQuestionParamsNonStreaming,
    type GraphQuestionParamsStreaming as GraphQuestionParamsStreaming,
  };

  export {
    Files as Files,
    type File as File,
    type FileDeleteResponse as FileDeleteResponse,
    type FileRetryResponse as FileRetryResponse,
    FilesCursorPage as FilesCursorPage,
    type FileListParams as FileListParams,
    type FileRetryParams as FileRetryParams,
    type FileUploadParams as FileUploadParams,
  };

  export {
    Tools as Tools,
    type ToolContextAwareSplittingResponse as ToolContextAwareSplittingResponse,
    type ToolParsePdfResponse as ToolParsePdfResponse,
    type ToolContextAwareSplittingParams as ToolContextAwareSplittingParams,
    type ToolParsePdfParams as ToolParsePdfParams,
  };

  export type ErrorMessage = API.ErrorMessage;
  export type ErrorObject = API.ErrorObject;
  export type FunctionDefinition = API.FunctionDefinition;
  export type FunctionParams = API.FunctionParams;
  export type GraphData = API.GraphData;
  export type Logprobs = API.Logprobs;
  export type LogprobsToken = API.LogprobsToken;
  export type Source = API.Source;
  export type ToolCall = API.ToolCall;
  export type ToolCallStreaming = API.ToolCallStreaming;
  export type ToolChoiceJsonObject = API.ToolChoiceJsonObject;
  export type ToolChoiceString = API.ToolChoiceString;
  export type ToolParam = API.ToolParam;
}

export { toFile, fileFromPath } from './uploads';
export {
  WriterError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Writer;
