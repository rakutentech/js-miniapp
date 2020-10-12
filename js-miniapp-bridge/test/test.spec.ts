import { expect } from 'chai';
import sinon from 'sinon';

import * as Bridge from '../src/common-bridge';
import {
  CustomPermissionName,
  CustomPermissionStatus,
} from '../src/types/custom-permissions';
import { NativeFetchRequest, NativeFetchResponse } from '../src';

/* tslint:disable:no-any */
const window: any = {};
(global as any).window = window;

const sandbox = sinon.createSandbox();
const mockExecutor = {
  exec: sinon.stub(),
  getPlatform: sinon.stub(),
};

beforeEach(() => {
  sandbox.restore();
});

describe('execSuccessCallback', () => {
  describe('when called with valid value', () => {
    it('will return success promise with uniqueId value', () => {
      const callback = createCallback({
        onSuccess: value => expect(value).to.equal('1234'),
      });

      Bridge.mabMessageQueue.unshift(callback);
      Bridge.MiniAppBridge.prototype.execSuccessCallback(callback.id, '1234');
    });
  });

  describe('when called with invalid value', () => {
    it('will return error promise with Unknown Error', () => {
      const callback = createCallback({
        onError: error => expect(error).to.equal('Unknown Error'),
      });

      Bridge.mabMessageQueue.unshift(callback);
      Bridge.MiniAppBridge.prototype.execSuccessCallback(callback.id, '');
    });
  });
});

describe('execErrorCallback', () => {
  describe('when called with error message', () => {
    it('will return error promise with same error message', () => {
      const callback = createCallback({
        onError: error => expect(error).to.equal('Internal Error'),
      });

      Bridge.mabMessageQueue.unshift(callback);
      Bridge.MiniAppBridge.prototype.execErrorCallback(
        callback.id,
        'Internal Error'
      );
    });
  });

  describe('when called with no error message', () => {
    it('will return error promise with Unknown Error', () => {
      const callback = createCallback({
        onError: error => expect(error).to.equal('Unknown Error'),
      });

      Bridge.mabMessageQueue.unshift(callback);
      Bridge.MiniAppBridge.prototype.execErrorCallback(callback.id, '');
    });
  });
});

describe('showRewardedAd', () => {
  it('will parse the Reward JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      2,
      '{ "amount": 500, "type": "game bonus" }'
    );

    return expect(bridge.showRewardedAd('test_id')).to.eventually.deep.equal({
      amount: 500,
      type: 'game bonus',
    });
  });
});

describe('showInterstitialAd', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(
      bridge.showInterstitialAd('test_id')
    ).to.eventually.deep.equal(response);
  });
});

describe('requestCustomPermissions', () => {
  const requestPermissions = [
    { name: CustomPermissionName.USER_NAME, description: 'test_description' },
  ];

  it('will call the platform executor', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.requestCustomPermissions(requestPermissions);

    sinon.assert.calledWith(mockExecutor.exec, 'requestCustomPermissions');
  });

  it('will attach the permissions to the `permissions` key', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.requestCustomPermissions(requestPermissions);

    sinon.assert.calledWith(mockExecutor.exec, sinon.match.any, {
      permissions: requestPermissions,
    });
  });

  it('will parse the CustomPermission JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      2,
      `[{"name": "${CustomPermissionName.USER_NAME}", "status": "${CustomPermissionStatus.ALLOWED}"}]`
    );

    return expect(bridge.requestCustomPermissions([])).to.eventually.deep.equal(
      [
        {
          name: CustomPermissionName.USER_NAME,
          status: CustomPermissionStatus.ALLOWED,
        },
      ]
    );
  });
});

describe('fetch', () => {
  const req: NativeFetchRequest = { url: 'test-url' };
  const testSuccessRes: NativeFetchResponse = {
    url: 'test-url',
    ok: true,
    status: 200,
    statusText: 'ok',
    body: [1, 2, 3],
    headers: { 'Content-Type': 'application/json' },
  };

  it('should get success response', async () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, JSON.stringify(testSuccessRes));
    const res = await bridge.fetch(req);
    expect(res).deep.equal(testSuccessRes);
  });

  it('should reject promise with error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const networkError = 'Network error occured';
    mockExecutor.exec.callsArgWith(3, networkError);
    expect(bridge.fetch(req)).be.rejectedWith(networkError);
  });
});

interface CreateCallbackParams {
  onSuccess?: (success: any) => any;
  onError?: (error: string) => any;
}

function createCallback({
  onSuccess,
  onError,
}: CreateCallbackParams): Bridge.Callback {
  return {
    onSuccess: onSuccess || (() => undefined),
    onError: onError || (() => undefined),
    id: String(Math.random()),
  };
}
