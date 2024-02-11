const {Cargo, Sexo} = Modules;

interface IAuthUsuario {
  funcionarioId: number;
  imagem: null | string; // Assuming it could be either null or a string representing the image
  nome: string;
  email: string;
  bi: string;
  sexo: Sexo; // Assuming the gender is either 'MASCULINO' or 'FEMININO'
  endereco: string;
  nascimento: string; // You might want to use a Date type if working with dates
  created: string; // You might want to use a Date type if working with dates
  updated: string; // You might want to use a Date type if working with dates
  usuarioId: number;
  contacto: string;
  entidadeId: number;
  cargo: Cargo; // Assuming the cargo is always 'ADMIN'
}

interface IGrantedUsuario {
  usuario: IAuthUsuario;
  token: string;
}

interface ToastNotificationProps {
  text1: string;
  text2: string;
  img: any;
}

interface ICategoria {
  categoriaId: number;
  nome: string;
  created: Date;
  updated: Date;
  entidadeId: number;
  usuarioId: number;
}

interface IArtigo {
  artigoId: number;
  nome: string;
  preco: string;
  unidade: number;
  descricao?: string | null;
  validade: Date | null;
  created: Date;
  updated?: Date | null;
  notaArtigoId?: number | null;
  categoriaId?: number | null;
}
interface ICreateArtigoDto
  extends Omit<IArtigo, 'artigoId' | 'notaArtigoId' | 'updated' | 'created'> {}

interface IEditArtigoDto
  extends Omit<IArtigo, 'notaArtigoId' | 'updated' | 'created'> {}

interface INotaArtigo {
  notaArtigoId: number;
  created: Date;
  updated?: Date | null;
  Artigo?: Artigo | null;
  funcionarioId?: number | null;
  entidadeId?: number | null;
}

interface IPermissao {
  upermissaoId: number;
  cargo: Cargo;
  ativo: boolean;
  created: string;
  updated: string;
  UsuarioId: number;
  funcionarioEmEntidadeId: number;
}

interface IFuncionario {
  funcionarioId: number;
  imagem: string | null; // Update the type based on your actual use case
  nome: string;
  email: string;
  bi: string;
  sexo: Sexo;
  endereco: string;
  nascimento: Date | string;
  created: string;
  updated: string;
}

interface Usuario {
  usuarioId: number;
  contacto: string;
  senha: string;
  created: string;
  updated: string;
  funcionarioId: number;
}
interface IUsuario {
  usuarioId: number;
  contacto: string;
  senha: string;
  created: string;
  updated: string;
  funcionarioId: number;
  Permissao: IPermissao;
  Funcionario: IFuncionario;
}

interface IEditUsuario {
  Usuario: Usuario;
  Permissao: IPermissao;
  Funcionario: IFuncionario;
}

interface ItemVenda {
  itemVendaId: number;
  nome: string;
  quantidade: number;
  preco: number;
  desconto: number;
  notaVendaId: number;
  artigoId: number;
  created: Date;
  updated: Date;
}


interface NotaVendaDto {
  clienteId?: number;
  entidadeId?: number;
  usuarioId?: number;
  data?: Date;
  metodoPagamento: string;
  valorPago: number;
}

interface ClienteDto {
  bi?: string;
  contacto?: string;
  nif?: string;
  nome?: string;
}

interface ItemVendaDto
  extends Omit<ItemVenda, 'itemVendaId' | 'created' | 'updated'> {}
