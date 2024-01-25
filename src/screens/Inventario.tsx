import React, {useState} from 'react';
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
  useTheme,
} from 'react-native-paper';
import CategoryCrudDialog from '../components/dialog/Categoria';
import Font from '../constants/Font';

const InventarioScreen: React.FC = () => {
  const theme = useTheme();
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
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
    {
      id: '2',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '3',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '4',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '5',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '6',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '7',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '8',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '9',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    {
      id: '10',
      title: 'Título do Artigo 1',
      category: 'Categoria 1',
      expirationDate: '01/01/2025',
      unit: 'Unidade 1',
      price: '$10.99',
    },
    // Adicione mais dados conforme necessário
  ];

  return (
    <>
      <View style={{flex: 1, paddingVertical: 16}}>
        {/* Input e botão com ícone de ajuste */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 18,
          }}>
          <TextInput
            mode="outlined"
            left={<TextInput.Icon icon={'magnify'} />}
            placeholder="pesquisar"
            dense={true}
            style={{flex: 1, marginRight: 8}}
          />
          <IconButton
            icon="tune-variant"
            mode="contained-tonal"
            size={30}
            iconColor={theme.colors.primary}
            style={{
              borderRadius: theme.roundness,
              borderColor: theme.colors.background,
            }}
            onPress={() => console.log('Ajustes pressionados')}
          />
        </View>

        {/* FlatList para exibir os artigos */}
        <FlatList
          data={data}
          scrollEnabled={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card
              mode="elevated"
              onPress={() => {}}
              style={{margin: 12, borderRadius: 2}}>
              <Card.Content
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    {item.title}
                  </Text>
                  <Paragraph>{item.category}</Paragraph>
                  <Paragraph>{item.expirationDate}</Paragraph>
                </View>

                {/* Unidade e preço */}
                <View>
                  <Text style={{textAlign:'right'}}>{item.unit}</Text>
                  <Text style={{fontWeight: 'bold',textAlign:'right'}}>{item.price}</Text>
                </View>
              </Card.Content>
            </Card>
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
        style={{position: 'absolute', margin: 16, bottom: 0, left: 0,}}
        open={fabOpen}
        onPress={() => setFabOpen(state => !state)}
        visible={true}
        fabStyle={{borderRadius: 50}}
        icon={fabOpen ? 'close' : 'storefront'}
        actions={[
          //   {
          //     icon: 'archive-plus',
          //     label: 'categoria',
          //     onPress: () => console.log('Editar pressionado'),
          //   },
          {
            icon: 'shape-square-rounded-plus',
            label: 'criar artigo',
            onPress: () => console.log('Excluir pressionado'),
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

export default InventarioScreen;
