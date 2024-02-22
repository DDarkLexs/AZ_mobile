import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {NavigationContainer, useTheme} from '../modules/index';
import {setRoutePath} from '../store/features/app';
import AuthStack from './Stack/AuthStack';
import MainStack from './Stack/MainStack';

const AppNavigator: React.FC<any> = (): React.JSX.Element => {
  const isAuthenticated = useAppSelector(state => state.auth.token);
  const theme = useTheme();
  const isDark = useColorScheme() == 'dark';
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const dispatch = useAppDispatch();
  



  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <NavigationContainer
        onStateChange={state => {
          if (state?.routes[state?.index].state) {
            const state2 = state?.routes[state?.index].state;

            const route1 = state2?.routes[Number(state2?.index)].name;
            dispatch(setRoutePath(String(route1)));
          }
        }}
        theme={navigationTheme}>
        {!isAuthenticated ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
