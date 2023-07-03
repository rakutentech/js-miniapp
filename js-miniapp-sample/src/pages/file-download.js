import React, { useState, useEffect } from 'react';

import {
  Button,
  CardContent,
  CardActions,
  CircularProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {
  CustomPermission,
  CustomPermissionResult,
  CustomPermissionName,
  CustomPermissionStatus,
  DownloadFileHeaders,
  MiniAppError,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import { pandaLogo } from '../assets/images/base64';
import GreyCard from '../components/GreyCard';
import { requestDownloadFile } from '../services/filedownload/actions';
import { requestCustomPermissions } from '../services/permissions/actions';
import { sendAnalytics } from './helper';
import { MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';

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

type FileDownloadProps = {
  permissions: CustomPermissionName[],
  filename: string,
  isLoading: boolean,
  error: MiniAppError,
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
  const classes = useStyles();
  let [isPermissionGranted, setIsPermissionGranted] = useState(true);
  let [dataUri, setDataUri] = useState(pandaLogo);

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'File Download',
      'Screen',
      'Page',
      ''
    );
  });

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
        hasPermission(CustomPermissionName.FILE_DOWNLOAD, permissions)
          ? startFileDownload(url, fileName)
          : setIsPermissionGranted(false)
      )
      .catch((miniAppError) => {
        setIsPermissionGranted(false);
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
    return props
      .downloadFile(fileName, url, { token: 'test' })
      .then((downloadedFile) => {
        console.log('FileDownloadRsponse THEN:', downloadedFile);
        props.downloadedFile = downloadedFile;
      })
      .catch((error) => {
        console.log('FileDownloadErrors CATCH:', error);
        props.error = error;
        props.isLoading = false;
      });
  }

  function handleDownloadClick(url, fileName) {
    if (!props.isLoading) {
      onDownloadFile(url, fileName);
    }
  }

  function validateName(name) {
    if (name !== undefined && props.filename && props.filename.length > 0) {
      return name;
    }
    return '-';
  }

  function DownloadDisplay() {
    return (
      <TextField
        variant="outlined"
        disabled={true}
        className={classes.formInput}
        id="input-points-term"
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

        <div className={classes.info}>
          <p>
            {!isPermissionGranted && '"FILE_DOWNLOAD" permission not granted.'}
            {props.error && 'Download failed: ' + props.error.message}
            {props.downloadedFile && 'File Downloaded:' + props.downloadedFile}
          </p>
        </div>

        {DownloadDisplay()}

        {props.isLoading && (
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
            'https://file-examples.com/wp-content/storage/2017/02/zip_2MB.zip',
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

        {renderButton('Download Image - Dot', 'button-download-image', () => {
          handleDownloadClick(
            'https://filesamples.com/samples/image/jpg/sample_640%C3%97426.jpg',
            'sample.jun-2022.test.jpg'
          );
        })}

        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-base64"
          label={'Base64 data string'}
          value={dataUri}
          onChange={(event) => setDataUri(event.target.value)}
        />
        {renderButton('Download Base64 Data', 'button-download-base64', () => {
          handleDownloadClick(dataUri, 'panda.png');
        })}
      </GreyCard>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions,
    filename: state.file.filename,
    error: state.file.error,
    isLoading: state.file.isLoading,
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
