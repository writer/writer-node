// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';

export class Vision extends APIResource {
  /**
   * Submit images and a prompt to generate an analysis of the images.
   */
  analyze(body: VisionAnalyzeParams, options?: RequestOptions): APIPromise<VisionResponse> {
    return this._client.post('/v1/vision', { body, ...options });
  }
}

export interface VisionRequest {
  /**
   * The model to be used for image analysis. Currently only supports
   * `palmyra-vision`.
   */
  model: string;

  /**
   * The prompt to use for the image analysis. The prompt must include the name of
   * each image variable, surrounded by double curly braces (`{{}}`). For example,
   * `Describe the difference between the image {{image_1}} and the image {{image_2}}`.
   */
  prompt: string;

  variables: Array<VisionRequest.Variable>;
}

export namespace VisionRequest {
  /**
   * An array of file variables required for the analysis. The image files must be
   * uploaded to the Writer platform before they can be used in a vision request.
   * Learn how to upload files using the
   * [Files API](/api-guides/api-reference/file-api/upload-files).
   */
  export interface Variable {
    /**
     * The File ID of the image to be analyzed. The file must be uploaded to the Writer
     * platform before it can be used in a vision request.
     */
    file_id: string;

    /**
     * The name of the file variable. You must reference this name in the prompt with
     * double curly braces (`{{}}`). For example,
     * `Describe the difference between the image {{image_1}} and the image {{image_2}}`.
     */
    name: string;
  }
}

export interface VisionResponse {
  /**
   * The result of the image analysis.
   */
  data: string;
}

export interface VisionAnalyzeParams {
  /**
   * The model to be used for image analysis. Currently only supports
   * `palmyra-vision`.
   */
  model: string;

  /**
   * The prompt to use for the image analysis. The prompt must include the name of
   * each image variable, surrounded by double curly braces (`{{}}`). For example,
   * `Describe the difference between the image {{image_1}} and the image {{image_2}}`.
   */
  prompt: string;

  variables: Array<VisionAnalyzeParams.Variable>;
}

export namespace VisionAnalyzeParams {
  /**
   * An array of file variables required for the analysis. The image files must be
   * uploaded to the Writer platform before they can be used in a vision request.
   * Learn how to upload files using the
   * [Files API](/api-guides/api-reference/file-api/upload-files).
   */
  export interface Variable {
    /**
     * The File ID of the image to be analyzed. The file must be uploaded to the Writer
     * platform before it can be used in a vision request.
     */
    file_id: string;

    /**
     * The name of the file variable. You must reference this name in the prompt with
     * double curly braces (`{{}}`). For example,
     * `Describe the difference between the image {{image_1}} and the image {{image_2}}`.
     */
    name: string;
  }
}

export declare namespace Vision {
  export {
    type VisionRequest as VisionRequest,
    type VisionResponse as VisionResponse,
    type VisionAnalyzeParams as VisionAnalyzeParams,
  };
}
