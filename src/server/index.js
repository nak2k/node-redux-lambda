export const applyMiddleware = (...middlewares) => store => (event, context) =>
  middlewares
  .map(middleware => middleware(store))
  .reduceRight(
    (dispatch, next) => next(dispatch),
    action => context.done(null, action)
  )(event);
