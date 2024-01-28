import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {Routes} from '../../constants/Enum';
import {createStackNavigator} from '../../modules';
import UsuariosScreen from './Usuarios';
import CreateUserScreen from './CriarUsuario';

const Stack = createStackNavigator<StackScreen>();

const UsuarioAdminStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name={Routes.USER_LIST} component={UsuariosScreen} />
        <Stack.Screen name={Routes.POST_USER} component={CreateUserScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  header: {
    marginBottom: 8,
  },
});

export default UsuarioAdminStack;
