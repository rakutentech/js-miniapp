import { FetchRequest, FetchRequestInit } from '../types/fetch';

export class InternalFetchRequest implements FetchRequest {
  headers?: Record<string, string>;
  method?: 'GET';
  url: string;

  constructor(input: string, opts?: FetchRequestInit) {
    this.url = input;
    Object.assign(this, opts);
    if (!this.method) {
      this.method = opts?.method || 'GET';
    }
  }
}
