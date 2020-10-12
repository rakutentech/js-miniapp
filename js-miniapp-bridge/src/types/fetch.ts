export type Headers = Record<string, string>;

interface ResponseBody {
  readonly body: Uint8Array | null;
  /**
   * Decode response as ArrayBuffer
   */
  arrayBuffer(): Promise<ArrayBuffer>;
  /**
   * Decode response as json
   */
  json(): Promise<object>;
  /**
   * Decode response as text
   */
  text(): Promise<string>;
}

export interface FetchRequestInit {
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  headers?: Headers;

  /**
   * A string to set request's method.
   */
  method?: RequestMethod;
}
export interface FetchResponse extends ResponseBody {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
}

export type RequestMethod = 'GET';

/** @internal */
export type NativeFetchResponse = Omit<FetchResponse, keyof ResponseBody> & {
  /**
   * encoded data
   */
  body: number[];
};

/** @internal */
export type NativeFetchRequest = Partial<FetchRequestInit> & { url: string };
