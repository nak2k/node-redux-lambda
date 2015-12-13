import { UPDATE_FACEBOOK_LOGIN_STATUS } from '../actions';

export const awsMiddleware = store => next => action => {
  if (action.type == UPDATE_FACEBOOK_LOGIN_STATUS) {
    let { authResponse } = action.facebookLoginStatus;
    if (authResponse) {
      AWS.config.credentials = new AWS.WebIdentityCredentials({
        RoleArn: process.env.AWS_LAMBDA_INVOKER_ROLE_ARN,
        ProviderId: 'graph.facebook.com',
        WebIdentityToken: authResponse.accessToken
      });

      AWS.config.update({ region: process.env.AWS_REGION });
    }
  }

  next(action);
};
