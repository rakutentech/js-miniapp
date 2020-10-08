import { FetchRequest, FetchRequestInit } from '../types/fetch';

export class InternalFetchRequest implements FetchRequest {
  headers?: Record<string, string>;
  method?: 'GET';
  url: string;

  constructor(input: FetchRequest | string, opts?: FetchRequestInit) {
    if (typeof input === 'string') {
      this.url = input;
      Object.assign(this, opts);
    } else {
      Object.assign(this, input, opts);
    }
    if (!this.method) {
      this.method =
        (typeof input !== 'string' ? input.method : opts?.method) || 'GET';
    }
  }
}
