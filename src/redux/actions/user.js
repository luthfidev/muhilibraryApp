import {REACT_APP_URL} from 'react-native-dotenv';
import qs from 'querystring';
import http from '../../helpers/http';
const url = `${REACT_APP_URL}`;
// const url = 'http://192.168.1.35:5000/';

export const getusers = () => {
  return {
    type: 'USERS',
    payload: http().get(url.concat('users')),
  };
};

export const userhistory = (token, param) => {
  return {
    type: 'HISTORY_USERS',
    payload: http(token).get(url.concat(`transactions/userstatus?${param}`)),
  };
};

export const getusersid = (token, id) => {
  return {
    type: 'DETAIL_USERS',
    payload: http(token).get(url.concat(`users/${id}`)),
  };
};

export const updateusersprofile = (token, data) => {
  return {
    type: 'UPDATE_USERS_PROFILE',
    payload: http(token).patch(url.concat('users/biodata'), data),
  };
};

export const uploadavatarprofile = (token, id, data) => {
  return {
    type: 'UPLOAD_AVATAR_PROFILE',
    payload: http(token).patch(url.concat(`users/upload/${id}`), data),
  };
};
