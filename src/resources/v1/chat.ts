// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'writer/core';
import { APIResource } from 'writer/resource';
import * as ChatAPI from 'writer/resources/v1/chat';

export class Chat extends APIResource {
  /**
   * Create chat completion
   */
  create(body: ChatCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatCreateResponse> {
    return this._client.post('/v1/chat', { body, ...options });
  }
}

export interface ChatCreateResponse {
  id: string;

  choices: Array<ChatCreateResponse.Choice>;

  created: number;

  model: string;
}

export namespace ChatCreateResponse {
  export interface Choice {
    finish_reason: 'stop' | 'length' | 'content_filter';

    message: Choice.Message;
  }

  export namespace Choice {
    export interface Message {
      content: string;

      role: 'user' | 'assistant' | 'system';
    }
  }
}

export interface ChatCreateParams {
  messages: Array<ChatCreateParams.Message>;

  model: string;

  max_tokens?: number;

  n?: number;

  stop?: Array<string> | string;

  temperature?: number;

  top_p?: number;
}

export namespace ChatCreateParams {
  export interface Message {
    content: string;

    role: 'user' | 'assistant' | 'system';

    name?: string;
  }
}

export namespace Chat {
  export import ChatCreateResponse = ChatAPI.ChatCreateResponse;
  export import ChatCreateParams = ChatAPI.ChatCreateParams;
}
