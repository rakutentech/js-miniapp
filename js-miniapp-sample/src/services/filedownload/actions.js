import MiniApp, { DownloadHeaders } from 'js-miniapp-sdk';

import { FILE_DOWNLOAD_SUCCESS, FILE_DOWNLOAD_FAILURE } from './types';

type DownloadFileAction = {
  type: String,
  filename: ?string,
  error: ?string,
};

const requestDownloadFile = (
  filename: string,
  url: string,
  headers: DownloadHeaders
): Function => {
  return (dispatch) => {
    return MiniApp.downloadFile(filename, url, headers)
      .then((filename) => {
        dispatch({
          type: FILE_DOWNLOAD_SUCCESS,
          filename: filename,
        });
        return Promise.resolve(filename);
      })
      .catch((error) => {
        dispatch({
          type: FILE_DOWNLOAD_FAILURE,
          error,
        });
      });
  };
};

export { requestDownloadFile };
export type { DownloadFileAction };
