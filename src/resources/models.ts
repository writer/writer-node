// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ModelsAPI from './models';

export class Models extends APIResource {
  /**
   * List models
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return this._client.get('/v1/models', options);
  }
}

export interface ModelListResponse {
  /**
   * The identifier of the model to be used for processing the request.
   */
  models: Array<ModelListResponse.Model>;
}

export namespace ModelListResponse {
  export interface Model {
    /**
     * The ID of the particular LLM that you want to use
     */
    id: string;

    /**
     * The name of the particular LLM that you want to use.
     */
    name: string;
  }
}

export namespace Models {
  export import ModelListResponse = ModelsAPI.ModelListResponse;
}
