import { AdTypes } from '../src/types/adTypes';
import { InterstitialAdResponse } from '../src/types/responseTypes/interstitial';
import * as bridge from '../src/common-bridge';
import assert from 'chai';

/* tslint:disable:no-any */
const window: any = {};
(global as any).window = window;

describe('Test Mini App Bridge execSuccessCallback is called with valid unique id', () => {
  it('will return success promise with uniqueId value', () => {
    const callback = {} as bridge.Callback;
    const onSuccess = value => {
      assert.expect(value).to.equal('1234');
    };
    const onError = () => {};
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(Math.random());
    bridge.mabMessageQueue.unshift(callback);
    bridge.MiniAppBridge.prototype.execSuccessCallback(callback.id, '1234');
  });
});

describe('Test Mini App Bridge execSuccessCallback is called with invalid unique id', () => {
  it('will return error promise with Unknown Error', () => {
    const callback = {} as bridge.Callback;
    const onSuccess = value => {};
    const onError = error => {
      assert.expect(error).to.equal('Unknown Error');
    };
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(Math.random());
    bridge.mabMessageQueue.unshift(callback);
    bridge.MiniAppBridge.prototype.execSuccessCallback(callback.id, '');
  });
});

describe('Test Mini App Bridge execErrorCallback is called with error message', () => {
  it('will return error promise with same error message', () => {
    const callback = {} as bridge.Callback;
    const onSuccess = value => {};
    const onError = error => {
      assert.expect(error).to.equal('Internal Error');
    };
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(Math.random());
    bridge.mabMessageQueue.unshift(callback);
    bridge.MiniAppBridge.prototype.execErrorCallback(
      callback.id,
      'Internal Error'
    );
  });
});

describe('Test Mini App Bridge execErrorCallback is called with no error message', () => {
  it('will return error promise with Unknown Error', () => {
    const callback = {} as bridge.Callback;
    const onSuccess = value => {};
    const onError = error => {
      assert.expect(error).to.equal('Unknown Error');
    };
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(Math.random());
    bridge.mabMessageQueue.unshift(callback);
    bridge.MiniAppBridge.prototype.execErrorCallback(callback.id, '');
  });
});

describe('Test Mini App Bridge execSuccessCallback is called with valid ad response', () => {
  it('will return success promise and typecast the response JSON string successfully', () => {
    const callback = {} as bridge.Callback;
    const adREsponse: InterstitialAdResponse = {
      adType: AdTypes.INTERSTITIAL,
    };

    const jsonAdresponse = '{ "adType": 1 }';

    const onSuccess = value => {
      assert.expect(value).to.equal(jsonAdresponse);
      assert
        .expect(<InterstitialAdResponse>JSON.parse(value))
        .to.deep.equal(adREsponse);
    };
    const onError = () => {};
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(Math.random());
    bridge.mabMessageQueue.unshift(callback);
    bridge.MiniAppBridge.prototype.execSuccessCallback(
      callback.id,
      jsonAdresponse
    );
  });
});
