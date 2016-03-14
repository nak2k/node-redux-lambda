console.log('Start');

const { applyMiddleware } = require('redux-lambda/server');

const exampleMiddleware = store => next => (action, context) => {
  next({
    type: 'PONG',
    date: new Date(),
  }, context);
};

const store = {
};

export const handler = applyMiddleware(
  exampleMiddleware
)(store);
