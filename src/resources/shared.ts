// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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

    sources: Array<Source | null>;
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

  type: 'function';

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

  type?: 'function';
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

export type ToolParam =
  | ToolParam.FunctionTool
  | ToolParam.GraphTool
  | ToolParam.LlmTool
  | ToolParam.VisionTool;

export namespace ToolParam {
  export interface FunctionTool {
    /**
     * A tool that uses a custom function.
     */
    function: FunctionDefinition;

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
       * An array of graph IDs to use in the tool.
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
    type: 'llm';
  }

  export namespace LlmTool {
    /**
     * A tool that uses another Writer model to generate a response.
     */
    export interface Function {
      /**
       * A description of the model to use.
       */
      description: string;

      /**
       * The model to use.
       */
      model: string;
    }
  }

  export interface VisionTool {
    /**
     * A tool that uses Palmyra Vision to analyze images.
     */
    function: VisionTool.Function;

    /**
     * The type of tool.
     */
    type: 'vision';
  }

  export namespace VisionTool {
    /**
     * A tool that uses Palmyra Vision to analyze images.
     */
    export interface Function {
      /**
       * The model to use for image analysis.
       */
      model: 'palmyra-vision';

      variables: Array<Function.Variable>;
    }

    export namespace Function {
      export interface Variable {
        /**
         * The File ID of the image to analyze. The file must be uploaded to the Writer
         * platform before you use it with the Vision tool.
         */
        file_id: string;

        /**
         * The name of the file variable. You must reference this name in the
         * `message.content` field of the request to the chat completions endpoint. Use
         * double curly braces (`{{}}`) to reference the file. For example,
         * `Describe the difference between the image {{image_1}} and the image {{image_2}}`.
         */
        name: string;
      }
    }
  }
}

export interface ResponseFormatJSONObject {
  /**
   * The type of response format being defined: `json_object`
   */
  type: 'json_object';
}

export interface ResponseFormatJSONSchema {
  json_schema: ResponseFormatJSONSchema.JSONSchema;

  /**
   * The type of response format being defined: `json_schema`
   */
  type: 'json_schema';
}

export namespace ResponseFormatJSONSchema {
  export interface JSONSchema {
    /**
     * The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores
     * and dashes, with a maximum length of 64.
     */
    name: string;

    /**
     * A description of what the response format is for, used by the model to determine
     * how to respond in the format.
     */
    description?: string;

    /**
     * The schema for the response format, described as a JSON Schema object.
     */
    schema?: Record<string, unknown>;
  }
}

export interface ResponseFormatText {
  /**
   * The type of response format being defined: `text`
   */
  type: 'text';
}
