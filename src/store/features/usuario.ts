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
  },
});

export const {setUsuariosList} = usuarioSlice.actions;

export default usuarioSlice.reducer;
