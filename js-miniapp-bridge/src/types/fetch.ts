type Headers = Record<string, string>;
// type RequestBody = FormData | string;
type RequestMethod = 'GET' /*  | 'POST' */;

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

export interface Response extends ResponseBody {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
}

export interface FetchRequestInit {
  /**
   * A RequestBody object or null to set request's body.
   */
  // body?: RequestBody | null;

  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  headers?: Headers;

  /**
   * A string to set request's method.
   */
  method?: RequestMethod;
}

export type NativeFetchResponse = Omit<Response, keyof Body> & {
  /**
   * utf-8 encoded string
   */
  body: number[];
};

export type FetchRequest = Partial<FetchRequestInit> & { url: string };
export type FetchResponse = Response;
