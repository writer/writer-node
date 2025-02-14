// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as GraphsAPI from './graphs';
import * as FilesAPI from './files';
import * as Shared from './shared';
import { APIPromise } from '../api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../pagination';
import { Stream } from '../streaming';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Graphs extends APIResource {
  /**
   * Create graph
   */
  create(body: GraphCreateParams, options?: RequestOptions): APIPromise<GraphCreateResponse> {
    return this._client.post('/v1/graphs', { body, ...options });
  }

  /**
   * Retrieve graph
   */
  retrieve(graphID: string, options?: RequestOptions): APIPromise<Graph> {
    return this._client.get(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Update graph
   */
  update(
    graphID: string,
    body: GraphUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GraphUpdateResponse> {
    return this._client.put(path`/v1/graphs/${graphID}`, { body, ...options });
  }

  /**
   * List graphs
   */
  list(
    query: GraphListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<GraphsCursorPage, Graph> {
    return this._client.getAPIList('/v1/graphs', CursorPage<Graph>, { query, ...options });
  }

  /**
   * Delete graph
   */
  delete(graphID: string, options?: RequestOptions): APIPromise<GraphDeleteResponse> {
    return this._client.delete(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Add file to graph
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
   * Remove file from graph
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
   * A unique identifier of the graph.
   */
  id: string;

  /**
   * The timestamp when the graph was created.
   */
  created_at: string;

  file_status: Graph.FileStatus;

  /**
   * The name of the graph.
   */
  name: string;

  /**
   * The type of graph, either `manual` (files are uploaded via UI or API) or
   * `connector` (files are uploaded via a connector).
   */
  type: 'manual' | 'connector';

  /**
   * A description of the graph.
   */
  description?: string;
}

export namespace Graph {
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
     * The total number of files associated with the graph.
     */
    total: number;
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

  sources: Array<Shared.Source>;

  subqueries?: Array<Question.Subquery>;
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

    sources: Array<Shared.Source>;
  }
}

export interface QuestionResponseChunk {
  data: Question;
}

export interface GraphCreateResponse {
  /**
   * A unique identifier of the graph.
   */
  id: string;

  /**
   * The timestamp when the graph was created.
   */
  created_at: string;

  /**
   * The name of the graph. This can be at most 255 characters.
   */
  name: string;

  /**
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;
}

export interface GraphUpdateResponse {
  /**
   * A unique identifier of the graph.
   */
  id: string;

  /**
   * The timestamp when the graph was created.
   */
  created_at: string;

  /**
   * The name of the graph. This can be at most 255 characters.
   */
  name: string;

  /**
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;
}

export interface GraphDeleteResponse {
  /**
   * A unique identifier of the deleted graph.
   */
  id: string;

  /**
   * Indicates whether the graph was successfully deleted.
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
   * The name of the graph. This can be at most 255 characters.
   */
  name: string;

  /**
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;
}

export interface GraphUpdateParams {
  /**
   * The name of the graph. This can be at most 255 characters.
   */
  name: string;

  /**
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;
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
   * The unique identifiers of the Knowledge Graphs to be queried.
   */
  graph_ids: Array<string>;

  /**
   * The question to be answered using the Knowledge Graph.
   */
  question: string;

  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream: boolean;

  /**
   * Specify whether to include subqueries.
   */
  subqueries: boolean;
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
  stream: false;
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
   * The unique identifier of the graph to which the files belong.
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
