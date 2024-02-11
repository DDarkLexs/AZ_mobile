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
import ArtigoCard from '../../components/card/ArtigoCart';
import CategoryCrudDialog from '../../components/dialog/Categoria';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import Layout from '../../constants/Layout';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {
  useGetArtigosQuery,
  useGetCategoriasQuery,
} from '../../store/api/inventario';
import {setCart} from '../../store/features/gestaoComercial';
import {setArtigos, setCategorias} from '../../store/features/inventario';
import {convertToCurrency} from '../../utils/functions';

const SaleArtigoScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.SALE_ARTICLES>
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
  const {showErrorToast, showPrimaryToast} = useAppToast();
  const {routePath} = useAppSelector(state => state.app);
  const {cart} = useAppSelector(state => state.gestaoComercial);
  const [cartItem, setCartItem] = useState<CartItem[]>(cart);
  // const total = cart.reduce()
  const total: number = cart.reduce(
    (acumulador, current) =>
      acumulador + (current.preco * current.quantidade - current.desconto),
    0,
  );
  // const {showErrorToast} = useAppToast();
  const addItem = (item: CartItem): void => {
    if (item.quantidade >= 1) {
      // showPrimaryToast({
      //   text1: `${item.nome} foi inserido`,
      //   text2:`Total: ${}`
      // });
      dispatch(setCart([...cart, item]));
    } else {
      showErrorToast({
        text1: 'Valor inválido',
        text2: 'Não é permitido inserir valor menor que 1',
      });
    }
  };
  const removeItem = (item: any): void => {};

  useEffect(() => {
    if (routePath === route.name) {
      query.refetch();
    }
  }, [routePath]);
  useEffect(() => {
    if (routePath === route.name) {
      query.refetch();
    }
  }, [routePath]);
  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setArtigos(query.data));
    }
  }, [query.fulfilledTimeStamp]);

  useEffect(() => {
    if (query.isError) {
      // showErrorToast({
      //   text1: 'Ocorreu um erro durante a busca de artigo!',
      //   text2: JSON.stringify(query.error),
      // });
    }
  }, [query.fulfilledTimeStamp]);

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
        {/* <Text>{JSON.stringify(cart)}</Text> */}
        <View style={Layout.screenHeader}>
          <Text style={{...Font.extraBold}}>{'Artigos'}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            mode="outlined"
            disabled={query.isLoading}
            left={
              <TextInput.Icon
                loading={query.isLoading}
                disabled={query.isLoading}
                icon={'magnify'}
              />
            }
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
            <ArtigoCard addItem={addItem} item={item} />
            // <CustomCardArtigo
            //   onDeletePress={() => {}}
            //   onEditPress={editItem}
            //   onViewPress={() => {}}
            //   loading={query.isLoading}
            //   item={item}
            // />
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
        label={`${convertToCurrency(total)}`}
        onPress={() => setFabOpen(state => !state)}
        visible={true}
        fabStyle={{borderRadius: 50, right: 0}}
        icon={fabOpen ? 'close' : 'cart'}
        actions={[
          {
            icon: 'cash-register',
            label: 'voltar para Caixa',
            onPress: () => {
              setFabOpen(state => !state);
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
  },

  leftContainer: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: 'gray',
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default SaleArtigoScreen;
