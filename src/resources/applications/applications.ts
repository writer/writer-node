// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
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
import { CursorPage, type CursorPageParams } from '../../pagination';
import { Stream } from '../../streaming';

export class Applications extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
  graphs: GraphsAPI.Graphs = new GraphsAPI.Graphs(this._client);

  /**
   * Retrieves detailed information for a specific no-code application, including its
   * configuration and current status.
   */
  retrieve(
    applicationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationRetrieveResponse> {
    return this._client.get(`/v1/applications/${applicationId}`, options);
  }

  /**
   * Retrieves a paginated list of no-code applications with optional filtering and
   * sorting capabilities.
   */
  list(
    query?: ApplicationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ApplicationListResponsesCursorPage, ApplicationListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ApplicationListResponsesCursorPage, ApplicationListResponse>;
  list(
    query: ApplicationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ApplicationListResponsesCursorPage, ApplicationListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/applications', ApplicationListResponsesCursorPage, {
      query,
      ...options,
    });
  }

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

export class ApplicationListResponsesCursorPage extends CursorPage<ApplicationListResponse> {}

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

Applications.ApplicationListResponsesCursorPage = ApplicationListResponsesCursorPage;
Applications.Jobs = Jobs;
Applications.ApplicationGenerateAsyncResponsesApplicationJobsOffset =
  ApplicationGenerateAsyncResponsesApplicationJobsOffset;
Applications.Graphs = Graphs;

export declare namespace Applications {
  export {
    type ApplicationGenerateContentChunk as ApplicationGenerateContentChunk,
    type ApplicationGenerateContentResponse as ApplicationGenerateContentResponse,
    type ApplicationRetrieveResponse as ApplicationRetrieveResponse,
    type ApplicationListResponse as ApplicationListResponse,
    ApplicationListResponsesCursorPage as ApplicationListResponsesCursorPage,
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
