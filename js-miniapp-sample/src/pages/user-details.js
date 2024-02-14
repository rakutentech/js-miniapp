import React, { useReducer, useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  CardHeader,
  Container,
  CircularProgress,
  FormGroup,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Paper,
  InputAdornment,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import {
  CustomPermission,
  CustomPermissionResult,
  CustomPermissionName,
  CustomPermissionStatus,
  Contact,
  Points,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import { requestCustomPermissions } from '../services/permissions/actions';
import {
  requestContactList,
  requestProfilePhoto,
  requestUserName,
  requestPoints,
} from '../services/user/actions';
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
  root: {
    background: theme.color.secondary,
    width: '85vw',
    maxWidth: 500,
  },
  wrapperContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
  },
  wrapper: {
    position: 'relative',
    marginTop: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
  },
  error: {
    color: red[500],
    marginTop: 10,
  },
  success: {
    color: green[500],
    marginTop: 20,
  },
  rootUserGroup: {
    alignItems: 'center',
  },
  formInput: {
    width: '90%',
    marginTop: 10,
  },
  rootCardActions: {
    justifyContent: 'center',
  },
  caseSelector: {
    marginTop: 5,
  },
  button: {
    marginBottom: 15,
  },
  dataFormsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  profilePhoto: {
    height: 100,
    width: 100,
  },
  profilePhotoOuter: {
    display: 'flex',
    justifyContent: 'center',
  },
  userProfile: {
    maxHeight: 125,
    overflow: 'auto',
  },
  contactsList: {
    maxHeight: 320,
    overflow: 'auto',
  },
  red: {
    color: red[500],
  },
}));

export const initialState = {
  isNamePhotoLoading: false,
  isNamePhottoError: false,
  hasRequestedNamePhotoPermissions: false,
  isContactsLoading: false,
  isContactsError: false,
  hasRequestedContactsPermissions: false,
  isPointsLoading: false,
  isPointsError: false,
  hasRequestedPointPermissions: false,
};

type State = {
  isNamePhotoLoading: ?boolean,
  isNamePhotoError: ?boolean,
  hasRequestedNamePhotoPermissions: boolean,
  isContactsLoading: ?boolean,
  isContactsError: ?boolean,
  hasRequestedContactsPermissions: boolean,
  isPointsLoading: ?boolean,
  isPointsError: ?boolean,
  hasRequestedPointPermissions: boolean,
};

type Action = {
  type: string,
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'NAME_PHOTO_FETCH_INIT':
      return {
        ...state,
        isNamePhotoLoading: true,
        isNamePhotoError: false,
        hasRequestedNamePhotoPermissions: false,
      };
    case 'NAME_PHOTO_FETCH_SUCCESS':
      return {
        ...state,
        isNamePhotoLoading: false,
        isNamePhotoError: false,
        hasRequestedNamePhotoPermissions: true,
      };
    case 'NAME_PHOTO_FETCH_FAILURE':
      return {
        ...initialState,
        isNamePhotoLoading: false,
        isNamePhotoError: true,
      };
    case 'CONTACTS_FETCH_INIT':
      return {
        ...state,
        isContactsLoading: true,
        isContactsError: false,
        hasRequestedContactsPermissions: false,
      };
    case 'CONTACTS_FETCH_SUCCESS':
      return {
        ...state,
        isContactsLoading: false,
        isContactsError: false,
        hasRequestedContactsPermissions: true,
      };
    case 'CONTACTS_FETCH_FAILURE':
      return {
        ...initialState,
        isContactsLoading: false,
        isContactsError: true,
      };
    case 'POINTS_FETCH_INIT':
      return {
        ...state,
        isPointsLoading: true,
        isPointsError: false,
        hasRequestedPointPermissions: false,
      };
    case 'POINTS_FETCH_SUCCESS':
      return {
        ...state,
        isPointsLoading: false,
        isPointsError: false,
        hasRequestedPointPermissions: true,
      };
    case 'POINTS_FETCH_FAILURE':
      return {
        ...initialState,
        isPointsLoading: false,
        isPointsError: true,
      };
    default:
      throw Error('Unknown action type');
  }
};

type UserDetailsProps = {
  permissions: CustomPermissionName[],
  userName: string,
  profilePhoto: string,
  contactList: Contact[],
  points: Points,
  getUserName: () => Promise<string>,
  getProfilePhoto: () => Promise<string>,
  getContacts: () => Promise<Contact[]>,
  getPoints: () => Promise<Points>,
  requestPermissions: (
    permissions: CustomPermission[]
  ) => Promise<CustomPermissionResult[]>,
};

function UserDetails(props: UserDetailsProps) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();

  const namePhotoButtonClassname = getButtonState(state.isNamePhotoError);
  const contactsButtonClassname = getButtonState(state.isContactsError);
  const pointsButtonClassname = getButtonState(state.isPointsError);

  const [showClearIcon, setShowClearIcon] = useState('none');
  const [searchText, setSearchText] = useState('');
  const dataFiltered = filterSearchData(searchText, props.contactList);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setSearchText(event.target.value);
  };

  const handleSearchReset = (): void => {
    setSearchText('');
    setShowClearIcon('none');
  };

  function filterSearchData(query: string, contactList: Contact[]) {
    if (!query) {
      return contactList;
    } else {
      let filteredContacts = contactList
        .filter(function (contact) {
          return contact.name.toLocaleLowerCase().includes(query.toLowerCase());
        })
        .map(function (contact) {
          return contact;
        });
      return filteredContacts;
    }
  }

  function getButtonState(isError: boolean) {
    return clsx({
      [classes.buttonFailure]: isError,
      [classes.buttonSuccess]: !isError,
    });
  }
  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'User details',
      'Screen',
      'Page',
      ''
    );
    props.contactList = undefined;
  });

  function requestNamePhoto() {
    const permissionsList = [
      {
        name: CustomPermissionName.USER_NAME,
        description:
          'We would like to display your Username on your profile page.',
      },
      {
        name: CustomPermissionName.PROFILE_PHOTO,
        description:
          'We would like to display your Profile Photo on your profile page.',
      },
    ];

    props
      .requestPermissions(permissionsList)
      .then((permissions) => filterAllowedPermissions(permissions))
      .then((permissions) =>
        Promise.all([
          hasPermission(CustomPermissionName.USER_NAME, permissions)
            ? fetchUsername()
            : null,
          hasPermission(CustomPermissionName.PROFILE_PHOTO, permissions)
            ? fetchProfilePhoto()
            : null,
        ])
      )
      .then(() => dispatch({ type: 'NAME_PHOTO_FETCH_SUCCESS' }))
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'NAME_PHOTO_FETCH_FAILURE' });
      });
  }

  function fetchUsername() {
    props
      .getUserName()
      .then((string) => {
        dispatch({ type: 'NAME_PHOTO_FETCH_SUCCESS' });
      })
      .catch((e) => {
        dispatch({ type: 'NAME_PHOTO_FETCH_FAILURE', error: e });
      });
  }

  function fetchProfilePhoto() {
    props
      .getProfilePhoto()
      .then((permissions) => {
        dispatch({ type: 'NAME_PHOTO_FETCH_SUCCESS' });
      })
      .catch((e) => {
        dispatch({ type: 'NAME_PHOTO_FETCH_FAILURE', error: e });
      });
  }

  function requestContacts() {
    const permissionsList = [
      {
        name: CustomPermissionName.CONTACT_LIST,
        description: 'We would like to send messages to your contacts.',
      },
    ];
    props.contactList = undefined;
    props
      .requestPermissions(permissionsList)
      .then((permissions) => filterAllowedPermissions(permissions))
      .then((permissions) =>
        Promise.all([
          hasPermission(CustomPermissionName.CONTACT_LIST, permissions)
            ? props.getContacts()
            : null,
        ])
      )
      .then(() => dispatch({ type: 'CONTACTS_FETCH_SUCCESS' }))
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'CONTACTS_FETCH_FAILURE' });
      });
  }

  function requestPoints() {
    const permissionsList = [
      {
        name: CustomPermissionName.POINTS,
        description:
          'We would like to display your Points on your profile page.',
      },
    ];
    if (props !== undefined) {
      props.points = undefined;
    }

    props
      .requestPermissions(permissionsList)
      .then((permissions) => filterAllowedPermissions(permissions))
      .then((permissions) =>
        Promise.all([
          hasPermission(CustomPermissionName.POINTS, permissions)
            ? props.getPoints()
            : null,
        ])
      )
      .then(() => dispatch({ type: 'POINTS_FETCH_SUCCESS' }))
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'POINTS_FETCH_FAILURE' });
      });
  }

  function filterAllowedPermissions(permissions) {
    return permissions
      .filter(
        (permission) => permission.status === CustomPermissionStatus.ALLOWED
      )
      .map((permission) => permission.name);
  }

  function handleNamePhotoClick(e) {
    if (!state.isNamePhotoLoading) {
      e.preventDefault();
      dispatch({ type: 'NAME_PHOTO_FETCH_INIT' });
      requestNamePhoto();
    }
  }

  function handleContactsClick(e) {
    if (!state.isContactsLoading) {
      e.preventDefault();
      dispatch({ type: 'CONTACTS_FETCH_INIT' });
      requestContacts();
    }
  }

  function handlePointsClick(e) {
    if (!state.isPointsLoading) {
      e.preventDefault();
      dispatch({ type: 'POINTS_FETCH_INIT' });
      requestPoints();
    }
  }

  function CardNamePhotoActionsForm() {
    const hasPhotoPermission =
      state.hasRequestedNamePhotoPermissions &&
      hasPermission(CustomPermissionName.PROFILE_PHOTO);

    const hasNamePermission =
      state.hasRequestedNamePhotoPermissions &&
      hasPermission(CustomPermissionName.USER_NAME);

    return (
      <FormGroup column="true">
        <Paper className={classes.paper}>
          <List className={classes.userProfile}>
            {state.hasRequestedNamePhotoPermissions && !hasPhotoPermission && (
              <ListItem>
                <ListItemText
                  primary='"Profile Photo" permission not granted.'
                  className={classes.red}
                  key="avatar-error"
                />
              </ListItem>
            )}
            {hasPhotoPermission && (
              <div className={classes.profilePhotoOuter}>
                <Avatar
                  src={props.profilePhoto}
                  className={classes.profilePhoto}
                  key="avatar"
                />
              </div>
            )}
          </List>
          <CardHeader subheader="User Details" />
          <TextField
            variant="outlined"
            disabled={true}
            className={classes.formInput}
            id="input-name"
            error={
              state.isNamePhotoError && state.hasRequestedNamePhotoPermissions
            }
            label={'User Name'}
            value={
              !hasNamePermission && state.hasRequestedNamePhotoPermissions
                ? '"User Name" permission not granted.'
                : props.userName || ' '
            }
          />
        </Paper>
        <div className={classes.wrapper}>
          <Button
            onClick={handleNamePhotoClick}
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            className={namePhotoButtonClassname}
            disabled={state.isNamePhotoLoading}
            data-testid="fetchNamePhotoButton"
          >
            Fetch User Name and Photo
          </Button>
          {state.isNamePhotoLoading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </div>
        {state.isNamePhotoError && (
          <Typography variant="body1" className={classes.error}>
            Error fetching the user name and photo
          </Typography>
        )}
      </FormGroup>
    );
  }

  function CardContactsActionsForm() {
    const hasContactsPermision =
      state.hasRequestedContactsPermissions &&
      hasPermission(CustomPermissionName.CONTACT_LIST);
    return (
      <FormGroup column="true">
        <div className={classes.wrapper}>
          <Button
            onClick={handleContactsClick}
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            className={contactsButtonClassname}
            disabled={state.isContactsLoading}
            data-testid="fetchContactsButton"
          >
            Fetch Contacts
          </Button>
          {state.isContactsLoading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </div>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleSearchTextChange}
          value={searchText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleSearchReset}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
        <Paper className={classes.paper}>
          {hasContactsPermision &&
            !state.isContactsError &&
            props.contactList && (
              <CardHeader
                subheader={'Contact List: ' + props.contactList.length}
              />
            )}
          <List className={classes.contactsList}>
            {state.hasRequestedContactsPermissions && !hasContactsPermision && (
              <ListItem>
                <ListItemText
                  primary='"Contacts" permission not granted.'
                  className={classes.red}
                />
              </ListItem>
            )}
            {hasContactsPermision &&
              !state.isContactsError &&
              props.contactList &&
              dataFiltered.map((contact) => (
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar className={classes.contactIcon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.id}
                    secondary={
                      <React.Fragment>
                        <Typography>
                          {contact.name && contact.name !== '' && (
                            <span>{'Name: ' + contact.name}</span>
                          )}
                        </Typography>
                        <Typography>
                          {contact.email && contact.email !== '' && (
                            <span>{'Email: ' + contact.email}</span>
                          )}
                        </Typography>
                        <Typography>
                          {contact.allEmailList &&
                            contact.allEmailList.length > 0 && (
                              <span>
                                {'Email list: ' +
                                  contact.allEmailList.join(', ')}
                              </span>
                            )}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Paper>

        {state.isContactsError && (
          <Typography variant="body1" className={classes.error}>
            Error fetching the contacts
          </Typography>
        )}
      </FormGroup>
    );
  }

  function CardPointActionsForm() {
    return (
      <FormGroup column="true">
        <Paper className={classes.paper}>
          <CardHeader subheader="Points" />
          <TextField
            variant="outlined"
            disabled={true}
            className={classes.formInput}
            id="input-points-standard"
            error={state.isPointsError || isPointsPermissionDenied()}
            label={'Points (Standard)'}
            value={
              isPointsPermissionDenied()
                ? '"Points" permission not granted.'
                : props.points !== undefined &&
                  props.points.standard !== undefined
                ? props.points.standard.toString()
                : '-'
            }
          />
          <TextField
            variant="outlined"
            disabled={true}
            className={classes.formInput}
            id="input-points-term"
            error={state.isPointsError || isPointsPermissionDenied()}
            label={'Points (Time-Limited)'}
            value={
              isPointsPermissionDenied()
                ? '"Points" permission not granted.'
                : props.points !== undefined && props.points.term !== undefined
                ? props.points.term.toString()
                : '-'
            }
          />
          <TextField
            variant="outlined"
            disabled={true}
            className={classes.formInput}
            id="input-points-cash"
            error={state.isPointsError || isPointsPermissionDenied()}
            label={'Points (Rakuten Cash)'}
            value={
              isPointsPermissionDenied()
                ? '"Points" permission not granted.'
                : props.points !== undefined && props.points.cash !== undefined
                ? props.points.cash.toString()
                : '-'
            }
          />
        </Paper>

        <div className={classes.wrapper}>
          <Button
            onClick={handlePointsClick}
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            className={pointsButtonClassname}
            disabled={state.isPointsLoading}
            data-testid="fetchPointsButton"
          >
            Fetch Points
          </Button>
          {state.isPointsLoading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </div>
        {state.isPointsError && (
          <Typography variant="body1" className={classes.error}>
            Error fetching the points
          </Typography>
        )}
      </FormGroup>
    );
  }

  function isPointsPermissionDenied() {
    return (
      state.hasRequestedPointPermissions &&
      !hasPermission(CustomPermissionName.POINTS)
    );
  }

  function hasPermission(permission, permissionList: ?(string[])) {
    permissionList = permissionList || props.permissions || [];
    if (permissionList.indexOf !== undefined) {
      return permissionList.indexOf(permission) > -1;
    } else if (permissionList.permissions.indexOf !== undefined) {
      return permissionList.permissions.indexOf(permission) > -1;
    }
    return false;
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event: Event, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.wrapperContainer}>
      <TabContext value={value}>
        <TabList
          variant="scrollable"
          onChange={handleChange}
          aria-label="user details tabs"
        >
          <Tab label="Profile" value="1" />
          <Tab label="Contacts" value="2" />
          <Tab label="Points" value="3" />
        </TabList>
        <TabPanel value="1">{CardNamePhotoActionsForm()}</TabPanel>
        <TabPanel value="2">{CardContactsActionsForm()}</TabPanel>
        <TabPanel value="3">{CardPointActionsForm()}</TabPanel>
      </TabContext>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions,
    userName: state.user.userName,
    profilePhoto: state.user.profilePhoto,
    contactList: state.user.contactList,
    points: state.user.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserName: () => dispatch(requestUserName()),
    getProfilePhoto: () => dispatch(requestProfilePhoto()),
    getContacts: () => dispatch(requestContactList()),
    getPoints: () => dispatch(requestPoints()),
    requestPermissions: (permissions) =>
      dispatch(requestCustomPermissions(permissions)),
  };
};

export { UserDetails };
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
