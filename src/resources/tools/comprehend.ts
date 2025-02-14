// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Comprehend extends APIResource {
  /**
   * Analyze unstructured medical text to extract entities labeled with standardized
   * medical codes and confidence scores.
   */
  medical(body: ComprehendMedicalParams, options?: RequestOptions): APIPromise<ComprehendMedicalResponse> {
    return this._client.post('/v1/tools/comprehend/medical', { body, ...options });
  }
}

export interface ComprehendMedicalResponse {
  /**
   * An array of medical entities extracted from the input text.
   */
  entities: Array<ComprehendMedicalResponse.Entity>;
}

export namespace ComprehendMedicalResponse {
  export interface Entity {
    attributes: Array<Entity.Attribute>;

    begin_offset: number;

    category: string;

    concepts: Array<Entity.Concept>;

    end_offset: number;

    score: number;

    text: string;

    traits: Array<Entity.Trait>;

    type: string;
  }

  export namespace Entity {
    export interface Attribute {
      begin_offset: number;

      concepts: Array<Attribute.Concept>;

      end_offset: number;

      relationship_score: number;

      score: number;

      text: string;

      traits: Array<Attribute.Trait>;

      type: string;

      category?: string;

      relationship_type?: string;
    }

    export namespace Attribute {
      export interface Concept {
        code: string;

        description: string;

        score: number;
      }

      export interface Trait {
        name: string;

        score: number;
      }
    }

    export interface Concept {
      code: string;

      description: string;

      score: number;
    }

    export interface Trait {
      name: string;

      score: number;
    }
  }
}

export interface ComprehendMedicalParams {
  /**
   * The text to be analyzed.
   */
  content: string;

  /**
   * The structure of the response to be returned. `Entities` returns medical
   * entities, `RxNorm` returns medication information, `ICD-10-CM` returns diagnosis
   * codes, and `SNOMED CT` returns medical concepts.
   */
  response_type: 'Entities' | 'RxNorm' | 'ICD-10-CM' | 'SNOMED CT';
}

export declare namespace Comprehend {
  export {
    type ComprehendMedicalResponse as ComprehendMedicalResponse,
    type ComprehendMedicalParams as ComprehendMedicalParams,
  };
}
