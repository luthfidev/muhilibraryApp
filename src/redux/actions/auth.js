import qs from 'querystring';
import {REACT_APP_URL} from 'react-native-dotenv';
import http from '../../helpers/http';
const url = `${REACT_APP_URL}`;

export const login = (email, password) => {
  return {
    type: 'LOGIN',
    payload: http().post(url.concat('auth/'), qs.stringify({email, password})),
  };
};

export const register = (email, password) => {
  return {
    type: 'REGISTER',
    payload: http().post(
      url.concat('auth/signup'),
      qs.stringify({email, password}),
    ),
  };
};

export const logout = (token) => {
  return {
    type: 'LOGOUT',
    payload: http(token).delete(url.concat('auth/logout')),
  };
};
