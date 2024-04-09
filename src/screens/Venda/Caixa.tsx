/* eslint-disable react/no-unstable-nested-components */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  Button,
  Divider,
  FAB,
  HelperText,
  IconButton,
  List,
  Menu,
  Subheading,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import Layout from '../../constants/Layout';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {useCreateVendaMutation} from '../../store/api/gestaoComercial';
import {setCart} from '../../store/features/gestaoComercial';
import {convertToCurrency} from '../../utils/functions';

interface RenderItemProps {
  item: CartItem;
}

const CaixaScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.BOX_SALE>
> = ({navigation, route}): React.JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //   padding: 16,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 2,
      paddingHorizontal: 8,
    },
    middleRow: {
      flexDirection: 'row',
      marginTop: 16,
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginRight: 8,
    },
    flatList: {
      marginTop: 16,
      marginLeft: 12,
      flex: 1,
    },
    addButton: {
      marginTop: 16,
      borderRadius: theme.roundness,
    },
    priceDetails: {
      marginTop: 16,
      paddingHorizontal: 8,
    },
    priceDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    priceValue: {
      marginLeft: 'auto',
    },
    buttonRow: {
      //   flexDirection: 'column',
      marginVertical: 16,
      marginHorizontal: 10,
      //   justifyContent: 'space-between',
      borderRadius: theme.roundness,
      //   padding: 8,
    },
    cancelButton: {
      //   flex: 1,
      marginTop: 8,
      borderRadius: theme.roundness,
    },
    registerButton: {
      //   flex: 1,
      marginBottom: 8,
      borderRadius: theme.roundness,
    },
    header: {
      ...Layout.screenHeader,
      marginBottom: 20,
    },
  });

  const [numeroFatura, setNumeroFatura] = useState('');
  const [dataFatura, setDataFatura] = useState<Date | undefined>(undefined);
  const [nif, setNif] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [metodoPagamento, setMetodoPagamento] = useState<string>('');
  const [valorPago, setValorPago] = useState<number>();
  const [menu1, setMenu1] = useState<boolean>(false);
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const {cart} = useAppSelector(state => state.gestaoComercial);
  const dispatch = useAppDispatch();
  const {showErrorToast, showPrimaryToast} = useAppToast();
  const [save, vd] = useCreateVendaMutation();
  const taxa = 0;
  const iva = 0;

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.preco * item.quantidade - item.desconto;
    }, 0);
  }, [cart]);

  // Definir valores fixos para a taxa e o IVA

  // Calcular o total final

  useEffect(() => {
    if (vd.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro!',
        text2: JSON.stringify(vd.error),
      });
    }
  }, [vd.error]);

  const registrar = () => {
    // Verificar se o carrinho está vazio
    if (cart.length === 0) {
      showErrorToast({
        text1: 'Erro!',
        text2: 'Adicione pelo menos um item ao carrinho antes de registrar.',
      });
      return;
    }

    // Verificar se o método de pagamento está selecionado
    if (!metodoPagamento) {
      showErrorToast({
        text1: 'Erro!',
        text2: 'Selecione um método de pagamento antes de registrar.',
      });
      return;
    }

    // Verificar se o valor pago é menor que o total
    if (!valorPago || valorPago < total) {
      showErrorToast({
        text1: 'Erro!',
        text2: 'O valor pago deve ser maior ou igual ao total da venda.',
      });
      return;
    }

    // Se todas as validações passarem, chame a função save
    save({
      Cliente: {
        nome: nome ? nome : undefined,
        nif: nif ? nif : undefined,
      },
      Items: cart,
      NotaVenda: {
        valorPago: Number(valorPago),
        metodoPagamento,
      },
    });

    // Limpe o carrinho após o registro bem-sucedido
  };

  useEffect(() => {
    if (vd.isSuccess) {
      dispatch(setCart([]));
      setNif('');
      setNome('');
      setValorPago(0);
      // Exibir uma mensagem de sucesso
      showPrimaryToast({
        text1: 'Registro bem-sucedido!',
        text2: 'A venda foi registrada com sucesso.',
      });
    }
  }, [vd.isSuccess]);

  const total = useMemo(() => {
    return subtotal + taxa + iva;
  }, [subtotal]);

  const removeItem = (index: number): void => {
    // Crie uma cópia do array cart
    const updatedCart = [...cart];
    // Remova o item pelo índice
    updatedCart.splice(index, 1);
    // Despache a ação para atualizar o estado no Redux
    dispatch(setCart(updatedCart));
  };

  const renderItem: React.FC<RenderItemProps & {index: number}> = ({
    item,
    index,
  }) => (
    <List.Item
      disabled={vd.isLoading}
      title={item.nome}
      description={() => (
        <Text disabled={vd.isLoading} style={{fontSize: 14}}>
          {convertToCurrency(item.preco)} x {item.quantidade}
        </Text>
      )}
      left={() => <List.Icon color={theme.colors.secondary} icon="package" />}
      right={() => (
        <>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            {/* Coluna do ícone de apagar */}
            <Text
              disabled={vd.isLoading}
              style={{fontWeight: 'bold', fontSize: 14}}>
              {convertToCurrency(item.preco * item.quantidade - item.desconto)}
            </Text>
            <IconButton
              disabled={vd.isLoading}
              icon="delete"
              size={24}
              onPress={() => removeItem(index)}
            />
            {/* Coluna do rótulo */}
          </View>
        </>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{...Font.extraBold}}>{'Caixa'}</Text>
        {/* <Subheading style={{color: '#808080'}}>{''}</Subheading> */}
      </View>
      <View style={styles.topRow}>
        <View style={styles.column}>
          {/* <Title>Fatura n</Title> */}
          <TextInput
            mode="outlined"
            dense
            disabled={vd.isLoading}
            label={'Nome'}
            value={nome}
            onChangeText={text => setNome(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          {/* <Title>Data</Title> */}
          <Menu
            visible={menu1 /* Estado do Menu */}
            onDismiss={() => {} /* Implementar ação de fechar Menu */}
            anchor={
              <TextInput
                mode="outlined"
                dense
                disabled={vd.isLoading}
                label="M.Pagamento"
                value={metodoPagamento}
                showSoftInputOnFocus={false}
                onTouchStart={() => setMenu1(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                setMetodoPagamento('Cash');
                setMenu1(false);
              }}
              title="Cash"
            />
            <Menu.Item
              onPress={() => {
                setMetodoPagamento('Multicaixa');
                setMenu1(false);
              }}
              title="Multicaixa"
            />
          </Menu>
        </View>
      </View>
      <View style={styles.topRow}>
        <View style={styles.column}>
          {/* <Title>Fatura n</Title> */}
          <TextInput
            mode="outlined"
            dense
            disabled={vd.isLoading}
            label={'NIF'}
            value={nif}
            onChangeText={text => setNif(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          {/* <Title>Data</Title> */}
          <TextInput
            mode="outlined"
            dense
            showSoftInputOnFocus={false}
            label="Data"
            disabled={vd.isLoading || true}
            value={dataFatura ? dataFatura.toISOString().split('T')[0] : ''}
            onFocus={() => {} /* Implementar seleção de data */}
          />
        </View>
      </View>
      <View style={styles.topRow}>
        <View style={styles.column}>
          {/* <Title>Fatura n</Title> */}
          <TextInput
            mode="outlined"
            dense
            disabled={vd.isLoading}
            label={'Valor pago'}
            value={valorPago?.toString()}
            onChangeText={text => setValorPago(Number(text))}
            keyboardType="numeric"
          />
          <HelperText disabled={vd.isLoading} type="info">
            {valorPago ? convertToCurrency(valorPago) : 'informe o valor'}
          </HelperText>
        </View>
      </View>
      <FlatList
        data={cart}
        renderItem={({item, index}) => renderItem({item, index})}
        style={styles.flatList}
      />
      {/* <View style={{paddingHorizontal: 8}}>
        <Button mode="contained" onPress={() => {}} style={styles.addButton}>
          Adicionar Artigo
        </Button>
      </View> */}

      <View style={styles.priceDetails}>
        <Title>Detalhes do Preço</Title>
        <Divider />
        <View style={styles.priceDetailRow}>
          <Subheading>Subtotal</Subheading>
          <Subheading style={styles.priceValue}>
            {convertToCurrency(subtotal)}
          </Subheading>
        </View>
        <View style={styles.priceDetailRow}>
          <Subheading>Taxa</Subheading>
          <Subheading style={styles.priceValue}>
            {convertToCurrency(taxa)}
          </Subheading>
        </View>
        <View style={styles.priceDetailRow}>
          <Subheading>IVA</Subheading>
          <Subheading style={styles.priceValue}>
            {convertToCurrency(iva)}
          </Subheading>
        </View>
        <View style={styles.priceDetailRow}>
          <Subheading>Total</Subheading>
          <Subheading style={styles.priceValue}>
            {convertToCurrency(total)}
          </Subheading>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          disabled={vd.isLoading}
          loading={vd.isLoading}
          onPress={registrar}
          style={styles.registerButton}>
          Registrar
        </Button>
        {/* <Button mode="outlined" onPress={() => {}} style={styles.cancelButton}>
          Cancelar
        </Button> */}
      </View>
      <FAB.Group
        open={fabOpen}
        onPress={() => setFabOpen(state => !state)}
        visible={true}
        fabStyle={{borderRadius: 50, left: 0}}
        icon={fabOpen ? 'close' : 'cart'}
        actions={[
          {
            icon: 'cart-plus',
            label: 'Adicionar Artigo',
            onPress: () => {
              setFabOpen(state => !state);
              navigation.navigate(Routes.SALE_ARTICLES);
            },
          },
          {
            icon: 'file-plus',
            label: 'Novo facturação',
            onPress: () => setFabOpen(state => !state),
          },
        ]}
        onStateChange={({open}) => console.log('FAB aberto:', open)}
      />
    </View>
  );
};

export default CaixaScreen;
