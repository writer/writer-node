// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GraphsAPI from './graphs';
import * as FilesAPI from './files';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { Stream } from '../core/streaming';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Graphs extends APIResource {
  /**
   * Create a new Knowledge Graph.
   */
  create(body: GraphCreateParams, options?: RequestOptions): APIPromise<GraphCreateResponse> {
    return this._client.post('/v1/graphs', { body, ...options });
  }

  /**
   * Retrieve a Knowledge Graph.
   */
  retrieve(graphID: string, options?: RequestOptions): APIPromise<Graph> {
    return this._client.get(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Update the name and description of a Knowledge Graph.
   */
  update(
    graphID: string,
    body: GraphUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GraphUpdateResponse> {
    return this._client.put(path`/v1/graphs/${graphID}`, { body, ...options });
  }

  /**
   * Retrieve a list of Knowledge Graphs.
   */
  list(
    query: GraphListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<GraphsCursorPage, Graph> {
    return this._client.getAPIList('/v1/graphs', CursorPage<Graph>, { query, ...options });
  }

  /**
   * Delete a Knowledge Graph.
   */
  delete(graphID: string, options?: RequestOptions): APIPromise<GraphDeleteResponse> {
    return this._client.delete(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Add a file to a Knowledge Graph.
   */
  addFileToGraph(
    graphID: string,
    body: GraphAddFileToGraphParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.File> {
    return this._client.post(path`/v1/graphs/${graphID}/file`, { body, ...options });
  }

  /**
   * Ask a question to specified Knowledge Graphs.
   */
  question(body: GraphQuestionParamsNonStreaming, options?: RequestOptions): APIPromise<Question>;
  question(
    body: GraphQuestionParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<QuestionResponseChunk>>;
  question(
    body: GraphQuestionParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<QuestionResponseChunk> | Question>;
  question(
    body: GraphQuestionParams,
    options?: RequestOptions,
  ): APIPromise<Question> | APIPromise<Stream<QuestionResponseChunk>> {
    return this._client.post('/v1/graphs/question', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<Question>
      | APIPromise<Stream<QuestionResponseChunk>>;
  }

  /**
   * Remove a file from a Knowledge Graph.
   */
  removeFileFromGraph(
    fileID: string,
    params: GraphRemoveFileFromGraphParams,
    options?: RequestOptions,
  ): APIPromise<GraphRemoveFileFromGraphResponse> {
    const { graph_id } = params;
    return this._client.delete(path`/v1/graphs/${graph_id}/file/${fileID}`, options);
  }
}

export type GraphsCursorPage = CursorPage<Graph>;

export interface Graph {
  /**
   * The unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The processing status of files in the Knowledge Graph.
   */
  file_status: Graph.FileStatus;

  /**
   * The name of the Knowledge Graph.
   */
  name: string;

  /**
   * The type of Knowledge Graph.
   *
   * - `manual`: files are uploaded via UI or API
   * - `connector`: files are uploaded via a data connector such as Google Drive or
   *   Confluence
   * - `web`: URLs are connected to the Knowledge Graph
   */
  type: 'manual' | 'connector' | 'web';

  /**
   * A description of the Knowledge Graph.
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<Graph.URL>;
}

export namespace Graph {
  /**
   * The processing status of files in the Knowledge Graph.
   */
  export interface FileStatus {
    /**
     * The number of files that have been successfully processed.
     */
    completed: number;

    /**
     * The number of files that failed to process.
     */
    failed: number;

    /**
     * The number of files currently being processed.
     */
    in_progress: number;

    /**
     * The total number of files associated with the Knowledge Graph.
     */
    total: number;
  }

  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface Question {
  /**
   * The answer to the question.
   */
  answer: string;

  /**
   * The question that was asked.
   */
  question: string;

  sources: Array<Shared.Source | null>;

  subqueries?: Array<Question.Subquery | null>;
}

export namespace Question {
  export interface Subquery {
    /**
     * The answer to the subquery.
     */
    answer: string;

    /**
     * The subquery that was asked.
     */
    query: string;

    sources: Array<Shared.Source | null>;
  }
}

export interface QuestionResponseChunk {
  data: Question;
}

export interface GraphCreateResponse {
  /**
   * A unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The name of the Knowledge Graph (max 255 characters).
   */
  name: string;

  /**
   * A description of the Knowledge Graph (max 255 characters).
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<GraphCreateResponse.URL>;
}

export namespace GraphCreateResponse {
  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface GraphUpdateResponse {
  /**
   * A unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The name of the Knowledge Graph (max 255 characters).
   */
  name: string;

  /**
   * A description of the Knowledge Graph (max 255 characters).
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<GraphUpdateResponse.URL>;
}

export namespace GraphUpdateResponse {
  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface GraphDeleteResponse {
  /**
   * A unique identifier of the deleted Knowledge Graph.
   */
  id: string;

  /**
   * Indicates whether the Knowledge Graph was successfully deleted.
   */
  deleted: boolean;
}

export interface GraphRemoveFileFromGraphResponse {
  /**
   * A unique identifier of the deleted file.
   */
  id: string;

  /**
   * Indicates whether the file was successfully deleted.
   */
  deleted: boolean;
}

export interface GraphCreateParams {
  /**
   * A description of the Knowledge Graph (max 255 characters). Omitting this field
   * leaves the description unchanged.
   */
  description?: string;

  /**
   * The name of the Knowledge Graph (max 255 characters). Omitting this field leaves
   * the name unchanged.
   */
  name?: string;
}

export interface GraphUpdateParams {
  /**
   * A description of the Knowledge Graph (max 255 characters). Omitting this field
   * leaves the description unchanged.
   */
  description?: string;

  /**
   * The name of the Knowledge Graph (max 255 characters). Omitting this field leaves
   * the name unchanged.
   */
  name?: string;

  /**
   * An array of web connector URLs to update for this Knowledge Graph. You can only
   * connect URLs to Knowledge Graphs with the type `web`. To clear the list of URLs,
   * set this field to an empty array.
   */
  urls?: Array<GraphUpdateParams.URL>;
}

export namespace GraphUpdateParams {
  export interface URL {
    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }
}

export interface GraphListParams extends CursorPageParams {
  /**
   * Specifies the maximum number of objects returned in a page. The default value
   * is 50. The minimum value is 1, and the maximum value is 100.
   */
  limit?: number;

  /**
   * Specifies the order of the results. Valid values are asc for ascending and desc
   * for descending.
   */
  order?: 'asc' | 'desc';
}

export interface GraphAddFileToGraphParams {
  /**
   * The unique identifier of the file.
   */
  file_id: string;
}

export type GraphQuestionParams = GraphQuestionParamsNonStreaming | GraphQuestionParamsStreaming;

export interface GraphQuestionParamsBase {
  /**
   * The unique identifiers of the Knowledge Graphs to query.
   */
  graph_ids: Array<string>;

  /**
   * The question to answer using the Knowledge Graph.
   */
  question: string;

  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: boolean;

  /**
   * Specify whether to include subqueries.
   */
  subqueries?: boolean;
}

export namespace GraphQuestionParams {
  export type GraphQuestionParamsNonStreaming = GraphsAPI.GraphQuestionParamsNonStreaming;
  export type GraphQuestionParamsStreaming = GraphsAPI.GraphQuestionParamsStreaming;
}

export interface GraphQuestionParamsNonStreaming extends GraphQuestionParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: false;
}

export interface GraphQuestionParamsStreaming extends GraphQuestionParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream: true;
}

export interface GraphRemoveFileFromGraphParams {
  /**
   * The unique identifier of the Knowledge Graph to which the files belong.
   */
  graph_id: string;
}

export declare namespace Graphs {
  export {
    type Graph as Graph,
    type Question as Question,
    type QuestionResponseChunk as QuestionResponseChunk,
    type GraphCreateResponse as GraphCreateResponse,
    type GraphUpdateResponse as GraphUpdateResponse,
    type GraphDeleteResponse as GraphDeleteResponse,
    type GraphRemoveFileFromGraphResponse as GraphRemoveFileFromGraphResponse,
    type GraphsCursorPage as GraphsCursorPage,
    type GraphCreateParams as GraphCreateParams,
    type GraphUpdateParams as GraphUpdateParams,
    type GraphListParams as GraphListParams,
    type GraphAddFileToGraphParams as GraphAddFileToGraphParams,
    type GraphQuestionParams as GraphQuestionParams,
    type GraphQuestionParamsNonStreaming as GraphQuestionParamsNonStreaming,
    type GraphQuestionParamsStreaming as GraphQuestionParamsStreaming,
    type GraphRemoveFileFromGraphParams as GraphRemoveFileFromGraphParams,
  };
}
