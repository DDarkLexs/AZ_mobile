import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  FAB,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import UserCard from '../../components/card/UsuarioCard';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import Layout from '../../constants/Layout';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {useGetAllUsuarioQuery} from '../../store/api/usuario';
import {setUsuariosList} from '../../store/features/usuario';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

const UsuariosScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.USER_LIST>
> = ({navigation, route}): React.JSX.Element => {
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const theme = useTheme();
  const {routePath} = useAppSelector(state => state.app);
  const usuarios = useAppSelector(state => state.usuario.usuarios);
  const dispatch = useAppDispatch();
  const query = useGetAllUsuarioQuery();
  const {showPrimaryToast, showErrorToast} = useAppToast();
  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setUsuariosList(query.data));
    }
  }, [query.fulfilledTimeStamp]);

  useEffect(() => {
    if (routePath === route.name) {
      query.refetch();
    }
  }, [routePath]);
  useEffect(() => {
    if (query.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro!',
        text2: JSON.stringify(query.error),
      });
    }
  }, [query.fulfilledTimeStamp]);

  const [visibleMenu1, setVisibleMenu1] = useState(false);

  return (
    <View style={Layout.screenLayout}>
      <View style={Layout.screenHeader}>
        <Text style={{...Font.extraBold}}>{'Controle de usuário'}</Text>
      </View>
      {/* Input e botão com ícone de ajuste */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          disabled={query.isLoading}
          placeholder="Pesquisar Usuário"
          left={
            <TextInput.Icon
              loading={query.isLoading}
              disabled={query.isLoading}
              icon={'magnify'}
            />
          }
          style={{flex: 1, marginRight: 8}}
          mode="outlined"
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Ícone de menu para a primeira opção */}
          <Menu
            visible={visibleMenu1}
            onDismiss={() => setVisibleMenu1(false)}
            anchor={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* Ícone de menu para a primeira opção */}
                <IconButton
                  icon="tune-variant"
                  mode="contained-tonal"
                  disabled={query.isLoading}
                  size={30}
                  iconColor={theme.colors.primary}
                  style={{
                    borderRadius: theme.roundness,
                    borderColor: theme.colors.background,
                  }}
                  onPress={() => setVisibleMenu1(true)}
                />
              </View>
            }>
            {/* <Menu.Item
              title={'Opção 1'}
              onPress={() => console.log('Opção 1 pressionada')}
            /> */}

            <Menu.Item
              title={'Atulizar'}
              leadingIcon={'sync'}
              onPress={() => {
                query.refetch();
                setVisibleMenu1(false);
              }}
            />
          </Menu>
        </View>
      </View>

      {/* FlatList para exibir os usuários */}
      <FlatList
        data={usuarios}
        scrollEnabled={true}
        keyExtractor={(user, i) => user.usuarioId.toString()}
        renderItem={({item}) => <UserCard user={item} />}
      />
      {/* FAB com ícone de adicionar usuário */}
      <FAB.Group
        open={fabOpen}
        onPress={() => setFabOpen(state => !state)}
        visible={true}
        fabStyle={{borderRadius: 50, left: 0}}
        icon={fabOpen ? 'close' : 'account-details'}
        actions={[
          {
            icon: 'account-plus',
            label: 'criar usuário',
            onPress: () => {
              setFabOpen(state => !state);
              navigation.navigate(Routes.POST_USER);
            },
          },
          //   {
          //     icon: 'view-list',
          //     label: 'categorias',
          //     onPress: () => {
          //       setFabOpen(state => !state);
          //     },
          //   },
        ]}
        onStateChange={({open}) => console.log('FAB aberto:', open)}
      />
    </View>
  );
};

export default UsuariosScreen;
