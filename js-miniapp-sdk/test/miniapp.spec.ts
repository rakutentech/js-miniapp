/* tslint:disable:no-any */

import { expect } from 'chai';
import sinon from 'sinon';

import {
  Reward,
  CustomPermissionName,
  CustomPermissionStatus,
  ScreenOrientation,
  MessageToContact,
  AudienceNotSupportedError,
  ScopesNotSupportedError,
  AuthorizationFailureError,
  MiniAppError,
  CloseAlertInfo,
  MiniAppSecureStorageSize,
  MiniAppSecureStorageKeyValues,
  Platform,
  HostEnvironmentInfo,
  EsimConfig,
  PermissionName,
  PermissionStatus,
} from '../../js-miniapp-bridge/src';
import { MiniApp } from '../src/miniapp';
import miniAppInstance from '../src';

const sandbox = sinon.createSandbox();
beforeEach(() => {
  sandbox.restore();
  sandbox.reset();
});

const window: any = {};
(global as any).window = window;

const userProfileManager = {
  forceLogout: sandbox.stub(),
};
window.MiniAppBridge = {
  getUniqueId: sandbox.stub(),
  getMessagingUniqueId: sandbox.stub(),
  getMauid: sandbox.stub(),
  requestPermission: sandbox.stub(),
  requestCustomPermissions: sandbox.stub(),
  loadInterstitialAd: sandbox.stub(),
  loadRewardedAd: sandbox.stub(),
  showInterstitialAd: sandbox.stub(),
  showRewardedAd: sandbox.stub(),
  shareInfo: sandbox.stub(),
  getPlatform: sandbox.stub(),
  getUserName: sandbox.stub(),
  getProfilePhoto: sandbox.stub(),
  getContacts: sandbox.stub(),
  getAccessToken: sandbox.stub(),
  getPoints: sandbox.stub(),
  getHostEnvironmentInfo: sandbox.stub(),
  setScreenOrientation: sandbox.stub(),
  sendMessageToContact: sandbox.stub(),
  sendMessageToContactId: sandbox.stub(),
  sendMessageToMultipleContacts: sandbox.stub(),
  downloadFile: sandbox.stub(),
  setCloseAlert: sandbox.stub(),
  clearSecureStorage: sandbox.stub(),
  getSecureStorageSize: sandbox.stub(),
  setSecureStorage: sandbox.stub(),
  getSecureStorageItem: sandbox.stub(),
  removeSecureStorageItems: sandbox.stub(),
  isSecureStorageReady: sandbox.stub(),
  sendJsonToHostapp: sandbox.stub(),
  closeMiniApp: sandbox.stub(),
  getAllProducts: sandbox.stub(),
  purchaseProductWith: sandbox.stub(),
  getPhoneNumber: sandbox.stub(),
  isEsimSupported: sandbox.stub(),
  setupAndInstallEsim: sandbox.stub(),
  forceInternalWebView: sandbox.stub(),
  userProfileManager,
  utilityManager: {
    getPermissionStatus: sandbox.stub(),
    launchAppSettings: sandbox.stub(),
  },
};

const miniApp = new MiniApp();
const messageToContact: MessageToContact = {
  text: 'test',
  image: 'test',
  caption: 'test',
  action: 'test',
  bannerMessage: 'test',
};

/* Uses deprecate method so it will throw errors for unit tests
describe('getUniqueId', () => {
  it('should retrieve the unique id from the Mini App Bridge', () => {
    window.MiniAppBridge.getUniqueId.resolves('test_mini_app_id');

    return expect(miniApp.getUniqueId()).to.eventually.equal(
      'test_mini_app_id'
    );
  });
});
*/

describe('miniAppInstance', () => {
  it('miniAppInstance should be instance of MiniApp once index miniAppInstance is declared', () => {
    return expect(miniAppInstance).to.be.instanceOf(MiniApp);
  });
});

describe('getMessagingUniqueId', () => {
  it('should retrieve the unique id from the Mini App Bridge', () => {
    window.MiniAppBridge.getMessagingUniqueId.resolves(
      'test_mini_app_messaging_unique_id'
    );

    return expect(miniApp.getMessagingUniqueId()).to.eventually.equal(
      'test_mini_app_messaging_unique_id'
    );
  });
});

describe('getMauid', () => {
  it('should retrieve the unique id from the Mini App Bridge', () => {
    window.MiniAppBridge.getMauid.resolves('test_mini_mauid');

    return expect(miniApp.getMauid()).to.eventually.equal('test_mini_mauid');
  });
});

describe('requestLocationPermission', () => {
  beforeEach(() => {
    window.MiniAppBridge.requestCustomPermissions.resolves({
      permissions: [
        {
          name: CustomPermissionName.LOCATION,
          status: CustomPermissionStatus.ALLOWED,
        },
      ],
    });
    window.MiniAppBridge.requestPermission.resolves('Accept');
  });

  it('should delegate to requestPermission function when request location permission', () => {
    const spy = sinon.spy(miniApp, 'requestPermission' as any);

    return miniApp
      .requestLocationPermission()
      .then(denied => expect(spy.callCount).to.equal(1));
  });

  it('should retrieve location permission result from the Mini App Bridge', () => {
    window.MiniAppBridge.requestPermission.resolves('Denied');

    return expect(miniApp.requestLocationPermission()).to.eventually.equal(
      'Denied'
    );
  });

  it('should request location custom permission', () => {
    return miniApp.requestLocationPermission('test_description').then(() => {
      sinon.assert.calledWith(window.MiniAppBridge.requestCustomPermissions, [
        {
          name: CustomPermissionName.LOCATION,
          description: 'test_description',
        },
      ]);
    });
  });

  it('should reject when user denies location custom permission', () => {
    window.MiniAppBridge.requestCustomPermissions.resolves({
      permissions: [
        {
          name: CustomPermissionName.LOCATION,
          status: CustomPermissionStatus.DENIED,
        },
      ],
    });

    return expect(miniApp.requestLocationPermission('test_description')).to.be
      .rejected;
  });

  it('should handle case where Android SDK does not support location custom permission', () => {
    window.MiniAppBridge.requestCustomPermissions.resolves({
      permissions: [
        {
          name: CustomPermissionName.LOCATION,
          status: CustomPermissionStatus.PERMISSION_NOT_AVAILABLE,
        },
      ],
    });

    return expect(miniApp.requestLocationPermission()).to.eventually.equal(
      'Accept'
    );
  });

  it('should handle case where iOS SDK does not support location custom permission', () => {
    window.MiniAppBridge.requestCustomPermissions.returns(
      Promise.reject('invalidCustomPermissionsList: test description')
    );

    return expect(miniApp.requestLocationPermission()).to.eventually.equal(
      'Accept'
    );
  });
});

describe('requestCustomPermissions', () => {
  it('should request provided custom permissions from the Mini App Bridge', () => {
    window.MiniAppBridge.requestCustomPermissions.resolves({
      permissions: [
        {
          name: CustomPermissionName.USER_NAME,
          status: CustomPermissionStatus.ALLOWED,
        },
      ],
    });

    return expect(
      miniApp.requestCustomPermissions([
        {
          name: CustomPermissionName.USER_NAME,
          description: 'test description',
        },
      ])
    ).to.eventually.deep.equal([
      {
        name: CustomPermissionName.USER_NAME,
        status: CustomPermissionStatus.ALLOWED,
      },
    ]);
  });
});

describe('requestPermissionStatus', () => {
  it('should request provided permissions from the Mini App Bridge', () => {
    window.MiniAppBridge.utilityManager.getPermissionStatus.resolves(
      PermissionStatus.GRANTED
    );

    return expect(
      miniApp.getPermissionStatus(PermissionName.CAMERA)
    ).to.eventually.deep.equal(PermissionStatus.GRANTED);
  });
});

describe('showInterstitialAd', () => {
  it('should retrieve close response from the Mini App Bridge', () => {
    const response = 'closed';

    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    window.MiniAppBridge.showInterstitialAd.resolves(response);
    return expect(miniApp.showInterstitialAd(adUnitId)).to.eventually.equal(
      response
    );
  });

  it('should retrive error response from the Mini App Bridge', () => {
    const error = 'error';

    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    window.MiniAppBridge.showInterstitialAd.resolves(error);
    return expect(miniApp.showInterstitialAd(adUnitId)).to.eventually.equal(
      error
    );
  });
});

describe('showRewardedAd', () => {
  it('should retrieve Reward type of result from the Mini App Bridge', () => {
    const response: Reward = {
      amount: 500,
      type: 'game bonus',
    };

    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    window.MiniAppBridge.showRewardedAd.resolves(response);
    return expect(miniApp.showRewardedAd(adUnitId)).to.eventually.equal(
      response
    );
  });

  it('should retrieve null when the user does not earn reward', () => {
    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    window.MiniAppBridge.showRewardedAd.resolves(null);
    return expect(miniApp.showRewardedAd(adUnitId)).to.eventually.equal(null);
  });

  it('should retrive error response from the Mini App Bridge', () => {
    const error = 'error';

    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    window.MiniAppBridge.showRewardedAd.resolves(error);
    return expect(miniApp.showRewardedAd(adUnitId)).to.eventually.equal(error);
  });
});

describe('loadInterstitialAd', () => {
  it('should retrieve the load result from the Mini App Bridge', () => {
    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    const response = 'success';

    window.MiniAppBridge.loadInterstitialAd.resolves(response);
    return expect(miniApp.loadInterstitialAd(adUnitId)).to.eventually.equal(
      response
    );
  });
  it('should retrive error response from the Mini App Bridge once loadInterstitialAd rejects with error', () => {
    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    const error = 'error';

    window.MiniAppBridge.loadInterstitialAd.resolves(error);
    return expect(miniApp.loadInterstitialAd(adUnitId)).to.eventually.equal(
      error
    );
  });
});

describe('loadRewardedAd', () => {
  it('should retrieve the load result from the Mini App Bridge', () => {
    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    const response = 'success';

    window.MiniAppBridge.loadRewardedAd.resolves(response);
    return expect(miniApp.loadRewardedAd(adUnitId)).to.eventually.equal(
      response
    );
  });
  it('should retrive error response from the Mini App Bridge once loadRewardedAd rejects with error', () => {
    const adUnitId = 'xxx-xxx-xxxxxxxxxxxxx';

    const error = 'error';

    window.MiniAppBridge.loadRewardedAd.resolves(error);
    return expect(miniApp.loadRewardedAd(adUnitId)).to.eventually.equal(error);
  });
});

describe('shareInfo', () => {
  it('should retrieve null from the MiniAppBridge once shareInfo call is successful', () => {
    const sharedInfo = {
      content: 'test content',
    };
    const response = null;

    window.MiniAppBridge.shareInfo.resolves(response);
    return expect(miniApp.shareInfo(sharedInfo)).to.eventually.equal(response);
  });
  it('should retrive error response from the MiniAppBridge once there is errors', () => {
    const sharedInfo = {
      content: 'test content',
    };

    const error = 'Bridge error';

    window.MiniAppBridge.shareInfo.resolves(error);
    return expect(miniApp.shareInfo(sharedInfo)).to.eventually.equal(error);
  });
});

describe('getUserName', () => {
  it('should retrieve username from the MiniAppBridge if getUserName is called', () => {
    const response = 'Rakuten';

    window.MiniAppBridge.getUserName.resolves(response);
    return expect(miniApp.user.getUserName()).to.eventually.equal(response);
  });
});

describe('getProfilePhoto', () => {
  it('should retrieve Profile photo in Base 64 string from the MiniAppBridge if getProfilePhoto is called', () => {
    const response =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8wmD0HwAFPQInf/fUWQAAAABJRU5ErkJggg==';

    window.MiniAppBridge.getProfilePhoto.resolves(response);
    return expect(miniApp.user.getProfilePhoto()).to.eventually.equal(response);
  });
});

describe('getContacts', () => {
  it('should retrieve contact list from the MiniAppBridge when request is successful', () => {
    const response = [
      {
        id: 'test_contact_id',
      },
    ];

    window.MiniAppBridge.getContacts.resolves(response);
    return expect(miniApp.user.getContacts()).to.eventually.equal(response);
  });
});

describe('getAccessToken', () => {
  it('should retrieve AccessTokenData from the MiniAppBridge when request is successful', () => {
    const response = {
      token: 'test_token',
      validUntil: 0,
    };

    window.MiniAppBridge.getAccessToken.resolves(response);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(response);
  });

  describe('getPoints', () => {
    it('should retrieve Points from the MiniAppBridge when request is successful', () => {
      const response = [
        {
          standard: 10,
          term: 20,
          cash: 30,
        },
      ];
      window.MiniAppBridge.getPoints.resolves(response);
      return expect(miniApp.user.getPoints()).to.eventually.equal(response);
    });

    it('should retrieve Points from MiniApp when request is successful', () => {
      const response = [
        {
          standard: 10,
          term: 20,
          cash: 30,
        },
      ];

      window.MiniAppBridge.getPoints.resolves(response);
      return expect(miniApp.getPoints()).to.eventually.equal(response);
    });
  });

  describe('getPhoneNumber', () => {
    it('should retrieve phone number from the MiniAppBridge if getPhoneNumber is called', () => {
      const response = '+810000000000';

      window.MiniAppBridge.getPhoneNumber.resolves(response);
      return expect(miniApp.user.getPhoneNumber()).to.eventually.equal(
        response
      );
    });
  });

  describe('getHostEnvironmentInfo', () => {
    it('should retrieve HostEnvironmentInfo once getHostEnvironmentInfo is called', () => {
      const platform: Platform = Platform.ANDROID;
      const hostEnvironmentInfo: HostEnvironmentInfo = {
        platform: platform as Platform,
        platformVersion: '',
        hostVersion: '',
        sdkVersion: '',
        hostLocale: '',
      };

      window.MiniAppBridge.getHostEnvironmentInfo.resolves(hostEnvironmentInfo);
      window.MiniAppBridge.platform = platform;

      expect(miniApp.getPlatform()).to.equal(platform);
      return expect(miniApp.getHostEnvironmentInfo()).to.eventually.equal(
        hostEnvironmentInfo
      );
    });
  });

  it('should retrieve AudienceNotSupportedError response from the MiniAppBridge once there is an audience error', () => {
    const error = new AudienceNotSupportedError({
      type: 'AudienceNotSupportedError',
    });

    expect(error).to.be.instanceOf(AudienceNotSupportedError);

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });

  it('should retrieve ScopesNotSupportedError response from the MiniAppBridge once there is an scope error', () => {
    const error = new ScopesNotSupportedError({
      type: 'ScopesNotSupportedError',
    });

    expect(error).to.be.instanceOf(ScopesNotSupportedError);

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });

  it('should retrieve AuthorizationFailureError response from the MiniAppBridge once there is an authorization error', () => {
    const error = new AuthorizationFailureError({
      type: 'AuthorizationFailureError',
      message: 'authorization failed',
    });

    expect(error.message).to.equal('authorization failed');

    expect(error).to.be.instanceOf(AuthorizationFailureError);

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });

  it('should retrieve MiniAppError response from the MiniAppBridge once there is an error with no type', () => {
    const error = new MiniAppError({ message: 'authorization failed' });

    expect(error.message).to.equal('authorization failed');

    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });

  it('should retrieve MiniAppError response from the MiniAppBridge once there is an error with an unknown type', () => {
    const error = new MiniAppError({
      type: 'Other',
      message: 'authorization failed',
    });

    expect(error.message).to.equal('authorization failed');

    expect(error.name).to.equal('Other');

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });

  it('should retrieve MiniAppError response from the MiniAppBridge once there is an error with no type and no message', () => {
    const error = new MiniAppError({});

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.getAccessToken.resolves(error);
    return expect(
      miniApp.user.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.equal(error);
  });
});

describe('requestScreenOrientation', () => {
  it('should retrieve success from the MiniAppBridge when request is successful', () => {
    const response = 'success';

    window.MiniAppBridge.setScreenOrientation.resolves(response);
    return expect(
      miniApp.setScreenOrientation(ScreenOrientation.LOCK_LANDSCAPE)
    ).to.eventually.equal(response);
  });

  it('should retrive error response from the MiniAppBridge once there is errors', () => {
    const error = 'Bridge error';

    window.MiniAppBridge.setScreenOrientation.resolves(error);
    return expect(
      miniApp.setScreenOrientation(ScreenOrientation.LOCK_PORTRAIT)
    ).to.eventually.equal(error);
  });
});

describe('sendMessage', () => {
  it('possible to retrieve result from the MiniAppBridge when request is successful', () => {
    const response = 'test_contact_id';

    window.MiniAppBridge.sendMessageToContact.resolves(response);
    expect(
      miniApp.chatService.sendMessageToContact(messageToContact)
    ).to.eventually.equal(response);

    const listResponse = [response];
    window.MiniAppBridge.sendMessageToMultipleContacts.resolves(listResponse);
    expect(
      miniApp.chatService.sendMessageToMultipleContacts(messageToContact)
    ).to.eventually.equal(listResponse);

    window.MiniAppBridge.sendMessageToContactId.resolves(response);
    return expect(
      miniApp.chatService.sendMessageToContactId(
        'test_contact_id',
        messageToContact
      )
    ).to.eventually.equal(response);
  });

  it('possible to retrieve null result from the MiniAppBridge when request is successful', () => {
    const response = null;

    window.MiniAppBridge.sendMessageToContact.resolves(response);
    expect(
      miniApp.chatService.sendMessageToContact(messageToContact)
    ).to.eventually.equal(response);

    window.MiniAppBridge.sendMessageToMultipleContacts.resolves(response);
    expect(
      miniApp.chatService.sendMessageToMultipleContacts(messageToContact)
    ).to.eventually.equal(response);

    window.MiniAppBridge.sendMessageToContactId.resolves(response);
    return expect(
      miniApp.chatService.sendMessageToContactId(
        'test_contact_id',
        messageToContact
      )
    ).to.eventually.equal(response);
  });
});

describe('downloadFile', () => {
  it('possible to retrieve result from the MiniAppBridge when request is successful', () => {
    const response = 'test.jpg';

    window.MiniAppBridge.downloadFile.resolves(response);
    expect(
      miniApp.downloadFile('test.jpg', 'https://rakuten.co.jp', {})
    ).to.eventually.equal(response);
  });

  it('should retrieve MiniAppError response from the MiniAppBridge once there is an error with no type and no message', () => {
    const error = new MiniAppError({});

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.downloadFile.resolves(error);
    expect(
      miniApp.downloadFile('test.jpg', 'https://rakuten.co.jp', {})
    ).to.eventually.equal(error);
  });
});

describe('getPlatform', () => {
  it('should retrieve bridge platform name when getPlatform is called', () => {
    const response = 'android';

    window.MiniAppBridge.platform = response;
    return expect(miniApp.getPlatform()).to.equal(response);
  });
});

function createCloseAlertInfo(): CloseAlertInfo {
  return {
    title: 'title',
    description: 'description',
    shouldDisplay: false,
  };
}

describe('secureStorage', () => {
  it('should call secureStorageService clear when clearSecureStorage is called', () => {
    const response = undefined;

    window.MiniAppBridge.clearSecureStorage.resolves(response);

    return expect(miniApp.secureStorageService.clear()).to.eventually.equal(
      response
    );
  });

  it('should call secureStorageService size when getSecureStorageSize is called', () => {
    const response: MiniAppSecureStorageSize = { used: 100, max: 5000 };

    window.MiniAppBridge.getSecureStorageSize.resolves(response);
    return expect(miniApp.secureStorageService.size()).to.eventually.equal(
      response
    );
  });

  it('should call secureStorageService setItems when setSecureStorage is called ', () => {
    const response = undefined;
    const values: MiniAppSecureStorageKeyValues = { ['key']: 'value' };

    window.MiniAppBridge.setSecureStorage.resolves(response);
    return expect(
      miniApp.secureStorageService.setItems(values)
    ).to.eventually.equal(response);
  });

  it('should retrieve miniAppError when calls setSecureStorage has an error', () => {
    const error = new MiniAppError({});
    const values: MiniAppSecureStorageKeyValues = { ['key']: 'value' };

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.setSecureStorage.resolves(error);
    return expect(
      miniApp.secureStorageService.setItems(values)
    ).to.eventually.equal(error);
  });

  it('should call secureStorageService getItem when getSecureStorageItem is called', () => {
    const response = '';
    const key = 'key';

    window.MiniAppBridge.getSecureStorageItem.resolves(response);
    return expect(
      miniApp.secureStorageService.getItem(key)
    ).to.eventually.equal(response);
  });

  it('should retrieve miniAppError when calls getSecureStorageItem has an error', () => {
    const error = new MiniAppError({});
    const key = 'key';

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.getSecureStorageItem.resolves(error);
    return expect(
      miniApp.secureStorageService.getItem(key)
    ).to.eventually.equal(error);
  });

  it('should call secureStorageService removeItems when removeSecureStorageItems is called', () => {
    const response = undefined;
    const key: [string] = ['key'];

    window.MiniAppBridge.removeSecureStorageItems.resolves(response);
    return expect(
      miniApp.secureStorageService.removeItems(key)
    ).to.eventually.equal(response);
  });

  it('should retrieve miniAppError when calls removeSecureStorageItems has an error', () => {
    const error = new MiniAppError({});
    const key: [string] = ['key'];

    window.MiniAppBridge.removeSecureStorageItems.resolves(error);
    return expect(
      miniApp.secureStorageService.removeItems(key)
    ).to.eventually.equal(error);
  });

  it('should call secureStorageService onReady when bridge isSecureStorageReady is true', () => {
    let isCalled = false;
    const onReady = function onReady() {
      isCalled = true;
    };

    window.MiniAppBridge.isSecureStorageReady = true;
    miniApp.secureStorageService.onReady(onReady);
    return expect(isCalled).to.equal(true);
  });

  it('should call window addEventListener when bridge isSecureStorageReady is false', () => {
    let isCalled = false;
    function onReady() {
      isCalled = true;
    }

    window.addEventListener = sandbox.spy();

    window.MiniAppBridge.isSecureStorageReady = false;
    miniApp.secureStorageService.onReady(onReady);
    return expect(window.addEventListener.calledOnce).to.be.true;
  });

  it('should call window addEventListener when bridge secureStorageLoadError is null', () => {
    let isCalled = false;
    function onReady() {
      isCalled = true;
    }

    window.addEventListener = sandbox.spy();

    miniApp.secureStorageService.onLoadError(onReady);
    return expect(window.addEventListener.calledOnce).to.be.true;
  });

  it('should call window addEventListener when bridge secureStorageError is null', () => {
    const onLoadError = (error: MiniAppError) => {};

    window.addEventListener = sandbox.spy();

    miniApp.secureStorageService.onLoadError(onLoadError);
    return expect(window.addEventListener.calledOnce).to.be.true;
  });

  it('should call window addEventListener when bridge has a secureStorageError', () => {
    const error = new MiniAppError({});
    const key: [string] = ['key'];
    let isCalled = false;

    const onLoadError = (error: MiniAppError) => {
      isCalled = true;
    };

    window.MiniAppBridge.secureStorageLoadError = error;
    miniApp.secureStorageService.onLoadError(onLoadError);
    return expect(isCalled).equal(true);
  });
});

describe('setCloseAlert', () => {
  it('should call bridge setCloseAlert when setCloseAlert is called', () => {
    const response = undefined;

    const alertInfo: CloseAlertInfo = createCloseAlertInfo();
    window.MiniAppBridge.setCloseAlert.resolves(response);
    expect(miniApp.miniappUtils.setCloseAlert(alertInfo)).to.eventually.equal(
      response
    );
  });

  it('should retrieve miniAppError when calls setCloseAlert has an error', () => {
    const error = new MiniAppError({});
    const alertInfo: CloseAlertInfo = createCloseAlertInfo();

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.setCloseAlert.resolves(error);

    return expect(
      miniApp.miniappUtils.setCloseAlert(alertInfo)
    ).to.eventually.equal(error);
  });
});

describe('sendJsonToHostapp', () => {
  it('should retrieve null from the MiniAppBridge once sendJsonToHostapp call is successful', () => {
    const jsonToHostapp = 'test content';
    const response = null;

    window.MiniAppBridge.sendJsonToHostapp.resolves(response);
    return expect(
      miniApp.universalBridge.sendJsonToHostapp(jsonToHostapp)
    ).to.eventually.equal(response);
  });
  it('should retrive error response from the MiniAppBridge once there is errors', () => {
    const jsonToHostapp = 'test content';
    const error = 'Bridge error';

    window.MiniAppBridge.sendJsonToHostapp.resolves(error);
    return expect(
      miniApp.universalBridge.sendJsonToHostapp(jsonToHostapp)
    ).to.eventually.equal(error);
  });
});

describe('closeMiniApp', () => {
  it('should call bridge closeMiniApp when closeMiniApp is called', () => {
    const response = null;
    window.MiniAppBridge.closeMiniApp.resolves(response);
    expect(miniApp.miniappUtils.closeMiniApp(true)).to.eventually.equal(
      response
    );
  });

  it('should retrieve miniAppError when calls closeMiniApp has an error', () => {
    const error = new MiniAppError({});

    expect(error.message).to.equal(undefined);
    expect(error.name).to.equal(undefined);

    window.MiniAppBridge.closeMiniApp.resolves(error);

    return expect(miniApp.miniappUtils.closeMiniApp(true)).to.eventually.equal(
      error
    );
  });
});

describe('purchaseProductWith', () => {
  it('should Purchases the app with given id', () => {
    const response = {
      product: {
        title: 'MyApp_A',
        description: 'This is app A for purchase',
        id: 'com.rakuten.myappa',
        price: {
          currencyCode: 'yen',
          price: '100',
        },
      },
      transactionId: 'transction_id_a',
      transactionDate: '2022/11/23',
    };
    const productId = 'com.rakuten.myappa';

    window.MiniAppBridge.purchaseProductWith.resolves(response);
    return expect(
      miniApp.purchaseService.purchaseProductWith(productId)
    ).to.eventually.equal(response);
  });
});

describe('eSimSupport', () => {
  it('should return if eSim is supported', () => {
    window.MiniAppBridge.isEsimSupported.resolves(true);
    return expect(miniApp.esimService.isEsimSupported()).to.eventually.equal(
      true
    );
  });

  it('should return error information', () => {
    window.MiniAppBridge.isEsimSupported.returns(Promise.reject('test error'));
    return expect(miniApp.esimService.isEsimSupported()).to.eventually.be
      .rejected;
  });
});

describe('setupAndInstallEsim', () => {
  it('should return if eSim is setup and installed', () => {
    window.MiniAppBridge.setupAndInstallEsim.resolves(true);
    return expect(
      miniApp.esimService.setupAndInstallEsim({
        address: 'address',
      } as EsimConfig)
    ).to.eventually.equal(true);
  });

  it('should return error information', () => {
    window.MiniAppBridge.setupAndInstallEsim.returns(
      Promise.reject('test error')
    );
    return expect(
      miniApp.esimService.setupAndInstallEsim({
        address: 'address',
      } as EsimConfig)
    ).to.eventually.be.rejected;
  });
});

describe('forceLogout', () => {
  it('should return if user is logged out', () => {
    window.MiniAppBridge.userProfileManager.forceLogout.resolves(true);
    return expect(miniApp.user.forceLogout()).to.eventually.equal(true);
  });

  it('should return error information', () => {
    window.MiniAppBridge.userProfileManager.forceLogout.returns(
      Promise.reject('test error')
    );
    return expect(miniApp.user.forceLogout()).to.eventually.be.rejected;
  });
});

describe('forceInternalWebView', () => {
  it('should return if webview settings were updated', () => {
    window.MiniAppBridge.forceInternalWebView.resolves(true);
    return expect(
      miniApp.webviewManager.forceInternalWebView(true)
    ).to.eventually.equal(true);
  });

  it('should return error information', () => {
    window.MiniAppBridge.forceInternalWebView.returns(
      Promise.reject('test error')
    );
    return expect(miniApp.webviewManager.forceInternalWebView(true)).to
      .eventually.be.rejected;
  });
});

describe('launchAppSettings', () => {
  it('should return if launch app settings were updated', () => {
    window.MiniAppBridge.utilityManager.launchAppSettings.resolves(true);
    return expect(miniApp.miniappUtils.launchAppSettings()).to.eventually.equal(
      true
    );
  });

  it('should return error information', () => {
    window.MiniAppBridge.utilityManager.launchAppSettings.returns(
      Promise.reject('test error')
    );
    return expect(miniApp.miniappUtils.launchAppSettings()).to.eventually.be
      .rejected;
  });
});
