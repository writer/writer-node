// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'writerai/core';
import { APIPromise } from 'writerai/core';
import { APIResource } from 'writerai/resource';
import * as CompletionsAPI from 'writerai/resources/completions';
import { Stream } from 'writerai/streaming';

export class Completions extends APIResource {
  /**
   * Create completion using LLM model
   */
  create(body: CompletionCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<Completion>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<StreamingData>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<StreamingData> | Completion>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<Completion> | APIPromise<Stream<StreamingData>> {
    return this._client.post('/v1/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<Completion>
      | APIPromise<Stream<StreamingData>>;
  }
}

export interface Completion {
  choices: Array<Completion.Choice>;

  model?: string;
}

export namespace Completion {
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

export interface StreamingData {
  value: string;
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  model: string;

  prompt: string;

  best_of?: number;

  max_tokens?: number;

  random_seed?: number;

  stop?: Array<string> | string;

  stream?: boolean;

  temperature?: number;

  top_p?: number;
}

export namespace CompletionCreateParams {
  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;
}

export namespace Completions {
  export import Completion = CompletionsAPI.Completion;
  export import StreamingData = CompletionsAPI.StreamingData;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}
