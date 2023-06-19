import MiniApp, { DownloadFileHeaders } from 'js-miniapp-sdk';

import {
  FILE_DOWNLOAD_SUCCESS,
  FILE_DOWNLOAD_FAILURE,
  FILE_DOWNLOAD_INIT,
} from './types';

type DownloadFileAction = {
  type: string,
  filename: ?string,
  error: ?string,
};

const requestDownloadFile = (
  filename: string,
  url: string,
  headers: DownloadFileHeaders
): Function => {
  return (dispatch) => {
    dispatch({
      type: FILE_DOWNLOAD_INIT,
    });

    return MiniApp.downloadFile(filename, url, headers)
      .then((name) => {
        dispatch({
          type: FILE_DOWNLOAD_SUCCESS,
          filename: name,
        });
        return Promise.resolve(name);
      })
      .catch((error) => {
        console.log('requestDownloadFile: CATCH BLOCK: ', error);
        dispatch({
          type: FILE_DOWNLOAD_FAILURE,
          error: error,
        });
        throw error;
      });
  };
};

export { requestDownloadFile };
export type { DownloadFileAction };
