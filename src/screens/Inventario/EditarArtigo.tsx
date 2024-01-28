// Importações necessárias
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Checkbox,
  HelperText,
  Subheading,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  useGetCategoriasQuery,
  useUpdateAtigoMutation,
} from '../../store/api/inventario';
import {setCategorias} from '../../store/features/inventario';
// import {DropdownSelect as Dropdown} from 'react-native-input-select';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Menu} from 'react-native-paper';
import {Routes} from '../../constants/Enum';
import Font from '../../constants/Font';
import {useAppToast} from '../../hooks/useToast';

// Componente
const EditarArtigoFormScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.EDIT_ARTIGO>
> = ({navigation, route}): React.JSX.Element => {
  const item = route.params;
  const [artigoData, setArtigoData] = useState<IEditArtigoDto>({...item});
  const CQuery = useGetCategoriasQuery();
  const categorias = useAppSelector(state => state.inventario.categorias);
  const dispatch = useAppDispatch();
  const [save, saveApi] = useUpdateAtigoMutation();
  //   const navigation = useAppNavigation();
  const theme = useTheme();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(
    CQuery.isLoading || saveApi.isLoading,
  );
  const [isOptional, setIsOptional] = useState<boolean>(!!artigoData.validade);
  useEffect(() => {
    if (!isOptional) {
      setArtigoData({...artigoData, validade: null});
    } else {
      setArtigoData({...artigoData, validade: artigoData.validade});
    }
  }, [isOptional]);

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
        text1: 'O artigo foi atualizado com sucesso!',
        text2: 'O seu artigo foi atualizado com êxito.',
        img: require('../../assets/image/check.png'),
      });
      //   dispatch(pushArtigo(saveApi.data));
    }
    if (saveApi.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro durante a atualização do artigo!',
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
  };

  const handleInputChange = (field: keyof IEditArtigoDto, value: any) => {
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
      setDatePicker(selectedDate)
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
        <Text style={{...Font.extraBold}}>{'Editar artigo'}</Text>
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
        onChangeText={preco => setArtigoData({...artigoData, preco})}
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
        onChangeText={unidade =>
          setArtigoData({...artigoData, unidade: Number(unidade)})
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
        disabled={loading || !isOptional}
        style={styles.input}
        showSoftInputOnFocus={false}
        editable={false}
        right={
          <TextInput.Icon
            onPress={showDatepicker}
            disabled={loading || !isOptional}
            loading={loading}
            icon={'calendar'}
          />
        }
        value={
          isOptional
            ? String(
                new Date(artigoData.validade || new Date()).toLocaleDateString(
                  'pt-br',
                  {
                    dateStyle: 'long',
                  },
                ),
              )
            : undefined
        }
      />
      <View style={{flexDirection: 'row'}}>
        <Checkbox
          status={isOptional ? 'checked' : 'unchecked'}
          onPress={() => setIsOptional(!isOptional)}
        />
        <HelperText type="info">Abilitar Data de validade</HelperText>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={datePicker}
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

export default EditarArtigoFormScreen;
