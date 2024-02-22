// Importando as bibliotecas necessárias
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import Layout from '../../constants/Layout';
import EmpresaConfigScreen from './Empresa';
import ImpressaoScreen from './Impressao';
import OutrosConfigScreen from './Outros';

// Componente da tela de Configuração
const ConfigurationScreen: React.FC = () => {
  // Função para lidar com ações de botões, por exemplo
  const handleButtonClick = () => {
    // Lógica aqui
  };

  // Estado para controlar a rota atual do BottomNavigation
  const [index, setIndex] = useState(0);

  // Rotas do BottomNavigation
  const routes = [
    // {
    //   key: 'userConfig',
    //   title: 'Usuário',
    //   focusedIcon: 'account-edit',
    //   unfocusedIcon: 'account-edit-outline',
    // },
    {
      key: 'companyConfig',
      title: 'Empresa',
      focusedIcon: 'briefcase-edit',
      unfocusedIcon: 'briefcase-edit-outline',
    },
    {
      key: 'print',
      title: 'Impressão',
      focusedIcon: 'printer',
      unfocusedIcon: 'printer-outline',
    },
    {
      key: 'others',
      title: 'Outros',
      focusedIcon: 'information',
      unfocusedIcon: 'information-outline',
    },
  ];

  // Função para renderizar a cena de cada rota
  const renderScene = BottomNavigation.SceneMap({
    // userConfig: UserConfigRoute,
    companyConfig: EmpresaConfigScreen,
    print: ImpressaoScreen,
    others: OutrosConfigScreen,
  });

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
};

// Componentes das cenas de cada rota
const UserConfigRoute = () => (
  <Text style={styles.scene}>Esta é a cena de Configuração de Usuário</Text>
);

const CompanyConfigRoute = () => (
  <Text style={styles.scene}>Esta é a cena de Configuração de Empresa</Text>
);

const PrintRoute = () => (
  <Text style={styles.scene}>Esta é a cena de Impressão</Text>
);

// Estilos para a tela
const styles = StyleSheet.create({
  container: {
    ...Layout.screenLayout,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConfigurationScreen;
