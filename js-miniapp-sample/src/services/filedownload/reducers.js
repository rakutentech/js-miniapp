import type { DownloadFileAction } from './actions';
import {
  FILE_DOWNLOAD_FAILURE,
  FILE_DOWNLOAD_SUCCESS,
  FILE_DOWNLOAD_INIT,
} from './types';

type FileDownloadState = {
  +filename: ?string,
};

const defaultState: FileDownloadState = {
  filename: undefined,
  error: undefined,
  isLoading: false,
};

const FileDownloadReducer = (
  state: FileDownloadState = defaultState,
  action: DownloadFileAction = {}
): FileDownloadState => {
  if (action.type === FILE_DOWNLOAD_INIT) {
    return {
      ...defaultState,
      isLoading: true,
    };
  } else if (action.type === FILE_DOWNLOAD_SUCCESS) {
    return {
      ...defaultState,
      filename: action.filename,
    };
  } else if (action.type === FILE_DOWNLOAD_FAILURE) {
    return {
      ...defaultState,
      error: action.error,
    };
  }
  return state;
};

export { FileDownloadReducer };
