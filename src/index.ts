// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Pagination from './pagination';
import * as API from './resources/index';

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
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
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
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  chat: API.ChatResource = new API.ChatResource(this);
  completions: API.Completions = new API.Completions(this);
  models: API.Models = new API.Models(this);
  graphs: API.Graphs = new API.Graphs(this);
  files: API.Files = new API.Files(this);

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

export const {
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
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Writer {
  export import RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export import CursorPageParams = Pagination.CursorPageParams;
  export import CursorPageResponse = Pagination.CursorPageResponse;

  export import ChatResource = API.ChatResource;
  export import Chat = API.Chat;
  export import ChatStreamingData = API.ChatStreamingData;
  export import ChatChatParams = API.ChatChatParams;
  export import ChatChatParamsNonStreaming = API.ChatChatParamsNonStreaming;
  export import ChatChatParamsStreaming = API.ChatChatParamsStreaming;

  export import Completions = API.Completions;
  export import Completion = API.Completion;
  export import StreamingData = API.StreamingData;
  export import CompletionCreateParams = API.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = API.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = API.CompletionCreateParamsStreaming;

  export import Models = API.Models;
  export import ModelListResponse = API.ModelListResponse;

  export import Graphs = API.Graphs;
  export import Graph = API.Graph;
  export import GraphCreateResponse = API.GraphCreateResponse;
  export import GraphUpdateResponse = API.GraphUpdateResponse;
  export import GraphDeleteResponse = API.GraphDeleteResponse;
  export import GraphRemoveFileFromGraphResponse = API.GraphRemoveFileFromGraphResponse;
  export import GraphsCursorPage = API.GraphsCursorPage;
  export import GraphCreateParams = API.GraphCreateParams;
  export import GraphUpdateParams = API.GraphUpdateParams;
  export import GraphListParams = API.GraphListParams;
  export import GraphAddFileToGraphParams = API.GraphAddFileToGraphParams;

  export import Files = API.Files;
  export import File = API.File;
  export import FileDeleteResponse = API.FileDeleteResponse;
  export import FilesCursorPage = API.FilesCursorPage;
  export import FileListParams = API.FileListParams;
  export import FileUploadParams = API.FileUploadParams;
}

export default Writer;
