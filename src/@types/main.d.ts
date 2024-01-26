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
  preco: number;
  unidade: number;
  descricao?: string | null;
  validade: Date;
  created: Date;
  updated?: Date | null;
  notaArtigoId?: number | null;
  categoriaId?: number | null;
}
interface ICreateArtigoDto
  extends Omit<IArtigo, 'artigoId' | 'notaArtigoId' | 'updated' | 'created'> {}

  interface IEditArtigoDto
  extends Omit<IArtigo,  'notaArtigoId' | 'updated' | 'created'> {}

interface INotaArtigo {
  notaArtigoId: number;
  created: Date;
  updated?: Date | null;
  Artigo?: Artigo | null;
  funcionarioId?: number | null;
  entidadeId?: number | null;
}
