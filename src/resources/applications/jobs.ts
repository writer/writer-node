// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ApplicationsAPI from './applications';
import { ApplicationJobsOffset, type ApplicationJobsOffsetParams } from '../../pagination';

export class Jobs extends APIResource {
  /**
   * Generate content asynchronously from an existing application with inputs.
   */
  create(
    applicationId: string,
    body: JobCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<JobCreateResponse> {
    return this._client.post(`/v1/applications/${applicationId}/jobs`, { body, ...options });
  }

  /**
   * Retrieves a single job created via the Async API.
   */
  retrieve(jobId: string, options?: Core.RequestOptions): Core.APIPromise<JobRetrieveResponse> {
    return this._client.get(`/v1/applications/jobs/${jobId}`, options);
  }

  /**
   * Retrieve all jobs created via the async API, linked to the provided application
   * ID (or alias).
   */
  list(
    applicationId: string,
    query?: JobListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<JobListResponsesApplicationJobsOffset, JobListResponse>;
  list(
    applicationId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<JobListResponsesApplicationJobsOffset, JobListResponse>;
  list(
    applicationId: string,
    query: JobListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<JobListResponsesApplicationJobsOffset, JobListResponse> {
    if (isRequestOptions(query)) {
      return this.list(applicationId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/applications/${applicationId}/jobs`,
      JobListResponsesApplicationJobsOffset,
      { query, ...options },
    );
  }

  /**
   * Re-triggers the async execution of a single job previously created via the Async
   * api and terminated in error.
   */
  retry(jobId: string, options?: Core.RequestOptions): Core.APIPromise<JobRetryResponse> {
    return this._client.post(`/v1/applications/jobs/${jobId}/retry`, options);
  }
}

export class JobListResponsesApplicationJobsOffset extends ApplicationJobsOffset<JobListResponse> {}

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

export interface JobRetrieveResponse {
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

export interface JobListResponse {
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
     * The value for the input field. If file is required you will need to pass a
     * `file_id`. See
     * [here](https://dev.writer.com/api-guides/api-reference/file-api/upload-files)
     * for the Files API.
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

Jobs.JobListResponsesApplicationJobsOffset = JobListResponsesApplicationJobsOffset;

export declare namespace Jobs {
  export {
    type JobCreateResponse as JobCreateResponse,
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobRetryResponse as JobRetryResponse,
    JobListResponsesApplicationJobsOffset as JobListResponsesApplicationJobsOffset,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };
}
