import { expect } from 'chai';
import {
  DecodedFetchResponse,
  InternalFetchRequest,
  NativeFetchResponse,
} from '../../src';

describe('DecodedFetchResponse', () => {
  const resBody = { message: 'Hello!' };
  const testRes: NativeFetchResponse = {
    url: 'test-url',
    ok: true,
    status: 200,
    statusText: 'ok',
    body: Array.from(Buffer.from(JSON.stringify(resBody), 'utf-8')),
    headers: { 'Content-Type': 'application/json' },
  };

  it('should return response of type DecodedFetchResponse', () => {
    const response = new DecodedFetchResponse(testRes);
    expect(response.ok).be.equal(testRes.ok);
    expect(response.status).be.equal(testRes.status);
    expect(response.body).be.deep.equal(new Uint8Array(testRes.body));
  });

  it('should return json response body', async () => {
    const response = new DecodedFetchResponse(testRes);
    const resJson = await response.json();
    expect(resJson).be.deep.equal(resBody);
  });

  it('should return text response body', async () => {
    const response = new DecodedFetchResponse(testRes);
    const resText = await response.text();
    expect(resText).be.deep.equal(JSON.stringify(resBody));
  });

  it('should return arrayBuffer response body', async () => {
    const response = new DecodedFetchResponse(testRes);
    const resBuffer = await response.arrayBuffer();
    expect(resBuffer).be.deep.equal(new Uint8Array(testRes.body).buffer);
  });
});

describe('InternalFetchRequest', () => {
  const testItem = {
    url: 'test-url',
    init: {
      headers: { 'Content-Type': 'text/plain' },
    },
  };
  it('should set method to GET & set headers', () => {
    const req = new InternalFetchRequest(testItem.url, testItem.init);
    expect(req.method).be.equal('GET');
    expect(req.headers).be.deep.equal(testItem.init.headers);
  });
});
