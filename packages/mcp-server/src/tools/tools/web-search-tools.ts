// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'writer-sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'writer-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Writer from 'writer-sdk';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tools/web-search',
};

export const tool: Tool = {
  name: 'web_search_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch the web for information about a given query and return relevant results with source URLs.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/tool_web_search_response',\n  $defs: {\n    tool_web_search_response: {\n      type: 'object',\n      title: 'web_search_response',\n      properties: {\n        query: {\n          type: 'string',\n          description: 'The search query that was submitted.'\n        },\n        sources: {\n          type: 'array',\n          description: 'The search results found.',\n          items: {\n            type: 'object',\n            properties: {\n              raw_content: {\n                type: 'string',\n                description: 'Raw content from the source URL. Not included if `include_raw_content` is `false`.'\n              },\n              url: {\n                type: 'string',\n                description: 'URL of the search result.'\n              }\n            }\n          }\n        },\n        answer: {\n          type: 'string',\n          description: 'Generated answer based on the search results. Not included if `include_answer` is `false`.'\n        }\n      },\n      required: [        'query',\n        'sources'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      chunks_per_source: {
        type: 'integer',
        description:
          'Only applies when `search_depth` is `advanced`. Specifies how many text segments to extract from each source. Limited to 3 chunks maximum.',
      },
      country: {
        type: 'string',
        description:
          'Localizes search results to a specific country. Only applies to general topic searches.',
        enum: [
          'afghanistan',
          'albania',
          'algeria',
          'andorra',
          'angola',
          'argentina',
          'armenia',
          'australia',
          'austria',
          'azerbaijan',
          'bahamas',
          'bahrain',
          'bangladesh',
          'barbados',
          'belarus',
          'belgium',
          'belize',
          'benin',
          'bhutan',
          'bolivia',
          'bosnia and herzegovina',
          'botswana',
          'brazil',
          'brunei',
          'bulgaria',
          'burkina faso',
          'burundi',
          'cambodia',
          'cameroon',
          'canada',
          'cape verde',
          'central african republic',
          'chad',
          'chile',
          'china',
          'colombia',
          'comoros',
          'congo',
          'costa rica',
          'croatia',
          'cuba',
          'cyprus',
          'czech republic',
          'denmark',
          'djibouti',
          'dominican republic',
          'ecuador',
          'egypt',
          'el salvador',
          'equatorial guinea',
          'eritrea',
          'estonia',
          'ethiopia',
          'fiji',
          'finland',
          'france',
          'gabon',
          'gambia',
          'georgia',
          'germany',
          'ghana',
          'greece',
          'guatemala',
          'guinea',
          'haiti',
          'honduras',
          'hungary',
          'iceland',
          'india',
          'indonesia',
          'iran',
          'iraq',
          'ireland',
          'israel',
          'italy',
          'jamaica',
          'japan',
          'jordan',
          'kazakhstan',
          'kenya',
          'kuwait',
          'kyrgyzstan',
          'latvia',
          'lebanon',
          'lesotho',
          'liberia',
          'libya',
          'liechtenstein',
          'lithuania',
          'luxembourg',
          'madagascar',
          'malawi',
          'malaysia',
          'maldives',
          'mali',
          'malta',
          'mauritania',
          'mauritius',
          'mexico',
          'moldova',
          'monaco',
          'mongolia',
          'montenegro',
          'morocco',
          'mozambique',
          'myanmar',
          'namibia',
          'nepal',
          'netherlands',
          'new zealand',
          'nicaragua',
          'niger',
          'nigeria',
          'north korea',
          'north macedonia',
          'norway',
          'oman',
          'pakistan',
          'panama',
          'papua new guinea',
          'paraguay',
          'peru',
          'philippines',
          'poland',
          'portugal',
          'qatar',
          'romania',
          'russia',
          'rwanda',
          'saudi arabia',
          'senegal',
          'serbia',
          'singapore',
          'slovakia',
          'slovenia',
          'somalia',
          'south africa',
          'south korea',
          'south sudan',
          'spain',
          'sri lanka',
          'sudan',
          'sweden',
          'switzerland',
          'syria',
          'taiwan',
          'tajikistan',
          'tanzania',
          'thailand',
          'togo',
          'trinidad and tobago',
          'tunisia',
          'turkey',
          'turkmenistan',
          'uganda',
          'ukraine',
          'united arab emirates',
          'united kingdom',
          'united states',
          'uruguay',
          'uzbekistan',
          'venezuela',
          'vietnam',
          'yemen',
          'zambia',
          'zimbabwe',
        ],
      },
      days: {
        type: 'integer',
        description: 'For news topic searches, specifies how many days of news coverage to include.',
      },
      exclude_domains: {
        type: 'array',
        description: 'Domains to exclude from the search. If unset, the search includes all domains.',
        items: {
          type: 'string',
        },
      },
      include_answer: {
        type: 'boolean',
        description:
          'Whether to include a generated answer to the query in the response. If `false`, only search results are returned.',
      },
      include_domains: {
        type: 'array',
        description: 'Domains to include in the search. If unset, the search includes all domains.',
        items: {
          type: 'string',
        },
      },
      include_raw_content: {
        anyOf: [
          {
            type: 'string',
            enum: ['text', 'markdown'],
          },
          {
            type: 'boolean',
          },
        ],
        description:
          'Controls how raw content is included in search results:\n\n- `text`: Returns plain text without formatting markup\n- `markdown`: Returns structured content with markdown formatting (headers, links, bold text)\n- `true`: Same as `markdown`\n- `false`: Raw content is not included (default if unset)',
      },
      max_results: {
        type: 'integer',
        description: 'Limits the number of search results returned. Cannot exceed 20 sources.',
      },
      query: {
        type: 'string',
        description: 'The search query.',
      },
      search_depth: {
        type: 'string',
        description:
          'Controls search comprehensiveness:\n\n- `basic`: Returns fewer but highly relevant results\n- `advanced`: Performs a deeper search with more results',
        enum: ['basic', 'advanced'],
      },
      stream: {
        type: 'boolean',
        description: 'Enables streaming of search results as they become available.',
      },
      time_range: {
        type: 'string',
        description:
          'Filters results to content published within the specified time range back from the current date. For example, `week` or `w` returns results from the past 7 days.',
        enum: ['day', 'week', 'month', 'year', 'd', 'w', 'm', 'y'],
      },
      topic: {
        type: 'string',
        description:
          'The search topic category. Use `news` for current events and news articles, or `general` for broader web search.',
        enum: ['general', 'news'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Writer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.tools.webSearch(body)));
  } catch (error) {
    if (error instanceof Writer.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
