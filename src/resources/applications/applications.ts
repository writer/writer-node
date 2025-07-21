// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { Stream } from '../../core/streaming';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Applications extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
  graphs: GraphsAPI.Graphs = new GraphsAPI.Graphs(this._client);

  /**
   * Retrieves detailed information for a specific no-code agent (formerly called
   * no-code applications), including its configuration and current status.
   */
  retrieve(applicationID: string, options?: RequestOptions): APIPromise<ApplicationRetrieveResponse> {
    return this._client.get(path`/v1/applications/${applicationID}`, options);
  }

  /**
   * Retrieves a paginated list of no-code agents (formerly called no-code
   * applications) with optional filtering and sorting capabilities.
   */
  list(
    query: ApplicationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ApplicationListResponsesCursorPage, ApplicationListResponse> {
    return this._client.getAPIList('/v1/applications', CursorPage<ApplicationListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Generate content from an existing no-code agent (formerly called no-code
   * applications) with inputs.
   */
  generateContent(
    applicationID: string,
    body: ApplicationGenerateContentParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<ApplicationGenerateContentResponse>;
  generateContent(
    applicationID: string,
    body: ApplicationGenerateContentParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<ApplicationGenerateContentChunk>>;
  generateContent(
    applicationID: string,
    body: ApplicationGenerateContentParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<ApplicationGenerateContentChunk> | ApplicationGenerateContentResponse>;
  generateContent(
    applicationID: string,
    body: ApplicationGenerateContentParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationGenerateContentResponse> | APIPromise<Stream<ApplicationGenerateContentChunk>> {
    return this._client.post(path`/v1/applications/${applicationID}`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as
      | APIPromise<ApplicationGenerateContentResponse>
      | APIPromise<Stream<ApplicationGenerateContentChunk>>;
  }
}

export type ApplicationListResponsesCursorPage = CursorPage<ApplicationListResponse>;

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

/**
 * Detailed application object including its input configuration.
 */
export interface ApplicationRetrieveResponse {
  /**
   * Unique identifier for the application.
   */
  id: string;

  /**
   * Timestamp when the application was created.
   */
  created_at: string;

  /**
   * List of input configurations for the application.
   */
  inputs: Array<ApplicationRetrieveResponse.Input>;

  /**
   * Display name of the application.
   */
  name: string;

  /**
   * Current deployment status of the application. Note: currently only `deployed`
   * applications are returned.
   */
  status: 'deployed' | 'draft';

  /**
   * The type of no-code application.
   */
  type: 'generation';

  /**
   * Timestamp when the application was last updated.
   */
  updated_at: string;

  /**
   * Timestamp when the application was last deployed.
   */
  last_deployed_at?: string;
}

export namespace ApplicationRetrieveResponse {
  /**
   * Configuration for an individual input field in the application.
   */
  export interface Input {
    /**
     * Type of input field determining its behavior and validation rules.
     */
    input_type: 'text' | 'dropdown' | 'file' | 'media';

    /**
     * Identifier for the input field.
     */
    name: string;

    /**
     * Indicates if this input field is mandatory.
     */
    required: boolean;

    /**
     * Human-readable description of the input field's purpose.
     */
    description?: string;

    /**
     * Type-specific configuration options for input fields.
     */
    options?:
      | Input.ApplicationInputDropdownOptions
      | Input.ApplicationInputFileOptions
      | Input.ApplicationInputMediaOptions
      | Input.ApplicationInputTextOptions;
  }

  export namespace Input {
    /**
     * Configuration options specific to dropdown-type input fields.
     */
    export interface ApplicationInputDropdownOptions {
      /**
       * List of available options in the dropdown menu.
       */
      list: Array<string>;
    }

    /**
     * Configuration options specific to file upload input fields.
     */
    export interface ApplicationInputFileOptions {
      /**
       * List of allowed file extensions.
       */
      file_types: Array<string>;

      /**
       * Maximum file size allowed in megabytes.
       */
      max_file_size_mb: number;

      /**
       * Maximum number of files that can be uploaded.
       */
      max_files: number;

      /**
       * Maximum number of words allowed in text files.
       */
      max_word_count: number;
    }

    /**
     * Configuration options specific to media upload input fields.
     */
    export interface ApplicationInputMediaOptions {
      /**
       * List of allowed media file types.
       */
      file_types: Array<string>;

      /**
       * Maximum media file size allowed in megabytes.
       */
      max_image_size_mb: number;
    }

    /**
     * Configuration options specific to text input fields.
     */
    export interface ApplicationInputTextOptions {
      /**
       * Maximum number of text fields allowed.
       */
      max_fields: number;

      /**
       * Minimum number of text fields required.
       */
      min_fields: number;
    }
  }
}

/**
 * Detailed application object including its input configuration.
 */
export interface ApplicationListResponse {
  /**
   * Unique identifier for the application.
   */
  id: string;

  /**
   * Timestamp when the application was created.
   */
  created_at: string;

  /**
   * List of input configurations for the application.
   */
  inputs: Array<ApplicationListResponse.Input>;

  /**
   * Display name of the application.
   */
  name: string;

  /**
   * Current deployment status of the application. Note: currently only `deployed`
   * applications are returned.
   */
  status: 'deployed' | 'draft';

  /**
   * The type of no-code application.
   */
  type: 'generation';

  /**
   * Timestamp when the application was last updated.
   */
  updated_at: string;

  /**
   * Timestamp when the application was last deployed.
   */
  last_deployed_at?: string;
}

export namespace ApplicationListResponse {
  /**
   * Configuration for an individual input field in the application.
   */
  export interface Input {
    /**
     * Type of input field determining its behavior and validation rules.
     */
    input_type: 'text' | 'dropdown' | 'file' | 'media';

    /**
     * Identifier for the input field.
     */
    name: string;

    /**
     * Indicates if this input field is mandatory.
     */
    required: boolean;

    /**
     * Human-readable description of the input field's purpose.
     */
    description?: string;

    /**
     * Type-specific configuration options for input fields.
     */
    options?:
      | Input.ApplicationInputDropdownOptions
      | Input.ApplicationInputFileOptions
      | Input.ApplicationInputMediaOptions
      | Input.ApplicationInputTextOptions;
  }

  export namespace Input {
    /**
     * Configuration options specific to dropdown-type input fields.
     */
    export interface ApplicationInputDropdownOptions {
      /**
       * List of available options in the dropdown menu.
       */
      list: Array<string>;
    }

    /**
     * Configuration options specific to file upload input fields.
     */
    export interface ApplicationInputFileOptions {
      /**
       * List of allowed file extensions.
       */
      file_types: Array<string>;

      /**
       * Maximum file size allowed in megabytes.
       */
      max_file_size_mb: number;

      /**
       * Maximum number of files that can be uploaded.
       */
      max_files: number;

      /**
       * Maximum number of words allowed in text files.
       */
      max_word_count: number;
    }

    /**
     * Configuration options specific to media upload input fields.
     */
    export interface ApplicationInputMediaOptions {
      /**
       * List of allowed media file types.
       */
      file_types: Array<string>;

      /**
       * Maximum media file size allowed in megabytes.
       */
      max_image_size_mb: number;
    }

    /**
     * Configuration options specific to text input fields.
     */
    export interface ApplicationInputTextOptions {
      /**
       * Maximum number of text fields allowed.
       */
      max_fields: number;

      /**
       * Minimum number of text fields required.
       */
      min_fields: number;
    }
  }
}

export interface ApplicationListParams extends CursorPageParams {
  /**
   * Maximum number of applications to return in the response.
   */
  limit?: number;

  /**
   * Sort order for the results based on creation time.
   */
  order?: 'asc' | 'desc';

  /**
   * Filter applications by their type.
   */
  type?: 'generation';
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
     * The value for the input field.
     *
     * If the input type is "File upload", you must pass the `file_id` of an uploaded
     * file. You cannot pass a file object directly. See the
     * [file upload endpoint](https://dev.writer.com/api-reference/file-api/upload-files)
     * for instructions on uploading files or the
     * [list files endpoint](https://dev.writer.com/api-reference/file-api/get-all-files)
     * for how to see a list of uploaded files and their IDs.
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
Applications.Graphs = Graphs;

export declare namespace Applications {
  export {
    type ApplicationGenerateContentChunk as ApplicationGenerateContentChunk,
    type ApplicationGenerateContentResponse as ApplicationGenerateContentResponse,
    type ApplicationRetrieveResponse as ApplicationRetrieveResponse,
    type ApplicationListResponse as ApplicationListResponse,
    type ApplicationListResponsesCursorPage as ApplicationListResponsesCursorPage,
    type ApplicationListParams as ApplicationListParams,
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
    type ApplicationGenerateAsyncResponsesApplicationJobsOffset as ApplicationGenerateAsyncResponsesApplicationJobsOffset,
    type JobCreateParams as JobCreateParams,
    type JobListParams as JobListParams,
  };

  export {
    Graphs as Graphs,
    type ApplicationGraphsResponse as ApplicationGraphsResponse,
    type GraphUpdateParams as GraphUpdateParams,
  };
}
