import {Routes} from '../../constants/Enum';

interface navDrawerItemProp {
  icon: string;
  label: string;
}

export const navDrawerItem = {
  [String(Routes.HOME)]: {icon: 'view-dashboard-outline', label: 'Painel'},
  [String(Routes.INVENTARIO)]: {
    icon: 'package-variant-closed',
    label: 'Inventário',
  },
};
