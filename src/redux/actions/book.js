import http from '../../helpers/http';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `${REACT_APP_URL}`;

export const detailbooks = (id) => {
  return {
    type: 'DETAIL_BOOKS',
    payload: http().get(url.concat(`books/detail/${id}`)),
  };
};

export const getbookslimit = () => {
  return {
    type: 'BOOKS_LIMIT',
    payload: http().get(url.concat('books?limit=3')),
  };
};

export const getbooks = (param) => {
  return {
    type: 'BOOKS',
    payload: http().get(url.concat(`books?${param}`)),
  };
};

export const postbooks = (token, data) => {
  return {
    type: 'POST_BOOKS',
    payload: http(token).post(url.concat('books'), data),
  };
};

export const updatebooks = (token, id, data) => {
  return {
    type: 'UPDATE_BOOKS',
    payload: http(token).patch(url.concat(`books/${id}`), data),
  };
};

export const deletebooks = (token, id) => {
  return {
    type: 'DELETE_BOOKS',
    payload: http(token).delete(url.concat(`books/${id}`)),
  };
};
