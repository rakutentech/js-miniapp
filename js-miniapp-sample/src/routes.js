import React from 'react';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChatIcon from '@material-ui/icons/Chat';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GifIcon from '@material-ui/icons/Gif';
import HomeIcon from '@material-ui/icons/Home';
import LaptopWindowsIcon from '@material-ui/icons/LaptopWindows';
import LinkIcon from '@material-ui/icons/Link';
import AdsIcon from '@material-ui/icons/LocalPlay';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MediaIcon from '@material-ui/icons/MusicVideo';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/Share';
import StorageIcon from '@material-ui/icons/Storage';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EventIcon from '@material-ui/icons/CompareArrows';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SecurityIcon from '@material-ui/icons/Security';
import NotificationImportantOutlinedIcon from '@material-ui/icons/NotificationImportantOutlined';
import SendIcon from '@material-ui/icons/SendSharp';

import Ads from './pages/ads';
import AuthToken from './pages/auth-token';
import Camera from './pages/camera';
import FileDownload from './pages/file-download';
import FileUploader from './pages/file-upload';
import GifPage from './pages/gifs';
import Landing from './pages/landing';
import LocalStorage from './pages/local-storage';
import Media from './pages/media';
import TalkToChatBot from './pages/message';
import Share from './pages/share';
import UriSchemes from './pages/uri-schemes';
import EventListener from './pages/event-listener';
import UserDetails from './pages/user-details';
import UuidFetcher from './pages/uuid-sdk';
import WebLocation from './pages/web-location';
import WindowActions from './pages/window-actions';
import SecureStorageComponent from './pages/secure-storage';
import { CloseConfirmAlert } from './pages/app-close-alert';
import UniversalBridge from './pages/universal-bridge';

const homeItem = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    navLink: '/landing',
    element: <Landing />,
  },
];

const appItems = [
  {
    icon: <StorageIcon />,
    label: 'Local Storage',
    navLink: '/local_storage',
    element: <LocalStorage />,
  },
  {
    icon: <FingerprintIcon />,
    label: 'Fetch Unique ID from SDK',
    navLink: '/fetch_id',
    element: <UuidFetcher />,
  },
  {
    icon: <LocationOnIcon />,
    label: 'Device Location',
    navLink: '/device_location',
    element: <WebLocation />,
  },
  {
    icon: <VpnKeyIcon />,
    label: 'Auth token from Mobile',
    navLink: '/auth_token',
    element: <AuthToken />,
  },
  {
    icon: <PersonIcon />,
    label: 'User Details',
    navLink: '/user_detail',
    element: <UserDetails />,
  },
  {
    icon: <ChatIcon />,
    label: 'Message',
    navLink: '/chatbot',
    element: <TalkToChatBot />,
  },
  {
    icon: <LaptopWindowsIcon />,
    label: 'Window Actions',
    navLink: '/window_actions',
    element: <WindowActions />,
  },
  {
    icon: <LinkIcon />,
    label: 'URI Schemes',
    navLink: '/uri_schemes',
    element: <UriSchemes />,
  },
  {
    icon: <EventIcon />,
    label: 'Event Listener',
    navLink: '/event_listener',
    element: <EventListener />,
  },
  {
    icon: <MediaIcon />,
    label: 'Media',
    navLink: '/media',
    element: <Media />,
  },
  {
    icon: <ShareIcon />,
    label: 'Share',
    navLink: '/share',
    element: <Share />,
  },
  {
    icon: <AdsIcon />,
    label: 'Ads',
    navLink: '/ads',
    element: <Ads />,
  },
  {
    icon: <PhotoCamera />,
    label: 'Camera',
    navLink: '/camera',
    element: <Camera />,
  },
  {
    icon: <CloudDownloadIcon />,
    label: 'File Download',
    navLink: '/file_download',
    element: <FileDownload />,
  },
  {
    icon: <AttachFileIcon />,
    label: 'File Upload',
    navLink: '/file_upload',
    element: <FileUploader />,
  },
  {
    icon: <GifIcon />,
    label: "GIF's & WebP",
    navLink: '/gifs',
    element: <GifPage />,
  },
  {
    icon: <SecurityIcon />,
    label: 'SecureStorage',
    navLink: '/secure-storage',
    element: <SecureStorageComponent />,
  },
  {
    icon: <NotificationImportantOutlinedIcon />,
    label: 'Close Alert',
    navLink: '/close-confirm-alert',
    element: <CloseConfirmAlert />,
  },
  {
    icon: <SendIcon />,
    label: 'Universal Bridge',
    navLink: '/universal-bridge',
    element: <UniversalBridge />,
  },
];

const navItems: Object[] = homeItem.concat(
  appItems.sort((a, b) => a.label.localeCompare(b.label))
);

export { navItems };
