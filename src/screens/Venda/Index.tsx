import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Routes} from '../../constants/Enum';
import {createStackNavigator} from '../../modules';
import SaleArtigoScreen from './Artigos';
import CaixaScreen from './Caixa';

const Stack = createStackNavigator<StackScreen>();

const GestaoComercialStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name={Routes.BOX_SALE} component={CaixaScreen} />
        <Stack.Screen
          name={Routes.SALE_ARTICLES}
          component={SaleArtigoScreen}
        />
        {/* <Stack.Screen name={Routes.POST_ARTIGO} component={ArtigoFormScreen} />
        <Stack.Screen
          name={Routes.EDIT_ARTIGO}
          component={EditarArtigoFormScreen}
        /> 
         */}
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

export default GestaoComercialStack;
