// import {persistReducer, persistStore} from 'redux-persist';

import {
  AsyncStorage,
  combineReducers,
  configureStore,
  persistReducer,
  persistStore,
} from '../modules/index';
import {authApiSlice} from './api/auth';
import {entidadeApiSlice} from './api/entidade';
import {gestaoComercialApiSlice} from './api/gestaoComercial';
import {inventarioApiSlice} from './api/inventario';
import {usuarioApiSlice} from './api/usuario';
import appSlice from './features/app';
import authSlice from './features/auth';
import gestaoComercial from './features/gestaoComercial';
import inventaarioSlice from './features/inventario';
import usuarioSlice from './features/usuario';
import entidadeSlice from './features/entidade';
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  entidade: entidadeSlice,
  inventario: inventaarioSlice,
  usuario: usuarioSlice,
  gestaoComercial: gestaoComercial,
  //   socket: socketReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [entidadeApiSlice.reducerPath]: entidadeApiSlice.reducer,
  [inventarioApiSlice.reducerPath]: inventarioApiSlice.reducer,
  [usuarioApiSlice.reducerPath]: usuarioApiSlice.reducer,
  [gestaoComercialApiSlice.reducerPath]: gestaoComercialApiSlice.reducer,
});

const persistConfig = {
  key: '@AZ',
  storage: AsyncStorage,
  whitelist: ['auth', 'inventario', 'usuario', 'gestaoComercial', 'entidade'], // Os reducers que você quer persistir
};

const persistedReducer = persistReducer({...persistConfig}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApiSlice.middleware,
      entidadeApiSlice.middleware,
      inventarioApiSlice.middleware,
      usuarioApiSlice.middleware,
      gestaoComercialApiSlice.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
