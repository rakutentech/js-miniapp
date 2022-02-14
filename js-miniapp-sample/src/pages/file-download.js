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

import GreyCard from '../components/GreyCard';
import { connect } from 'react-redux';
import { requestCustomPermissions } from '../services/permissions/actions';
import {
  CustomPermission,
  CustomPermissionResult,
  CustomPermissionName,
  CustomPermissionStatus,
  DownloadFileHeaders,
} from 'js-miniapp-sdk';

import { requestDownloadFile } from '../services/filedownload/actions';

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

  function handleDownloadClick(e, url, fileName) {
    if (!state.isLoading) {
      e.preventDefault();
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

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>Download Files</CardContent>
        {DownloadDisplay()}
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleDownloadClick(
                e,
                'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg',
                'sample.jpg'
              );
            }}
          >
            Download Image
          </Button>
        </CardActions>

        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleDownloadClick(
                e,
                'https://file-examples-com.github.io/uploads/2017/02/zip_2MB.zip',
                'sample.zip'
              );
            }}
          >
            Download ZIP
          </Button>
        </CardActions>

        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleDownloadClick(
                e,
                'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
                'sample.mp3'
              );
            }}
          >
            Download MP3
          </Button>
        </CardActions>

        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleDownloadClick(
                e,
                'https://file-examples-com.github.io/uploads/2017/02/file_example_CSV_5000.csv',
                'sample.csv'
              );
            }}
          >
            Download CSV
          </Button>
        </CardActions>

        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleDownloadClick(
                e,
                'https://file-examples-com.github.io/uploads/2018/04/file_example_MOV_480_700kB.mov',
                'sample.mov'
              );
            }}
          >
            Download MOV
          </Button>
        </CardActions>

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
