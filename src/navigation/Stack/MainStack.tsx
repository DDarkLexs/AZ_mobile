import {DrawerHeaderProps} from '@react-navigation/drawer';
import React from 'react';
import Header from '../../components/header/header';
import {DrawerContent} from '../../components/navigation/DrawerContent';
import {Routes} from '../../constants/Enum';
import {createDrawerNavigator, useTheme} from '../../modules/index';
import HomeScreen from '../../screens/Home.screen';
import InventarioScreen from '../../screens/Inventario/Inventario';

const Drawer = createDrawerNavigator<StackScreen>();

const MainStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
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
          name={Routes.INVENTARIO}
          component={InventarioScreen}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default MainStack;
