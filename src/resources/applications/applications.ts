// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ApplicationsAPI from './applications';
import * as GraphsAPI from './graphs';
import { ApplicationGraphsResponse, GraphUpdateParams, Graphs } from './graphs';
import * as JobsAPI from './jobs';
import {
  ApplicationGenerateAsyncResponse,
  ApplicationGenerateAsyncResponsesApplicationJobsOffset,
  ApplicationJobsListResponse,
  JobCreateParams,
  JobCreateResponse,
  JobListParams,
  JobRetryResponse,
  Jobs,
} from './jobs';
import { Stream } from '../../streaming';

export class Applications extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
  graphs: GraphsAPI.Graphs = new GraphsAPI.Graphs(this._client);

  /**
   * Generate content from an existing no-code application with inputs.
   */
  generateContent(
    applicationId: string,
    body: ApplicationGenerateContentParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<ApplicationGenerateContentResponse>;
  generateContent(
    applicationId: string,
    body: ApplicationGenerateContentParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ApplicationGenerateContentChunk>>;
  generateContent(
    applicationId: string,
    body: ApplicationGenerateContentParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ApplicationGenerateContentChunk> | ApplicationGenerateContentResponse>;
  generateContent(
    applicationId: string,
    body: ApplicationGenerateContentParams,
    options?: Core.RequestOptions,
  ): APIPromise<ApplicationGenerateContentResponse> | APIPromise<Stream<ApplicationGenerateContentChunk>> {
    return this._client.post(`/v1/applications/${applicationId}`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as
      | APIPromise<ApplicationGenerateContentResponse>
      | APIPromise<Stream<ApplicationGenerateContentChunk>>;
  }
}

export interface ApplicationGenerateContentChunk {
  delta: ApplicationGenerateContentChunk.Delta;
}

export namespace ApplicationGenerateContentChunk {
  export interface Delta {
    /**
     * The main text output.
     */
    content?: string;

    /**
     * A list of stages that show the 'thinking process'.
     */
    stages?: Array<Delta.Stage> | null;

    /**
     * The name of the output.
     */
    title?: string;
  }

  export namespace Delta {
    export interface Stage {
      /**
       * The unique identifier for the stage.
       */
      id: string;

      /**
       * The text content of the stage.
       */
      content: string;

      /**
       * A list of sources (URLs) that that stage used to process that particular step.
       */
      sources?: Array<string> | null;
    }
  }
}

export interface ApplicationGenerateContentResponse {
  /**
   * The response from the model specified in the application.
   */
  suggestion: string;

  /**
   * The name of the output field.
   */
  title?: string;
}

export type ApplicationGenerateContentParams =
  | ApplicationGenerateContentParamsNonStreaming
  | ApplicationGenerateContentParamsStreaming;

export interface ApplicationGenerateContentParamsBase {
  inputs: Array<ApplicationGenerateContentParams.Input>;

  /**
   * Indicates whether the response should be streamed. Currently only supported for
   * research assistant applications.
   */
  stream?: boolean;
}

export namespace ApplicationGenerateContentParams {
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

  export type ApplicationGenerateContentParamsNonStreaming =
    ApplicationsAPI.ApplicationGenerateContentParamsNonStreaming;
  export type ApplicationGenerateContentParamsStreaming =
    ApplicationsAPI.ApplicationGenerateContentParamsStreaming;
}

export interface ApplicationGenerateContentParamsNonStreaming extends ApplicationGenerateContentParamsBase {
  /**
   * Indicates whether the response should be streamed. Currently only supported for
   * research assistant applications.
   */
  stream?: false;
}

export interface ApplicationGenerateContentParamsStreaming extends ApplicationGenerateContentParamsBase {
  /**
   * Indicates whether the response should be streamed. Currently only supported for
   * research assistant applications.
   */
  stream: true;
}

Applications.Jobs = Jobs;
Applications.ApplicationGenerateAsyncResponsesApplicationJobsOffset =
  ApplicationGenerateAsyncResponsesApplicationJobsOffset;
Applications.Graphs = Graphs;

export declare namespace Applications {
  export {
    type ApplicationGenerateContentChunk as ApplicationGenerateContentChunk,
    type ApplicationGenerateContentResponse as ApplicationGenerateContentResponse,
    type ApplicationGenerateContentParams as ApplicationGenerateContentParams,
    type ApplicationGenerateContentParamsNonStreaming as ApplicationGenerateContentParamsNonStreaming,
    type ApplicationGenerateContentParamsStreaming as ApplicationGenerateContentParamsStreaming,
  };

  export {
    Jobs as Jobs,
    type ApplicationGenerateAsyncResponse as ApplicationGenerateAsyncResponse,
    type ApplicationJobsListResponse as ApplicationJobsListResponse,
    type JobCreateResponse as JobCreateResponse,
    type JobRetryResponse as JobRetryResponse,
    ApplicationGenerateAsyncResponsesApplicationJobsOffset as ApplicationGenerateAsyncResponsesApplicationJobsOffset,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };

  export {
    Graphs as Graphs,
    type ApplicationGraphsResponse as ApplicationGraphsResponse,
    type GraphUpdateParams as GraphUpdateParams,
  };
}
