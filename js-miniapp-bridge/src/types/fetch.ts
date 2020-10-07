type Headers = Record<string, string>;

type ResponseType = 'cors' | 'error';
interface ResponseBody {
  readonly body: Uint8Array | null;
  readonly bodyUsed: boolean;
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

export class FetchResponseImpl implements Response {
  private encoding = 'utf-8';
  headers: Record<string, string>;
  ok: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
  body: Uint8Array;
  bodyUsed: boolean;
  /**
   * @param body utf-8 encoded array
   */
  constructor(res: NativeFetchResponse) {
    if (!res.body) {
      throw new Error('Invalid response body');
    }
    Object.keys(res).forEach(key => {
      if (key !== 'body') {
        this[key] = res[key];
      }
    });
    this.body = new Uint8Array(res.body);
    this.bodyUsed = false;
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    if (ArrayBuffer.isView(this.body)) {
      this.bodyUsed = true;
      return Promise.resolve(this.body.buffer);
    } else {
      throw new Error('invalid encoded data.');
    }
  }
  json(): Promise<object> {
    try {
      const content = new TextDecoder(this.encoding).decode(this.body);
      this.bodyUsed = true;
      return Promise.resolve(JSON.parse(content));
    } catch (err) {
      return Promise.reject('invalid json response body');
    }
  }

  text(): Promise<string> {
    this.bodyUsed = true;
    return Promise.resolve(new TextDecoder(this.encoding).decode(this.body));
  }
}

interface Response extends ResponseBody {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
}

// type RequestBody = FormData | string;
type RequestMethod = 'GET' /*  | 'POST' */;
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
  /**
   * A string to indicate that the request will use CORS
   */
  mode?: 'cors';
}

export type NativeFetchResponse = Omit<Response, keyof Body> & {
  /**
   * utf-8 encoded string
   */
  body: number[];
};

export type FetchRequest = Partial<FetchRequestInit> & { url: string };
export type FetchResponse = Response;
