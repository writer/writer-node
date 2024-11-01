// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Applications extends APIResource {
  /**
   * Generate content from an existing application with inputs.
   */
  generateContent(
    applicationId: string,
    body: ApplicationGenerateContentParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationGenerateContentResponse> {
    return this._client.post(`/v1/applications/${applicationId}`, { body, ...options });
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

export interface ApplicationGenerateContentParams {
  inputs: Array<ApplicationGenerateContentParams.Input>;
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
}

export declare namespace Applications {
  export {
    type ApplicationGenerateContentResponse as ApplicationGenerateContentResponse,
    type ApplicationGenerateContentParams as ApplicationGenerateContentParams,
  };
}
