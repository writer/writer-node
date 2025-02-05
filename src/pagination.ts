// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

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
    client: APIClient,
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

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<CursorPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const data = this.getPaginatedItems();
    if (!data.length) {
      return null;
    }

    const isForwards = !(typeof this.options.query === 'object' && 'before' in (this.options.query || {}));
    if (isForwards) {
      const id = data[data.length - 1]?.id;
      if (!id) {
        return null;
      }

      return { params: { after: id } };
    }

    const id = data[0]?.id;
    if (!id) {
      return null;
    }

    return { params: { before: id } };
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
    client: APIClient,
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

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<ApplicationJobsOffsetParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
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
      return { params: { offset: currentCount } };
    }

    return null;
  }
}
