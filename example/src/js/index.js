import 'babel-polyfill';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { updateFacebookLoginStatus } from './actions';

const store = configureStore();
const { dispatch } = store;

window.fbAsyncInit = function() {
  FB.init({
    appId: process.env.FACEBOOK_APP_ID,
  });

  FB.getLoginStatus(function(response) {
    dispatch(updateFacebookLoginStatus(response));
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


render(
  createElement(Provider, { store },
    createElement(Root)),
  document.getElementById('root'));
