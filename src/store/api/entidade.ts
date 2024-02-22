// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from '../../constants/Index';
import {createApi, fetchBaseQuery} from '../../modules';
import {RootState} from '../store';

// Define our single API slice object
export const entidadeApiSlice = createApi({
  reducerPath: 'entidadeApi',
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
    updateEntidadeMap: builder.mutation<any, IUpdateEntidadeMapForm>({
      query: bodyData => ({
        url: '/entidade',
        method: 'PUT',
        body: bodyData,
      }),
      transformResponse: (response: any) => response,
      transformErrorResponse: (
        error: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: IUpdateEntidadeMapForm,
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
    getEntidadeMap: builder.query<IEntidadeMap, void>({
      query: () => ({
        url: '/entidade/map',
        method: 'GET',
        // body: bodyData,
      }),
      transformResponse: (response: IEntidadeMap) => response,
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
    $getEntidadeMap: builder.mutation<IEntidadeMap, void>({
      query: () => ({
        url: '/entidade/map',
        method: 'GET',
        // body: bodyData,
      }),
      transformResponse: (response: IEntidadeMap) => response,
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
  }),
});

export const {
  useUpdateEntidadeMapMutation,
  useGetEntidadeMapQuery,
  use$getEntidadeMapMutation,
} = entidadeApiSlice;
