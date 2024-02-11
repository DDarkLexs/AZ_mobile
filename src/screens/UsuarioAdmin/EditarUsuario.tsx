// Importando bibliotecas necessárias
import DateTimePicker from '@react-native-community/datetimepicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  HelperText,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Cargo, Routes, Sexo} from '../../constants/Enum';
import Font from '../../constants/Font';
import Layout from '../../constants/Layout';
import {useAppToast} from '../../hooks/useToast';
import {useUpdateUserCollectionMutation} from '../../store/api/usuario';

const EditUserScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.EDIT_USER>
> = ({navigation, route}): React.JSX.Element => {
  const userData = route.params;
  const [newUser, setNewUser] = useState<IEditUsuario>({
    Usuario: {...userData.Usuario},
    Permissao: {...userData.Permissao},
    Funcionario: {...userData.Funcionario},
  });

  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState(new Date());
  const [visibleMenu1, setVisibleMenu1] = useState<boolean>(false);
  const [visibleMenu2, setVisibleMenu2] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const {showPrimaryToast, showErrorToast} = useAppToast();

  const [save, api] = useUpdateUserCollectionMutation();

  const handleInputDateChange = (event: any, value: any) => {
    setShowDatePicker(false);
    setNewUser({
      ...newUser,
      Funcionario: {
        ...newUser.Funcionario,
        nascimento: value,
      },
    });
  };
  const setSexo = (sexo: Sexo) => {
    setNewUser({
      ...newUser,
      Funcionario: {
        ...newUser.Funcionario,
        sexo,
      },
    });
    setVisibleMenu1(false);
  };
  const setRole = (cargo: Cargo) => {
    setNewUser({
      ...newUser,
      Permissao: {
        ...newUser.Permissao,
        cargo,
      },
    });
    setVisibleMenu2(false);
  };

  const handleCreateUser = () => {
    // Implemente aqui a lógica para criar um novo usuário
    // Pode ser uma chamada a uma API, por exemplo

    save(newUser);
  };
  useEffect(() => {
    if (api.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro!',
        text2: JSON.stringify(api.error),
      });
    }
  }, [api.isError]);
  useEffect(() => {
    if (api.isSuccess) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      showPrimaryToast({
        text1: 'usuário Alerado com sucesso!',
        text2: 'Verifica na lista de usuário.',
      });
    }
  }, [api.isSuccess]);

  return (
    <ScrollView style={Layout.screenLayout}>
      <View style={Layout.screenHeader}>
        <Text disabled={api.isLoading} style={{...Font.extraBold}}>
          {'Alterar usuário'}
        </Text>
      </View>

      <View style={{padding: 10}}>
        <View style={Layout.subheader}>
          <Text disabled={api.isLoading} style={{...Font.extraBold}}>
            {'Dados pessoais'}
          </Text>
        </View>
        <TextInput
          disabled={api.isLoading}
          label="Nome"
          value={newUser.Funcionario.nome}
          mode="outlined"
          onChangeText={text =>
            setNewUser({
              ...newUser,
              Funcionario: {...newUser.Funcionario, nome: text},
            })
          }
        />

        <Menu
          visible={visibleMenu1}
          onDismiss={() => setVisibleMenu1(false)}
          anchor={
            <TextInput
              label="Sexo"
              disabled={api.isLoading}
              mode="outlined"
              value={newUser.Funcionario.sexo}
              showSoftInputOnFocus={false}
              editable={false}
              right={
                <TextInput.Icon
                  disabled={api.isLoading}
                  loading={api.isLoading}
                  onPress={() => setVisibleMenu1(true)}
                  icon={'menu-down'}
                />
              }
            />
          }>
          <Menu.Item
            title={Sexo.MASCULINO.toLowerCase()}
            onPress={() => setSexo(Sexo.MASCULINO)}
          />
          <Menu.Item
            title={Sexo.FEMININO.toLowerCase()}
            onPress={() => setSexo(Sexo.FEMININO)}
          />

          {/* <Menu.Item
            title={'Atulizar'}
            leadingIcon={'sync'}
            onPress={() => {
              setVisibleMenu1(false);
            }}
          /> */}
        </Menu>

        <TextInput
          label="Email"
          mode="outlined"
          disabled={api.isLoading}
          value={newUser.Funcionario.email}
          onChangeText={text =>
            setNewUser({
              ...newUser,
              Funcionario: {...newUser.Funcionario, email: text},
            })
          }
        />

        <TextInput
          label="Endereço"
          mode="outlined"
          disabled={api.isLoading}
          value={newUser.Funcionario.endereco}
          onChangeText={text =>
            setNewUser({
              ...newUser,
              Funcionario: {...newUser.Funcionario, endereco: text},
            })
          }
        />
        <TextInput
          label="N° Bi"
          mode="outlined"
          value={newUser.Funcionario.bi}
          disabled={api.isLoading}
          onChangeText={text =>
            setNewUser({
              ...newUser,
              Funcionario: {...newUser.Funcionario, bi: text},
            })
          }
        />

        <TextInput
          label="Data de Nascimento"
          mode="outlined"
          disabled={api.isLoading}
          showSoftInputOnFocus={false}
          editable={false}
          right={
            <TextInput.Icon
              disabled={api.isLoading}
              loading={api.isLoading}
              onPress={() => setShowDatePicker(state => !state)}
              icon={'calendar'}
            />
          }
          onChangeText={text =>
            setNewUser({
              ...newUser,
              Funcionario: {...newUser.Funcionario, nascimento: new Date(text)},
            })
          }
          value={String(
            new Date(newUser.Funcionario.nascimento).toLocaleDateString(
              'pt-br',
              {
                dateStyle: 'long',
              },
            ),
          )}
        />
        {showDatePicker && (
          <DateTimePicker
            value={datePicker}
            mode="date"
            // disabled={loading}
            display="default"
            onChange={handleInputDateChange}
          />
        )}

        <View style={Layout.subheader}>
          <Text disabled={api.isLoading} style={{...Font.extraBold}}>
            {'Dados de authenticação'}
          </Text>
        </View>
        <Menu
          visible={visibleMenu2}
          onDismiss={() => setVisibleMenu2(false)}
          anchor={
            <>
              <TextInput
                label="Permissão"
                mode="outlined"
                disabled={api.isLoading}
                showSoftInputOnFocus={false}
                editable={false}
                right={
                  <TextInput.Icon
                    onTouchStart={() => {
                      setVisibleMenu2(true);
                    }}
                    icon={'menu-down'}
                  />
                }
                value={newUser.Permissao.cargo}
              />
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  disabled={api.isLoading}
                  status={newUser.Permissao.ativo ? 'checked' : 'unchecked'}
                  onPress={e =>
                    setNewUser({
                      ...newUser,
                      Permissao: {
                        ...newUser.Permissao,
                        ativo: !newUser.Permissao.ativo,
                      },
                    })
                  }
                />
                <HelperText type="info">Usuario Ativo</HelperText>
              </View>
            </>
          }>
          <Menu.Item
            title={'adminstrador'}
            onPress={() => setRole(Cargo.ADMIN)}
          />
          <Menu.Item title={'usuário'} onPress={() => setRole(Cargo.USER)} />

          {/* <Menu.Item
            title={'Atulizar'}
            leadingIcon={'sync'}
            onPress={() => {
              setVisibleMenu1(false);
            }}
          /> */}
        </Menu>

        <TextInput
          label="Contacto"
          mode="outlined"
          keyboardType="decimal-pad"
          disabled={api.isLoading}
          value={newUser.Usuario.contacto}
          onChangeText={contacto =>
            setNewUser({...newUser, Usuario: {...newUser.Usuario, contacto}})
          }
        />

        <TextInput
          label="Senha"
          mode="outlined"
          disabled={api.isLoading || true}
          value={newUser.Usuario.senha}
          right={
            <TextInput.Icon
              onPress={() => setPasswordVisible(state => !state)}
              icon={passwordVisible ? 'eye' : 'eye-off'}
            />
          }
          secureTextEntry={passwordVisible}
          onChangeText={senha =>
            setNewUser({...newUser, Usuario: {...newUser.Usuario, senha}})
          }
        />

        {/* Botão para criar um novo usuário */}
        <Button
          disabled={api.isLoading}
          loading={api.isLoading}
          mode="contained"
          onPress={handleCreateUser}
          style={{marginTop: 16, borderRadius: theme.roundness}}>
          alterar
        </Button>
      </View>

      {/* Snackbar para mostrar mensagem de confirmação */}
    </ScrollView>
  );
};

export default EditUserScreen;
