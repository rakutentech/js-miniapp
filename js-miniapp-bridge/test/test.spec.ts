import { expect } from 'chai';
import sinon from 'sinon';

import * as Bridge from '../src/common-bridge';
import * as Logger from '../src/common-log';
import {
  CustomPermissionName,
  CustomPermissionStatus,
} from '../src/types/custom-permissions';
import {
  AudienceNotSupportedError,
  AuthorizationFailureError,
  CloseAlertInfo,
  DevicePermission,
  DownloadFailedError,
  DownloadHttpError,
  HostEnvironmentInfo,
  InvalidUrlError,
  MessageToContact,
  MiniAppError,
  MiniAppSecureStorageKeyValues,
  Platform,
  SaveFailureError,
  ScopesNotSupportedError,
  ScreenOrientation,
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  EsimConfig,
  PermissionName,
  PermissionStatus,
} from '../src';

/* tslint:disable:no-any */
const window: any = {
  addEventListener: sinon.stub(),
};
(global as any).window = window;

const sandbox = sinon.createSandbox();
const mockExecutor = {
  exec: sinon.stub(),
  execEvents: sinon.stub(),
  getPlatform: sinon.stub(),
};
const mockLogger = {
  log: sinon.stub(),
};
const handleError = error => {};

const messageToContact: MessageToContact = {
  text: 'text',
  image: 'image',
  caption: 'caption',
  action: 'action',
  bannerMessage: null,
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

describe('getUniqueId', () => {
  it('will parse the Unique ID response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'unique_id');

    return expect(bridge.getUniqueId()).to.eventually.deep.equal('unique_id');
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, 'hostAppError: an error has occured');

    return expect(
      bridge.getUniqueId()
    ).to.eventually.be.rejected.and.deep.equal(
      'hostAppError: an error has occured'
    );
  });
});

describe('getMessagingUniqueId', () => {
  it('will parse the Contact ID response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'message_unique_id');

    return expect(bridge.getMessagingUniqueId()).to.eventually.deep.equal(
      'message_unique_id'
    );
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, 'hostAppError: an error has occured');

    return expect(
      bridge.getMessagingUniqueId()
    ).to.eventually.be.rejected.and.deep.equal(
      'hostAppError: an error has occured'
    );
  });
});

describe('getMauid', () => {
  it('will parse the MAUID response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'mauid');

    return expect(bridge.getMauid()).to.eventually.deep.equal('mauid');
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, 'hostAppError: an error has occured');

    return expect(bridge.getMauid()).to.eventually.be.rejected.and.deep.equal(
      'hostAppError: an error has occured'
    );
  });
});

describe('requestPermission', () => {
  it('will parse the Unique ID response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'ALLOWED');

    return expect(
      bridge.requestPermission(DevicePermission.LOCATION)
    ).to.eventually.deep.equal('ALLOWED');
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.requestPermission(DevicePermission.LOCATION)
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('getToken', () => {
  it('will parse the AccessToken JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      2,
      '{ "token": "test", "validUntil": 0, "scopes": { "audience": "AUD", "scopes": ["SCO1","SCO2"]} }'
    );

    return expect(
      bridge.getAccessToken('AUD', ['SCO1', 'SCO2'])
    ).to.eventually.deep.equal({
      token: 'test',
      validUntil: new Date(0),
      scopes: {
        audience: 'AUD',
        scopes: ['SCO1', 'SCO2'],
      },
    });
  });

  it('will parse the AccessToken AudienceNotSupportedError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "AudienceNotSupportedError", "message": null }'
    );

    return expect(
      bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.be.rejected.and.be.an.instanceof(AudienceNotSupportedError);
  });

  it('will parse the AccessToken ScopesNotSupportedError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "type": "ScopesNotSupportedError" }');

    return expect(
      bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.be.rejected.and.be.an.instanceof(ScopesNotSupportedError);
  });

  it('will parse the AccessToken AuthorizationFailureError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "AuthorizationFailureError", "message": "test message" }'
    );

    return expect(
      bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.be.rejected.and.be.an.instanceof(AuthorizationFailureError);
  });

  it('will parse the AccessToken error JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "test", "message": "test message" }'
    );

    return expect(bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2']))
      .to.eventually.be.rejected.and.be.an.instanceof(MiniAppError)
      .and.to.include({ name: 'test', message: 'test message' });
  });

  it('will parse the AccessToken error JSON with no type response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "test message" }');

    return expect(bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2']))
      .to.eventually.be.rejected.and.be.an.instanceof(MiniAppError)
      .and.to.include({ message: 'test message' });
  });

  it('will still send an error if JSON error parsing fails', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, 'an error occurred');

    return expect(
      bridge.getAccessToken('AUDIENCE', ['SCOPE1', 'SCOPE2'])
    ).to.eventually.be.rejected.and.to.be.an.instanceOf(MiniAppError);
  });
});

describe('sendMessage', () => {
  it('will parse the message JSON response for sendMessageToContact', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'id_contact');

    return expect(
      bridge.sendMessageToContact(messageToContact)
    ).to.eventually.deep.equal('id_contact');
  });

  it('will parse the response for sendMessageToContact if no contact has been selected', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, null);

    return expect(
      bridge.sendMessageToContact(messageToContact)
    ).to.eventually.deep.equal(null);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.sendMessageToContact(messageToContact)
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });

  it('will parse the message JSON response for sendMessageToContactId', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'id_contact');

    return expect(
      bridge.sendMessageToContactId('id_contact', messageToContact)
    ).to.eventually.deep.equal('id_contact');
  });

  it('will parse the response for sendMessageToContactId if no contact has been selected', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, null);

    return expect(
      bridge.sendMessageToContactId('contact', messageToContact)
    ).to.eventually.deep.equal(null);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.sendMessageToContactId('id_contact', messageToContact)
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });

  it('will parse the message JSON response for sendMessageToMultipleContacts', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, '["id_contact","id_contact2"]');

    return expect(
      bridge.sendMessageToMultipleContacts(messageToContact)
    ).to.eventually.deep.equal(['id_contact', 'id_contact2']);
  });

  it('will parse the response for sendMessageToMultipleContacts if no contacts have been selected', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, null);

    return expect(
      bridge.sendMessageToMultipleContacts(messageToContact)
    ).to.eventually.deep.equal(null);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.sendMessageToMultipleContacts(messageToContact)
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
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

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.showRewardedAd('test_id')
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('loadRewardedAd', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(bridge.loadRewardedAd('test_id')).to.eventually.deep.equal(
      response
    );
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.loadRewardedAd('test_id')
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
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

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.showInterstitialAd('test_id')
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('loadInterstitial', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(
      bridge.loadInterstitialAd('test_id')
    ).to.eventually.deep.equal(response);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.loadInterstitialAd('test_id')
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('shareInfo', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(
      bridge.shareInfo({ content: 'test' })
    ).to.eventually.deep.equal(response);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.shareInfo({ content: 'test' })
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('getUserName', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'miniapp';
    mockExecutor.exec.callsArgWith(2, 'bWluaWFwcA==');

    return expect(bridge.getUserName()).to.eventually.deep.equal(response);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.getUserName()
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('getProfilePhoto', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'profile photo response';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(bridge.getProfilePhoto()).to.eventually.deep.equal(response);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.getProfilePhoto()
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('getContacts', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response =
      '[{"id":"id_contact","name":"Cory","email":"cory@miniapp.com","allEmailList":["another1@miniapp.com", "another2@miniapp.com"]},{"id":"id_contact2","name":"Alam"},{"id":"id_contact3"}]';
    mockExecutor.exec.callsArgWith(2, response);

    const expected = [
      {
        id: 'id_contact',
        name: 'Cory',
        email: 'cory@miniapp.com',
        allEmailList: ['another1@miniapp.com', 'another2@miniapp.com'],
      },
      {
        id: 'id_contact2',
        name: 'Alam',
      },
      {
        id: 'id_contact3',
      },
    ];

    return expect(bridge.getContacts()).to.eventually.deep.equal(expected);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.getContacts()
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('setScreenOrientation', () => {
  it('will return the close status string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(
      bridge.setScreenOrientation(ScreenOrientation.LOCK_PORTRAIT)
    ).to.eventually.deep.equal(response);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      'User has explicitly denied authorization'
    );

    return expect(
      bridge.setScreenOrientation(ScreenOrientation.LOCK_PORTRAIT)
    ).to.eventually.be.rejected.and.deep.equal(
      'User has explicitly denied authorization'
    );
  });
});

describe('requestCustomPermissions', () => {
  const requestPermissions = [
    { name: CustomPermissionName.USER_NAME, description: 'test_description' },
  ];

  it('will call the platform executor', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.requestCustomPermissions(requestPermissions).catch(handleError);

    sinon.assert.calledWith(mockExecutor.exec, 'requestCustomPermissions');
  });

  it('will attach the permissions to the `permissions` key', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.requestCustomPermissions(requestPermissions).catch(handleError);

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

describe('getPoints', () => {
  it('will parse the Points JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      2,
      '{ "standard": 10, "term": 20, "cash": 30 }'
    );

    return expect(bridge.getPoints()).to.eventually.deep.equal({
      standard: 10,
      term: 20,
      cash: 30,
    });
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.getPoints()).to.eventually.be.rejected;
  });
});

describe('getHostEnvironmentInfo', () => {
  it('should retrieve HostEnvironmentInfo once getHostEnvironmentInfo is called', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    bridge.platform = Platform.ANDROID;
    const hostEnvironmentInfo: HostEnvironmentInfo = {
      platform: Platform.ANDROID,
      platformVersion: '',
      hostVersion: '',
      sdkVersion: '',
      hostLocale: '',
    };

    mockExecutor.exec.callsArgWith(2, JSON.stringify(hostEnvironmentInfo));
    bridge.getHostEnvironmentInfo();
    return expect(bridge.platform).to.deep.equal(hostEnvironmentInfo.platform);
  });

  it('should retrieve an error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.getHostEnvironmentInfo()).to.eventually.be.rejected;
  });
});

describe('downloadFile', () => {
  it('will parse the download file response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, 'test.jpg');

    return expect(
      bridge.downloadFile('test.jpg', 'https://rakuten.co.jp', {})
    ).to.eventually.deep.equal('test.jpg');
  });

  it('will return null', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, null);

    return expect(
      bridge.downloadFile('test.jpg', 'https://rakuten.co.jp', {})
    ).to.eventually.deep.equal(null);
  });

  const fileDownloadErrorRequest = (errorJson: string) => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, errorJson);

    return bridge.downloadFile('test.jpg', 'https://rakuten.co.jp', {});
  };

  it('will parse the Error response', () => {
    return expect(
      fileDownloadErrorRequest('{ "message": "message"}')
    ).to.eventually.be.rejected.and.to.contain({ message: 'message' });
  });

  it('will parse DownloadFailedError response', () => {
    return expect(
      fileDownloadErrorRequest(
        '{ "type": "DownloadFailedError", "message": "test message" }'
      )
    ).to.eventually.be.rejected.and.be.an.instanceof(DownloadFailedError);
  });

  it('will parse InvalidUrlError response', () => {
    return expect(
      fileDownloadErrorRequest(
        '{ "type": "InvalidUrlError", "message": "test message" }'
      )
    ).to.eventually.be.rejected.and.be.an.instanceof(InvalidUrlError);
  });

  it('will parse SaveFailureError response', () => {
    return expect(
      fileDownloadErrorRequest(
        '{ "type": "SaveFailureError", "message": "test message" }'
      )
    ).to.eventually.be.rejected.and.be.an.instanceof(SaveFailureError);
  });

  it('will parse DownloadHttpError response', () => {
    return expect(
      fileDownloadErrorRequest(
        '{ "type": "DownloadHttpError", "code": 400, "message": "test message" }'
      )
    )
      .to.eventually.be.rejected.and.be.an.instanceof(DownloadHttpError)
      .and.to.contain({ code: 400 });
  });
});

describe('secureStorage', () => {
  const bridge = new Bridge.MiniAppBridge(mockExecutor);

  it('will respond an undefined once setSecureStorage is called', () => {
    const values: MiniAppSecureStorageKeyValues = { ['key']: 'value' };

    mockExecutor.exec.callsArgWith(2, undefined);

    return expect(bridge.setSecureStorage(values)).to.eventually.deep.equal(
      undefined
    );
  });

  it('will be rejected once setSecureStorage has an error', () => {
    const values: MiniAppSecureStorageKeyValues = { ['key']: 'value' };

    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.setSecureStorage(values)).to.eventually.be.rejected;
  });

  it('will respond a string once getSecureStorageItem is called', () => {
    const response = '';
    const key = 'key';

    mockExecutor.exec.callsArgWith(2, response);
    return expect(bridge.getSecureStorageItem(key)).to.eventually.deep.equal(
      response
    );
  });

  it('will be rejected once getSecureStorageItem has an error', () => {
    const key = 'key';

    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.getSecureStorageItem(key)).to.eventually.be.rejected;
  });

  it('will respond an undefined once removeSecureStorageItems is called', () => {
    const key: [string] = ['key'];

    mockExecutor.exec.callsArgWith(2, undefined);

    return expect(
      bridge.removeSecureStorageItems(key)
    ).to.eventually.deep.equal(undefined);
  });

  it('will be rejected once removeSecureStorageItems has an error', () => {
    const key: [string] = ['key'];

    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.removeSecureStorageItems(key)).to.eventually.be
      .rejected;
  });

  it('will respond an undefined once clearSecureStorage is called', () => {
    mockExecutor.exec.callsArgWith(2, undefined);

    return expect(bridge.clearSecureStorage()).to.eventually.deep.equal(
      undefined
    );
  });

  it('will be rejected once clearSecureStorage has an error', () => {
    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.clearSecureStorage()).to.eventually.be.rejected;
  });

  it('will respond an undefined once getSecureStorageSize is called', () => {
    const response = JSON.stringify({ used: 100, max: 5000 });

    mockExecutor.exec.callsArgWith(2, response);

    return expect(bridge.getSecureStorageSize()).to.eventually.deep.equal(
      JSON.parse(response)
    );
  });

  it('will be rejected once getSecureStoragesIZE has an error', () => {
    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.getSecureStorageSize()).to.eventually.be.rejected;
  });

  it('will parse the SecureStorage SecureStorageFullError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "SecureStorageFullError", "message": null }'
    );

    return expect(
      bridge.getSecureStorageSize()
    ).to.eventually.be.rejected.and.be.an.instanceof(SecureStorageFullError);
  });

  it('will parse the SecureStorage SecureStorageUnavailableError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "SecureStorageUnavailableError", "message": null }'
    );

    return expect(
      bridge.getSecureStorageSize()
    ).to.eventually.be.rejected.and.be.an.instanceof(
      SecureStorageUnavailableError
    );
  });
  it('will parse the SecureStorage SecureStorageBusyError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "SecureStorageBusyError", "message": null }'
    );

    return expect(
      bridge.getSecureStorageSize()
    ).to.eventually.be.rejected.and.be.an.instanceof(SecureStorageBusyError);
  });
  it('will parse the SecureStorage SecureStorageIOError JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    mockExecutor.exec.callsArgWith(
      3,
      '{ "type": "SecureStorageIOError", "message": null }'
    );

    return expect(
      bridge.getSecureStorageSize()
    ).to.eventually.be.rejected.and.be.an.instanceof(SecureStorageIOError);
  });
});

describe('setCloseAlert', () => {
  it('will respond an undefined', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const alertInfo: CloseAlertInfo = createCloseAlertInfo();

    mockExecutor.exec.callsArgWith(2, undefined);

    return expect(bridge.setCloseAlert(alertInfo)).to.eventually.deep.equal(
      undefined
    );
  });

  it('will be rejected once it has an error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const alertInfo: CloseAlertInfo = createCloseAlertInfo();

    mockExecutor.exec.callsArgWith(3, '{ "message": "message"}');

    return expect(bridge.setCloseAlert(alertInfo)).to.eventually.be.rejected;
  });
});

function createCloseAlertInfo(): CloseAlertInfo {
  return {
    title: 'title',
    description: 'description',
    shouldDisplay: false,
  };
}

describe('sendJsonToHostapp', () => {
  it('will return the send json string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response = 'success';
    mockExecutor.exec.callsArgWith(2, response);

    return expect(
      bridge.sendJsonToHostapp('{"data":"This is a sample json information"}')
    ).to.eventually.deep.equal(response);
  });
});

describe('console.log', () => {
  const logger = new Logger.MiniAppSDKLogger(mockLogger);
  window.MiniAppSDKLogger = logger;

  it('will use platform logger on log calls', () => {
    console.log('test');
    return expect(logger.lastLog).to.deep.equal({
      icon: '📗',
      messageType: 'log',
      message: ['test'],
    });
  });
  it('will use platform logger on warning calls', () => {
    console.warn('test');
    return expect(logger.lastLog).to.deep.equal({
      icon: '📙',
      messageType: 'warning',
      message: ['test'],
    });
  });
  it('will use platform logger on debug calls', () => {
    console.debug('test');
    return expect(logger.lastLog).to.deep.equal({
      icon: '📘',
      messageType: 'debug',
      message: ['test'],
    });
  });
  it('will use platform logger on error calls', () => {
    console.error('test');
    return expect(logger.lastLog).to.deep.equal({
      icon: '📕',
      messageType: 'error',
      message: ['test'],
    });
  });
  it('will return an undefined', () => {
    (global as any).window = undefined;
    window.MiniAppSDKLogger = logger;
    console.error(undefined);
    return expect(Logger.getLogger()).to.deep.equal(undefined);
  });
});

describe('getAllProducts', () => {
  it('will list the products', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response =
      '[{"title": "MyApp_A","description": "This is app A for purchase","id": "com.rakuten.myappa","price": {"currencyCode": "yen","price": "100"}},{"title": "MyApp_B","description": "This is app B for purchase","id": "com.rakuten.myappb","price":{"currencyCode":"yen","price":"100"}}]';
    mockExecutor.exec.callsArgWith(2, response);

    const expected = [
      {
        title: 'MyApp_A',
        description: 'This is app A for purchase',
        id: 'com.rakuten.myappa',
        price: {
          currencyCode: 'yen',
          price: '100',
        },
      },
      {
        title: 'MyApp_B',
        description: 'This is app B for purchase',
        id: 'com.rakuten.myappb',
        price: {
          currencyCode: 'yen',
          price: '100',
        },
      },
    ];

    return expect(bridge.getAllProducts()).to.eventually.deep.equal(expected);
  });
});

describe('purchaseProductWith', () => {
  it('will purchase product with id', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    const response =
      '[{"product": {"title": "MyApp_A","description": "This is app A for purchase","id": "com.rakuten.myappa","price": {"currencyCode": "yen","price": "100"}},"transactionId": "transction_id_a","transactionDate": "2023/02/14"}]';
    mockExecutor.exec.callsArgWith(2, response);
    const expected = [
      {
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
        transactionDate: '2023/02/14',
      },
    ];
    const productId = 'com.rakuten.myappa';
    return expect(
      bridge.purchaseProductWith(productId)
    ).to.eventually.deep.equal(expected);
  });
});

describe('getPhoneNumber', () => {
  it('will return the string response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, '+810000000000');

    return expect(bridge.getPhoneNumber()).to.eventually.deep.equal(
      '+810000000000'
    );
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, 'Couldnt find the phone number');

    return expect(
      bridge.getPhoneNumber()
    ).to.eventually.be.rejected.and.deep.equal('Couldnt find the phone number');
  });
});

describe('isEsimSupported', () => {
  it('will receive esim supported boolean', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, true);

    return expect(bridge.isEsimSupported()).to.eventually.deep.equal(true);
  });

  it('will receive esim not supported boolean', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, false);

    return expect(bridge.isEsimSupported()).to.eventually.deep.equal(false);
  });

  it('will parse error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "test message" }');

    return expect(bridge.isEsimSupported()).to.eventually.be.rejected;
  });
});

describe('setupAndInstallEsim', () => {
  it('will receive esim installed boolean', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, true);

    return expect(
      bridge.setupAndInstallEsim({ address: 'someAddresss' } as EsimConfig)
    ).to.eventually.deep.equal(true);
  });

  it('will receive esim not installed boolean', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, false);

    return expect(
      bridge.setupAndInstallEsim({ address: 'someAddresss' } as EsimConfig)
    ).to.eventually.deep.equal(false);
  });

  it('will parse error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "test message" }');

    return expect(
      bridge.setupAndInstallEsim({ address: 'someAddresss' } as EsimConfig)
    ).to.eventually.be.rejected;
  });
});

describe('forceLogout', () => {
  it('will receive result of requesting force logout', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, true);

    return expect(
      bridge.userProfileManager.forceLogout()
    ).to.eventually.deep.equal(true);
  });

  it('will parse error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "test message" }');

    return expect(bridge.userProfileManager.forceLogout()).to.eventually.be
      .rejected;
  });
});

describe('forceInternalWebView', () => {
  it('will receive result of requesting internal web view', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, true);

    return expect(
      bridge.webviewConfigManager.forceInternalWebView(true)
    ).to.eventually.deep.equal(true);
  });

  it('will receive result of requesting internal web view 2', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, true);

    return expect(bridge.forceInternalWebView(true)).to.eventually.deep.equal(
      true
    );
  });

  it('will parse error', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "test message" }');

    return expect(bridge.webviewConfigManager.forceInternalWebView(true)).to
      .eventually.be.rejected;
  });
});

describe('requestPermissionStatus', () => {
  it('will call the platform executor', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.utilityManager
      .getPermissionStatus(PermissionName.MICROPHONE)
      .catch(handleError);

    sinon.assert.calledWith(mockExecutor.exec, 'getPermissionStatus');
  });

  it('will parse the Permission JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, `granted`);

    return expect(
      bridge.utilityManager.getPermissionStatus(PermissionName.CAMERA)
    ).to.eventually.deep.equal(PermissionStatus.GRANTED);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(3, '{ "message": "Gallery not found" }');

    return expect(
      bridge.utilityManager.getPermissionStatus(PermissionName.GALLERY)
    ).to.eventually.be.rejected;
  });
});

describe('launchAppSettings', () => {
  it('will call the platform executor', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);

    bridge.utilityManager.launchAppSettings().catch(handleError);

    sinon.assert.calledWith(mockExecutor.exec, 'launchAppSettings');
  });

  it('will parse the enabled JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, `true`);

    return expect(
      bridge.utilityManager.launchAppSettings()
    ).to.eventually.deep.equal(true);
  });

  it('will parse the disabled JSON response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(2, `false`);

    return expect(
      bridge.utilityManager.launchAppSettings()
    ).to.eventually.deep.equal(false);
  });

  it('will parse the Error response', () => {
    const bridge = new Bridge.MiniAppBridge(mockExecutor);
    mockExecutor.exec.callsArgWith(
      3,
      '{"message":"Launch App Settings not found"}'
    );

    return expect(bridge.utilityManager.launchAppSettings()).to.eventually.be
      .rejected;
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
    id: String(Bridge.cryptoRandom()),
  };
}
