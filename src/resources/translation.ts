// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Translation extends APIResource {
  /**
   * Translate text from one language to another.
   *
   * @example
   * ```ts
   * const translationResponse =
   *   await client.translation.translate({
   *     formality: true,
   *     length_control: true,
   *     mask_profanity: true,
   *     model: 'palmyra-translate',
   *     source_language_code: 'en',
   *     target_language_code: 'es',
   *     text: 'Hello, world!',
   *   });
   * ```
   */
  translate(body: TranslationTranslateParams, options?: RequestOptions): APIPromise<TranslationResponse> {
    return this._client.post('/v1/translation', { body, ...options });
  }
}

export interface TranslationRequest {
  /**
   * Whether to use formal or informal language in the translation. See the
   * [list of languages that support formality](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#formality).
   * If the language does not support formality, this parameter is ignored.
   */
  formality: boolean;

  /**
   * Whether to control the length of the translated text. See the
   * [list of languages that support length control](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#length-control).
   * If the language does not support length control, this parameter is ignored.
   */
  length_control: boolean;

  /**
   * Whether to mask profane words in the translated text. See the
   * [list of languages that do not support profanity masking](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#profanity-masking).
   * If the language does not support profanity masking, this parameter is ignored.
   */
  mask_profanity: boolean;

  /**
   * The model to use for translation.
   */
  model: 'palmyra-translate';

  /**
   * The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
   * language code of the original text to translate. For example, `en` for English,
   * `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a
   * variant, the code appends the two-digit
   * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
   * For example, Mexican Spanish is `es-MX`. See the
   * [list of supported languages and language codes](https://dev.writer.com/api-guides/api-reference/translation-api/language-support).
   */
  source_language_code: string;

  /**
   * The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
   * language code of the target language for the translation. For example, `en` for
   * English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language
   * has a variant, the code appends the two-digit
   * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
   * For example, Mexican Spanish is `es-MX`. See the
   * [list of supported languages and language codes](https://dev.writer.com/api-guides/api-reference/translation-api/language-support).
   */
  target_language_code: string;

  /**
   * The text to translate. Maximum of 100,000 words.
   */
  text: string;
}

export interface TranslationResponse {
  /**
   * The result of the translation.
   */
  data: string;
}

export interface TranslationTranslateParams {
  /**
   * Whether to use formal or informal language in the translation. See the
   * [list of languages that support formality](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#formality).
   * If the language does not support formality, this parameter is ignored.
   */
  formality: boolean;

  /**
   * Whether to control the length of the translated text. See the
   * [list of languages that support length control](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#length-control).
   * If the language does not support length control, this parameter is ignored.
   */
  length_control: boolean;

  /**
   * Whether to mask profane words in the translated text. See the
   * [list of languages that do not support profanity masking](https://dev.writer.com/api-guides/api-reference/translation-api/language-support#profanity-masking).
   * If the language does not support profanity masking, this parameter is ignored.
   */
  mask_profanity: boolean;

  /**
   * The model to use for translation.
   */
  model: 'palmyra-translate';

  /**
   * The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
   * language code of the original text to translate. For example, `en` for English,
   * `zh` for Chinese, `fr` for French, `es` for Spanish. If the language has a
   * variant, the code appends the two-digit
   * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
   * For example, Mexican Spanish is `es-MX`. See the
   * [list of supported languages and language codes](https://dev.writer.com/api-guides/api-reference/translation-api/language-support).
   */
  source_language_code: string;

  /**
   * The [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
   * language code of the target language for the translation. For example, `en` for
   * English, `zh` for Chinese, `fr` for French, `es` for Spanish. If the language
   * has a variant, the code appends the two-digit
   * [ISO-3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
   * For example, Mexican Spanish is `es-MX`. See the
   * [list of supported languages and language codes](https://dev.writer.com/api-guides/api-reference/translation-api/language-support).
   */
  target_language_code: string;

  /**
   * The text to translate. Maximum of 100,000 words.
   */
  text: string;
}

export declare namespace Translation {
  export {
    type TranslationRequest as TranslationRequest,
    type TranslationResponse as TranslationResponse,
    type TranslationTranslateParams as TranslationTranslateParams,
  };
}
