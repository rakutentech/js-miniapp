import { combineReducers } from 'redux';

import { FileDownloadReducer } from './filedownload/reducers';
import HomeStateReducer from './home/reducers';
import {
  HostEnvironmentInfoReducer,
  SecureStorageStatusReducer,
} from './landing/reducers';
import MessageReducer from './message/reducers';
import { PermissionsReducer } from './permissions/reducers';
import storageReducer from './secure-storage/reducers';
import userReducer from './user/reducers';
import { UUIDReducer } from './uuid/reducers';

export default combineReducers({
  message: MessageReducer,
  home: HomeStateReducer,
  permissions: PermissionsReducer,
  user: userReducer,
  uuid: UUIDReducer,
  info: HostEnvironmentInfoReducer,
  file: FileDownloadReducer,
  secureStorage: storageReducer,
  secureStorageStatus: SecureStorageStatusReducer,
});
