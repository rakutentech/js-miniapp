import { NativeFetchResponse, FetchResponse } from '../types/fetch';

/** @internal */
export class DecodedFetchResponse implements FetchResponse {
  private encoding = 'utf-8';
  headers: Record<string, string>;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  body: Uint8Array;

  /**
   * @param body utf-8 encoded array
   */
  constructor(res: NativeFetchResponse) {
    if (!res.body) {
      throw new Error('Invalid response body');
    }
    Object.keys(res)
      .filter(key => key !== 'body')
      .forEach(key => {
        this[key] = res[key];
      });
    this.body = new Uint8Array(res.body);
  }

  private decodeBody(): string {
    return Buffer.from(this.body).toString(this.encoding);
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    if (ArrayBuffer.isView(this.body)) {
      return Promise.resolve(this.body.buffer);
    } else {
      throw new Error('invalid encoded data.');
    }
  }

  json(): Promise<object> {
    try {
      return Promise.resolve(JSON.parse(this.decodeBody()));
    } catch (err) {
      return Promise.reject('invalid json response body');
    }
  }

  text(): Promise<string> {
    return Promise.resolve(this.decodeBody());
  }
}
