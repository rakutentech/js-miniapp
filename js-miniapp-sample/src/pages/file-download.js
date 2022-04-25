// @flow
import React, { useState, useReducer } from 'react';

import {
  Button,
  CardContent,
  CardActions,
  TextField,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import {
  CustomPermission,
  CustomPermissionResult,
  CustomPermissionName,
  CustomPermissionStatus,
  DownloadFileHeaders,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import { pandaLogo } from '../assets/images/base64';
import GreyCard from '../components/GreyCard';
import { requestDownloadFile } from '../services/filedownload/actions';
import { requestCustomPermissions } from '../services/permissions/actions';

const useStyles = makeStyles((theme) => ({
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: 'auto',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  content: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  info: {
    fontSize: 16,
    lineBreak: 'anywhere',
    wordBreak: 'break-all',
    color: theme.color.primary,
    marginTop: 0,
    paddingBottom: 10,
  },
  formInput: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
  },
}));

export const initialState = {
  isLoading: false,
  isError: false,
  hasRequestedPermissions: false,
};

type State = {
  isLoading: ?boolean,
  isError: ?boolean,
  hasRequestedPermissions: boolean,
};

type Action = {
  type: string,
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FILE_DOWNLOAD_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        hasRequestedPermissions: false,
      };
    case 'FILE_DOWNLOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        hasRequestedPermissions: true,
      };
    case 'FILE_DOWNLOAD_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
      };

    default:
      throw Error('Unknown action type');
  }
};

type FileDownloadProps = {
  permissions: CustomPermissionName[],
  filename: string,
  downloadFile: (
    filename: string,
    url: string,
    headers: DownloadFileHeaders
  ) => Promise<string>,
  requestPermissions: (
    permissions: CustomPermission[]
  ) => Promise<CustomPermissionResult[]>,
};

const FileDownload = (props: FileDownloadProps) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();
  let [isPermissionGranted, setIsPermissionGranted] = useState(true);
  let [dataUri, setDataUri] = useState(pandaLogo);

  function requestDownloadAttachmentPermission(url, fileName) {
    const permissionsList = [
      {
        name: CustomPermissionName.FILE_DOWNLOAD,
        description: 'We would like to get the permission to download files.',
      },
    ];

    props
      .requestPermissions(permissionsList)
      .then((permissions) =>
        permissions
          .filter(
            (permission) => permission.status === CustomPermissionStatus.ALLOWED
          )
          .map((permission) => permission.name)
      )
      .then((permissions) =>
        Promise.all([
          hasPermission(CustomPermissionName.FILE_DOWNLOAD, permissions)
            ? startFileDownload(url, fileName)
            : setIsPermissionGranted(false),
        ])
      )
      .catch((miniAppError) => {
        console.error(miniAppError);
      });
  }

  function hasPermission(permission, permissionList: ?(string[])) {
    permissionList = permissionList || props.permissions || [];
    return permissionList.indexOf(permission) > -1;
  }

  function onDownloadFile(url, fileName) {
    requestDownloadAttachmentPermission(url, fileName);
  }

  function startFileDownload(url, fileName) {
    setIsPermissionGranted(true);
    props
      .downloadFile(fileName, url, { token: 'test' })
      .then(() => dispatch({ type: 'FILE_DOWNLOAD_SUCCESS' }))
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'FILE_DOWNLOAD_FAILURE' });
      });
  }

  function handleDownloadClick(url, fileName) {
    if (!state.isLoading) {
      dispatch({ type: 'FILE_DOWNLOAD_INIT' });
      onDownloadFile(url, fileName);
    }
  }

  function validateName(name) {
    const hasDeniedFileDownloadPermission =
      state.hasRequestedPermissions &&
      !hasPermission(CustomPermissionName.FILE_DOWNLOAD);
    if (hasDeniedFileDownloadPermission) {
      return 'File Permission denied';
    }
    if (name !== undefined && props.filename.length > 0) {
      return name;
    }
    return '-';
  }

  function DownloadDisplay() {
    const hasDeniedFileDownloadPermission =
      state.hasRequestedPermissions &&
      !hasPermission(CustomPermissionName.FILE_DOWNLOAD);
    return (
      <TextField
        variant="outlined"
        disabled={true}
        className={classes.formInput}
        id="input-points-term"
        error={state.isError || hasDeniedFileDownloadPermission}
        label={'Filename (last download)'}
        value={validateName(props.filename)}
      />
    );
  }

  function renderButton(text, id, onClick) {
    return (
      <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" onClick={onClick} id={id}>
          {text}
        </Button>
      </CardActions>
    );
  }

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>Download Files</CardContent>
        {DownloadDisplay()}
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        {renderButton('Download Image', 'button-download-image', () => {
          handleDownloadClick(
            'https://filesamples.com/samples/image/jpg/sample_640%C3%97426.jpg',
            'sample.jpg'
          );
        })}

        {renderButton('Download ZIP', 'button-download-zip', () => {
          handleDownloadClick(
            'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip',
            'sample.zip'
          );
        })}

        {renderButton('Download MP3', 'button-download-mp3', () => {
          handleDownloadClick(
            'https://filesamples.com/samples/audio/mp3/sample3.mp3',
            'sample.mp3'
          );
        })}

        {renderButton('Download CSV', 'button-download-csv', () => {
          handleDownloadClick(
            'https://filesamples.com/samples/document/csv/sample4.csv',
            'sample.csv'
          );
        })}

        {renderButton('Download MOV', 'button-download-mov', () => {
          handleDownloadClick(
            'https://filesamples.com/samples/video/mov/sample_960x540.mov',
            'sample.mov'
          );
        })}

        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-base64"
          label={'Base64 data string'}
          value={dataUri}
          onChange={setDataUri}
        />
        {renderButton('Download Base64 Data', 'button-download-base64', () => {
          handleDownloadClick(dataUri, 'panda.png');
        })}

        <div className={classes.info}>
          <p>
            {!isPermissionGranted && '"FILE_DOWNLOAD" permission not granted.'}
          </p>
        </div>
      </GreyCard>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions,
    filename: state.file.filename,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestPermissions: (permissions) =>
      dispatch(requestCustomPermissions(permissions)),
    downloadFile: (filename, url, headers) =>
      dispatch(requestDownloadFile(filename, url, headers)),
  };
};

export { FileDownload };
export default connect(mapStateToProps, mapDispatchToProps)(FileDownload);
