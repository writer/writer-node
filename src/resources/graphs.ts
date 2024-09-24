// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as GraphsAPI from './graphs';
import * as FilesAPI from './files';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Graphs extends APIResource {
  /**
   * Create graph
   */
  create(body: GraphCreateParams, options?: Core.RequestOptions): Core.APIPromise<GraphCreateResponse> {
    return this._client.post('/v1/graphs', { body, ...options });
  }

  /**
   * Retrieve graph
   */
  retrieve(graphId: string, options?: Core.RequestOptions): Core.APIPromise<Graph> {
    return this._client.get(`/v1/graphs/${graphId}`, options);
  }

  /**
   * Update graph
   */
  update(
    graphId: string,
    body: GraphUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<GraphUpdateResponse> {
    return this._client.put(`/v1/graphs/${graphId}`, { body, ...options });
  }

  /**
   * List graphs
   */
  list(query?: GraphListParams, options?: Core.RequestOptions): Core.PagePromise<GraphsCursorPage, Graph>;
  list(options?: Core.RequestOptions): Core.PagePromise<GraphsCursorPage, Graph>;
  list(
    query: GraphListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<GraphsCursorPage, Graph> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/graphs', GraphsCursorPage, { query, ...options });
  }

  /**
   * Delete graph
   */
  delete(graphId: string, options?: Core.RequestOptions): Core.APIPromise<GraphDeleteResponse> {
    return this._client.delete(`/v1/graphs/${graphId}`, options);
  }

  /**
   * Add file to graph
   */
  addFileToGraph(
    graphId: string,
    body: GraphAddFileToGraphParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FilesAPI.File> {
    return this._client.post(`/v1/graphs/${graphId}/file`, { body, ...options });
  }

  /**
   * Knowledge Graph question
   */
  question(body: GraphQuestionParams, options?: Core.RequestOptions): Core.APIPromise<GraphQuestionResponse> {
    return this._client.post('/v1/graphs/question', { body, ...options });
  }

  /**
   * Remove file from graph
   */
  removeFileFromGraph(
    graphId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<GraphRemoveFileFromGraphResponse> {
    return this._client.delete(`/v1/graphs/${graphId}/file/${fileId}`, options);
  }
}

export class GraphsCursorPage extends CursorPage<Graph> {}

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

export interface GraphQuestionResponse {
  /**
   * The answer to the question.
   */
  answer: string;

  /**
   * The question that was asked.
   */
  question: string;

  sources: Array<GraphQuestionResponse.Source>;

  subqueries?: Array<GraphQuestionResponse.Subquery>;
}

export namespace GraphQuestionResponse {
  export interface Source {
    /**
     * The unique identifier of the file.
     */
    file_id: string;

    /**
     * A snippet of text from the source file.
     */
    snippet: string;
  }

  export interface Subquery {
    /**
     * The answer to the subquery.
     */
    answer: string;

    /**
     * The subquery that was asked.
     */
    query: string;

    sources: Array<Subquery.Source>;
  }

  export namespace Subquery {
    export interface Source {
      /**
       * The unique identifier of the file.
       */
      file_id: string;

      /**
       * A snippet of text from the source file.
       */
      snippet: string;
    }
  }
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
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;

  /**
   * The name of the graph. This can be at most 255 characters.
   */
  name?: string;
}

export interface GraphUpdateParams {
  /**
   * A description of the graph. This can be at most 255 characters.
   */
  description?: string;

  /**
   * The name of the graph. This can be at most 255 characters.
   */
  name?: string;
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

export interface GraphQuestionParams {
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

export namespace Graphs {
  export import Graph = GraphsAPI.Graph;
  export import GraphCreateResponse = GraphsAPI.GraphCreateResponse;
  export import GraphUpdateResponse = GraphsAPI.GraphUpdateResponse;
  export import GraphDeleteResponse = GraphsAPI.GraphDeleteResponse;
  export import GraphQuestionResponse = GraphsAPI.GraphQuestionResponse;
  export import GraphRemoveFileFromGraphResponse = GraphsAPI.GraphRemoveFileFromGraphResponse;
  export import GraphsCursorPage = GraphsAPI.GraphsCursorPage;
  export import GraphCreateParams = GraphsAPI.GraphCreateParams;
  export import GraphUpdateParams = GraphsAPI.GraphUpdateParams;
  export import GraphListParams = GraphsAPI.GraphListParams;
  export import GraphAddFileToGraphParams = GraphsAPI.GraphAddFileToGraphParams;
  export import GraphQuestionParams = GraphsAPI.GraphQuestionParams;
}
