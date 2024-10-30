// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ToolsAPI from './tools';
import * as MedicalAPI from './medical';
import * as PdfParserAPI from './pdf-parser';

export class Tools extends APIResource {
  medical: MedicalAPI.Medical = new MedicalAPI.Medical(this._client);
  pdfParser: PdfParserAPI.PdfParser = new PdfParserAPI.PdfParser(this._client);

  /**
   * Splits a long block of text (maximum 4000 words) into smaller chunks while
   * preserving the semantic meaning of the text and context between the chunks.
   */
  contextAwareSplitting(
    body: ToolContextAwareSplittingParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolContextAwareSplittingResponse> {
    return this._client.post('/v1/tools/context-aware-splitting', { body, ...options });
  }
}

export interface ToolContextAwareSplittingResponse {
  /**
   * An array of text chunks generated by splitting the input text based on the
   * specified strategy.
   */
  chunks: Array<string>;
}

export interface ToolContextAwareSplittingParams {
  /**
   * The strategy to be used for splitting the text into chunks. `llm_split` uses the
   * language model to split the text, `fast_split` uses a fast heuristic-based
   * approach, and `hybrid_split` combines both strategies.
   */
  strategy: 'llm_split' | 'fast_split' | 'hybrid_split';

  /**
   * The text to be split into chunks.
   */
  text: string;
}

export namespace Tools {
  export import ToolContextAwareSplittingResponse = ToolsAPI.ToolContextAwareSplittingResponse;
  export import ToolContextAwareSplittingParams = ToolsAPI.ToolContextAwareSplittingParams;
  export import Medical = MedicalAPI.Medical;
  export import MedicalCreateResponse = MedicalAPI.MedicalCreateResponse;
  export import MedicalCreateParams = MedicalAPI.MedicalCreateParams;
  export import PdfParser = PdfParserAPI.PdfParser;
  export import PdfParserParseResponse = PdfParserAPI.PdfParserParseResponse;
  export import PdfParserParseParams = PdfParserAPI.PdfParserParseParams;
}
