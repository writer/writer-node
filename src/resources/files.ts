// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieve detailed information about a specific file, including its metadata,
   * status, and associated graphs.
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/v1/files/${fileID}`, options);
  }

  /**
   * Retrieve a paginated list of files with optional filtering by status, graph
   * association, and file type.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FilesCursorPage, File> {
    return this._client.getAPIList('/v1/files', CursorPage<File>, { query, ...options });
  }

  /**
   * Permanently delete a file from the system. This action cannot be undone.
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<FileDeleteResponse> {
    return this._client.delete(path`/v1/files/${fileID}`, options);
  }

  /**
   * Download the binary content of a file. The response will contain the file data
   * in the appropriate MIME type.
   */
  download(fileID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/files/${fileID}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Retry processing of files that previously failed to process. This will
   * re-attempt the processing of the specified files.
   */
  retry(body: FileRetryParams, options?: RequestOptions): APIPromise<FileRetryResponse> {
    return this._client.post('/v1/files/retry', { body, ...options });
  }

  /**
   * Upload a new file to the system. Supports various file formats including PDF,
   * DOC, DOCX, PPT, PPTX, JPG, PNG, EML, HTML, SRT, CSV, XLS, and XLSX.
   */
  upload(params: FileUploadParams, options?: RequestOptions): APIPromise<File> {
    const { content, 'Content-Disposition': contentDisposition, graphId } = params;
    return this._client.post('/v1/files', {
      query: { graphId },
      body: content,
      ...options,
      headers: buildHeaders([
        { 'Content-Type': 'text/plain', 'Content-Disposition': contentDisposition },
        options?.headers,
      ]),
    });
  }
}

export type FilesCursorPage = CursorPage<File>;

export interface File {
  /**
   * A unique identifier of the file.
   */
  id: string;

  /**
   * The timestamp when the file was uploaded.
   */
  created_at: string;

  /**
   * A list of Knowledge Graph IDs that the file is associated with.
   *
   * If you provided a `graphId` during upload, the file is associated with that
   * Knowledge Graph. However, the `graph_ids` field in the upload response is an
   * empty list. The association will be visible in the `graph_ids` list when you
   * retrieve the file using the file retrieval endpoint.
   */
  graph_ids: Array<string>;

  /**
   * The name of the file.
   */
  name: string;

  /**
   * The processing status of the file.
   */
  status: string;
}

export interface FileDeleteResponse {
  /**
   * A unique identifier of the deleted file.
   */
  id: string;

  /**
   * Indicates whether the file was successfully deleted.
   */
  deleted: boolean;
}

export interface FileRetryResponse {
  /**
   * Indicates whether the retry operation was successful.
   */
  success?: boolean;
}

export interface FileListParams extends CursorPageParams {
  /**
   * The extensions of the files to retrieve. Separate multiple extensions with a
   * comma. For example: `pdf,jpg,docx`.
   */
  file_types?: string;

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

  /**
   * Specifies the status of the files to retrieve. Valid values are in_progress,
   * completed or failed.
   */
  status?: 'in_progress' | 'completed' | 'failed';
}

export interface FileRetryParams {
  /**
   * The unique identifier of the files to retry.
   */
  file_ids: Array<string>;
}

export interface FileUploadParams {
  /**
   * Body param:
   */
  content: Uploadable;

  /**
   * Header param: The disposition type of the file, typically used to indicate the
   * form-data name. Use `attachment` with the filename parameter to specify the name
   * of the file, for example: `attachment; filename=example.pdf`.
   */
  'Content-Disposition': string;

  /**
   * Query param: The unique identifier of the Knowledge Graph to associate the
   * uploaded file with.
   *
   * Note: The response from the upload endpoint does not include the `graphId`
   * field, but the association will be visible when you retrieve the file using the
   * file retrieval endpoint.
   */
  graphId?: string;
}

export declare namespace Files {
  export {
    type File as File,
    type FileDeleteResponse as FileDeleteResponse,
    type FileRetryResponse as FileRetryResponse,
    type FilesCursorPage as FilesCursorPage,
    type FileListParams as FileListParams,
    type FileRetryParams as FileRetryParams,
    type FileUploadParams as FileUploadParams,
  };
}
