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

interface IEntidadeState {
  entidade: IEntidade | null;
  eEndereco: IEEndereco | null;
  eConfig: IEConfigPlus | null
}

type CartItem = Omit<
  ItemVenda,
  'itemVendaId' | 'notaVendaId' | 'updated' | 'created'
>;

interface GestaoComercialState {
  cart: CartItem[];
}


interface IEntidadeMap {
  entidade: IEntidade;
  eEndereco: IEEndereco;
}
