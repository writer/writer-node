// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ApplicationsAPI from './applications';

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
  suggestion: string;

  title?: string;
}

export interface ApplicationGenerateContentParams {
  inputs: Array<ApplicationGenerateContentParams.Input>;
}

export namespace ApplicationGenerateContentParams {
  export interface Input {
    id: string;

    value: Array<string>;
  }
}

export namespace Applications {
  export import ApplicationGenerateContentResponse = ApplicationsAPI.ApplicationGenerateContentResponse;
  export import ApplicationGenerateContentParams = ApplicationsAPI.ApplicationGenerateContentParams;
}
