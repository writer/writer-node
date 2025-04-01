// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { WriterError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type Writer } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: Writer;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: Writer, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new WriterError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: Writer,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface CursorPageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;
}

export interface CursorPageParams {
  /**
   * A cursor representing an item's token after which a page of results should
   * begin. Used to retrieve the next page of results after this item.
   */
  after?: string;

  /**
   * A cursor representing an item's token before which a page of results should end.
   * Used to retrieve the previous page of results before this item.
   */
  before?: string;
}

export class CursorPage<Item extends { id: string }>
  extends AbstractPage<Item>
  implements CursorPageResponse<Item>
{
  data: Array<Item>;

  has_more: boolean;

  constructor(
    client: Writer,
    response: Response,
    body: CursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.has_more = body.has_more;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  override hasNextPage(): boolean {
    return this.has_more && super.hasNextPage();
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const data = this.getPaginatedItems();

    const isForwards = !(typeof this.options.query === 'object' && 'before' in (this.options.query || {}));
    if (isForwards) {
      const id = data[data.length - 1]?.id;
      if (!id) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          after: id,
        },
      };
    }

    const id = data[0]?.id;
    if (!id) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        before: id,
      },
    };
  }
}

export interface ApplicationJobsOffsetResponse<Item> {
  result: Array<Item>;

  totalCount: number;

  pagination: ApplicationJobsOffsetResponse.Pagination;
}

export namespace ApplicationJobsOffsetResponse {
  export interface Pagination {
    limit?: number;

    offset?: number;
  }
}

export interface ApplicationJobsOffsetParams {
  /**
   * The number of elements to skip.
   */
  offset?: number;

  /**
   * The maximum number of elements to fetch.
   */
  limit?: number;
}

export class ApplicationJobsOffset<Item>
  extends AbstractPage<Item>
  implements ApplicationJobsOffsetResponse<Item>
{
  result: Array<Item>;

  totalCount: number;

  pagination: ApplicationJobsOffsetResponse.Pagination;

  constructor(
    client: Writer,
    response: Response,
    body: ApplicationJobsOffsetResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.result = body.result || [];
    this.totalCount = body.totalCount || 0;
    this.pagination = body.pagination || {};
  }

  getPaginatedItems(): Item[] {
    return this.result ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const offset = this.pagination?.offset;
    if (!offset) {
      return null;
    }

    const length = this.getPaginatedItems().length;
    const currentCount = offset + length;

    const totalCount = this.totalCount;
    if (!totalCount) {
      return null;
    }

    if (currentCount < totalCount) {
      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          offset: currentCount,
        },
      };
    }

    return null;
  }
}
