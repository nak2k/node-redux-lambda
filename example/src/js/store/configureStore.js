import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { lambda } from 'redux-lambda';
import { awsMiddleware } from '../middleware';
import logger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  awsMiddleware,
  lambda('LambdaExample'),
  logger()
)(createStore);

export default createStoreWithMiddleware.bind(null, rootReducer);
