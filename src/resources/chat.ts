// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'writerai/core';
import { APIResource } from 'writerai/resource';
import * as ChatAPI from 'writerai/resources/chat';

export class Chat extends APIResource {
  /**
   * Create chat completion
   */
  chat(body: ChatChatParams, options?: Core.RequestOptions): Core.APIPromise<ChatChatResponse> {
    return this._client.post('/v1/chat', { body, ...options });
  }
}

export interface ChatChatResponse {
  id: string;

  choices: Array<ChatChatResponse.Choice>;

  created: number;

  model: string;
}

export namespace ChatChatResponse {
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

export interface ChatChatParams {
  messages: Array<ChatChatParams.Message>;

  model: string;

  max_tokens?: number;

  n?: number;

  stop?: Array<string> | string;

  stream?: boolean;

  temperature?: number;

  top_p?: number;
}

export namespace ChatChatParams {
  export interface Message {
    content: string;

    role: 'user' | 'assistant' | 'system';

    name?: string;
  }
}

export namespace Chat {
  export import ChatChatResponse = ChatAPI.ChatChatResponse;
  export import ChatChatParams = ChatAPI.ChatChatParams;
}
