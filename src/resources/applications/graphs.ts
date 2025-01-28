// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Graphs extends APIResource {
  /**
   * Associate graphs with a no-code chat application via API.
   */
  update(
    applicationId: string,
    body: GraphUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApplicationGraphsResponse> {
    return this._client.put(`/v1/applications/${applicationId}/graphs`, { body, ...options });
  }

  /**
   * Retrieve graphs associated with a no-code chat application.
   */
  list(applicationId: string, options?: Core.RequestOptions): Core.APIPromise<ApplicationGraphsResponse> {
    return this._client.get(`/v1/applications/${applicationId}/graphs`, options);
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
   * A list of graph IDs to associate with the application.
   */
  graph_ids: Array<string>;
}

export declare namespace Graphs {
  export {
    type ApplicationGraphsResponse as ApplicationGraphsResponse,
    type GraphUpdateParams as GraphUpdateParams,
  };
}
