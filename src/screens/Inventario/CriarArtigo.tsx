// Importações necessárias
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Checkbox,
  Subheading,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  useGetCategoriasQuery,
  usePostArtigoMutation,
} from '../../store/api/inventario';
import {pushArtigo, setCategorias} from '../../store/features/inventario';
// import {DropdownSelect as Dropdown} from 'react-native-input-select';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Menu} from 'react-native-paper';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import {useAppToast} from '../../hooks/useToast';

interface ArtigoFormProp
  extends Omit<
    Required<IArtigo>,
    'artigoId' | 'notaArtigoId' | 'created' | 'updated'
  > {}
// Componente
const ArtigoFormScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.POST_ARTIGO>
> = ({navigation, route}): React.JSX.Element => {
  const [artigoData, setArtigoData] = useState<ArtigoFormProp>({
    categoriaId: 0,
    descricao: '',
    nome: '',
    preco: 0,
    unidade: 1,
    validade: new Date(),
  });
  const CQuery = useGetCategoriasQuery();
  const categorias = useAppSelector(state => state.inventario.categorias);
  const dispatch = useAppDispatch();
  const [save, saveApi] = usePostArtigoMutation();
  //   const navigation = useAppNavigation();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(
    CQuery.isLoading || saveApi.isLoading,
  );

  useEffect(() => {
    setLoading(CQuery.isLoading || saveApi.isLoading);
  }, [CQuery.isLoading, saveApi.isLoading]);

  const openMenu = () => setVisible(true);
  const {showPrimaryToast, showErrorToast} = useAppToast();

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (CQuery.isSuccess) {
      dispatch(setCategorias(CQuery.data));
    }
  }, [CQuery]);
  useEffect(() => {
    if (saveApi.isSuccess) {
      showPrimaryToast({
        text1: 'O artigo foi registrado com sucesso!',
        text2: 'O seu artigo foi registrado com êxito.',
        img: require('../../assets/image/check.png'),
      });
      dispatch(pushArtigo(saveApi.data));
    }
    if (saveApi.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro durante o registro do artigo!',
        text2: JSON.stringify(saveApi.error),
      });
    }
  }, [saveApi]);

  useEffect(() => {
    if (saveApi.isSuccess) {
      handleGoBack();
    }
  }, [saveApi.isSuccess]);
  const handleSave = () => {
    // Implemente a lógica de salvar aqui
    save(artigoData);
    console.log('Artigo salvo:', artigoData);
  };

  const handleInputChange = (field: keyof ArtigoFormProp, value: any) => {
    setArtigoData({...artigoData, [field]: value});
  };

  const handleBack = () => {
    // Implemente a lógica de voltar aqui
    console.log('Voltar');
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    hideDatePicker();
    if (selectedDate) {
      handleInputChange('validade', selectedDate);
    }
  };

  const handleGoBack = () => {
    // Lógica para voltar
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={{...Font.extraBold}}>{'Criar artigo'}</Text>
        <Subheading style={{color: '#808080'}}>
          {'Informe os dados do artigo!'}
        </Subheading>
      </View>

      <TextInput
        label="Nome"
        mode="outlined"
        style={styles.input}
        value={artigoData.nome}
        disabled={loading}
        onChangeText={text => setArtigoData({...artigoData, nome: text})}
      />
      <TextInput
        label="Preço"
        mode="outlined"
        keyboardType="number-pad"
        style={styles.input}
        disabled={loading}
        value={artigoData.preco.toString()}
        onChangeText={text =>
          setArtigoData({...artigoData, preco: parseFloat(text) || 0})
        }
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label="Selecione Categoria"
            mode="outlined"
            disabled={loading}
            showSoftInputOnFocus={false}
            style={styles.input}
            onFocus={openMenu}
            onPressIn={openMenu}
            value={
              categorias.find(c => c.categoriaId === artigoData.categoriaId)
                ?.nome || ''
            }
          />
        }>
        {categorias.map(categoria => (
          <Menu.Item
            disabled={loading}
            key={categoria.categoriaId}
            onPress={() => {
              setArtigoData({
                ...artigoData,
                categoriaId: categoria.categoriaId,
              });
              closeMenu();
            }}
            title={categoria.nome}
          />
        ))}
      </Menu>

      <TextInput
        label="Unidade"
        disabled={loading}
        mode="outlined"
        style={styles.input}
        keyboardType="number-pad"
        value={artigoData.unidade.toString()}
        onChangeText={text =>
          setArtigoData({...artigoData, unidade: parseInt(text) || 0})
        }
      />
      <TextInput
        label="Descrição"
        mode="outlined"
        disabled={loading}
        style={styles.input}
        value={String(artigoData.descricao)}
        onChangeText={text => setArtigoData({...artigoData, descricao: text})}
      />
      <TextInput
        label="Validade"
        mode="outlined"
        disabled={loading}
        style={styles.input}
        showSoftInputOnFocus={false}
        // right={}
        onPressIn={showDatepicker}
        value={String(
          artigoData.validade.toLocaleDateString('pt-br', {dateStyle: 'long'}),
        )}
      />
      {showDatePicker && (
        <DateTimePicker
          value={artigoData.validade}
          mode="date"
          disabled={loading}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button
        mode="contained"
        disabled={loading}
        loading={loading}
        onPress={handleSave}
        style={[styles.button, {borderRadius: theme.roundness}]}>
        Salvar
      </Button>
      <Button
        disabled={loading}
        loading={loading}
        style={[styles.button, {borderRadius: theme.roundness}]}
        mode="outlined"
        onPress={handleGoBack}>
        Voltar
      </Button>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
  },
  input: {
    marginVertical: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ArtigoFormScreen;
