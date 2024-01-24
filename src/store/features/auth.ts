import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: AuthState = {
  usuario: null,
  token: null,
  authBiometrico: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.usuario = null;
      state.token = null;
      state.authBiometrico = false;
    },
    setUsuario: (state, action: PayloadAction<IGrantedUsuario>) => {
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },
    setAuthBiometric: (state, action: PayloadAction<boolean>) => {
      state.authBiometrico = action.payload;
    },
  },
});

export const {logout, setUsuario, setAuthBiometric} = authSlice.actions;

export default authSlice.reducer;
