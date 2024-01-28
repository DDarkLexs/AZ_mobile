import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Subheading, Text, useTheme} from 'react-native-paper';
import {Routes} from '../constants/Enum';
import Font from '../constants/Font';
import Layout from '../constants/Layout';
import {useAuth} from '../hooks/useAuth';
interface OperationProp {
  icon: string;
  label: string;
  onPress?: () => void;
}
const HomeScreen: React.FC<DrawerScreenProps<StackScreen, Routes.HOME>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const {usuario} = useAuth();
  function saudacaoPorPeriodoDoDia(data: Date): string {
    const hora = data.getHours();

    if (hora >= 6 && hora < 12) {
      return 'Bom dia!';
    } else if (hora >= 12 && hora < 18) {
      return 'Boa tarde!';
    } else {
      return 'Boa noite!';
    }
  }

  const data = {
    titulo: new Date(),
    nome: usuario?.nome,
    operacao: 'Operação',
    coluna1: {
      icon: 'box',
      label1: 'Venda',
    },
    coluna2: {
      icon: 'box',
      label2: 'Cliente',
    },
  };

  const operation1: OperationProp[] = [
    {
      icon: 'box',
      label: 'venda',
    },
    {
      icon: 'box',
      label: 'Abertura',
    },
  ];
  const operation2: OperationProp[] = [
    {
      icon: 'box',
      label: 'venda',
    },
    {
      icon: 'box',
      label: 'Abertura',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    header: {
      marginBottom: 50,
    },
    operacao: {
      marginBottom: 16,
      ...Font.extraBold,
    },
    colunasContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    coluna: {
      flex: 1,
      borderWidth: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: '#ccc',
      backgroundColor: '#808080',
      borderRadius: theme.roundness,
      padding: 8,
      marginBottom: 8,
      marginHorizontal: 10,
    },
    colunaHeader: {},
    colunaContent: {},
  });
  

  return (
    <View style={Layout.screenLayout}>
      <View style={Layout.screenHeader}>
        <Text style={{...Font.extraBold}}>
          {saudacaoPorPeriodoDoDia(data.titulo)}
        </Text>
        <Subheading style={{color: '#808080'}}>{data.nome}</Subheading>
      </View>

      <View style={styles.operacao}>
        <Text style={{...Font.extraBold, fontSize: 19}}>{data.operacao}</Text>
      </View>
      <View style={styles.colunasContainer}>
        {operation1.map(({icon, label}, i) => (
          <View
            key={i}
            style={{
              ...styles.coluna,
              backgroundColor: theme.colors.inverseOnSurface,
            }}>
            <View style={styles.colunaHeader}>
              <Icon size={30} source={icon} />
              <Text>{label}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.colunasContainer}>
        {operation2.map(({icon, label}, i) => (
          <View
            key={i}
            style={{
              ...styles.coluna,
              backgroundColor: theme.colors.inverseOnSurface,
            }}>
            <View style={styles.colunaHeader}>
              <Icon size={30} source={icon} />
              <Text>{label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};


export default HomeScreen;
