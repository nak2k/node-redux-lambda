console.log('Start');

const { applyMiddleware } = require('redux-lambda/server');

const exampleMiddleware = store => next => action => {
  next({
    type: 'PONG',
    date: new Date(),
  });
};

const store = {
};

export const handler = applyMiddleware(
  exampleMiddleware
)(store);
