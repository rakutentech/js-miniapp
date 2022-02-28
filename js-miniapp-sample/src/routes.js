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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
import PurchaseComponent from './pages/purchase';

const homeItem = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    navLink: '/landing',
    component: Landing,
  },
];

const appItems = [
  {
    icon: <StorageIcon />,
    label: 'Local Storage',
    navLink: '/local_storage',
    component: LocalStorage,
  },
  {
    icon: <FingerprintIcon />,
    label: 'Fetch Unique ID from SDK',
    navLink: '/fetch_id',
    component: UuidFetcher,
  },
  {
    icon: <LocationOnIcon />,
    label: 'Device Location',
    navLink: '/device_location',
    component: WebLocation,
  },
  {
    icon: <VpnKeyIcon />,
    label: 'Auth token from Mobile',
    navLink: '/auth_token',
    component: AuthToken,
  },
  {
    icon: <PersonIcon />,
    label: 'User Details',
    navLink: '/user_detail',
    component: UserDetails,
  },
  {
    icon: <ChatIcon />,
    label: 'Message',
    navLink: '/chatbot',
    component: TalkToChatBot,
  },
  {
    icon: <LaptopWindowsIcon />,
    label: 'Window Actions',
    navLink: '/window_actions',
    component: WindowActions,
  },
  {
    icon: <LinkIcon />,
    label: 'URI Schemes',
    navLink: '/uri_schemes',
    component: UriSchemes,
  },
  {
    icon: <EventIcon />,
    label: 'Event Listener',
    navLink: '/event_listener',
    component: EventListener,
  },
  {
    icon: <MediaIcon />,
    label: 'Media',
    navLink: '/media',
    component: Media,
  },
  {
    icon: <ShareIcon />,
    label: 'Share',
    navLink: '/share',
    component: Share,
  },
  {
    icon: <AdsIcon />,
    label: 'Ads',
    navLink: '/ads',
    component: Ads,
  },
  {
    icon: <PhotoCamera />,
    label: 'Camera',
    navLink: '/camera',
    component: Camera,
  },
  {
    icon: <CloudDownloadIcon />,
    label: 'File Download',
    navLink: '/file_download',
    component: FileDownload,
  },
  {
    icon: <AttachFileIcon />,
    label: 'File Upload',
    navLink: '/file_upload',
    component: FileUploader,
  },
  {
    icon: <GifIcon />,
    label: "GIF's & WebP",
    navLink: '/gifs',
    component: GifPage,
  },
  {
    icon: <ShoppingCartIcon />,
    label: 'Purchase',
    navLink: '/purchase',
    component: PurchaseComponent,
  },
];

const navItems: Object[] = homeItem.concat(
  appItems.sort((a, b) => a.label.localeCompare(b.label))
);

export { navItems };
