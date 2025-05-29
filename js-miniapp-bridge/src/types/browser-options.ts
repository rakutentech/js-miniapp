export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Options for launching a browser.
 * Allows specifying URL, HTTP method, body, audience, and scopes.
 */
export interface LaunchBrowserOptions {
  url: string;
  httpMethod?: HttpMethod;
  httpBody?: { [key: string]: string };
  audience?: string;
  scopes?: string[];
}
