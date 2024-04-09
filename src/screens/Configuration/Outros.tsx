// Importando as bibliotecas necessárias
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Menu,
  RadioButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Layout from '../../constants/Layout';
import {useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {useUpdateEntidadeConfigMutation} from '../../store/api/entidade';

// Componente da tela de Impressão
const OutrosConfigScreen: FC<any> = (): React.JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme();
  const eConfig = useAppSelector(state => state.entidade.eConfig);
  const [data, setData] = useState<IEConfigPlus | null>(eConfig);
  const [save, configApi] = useUpdateEntidadeConfigMutation();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {showErrorToast, showPrimaryToast} = useAppToast();
  const selectRegime = (taxa: ITaxa) => {
    if (data) {
      setData({...data, regimeIva: taxa.nome, taxaIva: taxa.valor});
    }
    closeMenu();
  };
  const setIvaIncluido = (ativo: boolean) => {
    if (data) {
      setData({...data, ivaAtivo: ativo});
    }
  };
  const setMoeda = (moeda: string) => {
    if (data) {
      setData({...data, moeda});
    }
  };
  useEffect(() => {
    if (configApi.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro!',
        text2: JSON.stringify(configApi.error),
      });
    }
  }, [configApi.isError]);

  useEffect(() => {
    if (configApi.isSuccess) {
      showPrimaryToast({
        text1: 'Configuração salvo',
        text2: 'A sua Configuração foi salvo com sucesso!',
      });
    }
  }, [configApi.isSuccess]);

  const handleSave = () => {
    // Código para salvar as informações da empresa
    if (data) {
      const {Taxa, EconfigId, updated, created, ...rest} = data;
      save({
        data: rest,
        eConfigId: data.EconfigId,
      });
      // console.log('Ok', rest);
      // save();
    }
  };
  return (
    <View style={styles.container}>
      <View style={Layout.screenHeader}>
        <Text disabled={configApi.isLoading} style={styles.title}>
          Outras Configuração
        </Text>
      </View>

      {/* <Text>{JSON.stringify(data)}</Text> */}
      {/* Conteúdo da tela de impressão */}
      <View style={styles.content}>
        {/* Aqui você pode adicionar os componentes e a lógica necessários para a impressão */}
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TextInput
                mode="outlined"
                label={'Regime de IVA'}
                value={data?.regimeIva}
                showSoftInputOnFocus={false}
                onPressIn={openMenu}
                disabled={configApi.isLoading}
                right={
                  <TextInput.Icon
                    loading={configApi.isLoading}
                    disabled={configApi.isLoading}
                    onPress={openMenu}
                    icon={'menu-down'}
                  />
                }
              />
            }>
            {data?.Taxa.map((value, i) => (
              <Menu.Item
                key={i}
                onPress={() => selectRegime(value)}
                title={value.nome}
              />
            ))}
          </Menu>

          <View style={styles.radioContainer}>
            <Text>IVA incluído no preço dos artigos:</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.radio}>
                <RadioButton
                  disabled={configApi.isLoading}
                  value="IVA incluído"
                  color={theme.colors.secondary}
                  status={data?.ivaAtivo ? 'checked' : 'unchecked'}
                  onPress={() => setIvaIncluido(!data?.ivaAtivo)}
                />
                <Text disabled={configApi.isLoading}>Sim</Text>
              </View>
              <View style={styles.radio}>
                <RadioButton
                  disabled={configApi.isLoading}
                  color={theme.colors.secondary}
                  value="IVA não incluído"
                  status={!data?.ivaAtivo ? 'checked' : 'unchecked'}
                  onPress={() => setIvaIncluido(!data?.ivaAtivo)}
                />
                <Text disabled={configApi.isLoading}>Não</Text>
              </View>
            </View>
          </View>

          <TextInput
            label="Moeda"
            value={data?.moeda}
            mode="outlined"
            disabled={configApi.isLoading}
            onChangeText={text => setMoeda(text)}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            loading={configApi.isLoading}
            disabled={configApi.isLoading}
            style={{borderRadius: theme.roundness}}
            mode="contained"
            onPress={handleSave}>
            Salvar
          </Button>
        </View>
      </View>
    </View>
  );
};

// Estilos para a tela
const styles = StyleSheet.create({
  container: {
    ...Layout.screenLayout,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  radioContainer: {
    marginTop: 20,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
  },
});

export default OutrosConfigScreen;
