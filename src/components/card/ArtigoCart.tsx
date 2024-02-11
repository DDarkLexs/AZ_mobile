// ArtigoCard.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import Font from '../../constants/Font';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { convertToCurrency } from '../../utils/functions';

interface ArtigoCardProps {
  item: IArtigo;
  addItem: (item: CartItem) => void;
}

const ArtigoCard: React.FC<ArtigoCardProps> = ({item, addItem}) => {
  const theme = useTheme();
  const {artigos, categorias} = useAppSelector(state => state.inventario);
  const [quantidade, setQtd] = useState(0);
  const {cart} = useAppSelector(state => state.gestaoComercial);
  const dispatch = useAppDispatch();
  const popItem = (): void => {
    // const i  = cart.findIndex(state => state.artigoId === item.artigoId);
    // if(cart[i].quantidade > 0){
    //   dispatch(removeItem(item));
    // }
  };
  const pushItem = (): void => {
    // dispatch(addItem(item));
  };

  return (
    <Surface style={styles.cardContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.leftContainer}>
          <Text style={styles.label}>{item.nome}</Text>
          <Text style={styles.priceLabel}>
            {convertToCurrency(Number(item.preco))}
          </Text>
          <Text style={styles.category}>
            {categorias.find(state => state.categoriaId === item.categoriaId)
              ?.nome || ''}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon="plus"
              style={{borderRadius: theme.roundness}}
              containerColor={theme.colors.primaryContainer}
              iconColor={theme.colors.onPrimaryContainer}
              size={15}
              onPress={() => setQtd(quantidade + 1)}
            />
            <Text style={{...Font.bold, marginHorizontal: 5, top: 7.5}}>
              {quantidade.toString()}
            </Text>
            <IconButton
              icon="minus"
              style={{borderRadius: theme.roundness}}
              containerColor={theme.colors.errorContainer}
              size={15}
              iconColor={theme.colors.onErrorContainer}
              onPress={() => {
                if (quantidade >= 1) {
                  setQtd(quantidade - 1);
                }
              }}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Button
          style={{
            borderRadius: theme.roundness,
          }}
          onPress={() =>
            addItem({
              artigoId: item.artigoId,
              desconto: 0,
              nome: item.nome,
              quantidade: quantidade,
              preco: Number(item.preco),
            })
          }
          mode="contained">
          adicionar
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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

export default ArtigoCard;
