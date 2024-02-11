import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UsuarioState {
  usuarios: IUsuario[];
}

const initialState: UsuarioState = {
  usuarios: [],
};

const usuarioSlice = createSlice({
  name: 'usuarioSlice',
  initialState,
  reducers: {
    setUsuariosList: (state, action: PayloadAction<IUsuario[]>) => {
      state.usuarios = action.payload;
    },
    clearUsuario: (state, action: PayloadAction<void>) => {
      state.usuarios = [];
    },
  },
});

export const {setUsuariosList, clearUsuario} = usuarioSlice.actions;

export default usuarioSlice.reducer;
