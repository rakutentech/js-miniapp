import React from 'react';

import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChatIcon from '@material-ui/icons/Chat';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EventIcon from '@material-ui/icons/CompareArrows';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import GifIcon from '@material-ui/icons/Gif';
import HomeIcon from '@material-ui/icons/Home';
import LaptopWindowsIcon from '@material-ui/icons/LaptopWindows';
import LinkIcon from '@material-ui/icons/Link';
import AdsIcon from '@material-ui/icons/LocalPlay';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MediaIcon from '@material-ui/icons/MusicVideo';
import NotificationImportantOutlinedIcon from '@material-ui/icons/NotificationImportantOutlined';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SecurityIcon from '@material-ui/icons/Security';
import SendIcon from '@material-ui/icons/SendSharp';
import ShareIcon from '@material-ui/icons/Share';
import SimCardIcon from '@material-ui/icons/SimCard';
import StorageIcon from '@material-ui/icons/Storage';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import WebIcon from '@material-ui/icons/Web';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DatasetIcon from '@mui/icons-material/Dataset';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LoginIcon from '@mui/icons-material/Login';

import Ads from './pages/ads';
import Analytics from './pages/analytics';
import { CloseConfirmAlert } from './pages/app-close-alert';
import AuthToken from './pages/auth-token';
import Camera from './pages/camera';
import ColorThemeComponent from './pages/color-theme';
import CookieManagerComponent from './pages/cookie-manager';
import DeeplinkSupport from './pages/deeplink-support';
import ESimPage from './pages/e-sim';
import EventListener from './pages/event-listener';
import FeatureListComponent from './pages/feature-list';
import FileDownload from './pages/file-download';
import FileUploader from './pages/file-upload';
import GetExchangeTokenPage from './pages/get-exchange-token';
import GifPage from './pages/gifs';
import ImageUpload from './pages/image-upload';
import Landing from './pages/landing';
import LaunchAppSettings from './pages/launch-app-settings';
import LocalStorage from './pages/local-storage';
import LogEventPage from './pages/log-event';
import Media from './pages/media';
import TalkToChatBot from './pages/message';
import { MiniAppPreferenceComponent } from './pages/miniapp-preferences';
import PermissionStatus from './pages/permissionStatus';
import SecureStorageComponent from './pages/secure-storage';
import Share from './pages/share';
import TriggerLoginUIPage from './pages/trigger-login-ui';
import UniversalBridge from './pages/universal-bridge';
import UriSchemes from './pages/uri-schemes';
import UserDetails from './pages/user-details';
import UuidFetcher from './pages/uuid-sdk';
import WebLocation from './pages/web-location';
import WebViewConfig from './pages/web-view-config';
import WindowActions from './pages/window-actions';

//default root location when using ios
const iosHomeNavLink = { navLink: '/index.html', label: 'Home' };
//default root location when using android
const androidHomeNavLink = { navLink: '/miniapp/index.html', label: 'Home' };
//default supposed root location
//todo fix this
const homeNavLink = { navLink: '/', label: 'Home' };
const landingNavLink = { navLink: '/landing', label: 'Home' };
const localStorageNavLink = {
  navLink: '/local_storage',
  label: 'Local Storage',
};
const fetchUniqueIdNavLink = {
  navLink: '/fetch_id',
  label: 'Fetch Unique ID',
};
const deviceLocationNavLink = {
  navLink: '/device_location',
  label: 'Device Location',
};
const authTokenNavLink = {
  navLink: '/auth_token',
  label: 'Access token',
};
const userDetailNavLink = { navLink: '/user_detail', label: 'User Details' };
const messageNavLink = { navLink: '/chatbot', label: 'Message' };
const windowActionNavLink = {
  navLink: '/window_actions',
  label: 'Window Actions',
};
const uriSchemesNavLink = { navLink: '/uri_schemes', label: 'URI Schemes' };
const eventListenerNavLink = {
  navLink: '/event_listener',
  label: 'Event Listener',
};
const mediaNavLink = { navLink: '/media', label: 'Media' };
const shareNavLink = { navLink: '/share', label: 'Share' };
const adsNavLink = { navLink: '/ads', label: 'Ads' };
const cameraNavLink = { navLink: '/camera', label: 'Camera' };
const fileDownloadNavLink = {
  navLink: '/file_download',
  label: 'File Download',
};
const fileUploadNavLink = { navLink: '/file_upload', label: 'File Upload' };
const gifsNavLink = { navLink: '/gifs', label: "GIF's & WebP" };
const secureStorageNavLink = {
  navLink: '/secure-storage',
  label: 'SecureStorage',
};
const closeAlertNavLink = {
  navLink: '/close-confirm-alert',
  label: 'Close Feature',
};
const universalBridgeNavLink = {
  navLink: '/universal-bridge',
  label: 'Universal Bridge',
};
const colorThemeNavLink = {
  navLink: '/color-theme',
  label: 'Color Theme',
};
const cookieManagerNavLink = {
  navLink: '/cookies',
  label: 'Cookie Manager',
};
const miniAppPreferenceNavLink = {
  navLink: '/miniapp-preference',
  label: 'MiniApp Preference',
};
const miniFeatureListNavLink = {
  navLink: '/miniapp-feature-list',
  label: 'Feature List',
};
const analyticsNavLink = {
  navLink: '/analytics',
  label: 'Analytics',
};
const deeplinkSupportNavLink = {
  navLink: '/deeplink-support',
  label: 'Deeplink Handler',
};
const imageUploadNavLink = { navLink: '/image_upload', label: 'Image Upload' };
const webViewConfigNavLink = {
  navLink: '/web-view-config',
  label: 'Web View Config',
};

const logEventNavLink = {
  navLink: '/log-event',
  label: 'Log Event',
};

const triggerLoginNavLink = {
  navLink: '/trigger-login',
  label: 'Trigger Login UI',
};

const exchangeTokenNavLink = {
  navLink: '/exchange-token',
  label: 'Exchange Token',
};

const eSimNavLink = {
  navLink: '/e-sim',
  label: 'E Sim',
};

const permissionStatusNavLink = {
  navLink: '/permissionStatus',
  label: 'Permission Status',
};

const launchAppSettingsNavLink = {
  navLink: '/launchAppSettings',
  label: 'Launch App Settings',
};

const navLinks = [
  iosHomeNavLink,
  androidHomeNavLink,
  homeNavLink,
  landingNavLink,
  localStorageNavLink,
  fetchUniqueIdNavLink,
  deviceLocationNavLink,
  authTokenNavLink,
  userDetailNavLink,
  messageNavLink,
  windowActionNavLink,
  uriSchemesNavLink,
  eventListenerNavLink,
  mediaNavLink,
  shareNavLink,
  adsNavLink,
  cameraNavLink,
  fileDownloadNavLink,
  fileUploadNavLink,
  gifsNavLink,
  secureStorageNavLink,
  miniAppPreferenceNavLink,
  closeAlertNavLink,
  universalBridgeNavLink,
  colorThemeNavLink,
  cookieManagerNavLink,
  miniFeatureListNavLink,
  analyticsNavLink,
  deeplinkSupportNavLink,
  imageUploadNavLink,
  webViewConfigNavLink,
  logEventNavLink,
  exchangeTokenNavLink,
  triggerLoginNavLink,
  eSimNavLink,
  permissionStatusNavLink,
  launchAppSettingsNavLink,
];

const homeItem = [
  {
    icon: <HomeIcon />,
    label: landingNavLink.label,
    navLink: landingNavLink.navLink,
    element: <Landing />,
  },
];

const appItems = [
  {
    icon: <StorageIcon />,
    label: localStorageNavLink.label,
    navLink: localStorageNavLink.navLink,
    element: <LocalStorage />,
  },
  {
    icon: <FingerprintIcon />,
    label: fetchUniqueIdNavLink.label,
    navLink: fetchUniqueIdNavLink.navLink,
    element: <UuidFetcher />,
  },
  {
    icon: <LocationOnIcon />,
    label: deviceLocationNavLink.label,
    navLink: deviceLocationNavLink.navLink,
    element: <WebLocation />,
  },
  {
    icon: <VpnKeyIcon />,
    label: authTokenNavLink.label,
    navLink: authTokenNavLink.navLink,
    element: <AuthToken />,
  },
  {
    icon: <PersonIcon />,
    label: userDetailNavLink.label,
    navLink: userDetailNavLink.navLink,
    element: <UserDetails />,
  },
  {
    icon: <ChatIcon />,
    label: messageNavLink.label,
    navLink: messageNavLink.navLink,
    element: <TalkToChatBot />,
  },
  {
    icon: <LaptopWindowsIcon />,
    label: windowActionNavLink.label,
    navLink: windowActionNavLink.navLink,
    element: <WindowActions />,
  },
  {
    icon: <LinkIcon />,
    label: uriSchemesNavLink.label,
    navLink: uriSchemesNavLink.navLink,
    element: <UriSchemes />,
  },
  {
    icon: <EventIcon />,
    label: eventListenerNavLink.label,
    navLink: eventListenerNavLink.navLink,
    element: <EventListener />,
  },
  {
    icon: <MediaIcon />,
    label: mediaNavLink.label,
    navLink: mediaNavLink.navLink,
    element: <Media />,
  },
  {
    icon: <ShareIcon />,
    label: shareNavLink.label,
    navLink: shareNavLink.navLink,
    element: <Share />,
  },
  {
    icon: <AdsIcon />,
    label: adsNavLink.label,
    navLink: adsNavLink.navLink,
    element: <Ads />,
  },
  {
    icon: <PhotoCamera />,
    label: cameraNavLink.label,
    navLink: cameraNavLink.navLink,
    element: <Camera />,
  },
  {
    icon: <CloudDownloadIcon />,
    label: fileDownloadNavLink.label,
    navLink: fileDownloadNavLink.navLink,
    element: <FileDownload />,
  },
  {
    icon: <AttachFileIcon />,
    label: fileUploadNavLink.label,
    navLink: fileUploadNavLink.navLink,
    element: <FileUploader />,
  },
  {
    icon: <GifIcon />,
    label: gifsNavLink.label,
    navLink: gifsNavLink.navLink,
    element: <GifPage />,
  },
  {
    icon: <SecurityIcon />,
    label: secureStorageNavLink.label,
    navLink: secureStorageNavLink.navLink,
    element: <SecureStorageComponent />,
  },
  {
    icon: <DatasetIcon />,
    label: miniAppPreferenceNavLink.label,
    navLink: miniAppPreferenceNavLink.navLink,
    element: <MiniAppPreferenceComponent />,
  },
  {
    icon: <NotificationImportantOutlinedIcon />,
    label: closeAlertNavLink.label,
    navLink: closeAlertNavLink.navLink,
    element: <CloseConfirmAlert />,
  },
  {
    icon: <SendIcon />,
    label: universalBridgeNavLink.label,
    navLink: universalBridgeNavLink.navLink,
    element: <UniversalBridge />,
  },
  {
    icon: <PaletteIcon />,
    label: colorThemeNavLink.label,
    navLink: colorThemeNavLink.navLink,
    element: <ColorThemeComponent />,
  },
  {
    icon: <ArtTrackIcon />,
    label: cookieManagerNavLink.label,
    navLink: cookieManagerNavLink.navLink,
    element: <CookieManagerComponent />,
  },
  {
    icon: <FormatListNumberedIcon />,
    label: miniFeatureListNavLink.label,
    navLink: miniFeatureListNavLink.navLink,
    element: <FeatureListComponent />,
  },
  {
    icon: <AnalyticsIcon />,
    label: analyticsNavLink.label,
    navLink: analyticsNavLink.navLink,
    element: <Analytics />,
  },
  {
    icon: <AnalyticsIcon />,
    label: deeplinkSupportNavLink.label,
    navLink: deeplinkSupportNavLink.navLink,
    element: <DeeplinkSupport />,
  },
  {
    icon: <PhotoCamera />,
    label: imageUploadNavLink.label,
    navLink: imageUploadNavLink.navLink,
    element: <ImageUpload />,
  },
  {
    icon: <WebIcon />,
    label: webViewConfigNavLink.label,
    navLink: webViewConfigNavLink.navLink,
    element: <WebViewConfig />,
  },
  {
    icon: <Inventory2Icon />,
    label: logEventNavLink.label,
    navLink: logEventNavLink.navLink,
    element: <LogEventPage />,
  },
  {
    icon: <LoginIcon />,
    label: triggerLoginNavLink.label,
    navLink: triggerLoginNavLink.navLink,
    element: <TriggerLoginUIPage />,
  },
  {
    icon: <VpnKeyIcon />,
    label: exchangeTokenNavLink.label,
    navLink: exchangeTokenNavLink.navLink,
    element: <GetExchangeTokenPage />,
  },
  {
    icon: <SimCardIcon />,
    label: eSimNavLink.label,
    navLink: eSimNavLink.navLink,
    element: <ESimPage />,
  },
  {
    icon: <VpnKeyIcon />,
    label: permissionStatusNavLink.label,
    navLink: permissionStatusNavLink.navLink,
    element: <PermissionStatus />,
  },
  {
    icon: <VpnKeyIcon />,
    label: launchAppSettingsNavLink.label,
    navLink: launchAppSettingsNavLink.navLink,
    element: <LaunchAppSettings />,
  },
];

const navItems = homeItem.concat(
  appItems.sort((a, b) => a.label.localeCompare(b.label))
);

export { navItems, navLinks };
