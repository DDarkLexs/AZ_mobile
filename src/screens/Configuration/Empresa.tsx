import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import Layout from '../../constants/Layout';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {useUpdateEntidadeMapMutation} from '../../store/api/entidade';
import {setEntidadeMap} from '../../store/features/entidade';

const EmpresaConfigScreen = () => {
  const theme = useTheme();
  const entidadeState = useAppSelector(state => state.entidade);
  const [entidade, setEntidade] = useState({...entidadeState.entidade});
  const [endereco, setEndereco] = useState({...entidadeState.eEndereco});
  const [save, entityState] = useUpdateEntidadeMapMutation();
  const {showErrorToast, showPrimaryToast} = useAppToast();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    // Código para salvar as informações da empresa
    if (endereco && entidade) {
      // console.log(entidade, endereco);
      save({
        eEndereco: Object(endereco),
        entidade: Object(entidade),
      });
    }
  };
  useEffect(() => {
    if (entityState.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro!',
        text2: JSON.stringify(entityState.error),
      });
    }
  }, [entityState.isError]);

  useEffect(() => {
    if (entityState.isSuccess) {
      showPrimaryToast({
        text1: 'Empresa atualizado com sucesso!',
        text2: 'dados interno atualizado!',
      });
      dispatch(setEntidadeMap(entityState.data));
    }
  }, [entityState.fulfilledTimeStamp]);

  return (
    <View style={styles.container}>
      <View style={Layout.screenHeader}>
        <Text style={styles.title}>Configuração de Empresa</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          disabled={entityState.isLoading}
          label="Nome da Empresa"
          mode="outlined"
          value={entidade.nome}
          onChangeText={text => setEntidade({...entidade, nome: text})}
        />

        <TextInput
          label="Contacto"
          disabled={entityState.isLoading}
          mode="outlined"
          value={entidade.contacto}
          onChangeText={text => setEntidade({...entidade, contacto: text})}
        />

        <TextInput
          label="Email"
          disabled={entityState.isLoading}
          mode="outlined"
          value={entidade.email}
          onChangeText={text => setEntidade({...entidade, email: text})}
        />

        <TextInput
          label="NIF"
          disabled={entityState.isLoading}
          mode="outlined"
          value={entidade.nif}
          onChangeText={text => setEntidade({...entidade, nif: text})}
        />

        <TextInput
          label="Código Postal"
          disabled={entityState.isLoading}
          mode="outlined"
          value={endereco.codigoPostal}
          onChangeText={text => setEndereco({...endereco, codigoPostal: text})}
        />

        <TextInput
          label="Localidade"
          disabled={entityState.isLoading}
          mode="outlined"
          value={endereco.localidade}
          onChangeText={text => setEndereco({...endereco, localidade: text})}
        />

        <TextInput
          label="Morada"
          disabled={entityState.isLoading}
          mode="outlined"
          value={endereco.morada}
          onChangeText={text => setEndereco({...endereco, morada: text})}
        />
        <View style={{marginTop: 10}}>
          <Button
            style={{borderRadius: theme.roundness}}
            disabled={entityState.isLoading}
            loading={entityState.isLoading}
            mode="contained"
            onPress={handleSave}>
            Salvar
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.screenLayout,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  content: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default EmpresaConfigScreen;
