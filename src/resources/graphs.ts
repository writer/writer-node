// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as GraphsAPI from './graphs';
import * as FilesAPI from './files';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Graphs extends APIResource {
  create(body: GraphCreateParams, options?: Core.RequestOptions): Core.APIPromise<GraphCreateResponse> {
    return this._client.post('/v1/graphs', { body, ...options });
  }

  retrieve(graphId: string, options?: Core.RequestOptions): Core.APIPromise<Graph> {
    return this._client.get(`/v1/graphs/${graphId}`, options);
  }

  update(
    graphId: string,
    body: GraphUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<GraphUpdateResponse> {
    return this._client.put(`/v1/graphs/${graphId}`, { body, ...options });
  }

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

  delete(graphId: string, options?: Core.RequestOptions): Core.APIPromise<GraphDeleteResponse> {
    return this._client.delete(`/v1/graphs/${graphId}`, options);
  }

  addFileToGraph(
    graphId: string,
    body: GraphAddFileToGraphParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FilesAPI.File> {
    return this._client.post(`/v1/graphs/${graphId}/file`, { body, ...options });
  }

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
  id: string;

  created_at: string;

  file_status: Graph.FileStatus;

  name: string;

  description?: string;
}

export namespace Graph {
  export interface FileStatus {
    completed: number;

    failed: number;

    in_progress: number;

    total: number;
  }
}

export interface GraphCreateResponse {
  id: string;

  created_at: string;

  name: string;

  description?: string;
}

export interface GraphUpdateResponse {
  id: string;

  created_at: string;

  name: string;

  description?: string;
}

export interface GraphDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface GraphRemoveFileFromGraphResponse {
  id: string;

  deleted: boolean;
}

export interface GraphCreateParams {
  name: string;

  description?: string;
}

export interface GraphUpdateParams {
  name: string;

  description?: string;
}

export interface GraphListParams extends CursorPageParams {
  limit?: number;

  order?: 'asc' | 'desc';
}

export interface GraphAddFileToGraphParams {
  file_id: string;
}

export namespace Graphs {
  export import Graph = GraphsAPI.Graph;
  export import GraphCreateResponse = GraphsAPI.GraphCreateResponse;
  export import GraphUpdateResponse = GraphsAPI.GraphUpdateResponse;
  export import GraphDeleteResponse = GraphsAPI.GraphDeleteResponse;
  export import GraphRemoveFileFromGraphResponse = GraphsAPI.GraphRemoveFileFromGraphResponse;
  export import GraphsCursorPage = GraphsAPI.GraphsCursorPage;
  export import GraphCreateParams = GraphsAPI.GraphCreateParams;
  export import GraphUpdateParams = GraphsAPI.GraphUpdateParams;
  export import GraphListParams = GraphsAPI.GraphListParams;
  export import GraphAddFileToGraphParams = GraphsAPI.GraphAddFileToGraphParams;
}
