import http from '../../helpers/http';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `${REACT_APP_URL}`;

export const gettransactionschart = (param) => {
  return {
    type: 'TRANSACTIONS_CHART',
    payload: http().get(url.concat('transactions/chart')),
  };
};

export const gettransactions = (param) => {
  return {
    type: 'TRANSACTIONS',
    payload: http().get(url.concat(`transactions?${param}`)),
  };
};

export const posttransactions = (data) => {
  return {
    type: 'POST_TRANSACTIONS',
    payload: http().post(url.concat('transactions'), data),
  };
};

export const updatetransactions = (id, data) => {
  return {
    type: 'UPDATE_TRANSACTIONS',
    payload: http().patch(url.concat(`transactions/${id}`), data),
  };
};

export const deletetransactions = (id) => {
  return {
    type: 'DELETE_TRANSACTIONS',
    payload: http().delete(url.concat(`transactions/${id}`)),
  };
};

export const borrow = (token, data) => {
  return {
    type: 'POST_BORROW',
    payload: http(token).post(url.concat('transactions/user'), data),
  };
};
