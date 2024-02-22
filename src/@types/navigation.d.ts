const {Routes} = Modules;
declare type StackScreen = {
  [Routes.LOGIN]: undefined;
  [Routes.HOME]: undefined;
  [Routes.INVENTARIO]: undefined;
  [Routes.ARTIGO]: undefined;
  [Routes.POST_ARTIGO]: undefined;
  [Routes.EDIT_ARTIGO]: IEditArtigoDto;
  [Routes.USER_ADMIN]: undefined;
  [Routes.USER_LIST]: undefined;
  [Routes.EDIT_USER]: IEditUsuario;
  [Routes.POST_USER]: undefined; 
  [Routes.ACCOUNTING]: undefined;
  [Routes.SALE]: undefined;
  [Routes.BOX_SALE]: undefined;
  [Routes.SALE_ARTICLES]: undefined;
  [Routes.CONFIGURATION]: undefined;
  // [Routes.EDIT_ARTIGO]: IEditArtigoDto;
};
