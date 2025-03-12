import { type ChatChatParams, type ChatChatParamsNonStreaming } from '../resources/chat';
import { type RunnableFunctions, type BaseFunctionsArgs, RunnableTools } from './RunnableFunction';
import {
  AbstractChatCompletionRunner,
  AbstractChatCompletionRunnerEvents,
} from './AbstractChatCompletionRunner';
import { AutoParseableTool } from '../lib/parser';

export interface ChatCompletionRunnerEvents extends AbstractChatCompletionRunnerEvents {
  content: (content: string) => void;
}

export type ChatCompletionFunctionRunnerParams<FunctionsArgs extends BaseFunctionsArgs> = Omit<
  ChatChatParamsNonStreaming,
  'functions'
> & {
  functions: RunnableFunctions<FunctionsArgs>;
};

export type ChatCompletionToolRunnerParams<FunctionsArgs extends BaseFunctionsArgs> = Omit<
  ChatChatParamsNonStreaming,
  'tools'
> & {
  tools: RunnableTools<FunctionsArgs> | AutoParseableTool<any, true>[];
};

export class ChatCompletionRunner<ParsedT = null> extends AbstractChatCompletionRunner<
  ChatCompletionRunnerEvents,
  ParsedT
> {
  override _addMessage(
    this: ChatCompletionRunner<ParsedT>,
    message: ChatChatParams.Message,
    emit: boolean = true,
  ) {
    super._addMessage(message, emit);
    if (message.role === 'assistant' && message.content) {
      this._emit('content', message.content as string);
    }
  }
}
