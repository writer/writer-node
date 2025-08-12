// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface ErrorMessage {
  description: string;

  extras: { [key: string]: unknown };

  key: string;
}

export interface ErrorObject {
  errors: Array<ErrorMessage>;

  extras: { [key: string]: unknown };

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
export type FunctionParams = { [key: string]: unknown };

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
  /**
   * A JSON object that specifies the tool to call. For example,
   * `{"type": "function", "function": {"name": "get_current_weather"}}`
   */
  value: { [key: string]: unknown };
}

export interface ToolChoiceString {
  value: 'none' | 'auto' | 'required';
}

/**
 * A tool that uses Palmyra Translate to translate text. Note that this tool does
 * not stream results. The response is returned after the translation is complete.
 */
export type ToolParam =
  | ToolParam.FunctionTool
  | ToolParam.GraphTool
  | ToolParam.LlmTool
  | ToolParam.TranslationTool
  | ToolParam.VisionTool
  | ToolParam.WebSearchTool;

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

  /**
   * A tool that uses Palmyra Translate to translate text. Note that this tool does
   * not stream results. The response is returned after the translation is complete.
   */
  export interface TranslationTool {
    /**
     * A tool that uses Palmyra Translate to translate text.
     */
    function: TranslationTool.Function;

    /**
     * The type of tool.
     */
    type: 'translation';
  }

  export namespace TranslationTool {
    /**
     * A tool that uses Palmyra Translate to translate text.
     */
    export interface Function {
      /**
       * Whether to use formal or informal language in the translation. See the
       * [list of languages that support formality](https://dev.writer.com/api-reference/translation-api/language-support#formality).
       * If the language does not support formality, this parameter is ignored.
       */
      formality: boolean;

      /**
       * Whether to control the length of the translated text. See the
       * [list of languages that support length control](https://dev.writer.com/api-reference/translation-api/language-support#length-control).
       * If the language does not support length control, this parameter is ignored.
       */
      length_control: boolean;

      /**
       * Whether to mask profane words in the translated text. See the
       * [list of languages that do not support profanity masking](https://dev.writer.com/api-reference/translation-api/language-support#profanity-masking).
       * If the language does not support profanity masking, this parameter is ignored.
       */
      mask_profanity: boolean;

      /**
       * The model to use for translation.
       */
      model: 'palmyra-translate';

      /**
       * Optional. The
       * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
       * language code of the original text to translate. For example, `en` for English,
       * `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a
       * variant, the code appends the two-digit
       * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
       * If you do not provide a language code, the LLM detects the language of the text.
       */
      source_language_code?: string;

      /**
       * Optional. The
       * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
       * language code of the target language for the translation. For example, `en` for
       * English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language
       * has a variant, the code appends the two-digit
       * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
       * If you do not provide a language code, the LLM uses the content of the chat
       * message to determine the target language.
       */
      target_language_code?: string;
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
         * platform before you use it with the Vision tool. The maximum allowed file size
         * is 7MB.
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

  export interface WebSearchTool {
    /**
     * A tool that uses web search to find information.
     */
    function: WebSearchTool.Function;

    /**
     * The type of tool.
     */
    type: 'web_search';
  }

  export namespace WebSearchTool {
    /**
     * A tool that uses web search to find information.
     */
    export interface Function {
      /**
       * An array of domains to exclude from the search results.
       */
      exclude_domains: Array<string>;

      /**
       * An array of domains to include in the search results.
       */
      include_domains: Array<string>;
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
