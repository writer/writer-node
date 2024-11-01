// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class PdfParser extends APIResource {
  /**
   * Parse PDF to other formats.
   */
  parse(
    fileId: string,
    body: PdfParserParseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PdfParserParseResponse> {
    return this._client.post(`/v1/tools/pdf-parser/${fileId}`, { body, ...options });
  }
}

export interface PdfParserParseResponse {
  /**
   * The extracted content from the PDF file, converted to the specified format.
   */
  content: string;
}

export interface PdfParserParseParams {
  /**
   * The format into which the PDF content should be converted.
   */
  format: 'text' | 'markdown';
}

export declare namespace PdfParser {
  export {
    type PdfParserParseResponse as PdfParserParseResponse,
    type PdfParserParseParams as PdfParserParseParams,
  };
}
