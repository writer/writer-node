import { ChatCompletion, ChatChatParams } from '../resources/chat';
import { ToolCall, ToolParam } from '../resources/shared';
import { ParsedChatCompletion, ParsedChoice, ParsedFunctionToolCall } from '../resources/chat';
import { ResponseFormatJSONSchema } from '../resources/shared';
import { ContentFilterFinishReasonError, LengthFinishReasonError, WriterError } from '../error';
import { ChatCompletionToolRunnerParams } from '../lib/ChatCompletionRunner';
import { ChatCompletionStreamingToolRunnerParams } from '../lib/ChatCompletionStreamingRunner';
import { ChatCompletionStreamParams } from '../lib/ChatCompletionStream';

type AnyChatChatParams =
  | ChatChatParams
  | ChatCompletionToolRunnerParams<any>
  | ChatCompletionStreamingToolRunnerParams<any>
  | ChatCompletionStreamParams;

// note: we currently use a placeholder, structured output isn't yet supported by the API
// export type ExtractParsedContentFromParams<Params extends AnyChatChatParams> =
// Params['response_format'] extends AutoParseableResponseFormat<infer P> ? P : null;
export type ExtractParsedContentFromParams<_Params extends AnyChatChatParams> = null;

export type AutoParseableResponseFormat<ParsedT> = ResponseFormatJSONSchema & {
  __output: ParsedT; // type-level only

  $brand: 'auto-parseable-response-format';
  $parseRaw(content: string): ParsedT;
};

export function makeParseableResponseFormat<ParsedT>(
  response_format: ResponseFormatJSONSchema,
  parser: (content: string) => ParsedT,
): AutoParseableResponseFormat<ParsedT> {
  const obj = { ...response_format };

  Object.defineProperties(obj, {
    $brand: {
      value: 'auto-parseable-response-format',
      enumerable: false,
    },
    $parseRaw: {
      value: parser,
      enumerable: false,
    },
  });

  return obj as AutoParseableResponseFormat<ParsedT>;
}

export function isAutoParsableResponseFormat<ParsedT>(
  response_format: any,
): response_format is AutoParseableResponseFormat<ParsedT> {
  return response_format?.['$brand'] === 'auto-parseable-response-format';
}

type ToolOptions = {
  name: string;
  arguments: any;
  function?: ((args: any) => any) | undefined;
};

export type AutoParseableTool<
  OptionsT extends ToolOptions,
  HasFunction = OptionsT['function'] extends Function ? true : false,
> = ToolParam & {
  __arguments: OptionsT['arguments']; // type-level only
  __name: OptionsT['name']; // type-level only
  __hasFunction: HasFunction; // type-level only

  $brand: 'auto-parseable-tool';
  $callback: ((args: OptionsT['arguments']) => any) | undefined;
  $parseRaw(args: string): OptionsT['arguments'];
};

export function makeParseableTool<OptionsT extends ToolOptions>(
  tool: ToolParam,
  {
    parser,
    callback,
  }: {
    parser: (content: string) => OptionsT['arguments'];
    callback: ((args: any) => any) | undefined;
  },
): AutoParseableTool<OptionsT['arguments']> {
  const obj = { ...tool };

  Object.defineProperties(obj, {
    $brand: {
      value: 'auto-parseable-tool',
      enumerable: false,
    },
    $parseRaw: {
      value: parser,
      enumerable: false,
    },
    $callback: {
      value: callback,
      enumerable: false,
    },
  });

  return obj as AutoParseableTool<OptionsT['arguments']>;
}

export function isAutoParsableTool(tool: any): tool is AutoParseableTool<any> {
  return tool?.['$brand'] === 'auto-parseable-tool';
}

export function maybeParseChatCompletion<
  Params extends ChatChatParams | null,
  ParsedT = Params extends null ? null : ExtractParsedContentFromParams<NonNullable<Params>>,
>(completion: ChatCompletion, params: Params): ParsedChatCompletion<ParsedT> {
  if (!params || !hasAutoParseableInput(params)) {
    return {
      ...completion,
      choices: completion.choices.map((choice) => ({
        ...choice,
        message: { ...choice.message, parsed: null, tool_calls: choice.message.tool_calls ?? [] },
      })),
    };
  }

  return parseChatCompletion(completion, params);
}

export function parseChatCompletion<
  Params extends ChatChatParams,
  ParsedT = ExtractParsedContentFromParams<Params>,
>(completion: ChatCompletion, params: Params): ParsedChatCompletion<ParsedT> {
  const choices: Array<ParsedChoice<ParsedT>> = completion.choices.map((choice): ParsedChoice<ParsedT> => {
    if (choice.finish_reason === 'length') {
      throw new LengthFinishReasonError();
    }

    if (choice.finish_reason === 'content_filter') {
      throw new ContentFilterFinishReasonError();
    }

    return {
      ...choice,
      message: {
        ...choice.message,
        tool_calls: choice.message.tool_calls?.map((toolCall) => parseToolCall(params, toolCall)) ?? [],
        parsed:
          choice.message.content && !choice.message.refusal ?
            parseResponseFormat(params, choice.message.content)
          : null,
      },
    };
  });

  return { ...completion, choices };
}

function parseResponseFormat<Params extends ChatChatParams, ParsedT = ExtractParsedContentFromParams<Params>>(
  _params: Params,
  _content: string,
): ParsedT | null {
  return null;
}

function parseToolCall<Params extends ChatChatParams>(
  params: Params,
  toolCall: ToolCall,
): ParsedFunctionToolCall {
  const inputTool = params.tools?.find(
    (inputTool) => inputTool.type === 'function' && inputTool.function?.name === toolCall.function.name,
  );
  return {
    ...toolCall,
    function: {
      ...toolCall.function,
      parsed_arguments:
        isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : null,
    },
  };
}

export function shouldParseToolCall(params: ChatChatParams | null | undefined, toolCall: ToolCall): boolean {
  if (!params) {
    return false;
  }

  const inputTool = params.tools?.find(
    (inputTool) => inputTool.type === 'function' && inputTool.function?.name === toolCall.function.name,
  );
  return isAutoParsableTool(inputTool) || false;
}

export function hasAutoParseableInput(params: AnyChatChatParams): boolean {
  if ('response_format' in params && isAutoParsableResponseFormat(params.response_format)) {
    return true;
  }

  return (
    params.tools?.some(
      (t) =>
        isAutoParsableTool(t) ||
        (t.type === 'function' && 'strict' in t.function && t.function.strict === true),
    ) ?? false
  );
}

export function validateInputTools(tools: ToolParam[] | undefined) {
  for (const tool of tools ?? []) {
    if (tool.type !== 'function') {
      throw new WriterError(
        `Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``,
      );
    }
  }
}
