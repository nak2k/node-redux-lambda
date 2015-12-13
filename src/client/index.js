let LAMBDA = exports.LAMBDA = Symbol('redux-lambda');

export const LAMBDA_ERROR = 'LAMBDA_ERROR';

export const lambda = config => {
  if (typeof config === 'string') {
    config = { FunctionName: config };
  }

  config = Object.assign({
    ERROR_ACTION: LAMBDA_ERROR,
  }, config);

  let awsLambda;

  return store => next => action => {
    next(action);

    let options = action[LAMBDA];

    if (!options) {
      return;
    }

    options = Object.assign({}, config, options);

    if (!awsLambda) {
      awsLambda = new AWS.Lambda();
    }

    const params = {
      FunctionName: options.FunctionName,
      Payload: JSON.stringify(action),
    };

    const handleError = err => next({
      type: options.ERROR_ACTION,
      err,
      errorMessage: err.message,
    });

    awsLambda.invoke(params, (err, data) => {
      if (err) {
        return handleError(err);
      }

      if (data.StatusCode !== 200) {
        return handleError(new Error(`StatusCode is ${data.StatusCode}`));
      }

      let responseAction;

      try {
        responseAction = JSON.parse(data.Payload);
      } catch(err) {
        return handleError(err);
      }

      if (!responseAction.type) {
        responseAction.type = options.ERROR_ACTION;
      }

      next(responseAction);
    });
  };
};
