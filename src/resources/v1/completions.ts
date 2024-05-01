// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'writer/core';
import { APIResource } from 'writer/resource';
import * as CompletionsAPI from 'writer/resources/v1/completions';

export class Completions extends APIResource {
  /**
   * Create completion using LLM model
   */
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> {
    return this._client.post('/v1/completions', { body, ...options });
  }
}

export interface CompletionCreateResponse {
  choices: Array<CompletionCreateResponse.Choice>;

  model?: string;
}

export namespace CompletionCreateResponse {
  export interface Choice {
    text: string;

    log_probs?: Choice.LogProbs;
  }

  export namespace Choice {
    export interface LogProbs {
      text_offset?: Array<number>;

      token_log_probs?: Array<number>;

      tokens?: Array<string>;

      top_log_probs?: Array<LogProbs.TopLogProb>;
    }

    export namespace LogProbs {
      export interface TopLogProb {
        additional_properties?: number;
      }
    }
  }
}

export interface CompletionCreateParams {
  model: string;

  prompt: string;

  best_of?: number;

  max_tokens?: number;

  random_seed?: number;

  stop?: Array<string>;

  stream?: boolean;

  temperature?: number;

  top_p?: number;
}

export namespace Completions {
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
