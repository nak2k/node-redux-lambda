import { LAMBDA } from 'redux-lambda';

export const UPDATE_FACEBOOK_LOGIN_STATUS = 'UPDATE_FACEBOOK_LOGIN_STATUS';

export const updateFacebookLoginStatus = facebookLoginStatus => ({
  type: UPDATE_FACEBOOK_LOGIN_STATUS,
  facebookLoginStatus,
});

export const PING = 'PING';

export const ping = () => ({
  [LAMBDA]: true,
  type: PING,
});

export const PONG = 'PONG';
