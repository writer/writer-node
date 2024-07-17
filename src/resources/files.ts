// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as FilesAPI from './files';
import { CursorPage, type CursorPageParams } from '../pagination';
import { type Response } from '../_shims/index';

export class Files extends APIResource {
  /**
   * Retrieve file
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.get(`/v1/files/${fileId}`, options);
  }

  /**
   * List files
   */
  list(query?: FileListParams, options?: Core.RequestOptions): Core.PagePromise<FilesCursorPage, File>;
  list(options?: Core.RequestOptions): Core.PagePromise<FilesCursorPage, File>;
  list(
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FilesCursorPage, File> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/files', FilesCursorPage, { query, ...options });
  }

  /**
   * Delete file
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/v1/files/${fileId}`, options);
  }

  /**
   * Download file
   */
  download(fileId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/v1/files/${fileId}/download`, { ...options, __binaryResponse: true });
  }

  /**
   * Upload file
   */
  upload(params: FileUploadParams, options?: Core.RequestOptions): Core.APIPromise<File> {
    const { content, 'Content-Disposition': contentDisposition, 'Content-Type': contentType } = params;
    return this._client.post('/v1/files', {
      body: content,
      ...options,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        ...options?.headers,
      },
      __binaryRequest: true,
    });
  }
}

export class FilesCursorPage extends CursorPage<File> {}

export interface File {
  /**
   * A unique identifier of the graph.
   */
  id: string;

  /**
   * The timestamp when the graph was created.
   */
  created_at: string;

  /**
   * A list of graph IDs that the file is associated with.
   */
  graph_ids: Array<string>;

  /**
   * The name of the graph.
   */
  name: string;
}

export interface FileDeleteResponse {
  /**
   * A unique identifier of the deleted graph.
   */
  id: string;

  /**
   * Indicates whether the graph was successfully deleted.
   */
  deleted: boolean;
}

export interface FileListParams extends CursorPageParams {
  /**
   * The unique identifier of the graph to which the files belong.
   */
  graph_id?: string;

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

export interface FileUploadParams {
  /**
   * Body param:
   */
  content: Core.Uploadable;

  /**
   * Header param: The disposition type of the file, typically used to indicate the
   * form-data name.
   */
  'Content-Disposition': string;

  /**
   * Header param: The MIME type of the file being uploaded.
   */
  'Content-Type': string;
}

export namespace Files {
  export import File = FilesAPI.File;
  export import FileDeleteResponse = FilesAPI.FileDeleteResponse;
  export import FilesCursorPage = FilesAPI.FilesCursorPage;
  export import FileListParams = FilesAPI.FileListParams;
  export import FileUploadParams = FilesAPI.FileUploadParams;
}
