interface AppState {
  loading: boolean;
  disabled: boolean;
}

interface AuthState {
  usuario: IAuthUsuario | null;
  token: string | null;
  authBiometrico: boolean;
}
