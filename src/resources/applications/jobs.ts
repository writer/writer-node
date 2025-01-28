// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
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
  job_id: string;

  /**
   * The ID of the application associated with this job.
   */
  application_id?: string;

  /**
   * The timestamp when the job was created.
   */
  created_at?: string;

  /**
   * The initial status of the job (e.g., 'queued').
   */
  status?: string;
}

export interface JobRetrieveResponse {
  /**
   * A list of jobs associated with the application.
   */
  jobs: Array<JobRetrieveResponse.Job>;
}

export namespace JobRetrieveResponse {
  export interface Job {
    /**
     * The timestamp when the job was created.
     */
    created_at?: string;

    /**
     * The unique identifier for the job.
     */
    job_id?: string;

    /**
     * The result of the completed job, if applicable.
     */
    result?: string;

    /**
     * The current status of the job.
     */
    status?: string;

    /**
     * The timestamp when the job was last updated.
     */
    updated_at?: string;
  }
}

export interface JobListResponse {
  /**
   * The timestamp when the job was created.
   */
  created_at?: string;

  /**
   * The unique identifier for the job.
   */
  job_id?: string;

  /**
   * The result of the completed job, if applicable.
   */
  result?: string;

  /**
   * The current status of the job.
   */
  status?: string;

  /**
   * The timestamp when the job was last updated.
   */
  updated_at?: string;
}

export interface JobRetryResponse {
  /**
   * The unique identifier for the async job created.
   */
  job_id: string;

  /**
   * The ID of the application associated with this job.
   */
  application_id?: string;

  /**
   * The timestamp when the job was created.
   */
  created_at?: string;

  /**
   * The initial status of the job (e.g., 'queued').
   */
  status?: string;
}

export interface JobCreateParams {
  /**
   * A list of input objects to generate content for.
   */
  inputs: Array<JobCreateParams.Input>;

  /**
   * Optional metadata for the generation request.
   */
  metadata?: Record<string, string>;
}

export namespace JobCreateParams {
  export interface Input {
    /**
     * The input content to be processed.
     */
    content?: string;

    /**
     * A unique identifier for the input object.
     */
    input_id?: string;
  }
}

export interface JobListParams extends ApplicationJobsOffsetParams {
  status?: JobListParams.Status;
}

export namespace JobListParams {
  export interface Status {
    /**
     * A list of jobs associated with the application.
     */
    jobs: Array<Status.Job>;
  }

  export namespace Status {
    export interface Job {
      /**
       * The timestamp when the job was created.
       */
      created_at?: string;

      /**
       * The unique identifier for the job.
       */
      job_id?: string;

      /**
       * The result of the completed job, if applicable.
       */
      result?: string;

      /**
       * The current status of the job.
       */
      status?: string;

      /**
       * The timestamp when the job was last updated.
       */
      updated_at?: string;
    }
  }
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
