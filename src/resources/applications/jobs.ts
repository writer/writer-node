// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ApplicationsAPI from './applications';
import { APIPromise } from '../../api-promise';
import { ApplicationJobsOffset, type ApplicationJobsOffsetParams, PagePromise } from '../../pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jobs extends APIResource {
  /**
   * Generate content asynchronously from an existing application with inputs.
   */
  create(
    applicationID: string,
    body: JobCreateParams,
    options?: RequestOptions,
  ): APIPromise<JobCreateResponse> {
    return this._client.post(path`/v1/applications/${applicationID}/jobs`, { body, ...options });
  }

  /**
   * Retrieves a single job created via the Async API.
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<ApplicationGenerateAsyncResponse> {
    return this._client.get(path`/v1/applications/jobs/${jobID}`, options);
  }

  /**
   * Retrieve all jobs created via the async API, linked to the provided application
   * ID (or alias).
   */
  list(
    applicationID: string,
    query: JobListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ApplicationGenerateAsyncResponsesApplicationJobsOffset, ApplicationGenerateAsyncResponse> {
    return this._client.getAPIList(
      path`/v1/applications/${applicationID}/jobs`,
      ApplicationJobsOffset<ApplicationGenerateAsyncResponse>,
      { query, ...options },
    );
  }

  /**
   * Re-triggers the async execution of a single job previously created via the Async
   * api and terminated in error.
   */
  retry(jobID: string, options?: RequestOptions): APIPromise<JobRetryResponse> {
    return this._client.post(path`/v1/applications/jobs/${jobID}/retry`, options);
  }
}

export type ApplicationGenerateAsyncResponsesApplicationJobsOffset =
  ApplicationJobsOffset<ApplicationGenerateAsyncResponse>;

export interface ApplicationGenerateAsyncResponse {
  /**
   * The unique identifier for the job.
   */
  id: string;

  /**
   * The ID of the application associated with this job.
   */
  application_id: string;

  /**
   * The timestamp when the job was created.
   */
  created_at: string;

  /**
   * The status of the job.
   */
  status: 'in_progress' | 'failed' | 'completed';

  /**
   * The timestamp when the job was completed.
   */
  completed_at?: string;

  /**
   * The result of the completed job, if applicable.
   */
  data?: ApplicationsAPI.ApplicationGenerateContentResponse;

  /**
   * The error message if the job failed.
   */
  error?: string;

  /**
   * The timestamp when the job was last updated.
   */
  updated_at?: string;
}

export interface ApplicationJobsListResponse {
  result: Array<ApplicationGenerateAsyncResponse>;

  pagination?: ApplicationJobsListResponse.Pagination;

  /**
   * The total number of jobs associated with the application.
   */
  totalCount?: number;
}

export namespace ApplicationJobsListResponse {
  export interface Pagination {
    /**
     * The pagination limit for retrieving the jobs.
     */
    limit?: number;

    /**
     * The pagination offset for retrieving the jobs.
     */
    offset?: number;
  }
}

export interface JobCreateResponse {
  /**
   * The unique identifier for the async job created.
   */
  id: string;

  /**
   * The timestamp when the job was created.
   */
  created_at: string;

  /**
   * The status of the job.
   */
  status: 'in_progress' | 'failed' | 'completed';
}

export interface JobRetryResponse {
  /**
   * The unique identifier for the async job created.
   */
  id: string;

  /**
   * The timestamp when the job was created.
   */
  created_at: string;

  /**
   * The status of the job.
   */
  status: 'in_progress' | 'failed' | 'completed';
}

export interface JobCreateParams {
  /**
   * A list of input objects to generate content for.
   */
  inputs: Array<JobCreateParams.Input>;
}

export namespace JobCreateParams {
  export interface Input {
    /**
     * The unique identifier for the input field from the application. All input types
     * from the No-code application are supported (i.e. Text input, Dropdown, File
     * upload, Image input). The identifier should be the name of the input type.
     */
    id: string;

    /**
     * The value for the input field.
     *
     * If the input type is "File upload", you must pass the `file_id` of an uploaded
     * file. You cannot pass a file object directly. See the
     * [file upload endpoint](/api-guides/api-reference/file-api/upload-files) for
     * instructions on uploading files or the
     * [list files endpoint](/api-guides/api-reference/file-api/get-all-files) for how
     * to see a list of uploaded files and their IDs.
     */
    value: Array<string>;
  }
}

export interface JobListParams extends ApplicationJobsOffsetParams {
  /**
   * The status of the job.
   */
  status?: 'in_progress' | 'failed' | 'completed';
}

export declare namespace Jobs {
  export {
    type ApplicationGenerateAsyncResponse as ApplicationGenerateAsyncResponse,
    type ApplicationJobsListResponse as ApplicationJobsListResponse,
    type JobCreateResponse as JobCreateResponse,
    type JobRetryResponse as JobRetryResponse,
    type ApplicationGenerateAsyncResponsesApplicationJobsOffset as ApplicationGenerateAsyncResponsesApplicationJobsOffset,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };
}
