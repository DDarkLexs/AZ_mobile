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

interface IUpdateEntidadeMapForm {
  entidade: Omit<Required<IEntidade>, 'updated' | 'entidadeId' | 'created'>;
  eEndereco: Omit<Required<IEEndereco>, 'updated' | 'eEnderecoId' | 'created'>;
}

interface IEConfigDto {
  moeda: string; // Código da moeda (ex: "BRL", "AKZ")
  ivaAtivo: boolean; // Indica se o IVA está ativo
  regimeIva: string; // Regime de IVA (ex: "Simples Nacional", "Regime geral")
  taxaIva: number; // Taxa de IVA (ex: 0.2, 0.14)
}
