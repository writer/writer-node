// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Models extends APIResource {
  /**
   * List models
   *
   * @example
   * ```ts
   * const models = await client.models.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ModelListResponse> {
    return this._client.get('/v1/models', options);
  }
}

export interface ModelListResponse {
  /**
   * The [ID of the model](https://dev.writer.com/home/models) to use for processing
   * the request.
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

export declare namespace Models {
  export { type ModelListResponse as ModelListResponse };
}
