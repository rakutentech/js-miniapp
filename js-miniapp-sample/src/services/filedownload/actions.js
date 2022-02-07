import MiniApp from 'js-miniapp-sdk';

import { FILE_DOWNLOAD_SUCCESS, FILE_DOWNLOAD_FAILURE } from './types';

type DownloadFileSuccessAction = {
  filename: String,
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
      .catch((e) => {
        dispatch({
          type: FILE_DOWNLOAD_FAILURE,
        });
        throw e;
      });
  };
};

export { requestDownloadFile };
export type { DownloadFileSuccessAction };
