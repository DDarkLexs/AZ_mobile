import React from 'react';
import { StyleSheet } from 'react-native';
import { Routes } from '../../constants/Enum';
import { createStackNavigator, useTheme } from '../../modules/index';
import LoginScreen from '../../screens/Authentication/Login';

const Stack = createStackNavigator<StackScreen>();

const AuthStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName={Routes.LOGIN}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
        {/* <Stack.Screen name={Routes.REGISTER} component={SignupScreen} /> */}
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
});

export default AuthStack;
