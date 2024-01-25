// Import the RTK Query methods from the React-specific entry point

import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {API_BASE_URL} from '../../constants/Index';
import {createApi, fetchBaseQuery} from '../../modules';
import {RootState} from '../store';

// Define our single API slice object
export const inventarioApiSlice = createApi({
  reducerPath: 'inventarioApiSlice',
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
    // artigos: builder.mutation<any, any>({
    //   query: bodyData => ({
    //     url: '/auth',
    //     method: 'POST',
    //     body: bodyData,
    //   }),
    //   transformResponse: (response: IGrantedUsuario) => response,
    //   transformErrorResponse: (
    //     error: any,
    //     meta: FetchBaseQueryMeta | undefined,
    //     arg: any,
    //   ) => {
    //     if (meta?.response) {
    //       const msg = Array.isArray(Object(error.data.message))
    //         ? String(error.data.message[0])
    //         : String(error.data.message);
    //       return msg;
    //     }
    //     return error;
    //   },
    // }),
    /* Endpoint: POST /inventario/categoria
            Descrição: Cria uma nova categoria.
            Autorização: Apenas para usuários com cargo de ADMIN.
            Parâmetros: categoria (Corpo da requisição).
            Obter Categorias*/
    postCategoria: builder.mutation<ICategoria, Pick<ICategoria, 'nome'>>({
      query: bodyData => ({
        url: '/inventario/categoria',
        method: 'POST',
        body: bodyData,
      }),
      transformResponse: (response: ICategoria) => response,
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

    // Endpoint: GET /inventario/categoria
    // Descrição: Obtém todas as categorias da entidade do usuário.
    // Autorização: Requer autenticação.
    // Obter Categoria por ID

    getCategorias: builder.query<ICategoria[], void>({
      query: () => ({
        url: '/inventario/categoria',
        method: 'GET',
        // body: bodyData,
      }),
      transformResponse: (response: ICategoria[]) => response,
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

export const {usePostCategoriaMutation, useGetCategoriasQuery} = inventarioApiSlice;

/* 
Documentação da API de Inventario
Criar Categoria




Endpoint: GET /inventario/categoria/:id
Descrição: Obtém detalhes de uma categoria pelo ID.
Autorização: Requer autenticação.
Parâmetros: id (Parâmetro de rota).
Atualizar Categoria

Endpoint: PUT /inventario/categoria/:id
Descrição: Atualiza os detalhes de uma categoria pelo ID.
Autorização: Apenas para usuários com cargo de ADMIN.
Parâmetros: id (Parâmetro de rota), categoriaAtualizado (Corpo da requisição).
Excluir Categoria

Endpoint: DELETE /inventario/categoria/:id
Descrição: Exclui uma categoria pelo ID.
Autorização: Apenas para usuários com cargo de ADMIN.
Parâmetros: id (Parâmetro de rota).
Criar Artigo

Endpoint: POST /inventario/artigo
Descrição: Cria um novo artigo.
Autorização: Apenas para usuários com cargo de ADMIN.
Parâmetros: article (Corpo da requisição).
Obter Artigos

Endpoint: GET /inventario/artigo
Descrição: Obtém todos os artigos da entidade do usuário.
Autorização: Requer autenticação.
Obter Artigo por ID

Endpoint: GET /inventario/artigo/:id
Descrição: Obtém detalhes de um artigo pelo ID.
Autorização: Requer autenticação.
Parâmetros: id (Parâmetro de rota).
Atualizar Artigo

Endpoint: PUT /inventario/artigo
Descrição: Atualiza os detalhes de um artigo.
Autorização: Apenas para usuários com cargo de ADMIN.
Parâmetros: updatedArtigo (Corpo da requisição).
Excluir Artigo

Endpoint: DELETE /inventario/artigo/:id
Descrição: Exclui um artigo pelo ID.
Autorização: Apenas para usuários com cargo de ADMIN.
Parâmetros: id (Parâmetro de rota).


*/
