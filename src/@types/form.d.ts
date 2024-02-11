interface IAuthForm {
  senha: string;
  contacto: string;
}

interface IResponseError {
  message: string[] | string;
  error: string;
  statusCode: number;
}


interface ICreateVendaForm {
  Cliente: ClienteDto;
  NotaVenda: NotaVendaDto;
  Items: CartItem[];
}
