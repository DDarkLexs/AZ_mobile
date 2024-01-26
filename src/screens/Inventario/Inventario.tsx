import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  FAB,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import CustomCardArtigo from '../../components/ArtigoCard';
import CategoryCrudDialog from '../../components/dialog/Categoria';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import Layout from '../../constants/Layout';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {createStackNavigator} from '../../modules';
import {
  useGetArtigosQuery,
  useGetCategoriasQuery,
} from '../../store/api/inventario';
import {setArtigos, setCategorias} from '../../store/features/inventario';
import ArtigoFormScreen from './CriarArtigo';
import EditarArtigoFormScreen from './EditarArtigo';

const Stack = createStackNavigator<StackScreen>();

const InvantarioStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Stack.Navigator 
    initialRouteName={Routes.ARTIGO}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name={Routes.ARTIGO} component={ArtigoScreen} />
        <Stack.Screen name={Routes.POST_ARTIGO} component={ArtigoFormScreen} />
        <Stack.Screen
          name={Routes.EDIT_ARTIGO}
          component={EditarArtigoFormScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ArtigoScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.ARTIGO>
> = ({navigation, route}): React.JSX.Element => {
  const theme = useTheme();
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [visibleMenu1, setVisibleMenu1] = useState(false);
  const [visibleMenu2, setVisibleMenu2] = useState(false);
  const dispatch = useAppDispatch();
  const {artigos, categorias} = useAppSelector(state => state.inventario);
  const query = useGetArtigosQuery();
  const Cquery = useGetCategoriasQuery();
  const {showErrorToast} = useAppToast();
  const {inventarioPath} = useAppSelector(state => state.app);
  useEffect(() => {
    if (!!inventarioPath) {
      query.refetch();
    }
  }, [inventarioPath]);
  useEffect(() => {
    if (query.data) {
      dispatch(setArtigos(query.data));
    }
  }, [query.data]);

  useEffect(() => {
    if (query.isError) {
      // showErrorToast({
      //   text1: 'Ocorreu um erro durante a busca de artigo!',
      //   text2: JSON.stringify(query.error),
      // });
    }
  }, [query.isError]);

  const editItem = (item: IArtigo) => {
    navigation.navigate(Routes.EDIT_ARTIGO, {
      ...item,
    });
  };

  useEffect(() => {
    if (Cquery.isSuccess) {
      dispatch(setCategorias(Cquery.data));
    }
  }, [Cquery.data]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // Dados de exemplo para a FlatList

  return (
    <>
      <View style={Layout.screenLayout}>
        {/* Input e botão com ícone de ajuste */}
        <View style={Layout.screenHeader}>
          <Text style={{...Font.extraBold}}>{'Inventário'}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 18,
          }}>
          <TextInput
            mode="outlined"
            disabled={query.isLoading}
            left={<TextInput.Icon icon={'magnify'} />}
            placeholder="pesquisar"
            dense={true}
            style={{flex: 1, marginRight: 8}}
          />
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
        {/* FlatList para exibir os artigos */}
        <FlatList
          data={artigos}
          scrollEnabled={true}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <CustomCardArtigo
              onDeletePress={() => {}}
              onEditPress={editItem}
              onViewPress={() => {}}
              loading={query.isLoading}
              item={item}
            />
          )}
        />
      </View>
      {/* Dialogs  */}
      <CategoryCrudDialog
        openDialog={isDialogOpen}
        onCloseDialog={handleCloseDialog}
      />
      {/* FAB com ícone de store font plus */}
      <FAB.Group
        open={fabOpen}
        onPress={() => setFabOpen(state => !state)}
        visible={true}
        fabStyle={{borderRadius: 50}}
        icon={fabOpen ? 'close' : 'storefront'}
        actions={[
          {
            icon: 'shape-square-rounded-plus',
            label: 'criar artigo',
            onPress: () => {
              setFabOpen(state => !state);
              navigation.navigate(Routes.POST_ARTIGO);
            },
          },
          {
            icon: 'view-list',
            label: 'categorias',
            onPress: handleOpenDialog,
          },
        ]}
        onStateChange={({open}) => console.log('FAB aberto:', open)}
      />
    </>
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

export default InvantarioStack;
