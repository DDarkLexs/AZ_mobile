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
  [Routes.POST_USER]: undefined;
  // [Routes.EDIT_ARTIGO]: IEditArtigoDto;
};
