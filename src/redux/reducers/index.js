import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import auth from './auth';
import books from './book';
import authors from './author';
import genres from './genre';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  debug: false,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth,
  books,
  authors,
  genres,
});

// export default(rootReducer)

export default persistReducer(persistConfig, rootReducer);
