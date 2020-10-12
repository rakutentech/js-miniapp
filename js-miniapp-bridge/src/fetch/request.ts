import {
  NativeFetchRequest,
  FetchRequestInit,
  RequestMethod,
} from '../types/fetch';

/** @internal */
export class InternalFetchRequest implements NativeFetchRequest {
  headers?: Record<string, string>;
  method?: RequestMethod;
  url: string;

  constructor(input: string, opts?: FetchRequestInit) {
    this.url = input;
    Object.assign(this, opts);
    if (!this.method) {
      this.method = opts?.method || 'GET';
    }
  }
}
