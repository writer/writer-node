// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GraphsAPI from './graphs';
import * as FilesAPI from './files';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { Stream } from '../core/streaming';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Graphs extends APIResource {
  /**
   * Create a new Knowledge Graph.
   */
  create(body: GraphCreateParams, options?: RequestOptions): APIPromise<GraphCreateResponse> {
    return this._client.post('/v1/graphs', { body, ...options });
  }

  /**
   * Retrieve a Knowledge Graph.
   */
  retrieve(graphID: string, options?: RequestOptions): APIPromise<Graph> {
    return this._client.get(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Update the name and description of a Knowledge Graph.
   */
  update(
    graphID: string,
    body: GraphUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GraphUpdateResponse> {
    return this._client.put(path`/v1/graphs/${graphID}`, { body, ...options });
  }

  /**
   * Retrieve a list of Knowledge Graphs.
   */
  list(
    query: GraphListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<GraphsCursorPage, Graph> {
    return this._client.getAPIList('/v1/graphs', CursorPage<Graph>, { query, ...options });
  }

  /**
   * Delete a Knowledge Graph.
   */
  delete(graphID: string, options?: RequestOptions): APIPromise<GraphDeleteResponse> {
    return this._client.delete(path`/v1/graphs/${graphID}`, options);
  }

  /**
   * Add a file to a Knowledge Graph.
   */
  addFileToGraph(
    graphID: string,
    body: GraphAddFileToGraphParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.File> {
    return this._client.post(path`/v1/graphs/${graphID}/file`, { body, ...options });
  }

  /**
   * Ask a question to specified Knowledge Graphs.
   */
  question(body: GraphQuestionParamsNonStreaming, options?: RequestOptions): APIPromise<Question>;
  question(
    body: GraphQuestionParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<QuestionResponseChunk>>;
  question(
    body: GraphQuestionParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<QuestionResponseChunk> | Question>;
  question(
    body: GraphQuestionParams,
    options?: RequestOptions,
  ): APIPromise<Question> | APIPromise<Stream<QuestionResponseChunk>> {
    return this._client.post('/v1/graphs/question', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<Question>
      | APIPromise<Stream<QuestionResponseChunk>>;
  }

  /**
   * Remove a file from a Knowledge Graph.
   */
  removeFileFromGraph(
    fileID: string,
    params: GraphRemoveFileFromGraphParams,
    options?: RequestOptions,
  ): APIPromise<GraphRemoveFileFromGraphResponse> {
    const { graph_id } = params;
    return this._client.delete(path`/v1/graphs/${graph_id}/file/${fileID}`, options);
  }
}

export type GraphsCursorPage = CursorPage<Graph>;

export interface Graph {
  /**
   * The unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The processing status of files in the Knowledge Graph.
   */
  file_status: Graph.FileStatus;

  /**
   * The name of the Knowledge Graph.
   */
  name: string;

  /**
   * The type of Knowledge Graph.
   *
   * - `manual`: files are uploaded via UI or API
   * - `connector`: files are uploaded via a data connector such as Google Drive or
   *   Confluence
   * - `web`: URLs are connected to the Knowledge Graph
   */
  type: 'manual' | 'connector' | 'web';

  /**
   * A description of the Knowledge Graph.
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<Graph.URL>;
}

export namespace Graph {
  /**
   * The processing status of files in the Knowledge Graph.
   */
  export interface FileStatus {
    /**
     * The number of files that have been successfully processed.
     */
    completed: number;

    /**
     * The number of files that failed to process.
     */
    failed: number;

    /**
     * The number of files currently being processed.
     */
    in_progress: number;

    /**
     * The total number of files associated with the Knowledge Graph.
     */
    total: number;
  }

  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface Question {
  /**
   * The answer to the question.
   */
  answer: string;

  /**
   * The question that was asked.
   */
  question: string;

  sources: Array<Shared.Source | null>;

  /**
   * Detailed source information organized by reference type, providing comprehensive
   * metadata about the sources used to generate the response.
   */
  references?: Question.References;

  subqueries?: Array<Question.Subquery | null>;
}

export namespace Question {
  /**
   * Detailed source information organized by reference type, providing comprehensive
   * metadata about the sources used to generate the response.
   */
  export interface References {
    /**
     * Array of file-based references from uploaded documents in the Knowledge Graph.
     */
    files?: Array<References.File>;

    /**
     * Array of web-based references from online sources accessed during the query.
     */
    web?: Array<References.Web>;
  }

  export namespace References {
    /**
     * A file-based reference containing text snippets from uploaded documents in the
     * Knowledge Graph.
     */
    export interface File {
      /**
       * The unique identifier of the file in your Writer account.
       */
      fileId: string;

      /**
       * Internal score used during the retrieval process for ranking and selecting
       * relevant snippets.
       */
      score: number;

      /**
       * The exact text snippet from the source document that was used to support the
       * response.
       */
      text: string;

      /**
       * Unique citation ID that appears in inline citations within the response text
       * (null if not cited).
       */
      cite?: string;

      /**
       * Page number where this snippet was found in the source document.
       */
      page?: number;
    }

    /**
     * A web-based reference containing text snippets from online sources accessed
     * during the query.
     */
    export interface Web {
      /**
       * Internal score used during the retrieval process for ranking and selecting
       * relevant snippets.
       */
      score: number;

      /**
       * The exact text snippet from the web source that was used to support the
       * response.
       */
      text: string;

      /**
       * The title of the web page where this content was found.
       */
      title: string;

      /**
       * The URL of the web page where this content was found.
       */
      url: string;
    }
  }

  /**
   * A sub-question generated to break down complex queries into more manageable
   * parts, along with its answer and supporting sources.
   */
  export interface Subquery {
    /**
     * The answer to the subquery based on Knowledge Graph content.
     */
    answer: string;

    /**
     * The subquery that was generated to help answer the main question.
     */
    query: string;

    /**
     * Array of source snippets that were used to answer this subquery.
     */
    sources: Array<Shared.Source | null>;
  }
}

export interface QuestionResponseChunk {
  data: Question;
}

export interface GraphCreateResponse {
  /**
   * A unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The name of the Knowledge Graph (max 255 characters).
   */
  name: string;

  /**
   * A description of the Knowledge Graph (max 255 characters).
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<GraphCreateResponse.URL>;
}

export namespace GraphCreateResponse {
  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface GraphUpdateResponse {
  /**
   * A unique identifier of the Knowledge Graph.
   */
  id: string;

  /**
   * The timestamp when the Knowledge Graph was created.
   */
  created_at: string;

  /**
   * The name of the Knowledge Graph (max 255 characters).
   */
  name: string;

  /**
   * A description of the Knowledge Graph (max 255 characters).
   */
  description?: string;

  /**
   * An array of web connector URLs associated with this Knowledge Graph.
   */
  urls?: Array<GraphUpdateResponse.URL>;
}

export namespace GraphUpdateResponse {
  export interface URL {
    /**
     * The current status of the URL processing.
     */
    status: URL.Status;

    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }

  export namespace URL {
    /**
     * The current status of the URL processing.
     */
    export interface Status {
      /**
       * The current status of the URL processing.
       */
      status: 'validating' | 'success' | 'error';

      /**
       * The type of error that occurred during processing, if any.
       */
      error_type?:
        | 'invalid_url'
        | 'not_searchable'
        | 'not_found'
        | 'paywall_or_login_page'
        | 'unexpected_error';
    }
  }
}

export interface GraphDeleteResponse {
  /**
   * A unique identifier of the deleted Knowledge Graph.
   */
  id: string;

  /**
   * Indicates whether the Knowledge Graph was successfully deleted.
   */
  deleted: boolean;
}

export interface GraphRemoveFileFromGraphResponse {
  /**
   * A unique identifier of the deleted file.
   */
  id: string;

  /**
   * Indicates whether the file was successfully deleted.
   */
  deleted: boolean;
}

export interface GraphCreateParams {
  /**
   * A description of the Knowledge Graph (max 255 characters). Omitting this field
   * leaves the description unchanged.
   */
  description?: string;

  /**
   * The name of the Knowledge Graph (max 255 characters). Omitting this field leaves
   * the name unchanged.
   */
  name?: string;
}

export interface GraphUpdateParams {
  /**
   * A description of the Knowledge Graph (max 255 characters). Omitting this field
   * leaves the description unchanged.
   */
  description?: string;

  /**
   * The name of the Knowledge Graph (max 255 characters). Omitting this field leaves
   * the name unchanged.
   */
  name?: string;

  /**
   * An array of web connector URLs to update for this Knowledge Graph. You can only
   * connect URLs to Knowledge Graphs with the type `web`. To clear the list of URLs,
   * set this field to an empty array.
   */
  urls?: Array<GraphUpdateParams.URL>;
}

export namespace GraphUpdateParams {
  export interface URL {
    /**
     * The type of web connector processing for this URL.
     */
    type: 'single_page' | 'sub_pages';

    /**
     * The URL to be processed by the web connector.
     */
    url: string;

    /**
     * An array of URLs to exclude from processing within this web connector.
     */
    exclude_urls?: Array<string>;
  }
}

export interface GraphListParams extends CursorPageParams {
  /**
   * Specifies the maximum number of objects returned in a page. The default value
   * is 50. The minimum value is 1, and the maximum value is 100.
   */
  limit?: number;

  /**
   * Specifies the order of the results. Valid values are asc for ascending and desc
   * for descending.
   */
  order?: 'asc' | 'desc';
}

export interface GraphAddFileToGraphParams {
  /**
   * The unique identifier of the file.
   */
  file_id: string;
}

export type GraphQuestionParams = GraphQuestionParamsNonStreaming | GraphQuestionParamsStreaming;

export interface GraphQuestionParamsBase {
  /**
   * The unique identifiers of the Knowledge Graphs to query.
   */
  graph_ids: Array<string>;

  /**
   * The question to answer using the Knowledge Graph.
   */
  question: string;

  /**
   * Configuration options for Knowledge Graph queries, including search parameters
   * and citation settings.
   */
  query_config?: GraphQuestionParams.QueryConfig;

  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: boolean;

  /**
   * Specify whether to include subqueries.
   */
  subqueries?: boolean;
}

export namespace GraphQuestionParams {
  /**
   * Configuration options for Knowledge Graph queries, including search parameters
   * and citation settings.
   */
  export interface QueryConfig {
    /**
     * Level of grounding required for responses, controlling how closely answers must
     * be tied to source material. Set lower for grounded outputs, higher for
     * creativity. Higher values (closer to 1.0) allow more creative interpretation,
     * while lower values (closer to 0.0) stick more closely to source material. Range:
     * 0.0-1.0, Default: 0.0.
     */
    grounding_level?: number;

    /**
     * Whether to include inline citations in the response, showing which Knowledge
     * Graph sources were used. Default: false.
     */
    inline_citations?: boolean;

    /**
     * Threshold for keyword-based matching when searching Knowledge Graph content. Set
     * higher for stricter relevance, lower for broader range. Higher values (closer to
     * 1.0) require stronger keyword matches, while lower values (closer to 0.0) allow
     * more lenient matching. Range: 0.0-1.0, Default: 0.7.
     */
    keyword_threshold?: number;

    /**
     * Maximum number of text snippets to retrieve from the Knowledge Graph for
     * context. Works in concert with `search_weight` to control best matches vs
     * broader coverage. While technically supports 1-60, values below 5 may return no
     * results due to RAG implementation. Recommended range: 5-25. Due to RAG system
     * behavior, you may see more snippets than requested. Range: 1-60, Default: 30.
     */
    max_snippets?: number;

    /**
     * Maximum number of subquestions to generate when processing complex queries. Set
     * higher to improve detail, set lower to reduce response time. Range: 1-10,
     * Default: 6.
     */
    max_subquestions?: number;

    /**
     * Maximum number of tokens the model can generate in the response. This controls
     * the length of the AI's answer. Set higher for longer answers, set lower for
     * shorter, faster answers. Range: 100-8000, Default: 4000.
     */
    max_tokens?: number;

    /**
     * Weight given to search results when ranking and selecting relevant information.
     * Higher values (closer to 100) prioritize keyword-based matching, while lower
     * values (closer to 0) prioritize semantic similarity matching. Use higher values
     * for exact keyword searches, lower values for conceptual similarity searches.
     * Range: 0-100, Default: 50.
     */
    search_weight?: number;

    /**
     * Threshold for semantic similarity matching when searching Knowledge Graph
     * content. Set higher for stricter relevance, lower for broader range. Higher
     * values (closer to 1.0) require stronger semantic similarity, while lower values
     * (closer to 0.0) allow more lenient semantic matching. Range: 0.0-1.0, Default:
     * 0.7.
     */
    semantic_threshold?: number;
  }

  export type GraphQuestionParamsNonStreaming = GraphsAPI.GraphQuestionParamsNonStreaming;
  export type GraphQuestionParamsStreaming = GraphsAPI.GraphQuestionParamsStreaming;
}

export interface GraphQuestionParamsNonStreaming extends GraphQuestionParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream?: false;
}

export interface GraphQuestionParamsStreaming extends GraphQuestionParamsBase {
  /**
   * Determines whether the model's output should be streamed. If true, the output is
   * generated and sent incrementally, which can be useful for real-time
   * applications.
   */
  stream: true;
}

export interface GraphRemoveFileFromGraphParams {
  /**
   * The unique identifier of the Knowledge Graph to which the files belong.
   */
  graph_id: string;
}

export declare namespace Graphs {
  export {
    type Graph as Graph,
    type Question as Question,
    type QuestionResponseChunk as QuestionResponseChunk,
    type GraphCreateResponse as GraphCreateResponse,
    type GraphUpdateResponse as GraphUpdateResponse,
    type GraphDeleteResponse as GraphDeleteResponse,
    type GraphRemoveFileFromGraphResponse as GraphRemoveFileFromGraphResponse,
    type GraphsCursorPage as GraphsCursorPage,
    type GraphCreateParams as GraphCreateParams,
    type GraphUpdateParams as GraphUpdateParams,
    type GraphListParams as GraphListParams,
    type GraphAddFileToGraphParams as GraphAddFileToGraphParams,
    type GraphQuestionParams as GraphQuestionParams,
    type GraphQuestionParamsNonStreaming as GraphQuestionParamsNonStreaming,
    type GraphQuestionParamsStreaming as GraphQuestionParamsStreaming,
    type GraphRemoveFileFromGraphParams as GraphRemoveFileFromGraphParams,
  };
}
