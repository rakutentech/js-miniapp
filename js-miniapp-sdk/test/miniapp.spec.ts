/* tslint:disable:no-any */

import { expect } from 'chai';
import sinon from 'sinon';

import { MiniAppImp } from '../src/miniapp';

const window: any = {};
(global as any).window = window;

window.MiniAppBridge = {
  getUniqueId: sinon.stub(),
  requestPermission: sinon.stub(),
};
const miniApp = new MiniAppImp();

describe('getUniqueId', () => {
  it('should retrieve the unique id from the Mini App Bridge', () => {
    window.MiniAppBridge.getUniqueId.resolves('test_mini_app_id');

    return expect(miniApp.getUniqueId()).to.eventually.equal(
      'test_mini_app_id'
    );
  });
});

describe('requestPermission', () => {
  it('should retrieve permission result from the Mini App Bridge', () => {
    window.MiniAppBridge.requestPermission.resolves('Denied');

    return expect(
      miniApp.requestPermission('permissionType')
    ).to.eventually.equal('Denied');
  });
});
