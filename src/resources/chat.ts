// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIPromise } from '../core';
import { APIResource } from '../resource';
import * as ChatAPI from './chat';
import { Stream } from '../streaming';

export class ChatResource extends APIResource {
  /**
   * Create chat completion
   */
  chat(body: ChatChatParamsNonStreaming, options?: Core.RequestOptions): APIPromise<Chat>;
  chat(body: ChatChatParamsStreaming, options?: Core.RequestOptions): APIPromise<Stream<ChatStreamingData>>;
  chat(body: ChatChatParamsBase, options?: Core.RequestOptions): APIPromise<Stream<ChatStreamingData> | Chat>;
  chat(
    body: ChatChatParams,
    options?: Core.RequestOptions,
  ): APIPromise<Chat> | APIPromise<Stream<ChatStreamingData>> {
    return this._client.post('/v1/chat', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<Chat>
      | APIPromise<Stream<ChatStreamingData>>;
  }
}

export interface Chat {
  id: string;

  choices: Array<Chat.Choice>;

  created: number;

  model: string;
}

export namespace Chat {
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

export interface ChatStreamingData {
  data: Chat;
}

export type ChatChatParams = ChatChatParamsNonStreaming | ChatChatParamsStreaming;

export interface ChatChatParamsBase {
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

  export type ChatChatParamsNonStreaming = ChatAPI.ChatChatParamsNonStreaming;
  export type ChatChatParamsStreaming = ChatAPI.ChatChatParamsStreaming;
}

export interface ChatChatParamsNonStreaming extends ChatChatParamsBase {
  stream?: false;
}

export interface ChatChatParamsStreaming extends ChatChatParamsBase {
  stream: true;
}

export namespace ChatResource {
  export import Chat = ChatAPI.Chat;
  export import ChatStreamingData = ChatAPI.ChatStreamingData;
  export import ChatChatParams = ChatAPI.ChatChatParams;
  export import ChatChatParamsNonStreaming = ChatAPI.ChatChatParamsNonStreaming;
  export import ChatChatParamsStreaming = ChatAPI.ChatChatParamsStreaming;
}
