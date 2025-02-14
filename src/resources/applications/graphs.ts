// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Graphs extends APIResource {
  /**
   * Updates the graphs listed and associates them with the no-code chat app to be
   * used.
   */
  update(
    applicationID: string,
    body: GraphUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationGraphsResponse> {
    return this._client.put(path`/v1/applications/${applicationID}/graphs`, { body, ...options });
  }

  /**
   * Retrieve graphs associated with a no-code chat application.
   */
  list(applicationID: string, options?: RequestOptions): APIPromise<ApplicationGraphsResponse> {
    return this._client.get(path`/v1/applications/${applicationID}/graphs`, options);
  }
}

export interface ApplicationGraphsResponse {
  /**
   * A list of graphs associated with the application.
   */
  graph_ids: Array<string>;
}

export interface GraphUpdateParams {
  /**
   * A list of graph IDs to associate with the application. Note that this will
   * replace the existing list of graphs associated with the application, not add to
   * it.
   */
  graph_ids: Array<string>;
}

export declare namespace Graphs {
  export {
    type ApplicationGraphsResponse as ApplicationGraphsResponse,
    type GraphUpdateParams as GraphUpdateParams,
  };
}
