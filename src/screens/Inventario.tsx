import React from 'react';
import {FlatList, View} from 'react-native';
import {
  Card,
  FAB,
  Icon,
  IconButton,
  Paragraph,
  Surface,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import Font from '../constants/Font';

const InventarioScreen: React.FC = () => {
  const theme = useTheme();
  // Dados de exemplo para a FlatList
  const data = [
    {
      id: '1',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    // Adicione mais dados conforme necessário
  ];

  return (
    <View style={{flex: 1, padding: 16}}>
      {/* Input e botão com ícone de ajuste */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          mode="outlined"
          placeholder="Pesquisar"
          style={{flex: 1, marginRight: 8}}
        />
        <IconButton
          icon="tune-variant"
          mode="contained"
          size={30}
          style={{borderRadius: theme.roundness}}
          onPress={() => console.log('Ajustes pressionados')}
        />
      </View>

      {/* FlatList para exibir os artigos */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={{marginVertical: 8, borderRadius: 2}}>
            <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* Ícone à esquerda */}
              <Surface
                elevation={5}
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
                <Text style={{...Font.bold,fontWeight:'bold'}}>{item.title}</Text>
                <Paragraph>{item.category}</Paragraph>
                <Paragraph>Validade: {item.expirationDate}</Paragraph>
              </View>

              {/* Unidade e preço */}
              <View>
                <Paragraph>{item.unit}</Paragraph>
                <Text style={{fontWeight: 'bold'}}>{item.price}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      {/* FAB com ícone de store font plus */}
      <FAB
        style={{position: 'absolute', margin: 16, bottom: 0, left: 0}}
        icon="storefront"
        onPress={() => console.log('FAB pressionado')}
      />
    </View>
  );
};

export default InventarioScreen;
