import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {useAppSelector} from '../hooks/redux';
import {NavigationContainer, useTheme} from '../modules/index';
import AuthStack from './Stack/AuthStack';
import MainStack from './Stack/MainStack';

const AppNavigator: React.FC<any> = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(state => state.auth.token);
  const theme = useTheme();
  const isDark = useColorScheme() == 'dark';
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <NavigationContainer theme={navigationTheme}>
        {!isAuthenticated ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
