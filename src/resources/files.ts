// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as FilesAPI from './files';
import { CursorPage, type CursorPageParams } from '../pagination';
import { type BlobLike } from '../uploads';
import { type Response } from '../_shims/index';

export class Files extends APIResource {
  /**
   * Get metadata of a file
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.get(`/v1/files/${fileId}`, options);
  }

  /**
   * Get metadata of all files
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
   * Download a file
   */
  download(fileId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/v1/files/${fileId}/download`, { ...options, __binaryResponse: true });
  }

  /**
   * Upload file
   */
  upload(params: FileUploadParams, options?: Core.RequestOptions): Core.APIPromise<File> {
    const {
      content,
      'Content-Disposition': contentDisposition,
      'Content-Length': contentLength,
      'Content-Type': contentType,
    } = params;
    return this._client.post('/v1/files', {
      body: content,
      ...options,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        'Content-Length': contentLength.toString(),
        ...options?.headers,
      },
      __binaryRequest: true,
    });
  }
}

export class FilesCursorPage extends CursorPage<File> {}

export interface File {
  id: string;

  created_at: string;

  graph_ids: Array<string>;

  name: string;
}

export interface FileDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface FileListParams extends CursorPageParams {
  graph_id?: string;

  limit?: number;

  order?: 'asc' | 'desc';
}

export interface FileUploadParams {
  /**
   * Body param:
   */
  content: string | ArrayBufferView | ArrayBuffer | BlobLike;

  /**
   * Header param:
   */
  'Content-Disposition': string;

  /**
   * Header param:
   */
  'Content-Length': number;

  /**
   * Header param:
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
