import {DrawerHeaderProps} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import {DrawerContent} from '../../components/navigation/DrawerContent';
import {Routes} from '../../constants/Enum';
import {useAuth} from '../../hooks/useAuth';
import {createDrawerNavigator, useTheme} from '../../modules/index';
import InvantarioStack from '../../screens/Inventario/Index';
import UsuarioAdminStack from '../../screens/UsuarioAdmin/Index';

import {useAppDispatch} from '../../hooks/redux';
import ContabilidadeScreen from '../../screens/Contabilide/Index';
import HomeScreen from '../../screens/Home/Home.screen';
import GestaoComercialStack from '../../screens/Venda/Index';
import ConfigurationScreen from '../../screens/Configuration';

const Drawer = createDrawerNavigator<StackScreen>();

const MainStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  const {biometricAuthentication, token, logOutAccount} = useAuth();
  const dispatch = useAppDispatch();

  const handleBiometricLogin = async () => {
    const iSauthenticatedByBioMetric = await biometricAuthentication();

    if (iSauthenticatedByBioMetric) {
      // Executar a lógica de login aqui
      console.log('Usuário autenticado com sucesso!');
    } else {
      logOutAccount();
      console.log('Falha na autenticação biométrica');
    }
  };
  useEffect(() => {
    if (token) {
      handleBiometricLogin();
    }
  }, [token]);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName={Routes.HOME}>
      <Drawer.Group
        screenOptions={{
          sceneContainerStyle: {
            backgroundColor: theme.colors.background,
          },
          header(props: DrawerHeaderProps) {
            return <Header {...props} />;
          },
        }}>
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.HOME}
          component={HomeScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.SALE}
          component={GestaoComercialStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.INVENTARIO}
          component={InvantarioStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.USER_ADMIN}
          component={UsuarioAdminStack}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.ACCOUNTING}
          component={ContabilidadeScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name={Routes.CONFIGURATION}
          component={ConfigurationScreen}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default MainStack;
