import { combineReducers } from 'redux';
import { LAMBDA_ERROR } from 'redux-lambda';
import { UPDATE_FACEBOOK_LOGIN_STATUS, PONG } from '../actions';

const initialState = {
  facebookLoginStatus: {},
  result: undefined,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_FACEBOOK_LOGIN_STATUS:
    return Object.assign([], state, {
      facebookLoginStatus: action.facebookLoginStatus,
    });

  case LAMBDA_ERROR:
  case PONG:
    return Object.assign([], state, {
      result: action,
    });
  }
  return state;
};

export default rootReducer;
