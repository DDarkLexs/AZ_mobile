interface AppState {
  loading: boolean;
  disabled: boolean;
  routePath: string;
}

interface AuthState {
  usuario: IAuthUsuario | null;
  token: string | null;
  authBiometrico: boolean;
}

interface InventarioState {
  categorias: ICategoria[];
  artigos: IArtigo[];
}
