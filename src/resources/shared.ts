// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

export interface ErrorMessage {
  description: string;

  extras: Record<string, unknown>;

  key: string;
}

export interface ErrorObject {
  errors: Array<ErrorMessage>;

  extras: Record<string, unknown>;

  tpe: string;
}

/**
 * A tool that uses a custom function.
 */
export interface FunctionDefinition {
  /**
   * Name of the function.
   */
  name: string;

  /**
   * Description of the function.
   */
  description?: string;

  /**
   * The parameters of the function.
   */
  parameters?: FunctionParams;
}

/**
 * The parameters of the function.
 */
export type FunctionParams = Record<string, unknown>;

export interface GraphData {
  sources?: Array<Source | null>;

  status?: 'processing' | 'finished' | null;

  subqueries?: Array<GraphData.Subquery | null>;
}

export namespace GraphData {
  export interface Subquery {
    /**
     * The answer to the subquery.
     */
    answer: string;

    /**
     * The subquery that was asked.
     */
    query: string;

    sources: Array<Shared.Source | null>;
  }
}

export interface Logprobs {
  content: Array<LogprobsToken> | null;

  refusal: Array<LogprobsToken> | null;
}

export interface LogprobsToken {
  token: string;

  logprob: number;

  top_logprobs: Array<LogprobsToken.TopLogprob>;

  bytes?: Array<number>;
}

export namespace LogprobsToken {
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

export interface Source {
  /**
   * The unique identifier of the file.
   */
  file_id: string;

  /**
   * A snippet of text from the source file.
   */
  snippet: string;
}

export interface ToolCall {
  id: string;

  function: ToolCall.Function;

  type: string;

  index?: number;
}

export namespace ToolCall {
  export interface Function {
    arguments: string;

    name?: string;
  }
}

export interface ToolCallStreaming {
  index: number;

  id?: string;

  function?: ToolCallStreaming.Function;

  type?: string;
}

export namespace ToolCallStreaming {
  export interface Function {
    arguments: string;

    name?: string;
  }
}

export interface ToolChoiceJsonObject {
  value: Record<string, unknown>;
}

export interface ToolChoiceString {
  value: 'none' | 'auto' | 'required';
}

export type ToolParam = ToolParam.FunctionTool | ToolParam.GraphTool | ToolParam.LlmTool;

export namespace ToolParam {
  export interface FunctionTool {
    /**
     * A tool that uses a custom function.
     */
    function: Shared.FunctionDefinition;

    /**
     * The type of tool.
     */
    type: 'function';
  }

  export interface GraphTool {
    /**
     * A tool that uses Knowledge Graphs as context for responses.
     */
    function: GraphTool.Function;

    /**
     * The type of tool.
     */
    type: 'graph';
  }

  export namespace GraphTool {
    /**
     * A tool that uses Knowledge Graphs as context for responses.
     */
    export interface Function {
      /**
       * An array of graph IDs to be used in the tool.
       */
      graph_ids: Array<string>;

      /**
       * Boolean to indicate whether to include subqueries in the response.
       */
      subqueries: boolean;

      /**
       * A description of the graph content.
       */
      description?: string;
    }
  }

  export interface LlmTool {
    /**
     * A tool that uses another Writer model to generate a response.
     */
    function: LlmTool.Function;

    /**
     * The type of tool.
     */
    type?: 'llm';
  }

  export namespace LlmTool {
    /**
     * A tool that uses another Writer model to generate a response.
     */
    export interface Function {
      /**
       * A description of the model to be used.
       */
      description: string;

      /**
       * The model to be used.
       */
      model: string;
    }
  }
}
