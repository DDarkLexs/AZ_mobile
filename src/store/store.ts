// import {persistReducer, persistStore} from 'redux-persist';

import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import {authApiSlice} from './api/auth';
import appSlice from './features/app';
import authSlice from './features/auth';
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  //   nav: navReducer,
  //   socket: socketReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  //   [navApi.reducerPath]: navApi.reducer,
});

const persistConfig = {
  key: '@AZ',
  storage: AsyncStorage,
  whitelist: ['auth'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }).concat(authApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
