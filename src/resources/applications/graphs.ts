// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Graphs extends APIResource {
  /**
   * Updates the list of Knowledge Graphs associated with a no-code chat agent.
   */
  update(
    applicationID: string,
    body: GraphUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationGraphsResponse> {
    return this._client.put(path`/v1/applications/${applicationID}/graphs`, { body, ...options });
  }

  /**
   * Retrieve Knowledge Graphs associated with a no-code agent that has chat
   * capabilities.
   */
  list(applicationID: string, options?: RequestOptions): APIPromise<ApplicationGraphsResponse> {
    return this._client.get(path`/v1/applications/${applicationID}/graphs`, options);
  }
}

export interface ApplicationGraphsResponse {
  /**
   * A list of Knowledge Graphs associated with the application.
   */
  graph_ids: Array<string>;
}

export interface GraphUpdateParams {
  /**
   * A list of Knowledge Graph IDs to associate with the application. Note that this
   * will replace the existing list of Knowledge Graphs associated with the
   * application, not add to it.
   */
  graph_ids: Array<string>;
}

export declare namespace Graphs {
  export {
    type ApplicationGraphsResponse as ApplicationGraphsResponse,
    type GraphUpdateParams as GraphUpdateParams,
  };
}
