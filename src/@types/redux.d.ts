interface AppState {
  loading: boolean;
  disabled: boolean;
  inventarioPath: string
}

interface AuthState {
  usuario: IAuthUsuario | null;
  token: string | null;
  authBiometrico: boolean;
}
