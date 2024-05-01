// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from 'writer/resource';
import * as ChatAPI from 'writer/resources/v1/chat';
import * as CompletionsAPI from 'writer/resources/v1/completions';
import * as ModelsAPI from 'writer/resources/v1/models';

export class V1 extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
  models: ModelsAPI.Models = new ModelsAPI.Models(this._client);
}

export namespace V1 {
  export import Chat = ChatAPI.Chat;
  export import ChatCreateResponse = ChatAPI.ChatCreateResponse;
  export import ChatCreateParams = ChatAPI.ChatCreateParams;
  export import Completions = CompletionsAPI.Completions;
  export import CompletionCreateResponse = CompletionsAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
  export import Models = ModelsAPI.Models;
  export import ModelListResponse = ModelsAPI.ModelListResponse;
}
