import type { DownloadFileSuccessAction } from './actions';
import { FILE_DOWNLOAD_SUCCESS } from './types';

type FileDownloadState = {
  +filename: ?string,
};

const defaultState: FileDownloadState = {
  filename: '',
};

const FileDownloadReducer = (
  state: FileDownloadState = defaultState,
  action: DownloadFileSuccessAction
): string => {
  switch (action.type) {
    case FILE_DOWNLOAD_SUCCESS:
      return action.filename;
    default:
      return state;
  }
};

export { FileDownloadReducer };
