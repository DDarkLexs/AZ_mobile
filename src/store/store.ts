// import {persistReducer, persistStore} from 'redux-persist';

import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import { authApiSlice } from './api/auth';
import { inventarioApiSlice } from './api/inventario';
import appSlice from './features/app';
import authSlice from './features/auth';
import invatarioSlice from './features/inventario';
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  inventario: invatarioSlice,
  //   nav: navReducer,
  //   socket: socketReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [inventarioApiSlice.reducerPath]: inventarioApiSlice.reducer,
});

const persistConfig = {
  key: '@AZ',
  storage: AsyncStorage,
  whitelist: ['auth', 'inventario'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }).concat(authApiSlice.middleware, inventarioApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
