import { Routes } from '../../constants/Enum';

interface NavDrawerItemProp {
  icon: string;
  label: string;
  adminRequired: boolean;
}

type TNavDrawerItem = {
  [key in Routes | string]: NavDrawerItemProp;
};


export const navDrawerItem: TNavDrawerItem = {
  [String(Routes.HOME)]: {
    icon: 'view-dashboard-outline',
    label: 'Painel de controle',
    adminRequired: false,
  },
  [String(Routes.INVENTARIO)]: {
    icon: 'package-variant-closed',
    label: 'Inventário',
    adminRequired: true,
  },
  [String(Routes.USER_ADMIN)]: {
    icon: 'account-group',
    label: 'Controle de Usuário',
    adminRequired: true,
  },
};

