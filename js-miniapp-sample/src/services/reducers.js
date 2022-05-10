import { combineReducers } from 'redux';

import MessageReducer from './message/reducers';
import HomeStateReducer from './home/reducers';
import { grantedPermissionsReducer } from './permissions/reducers';
import userReducer from './user/reducers';
import { UUIDReducer } from './uuid/reducers';
import {
  HostEnvironmentInfoReducer,
  SecureStorageStatusReducer,
} from './landing/reducers';
import { FileDownloadReducer } from './filedownload/reducers';
import storageReducer from './secure-storage/reducers';

export default combineReducers({
  message: MessageReducer,
  home: HomeStateReducer,
  permissions: grantedPermissionsReducer,
  user: userReducer,
  uuid: UUIDReducer,
  info: HostEnvironmentInfoReducer,
  file: FileDownloadReducer,
  secureStorage: storageReducer,
  secureStorageStatus: SecureStorageStatusReducer,
});
