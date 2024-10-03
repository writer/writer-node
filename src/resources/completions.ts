// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../streaming';

export class Completions extends APIResource {
  /**
   * Text generation
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
  /**
   * A list of choices generated by the model, each containing the text of the
   * completion and associated metadata such as log probabilities.
   */
  choices: Array<Completion.Choice>;

  /**
   * The identifier of the model that was used to generate the responses in the
   * 'choices' array.
   */
  model?: string;
}

export namespace Completion {
  export interface Choice {
    /**
     * The generated text output from the model, which forms the main content of the
     * response.
     */
    text: string;

    log_probs?: Choice.LogProbs;
  }

  export namespace Choice {
    export interface LogProbs {
      content?: Array<LogProbs.Content> | null;

      refusal?: Array<LogProbs.Refusal> | null;
    }

    export namespace LogProbs {
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Array<Content.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Content {
        /**
         * An array of mappings for each token to its top log probabilities, showing
         * detailed prediction probabilities.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }

      export interface Refusal {
        token: string;

        logprob: number;

        top_logprobs: Array<Refusal.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Refusal {
        /**
         * An array of mappings for each token to its top log probabilities, showing
         * detailed prediction probabilities.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }
    }
  }
}

export interface StreamingData {
  value: string;
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * The identifier of the model to be used for processing the request.
   */
  model: string;

  /**
   * The input text that the model will process to generate a response.
   */
  prompt: string;

  /**
   * Specifies the number of completions to generate and return the best one. Useful
   * for generating multiple outputs and choosing the best based on some criteria.
   */
  best_of?: number;

  /**
   * The maximum number of tokens that the model can generate in the response.
   */
  max_tokens?: number;

  /**
   * A seed used to initialize the random number generator for the model, ensuring
   * reproducibility of the output when the same inputs are provided.
   */
  random_seed?: number;

  /**
   * Specifies stopping conditions for the model's output generation. This can be an
   * array of strings or a single string that the model will look for as a signal to
   * stop generating further tokens.
   */
  stop?: Array<string> | string;

  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: boolean;

  /**
   * Controls the randomness of the model's outputs. Higher values lead to more
   * random outputs, while lower values make the model more deterministic.
   */
  temperature?: number;

  /**
   * Used to control the nucleus sampling, where only the most probable tokens with a
   * cumulative probability of top_p are considered for sampling, providing a way to
   * fine-tune the randomness of predictions.
   */
  top_p?: number;
}

export namespace CompletionCreateParams {
  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: false;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream: true;
}

export namespace Completions {
  export import Completion = CompletionsAPI.Completion;
  export import StreamingData = CompletionsAPI.StreamingData;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
  export import CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}
