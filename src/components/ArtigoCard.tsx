import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Card,
  Icon,
  Menu,
  Paragraph,
  Surface,
  useTheme,
} from 'react-native-paper';
import Font from '../constants/Font';
import {useAppSelector} from '../hooks/redux';
import {useAppToast} from '../hooks/useToast';
import {convertToCurrency} from '../utils/functions';

interface CustomCardProps {
  item: IArtigo; // Substitua "YourItemType" pelo tipo real do seu item
  loading?: boolean;
  onViewPress: (item?: IArtigo) => void;
  onEditPress: (item: IArtigo) => void;
  onDeletePress: (item?: IArtigo) => void;
}

const CustomCardArtigo: React.FC<CustomCardProps> = ({
  item,
  onViewPress,
  onEditPress,
  onDeletePress,
  loading = false,
}) => {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const {artigos, categorias} = useAppSelector(state => state.inventario);
  const {showErrorToast} = useAppToast();

  const showMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Card
            disabled={loading}
            mode="elevated"
            onPress={showMenu}
            style={{margin: 12, borderRadius: 2}}>
            <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* Ícone à esquerda */}
              <Surface
                mode="flat"
                style={{
                  marginRight: 8,
                  padding: 5,
                  borderRadius: theme.roundness,
                }}>
                <Icon
                  source="package-variant-closed"
                  size={30}
                  color={theme.colors.primary}
                />
              </Surface>
              {/* Título do artigo */}
              <View style={{flex: 1}}>
                <Text style={{...Font.bold, fontWeight: 'bold'}}>
                  {item.nome}
                </Text>
                <Paragraph>
                  {categorias.find(
                    state => state.categoriaId === item.categoriaId,
                  )?.nome || ''}
                </Paragraph>
                <Paragraph>
                  {new Date(item.validade).toLocaleDateString('pt')}
                </Paragraph>
              </View>
              {/* Unidade e preço */}
              <View>
                <Text style={{textAlign: 'right'}}>{item.unidade} unidade</Text>
                <Text style={{fontWeight: 'bold', textAlign: 'right'}}>
                  {convertToCurrency(item.preco)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        } // Ajuste a posição conforme necessário
      >
        <Menu.Item
          leadingIcon={'eye'}
          onPress={() => {
            closeMenu();
            onViewPress();
          }}
          title="Visualizar"
        />
        <Menu.Item
          leadingIcon={'pencil'}
          onPress={() => {
            closeMenu();
            onEditPress(item);
          }}
          title="Editar"
        />
        <Menu.Item
          leadingIcon={'delete'}
          onPress={() => {
            closeMenu();
            onDeletePress();
          }}
          title="Apagar"
        />
      </Menu>
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

export default CustomCardArtigo;
