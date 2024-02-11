// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from '../../constants/Index';
import {createApi, fetchBaseQuery} from '../../modules';
import {RootState} from '../store';

// Define our single API slice object
export const usuarioApiSlice = createApi({
  reducerPath: 'usuarioApi',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: builder => ({
    getAllUsuario: builder.query<IUsuario[], void>({
      query: () => ({
        url: 'auth/usuario',
        method: 'GET',
      }),
      transformResponse: (response: IUsuario[]) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: any,
      ) => {
        if (meta?.response) {
          const msg = Array.isArray(Object(error.data.message))
            ? String(error.data.message[0])
            : String(error.data.message);
          return msg;
        }
        return error;
      },
    }),
    postNewUser: builder.mutation<any, any>({
      query: body => ({
        url: 'auth/usuario1',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: any,
      ) => {
        if (meta?.response) {
          const msg = Array.isArray(Object(error.data.message))
            ? String(error.data.message[0])
            : String(error.data.message);
          return msg;
        }
        return error;
      },
    }),
    updateUserCollection: builder.mutation<IEditUsuario, IEditUsuario>({
      query: bodyData => ({
        url: 'auth/usuario/collection',
        method: 'PUT',
        body: bodyData,
      }),
      transformResponse: (response: IEditUsuario) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: IEditUsuario,
      ) => {
        if (meta?.response) {
          const msg = Array.isArray(Object(error.data.message))
            ? String(error.data.message[0])
            : String(error.data.message);
          return msg;
        }
        return error;
      },
    }),
  }),
});

export const {useGetAllUsuarioQuery, usePostNewUserMutation, useUpdateUserCollectionMutation} = usuarioApiSlice;
