import http from '../../helpers/http';
import qs from 'querystring';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `${REACT_APP_URL}`;

export const getauthors = (param) => {
  return {
    type: 'AUTHORS',
    payload: http().get(url.concat(`authors?${param}`)),
  };
};

export const postauthors = (token, data) => {
  return {
    type: 'POST_AUTHORS',
    payload: http(token).post(url.concat('authors'), data),
  };
};

export const updateauthors = (token, id, data) => {
  return {
    type: 'UPDATE_AUTHORS',
    payload: http(token).patch(url.concat(`authors/${id}`), data),
  };
};

export const deleteauthors = (token, id) => {
  return {
    type: 'DELETE_AUTHORS',
    payload: http(token).delete(url.concat(`authors/${id}`)),
  };
};
