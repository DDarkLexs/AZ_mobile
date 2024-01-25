import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  DataTable,
  Dialog,
  HelperText,
  IconButton,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAppToast} from '../../hooks/useToast';
import {
  useGetCategoriasQuery,
  usePostCategoriaMutation,
} from '../../store/api/inventario';
import {setCategorias} from '../../store/features/inventario';

interface CategoryTableProps {
  openDialog: boolean;
  onCloseDialog: () => void;
}

const CategoryCrudDialog: React.FC<CategoryTableProps> = ({
  openDialog,
  onCloseDialog,
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [creatingArticle, setCreatingArticle] = useState(false);
  const [creatingArticleText, setCreatingArticleText] = useState<string>('');
  const theme = useTheme();
  const [save, pc] = usePostCategoriaMutation();
  const query = useGetCategoriasQuery();
  const {showErrorToast} = useAppToast();
  const dispatch = useAppDispatch();
  const {categorias} = useAppSelector(state => state.inventario);

  const categories = [
    {id: 1, name: 'Category 1'},
    {id: 2, name: 'Category 2'},
    // Adicione suas categorias reais aqui
  ];

  const handleEditCategory = (categoryName: string) => {
    setEditingCategory(categoryName);
  };

  const handleDeleteCategory = (categoryId: number) => {
    // Lógica para excluir a categoria
  };

  const handleCreateArticle = () => {
    setCreatingArticle(true);
  };

  const handleSaveArticle = () => {
    // Lógica para salvar o artigo
    save({nome: creatingArticleText});
  };
  useEffect(() => {
    if (pc.isSuccess) {
      query.refetch();
      setCreatingArticle(false);
    }
  }, [pc.isSuccess]);
  useEffect(() => {
    if (pc.isError) {
      //   showErrorToast({
      //     text1: 'Não foi possível criar a categoria!',
      //     text2: JSON.stringify(pc.error)
      //   });
    }
  }, [pc.isError]);
  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setCategorias(query.data));
    }
  }, [query.isFetching]);

  return (
    <Portal>
      <Dialog
        style={{borderRadius: theme.roundness}}
        visible={openDialog}
        onDismiss={onCloseDialog}>
        <Dialog.Title>Categorias</Dialog.Title>
        <Dialog.Content>
          {creatingArticle ? (
            // Formulário para criar categoria
            <View style={styles.formContainer}>
              <TextInput
                style={{marginBottom: 16}}
                mode="outlined"
                value={creatingArticleText}
                onChangeText={text => setCreatingArticleText(text)}
                label="Nome da Categoria"
                disabled={pc.isLoading}
              />
              <View style={{marginBottom: 2}}>
                {pc.isError && (
                  <HelperText type="error">
                    {JSON.stringify(pc.error)}
                  </HelperText>
                )}
                {/* {pc.isSuccess && (
                  <HelperText type="info">{`${pc.data.nome} foi registrado com sucesso!`}</HelperText>
                )} */}
              </View>
              <Button
                mode="contained"
                disabled={pc.isLoading}
                loading={pc.isLoading}
                style={{marginBottom: 16, borderRadius: theme.roundness}}
                textColor="white"
                buttonColor={theme.colors.primary}
                onPress={handleSaveArticle}>
                Salvar
              </Button>
              <Button
                mode="contained"
                disabled={pc.isLoading}
                loading={pc.isLoading}
                textColor="white"
                buttonColor={theme.colors.error}
                style={{marginBottom: 16, borderRadius: theme.roundness}}
                onPress={handleSaveArticle}>
                cancelar
              </Button>
            </View>
          ) : (
            // Tabela de categorias
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>nome</DataTable.Title>
                <DataTable.Title>Opções</DataTable.Title>
              </DataTable.Header>

              {categorias &&
                categorias.map(category => (
                  <DataTable.Row key={category.categoriaId}>
                    <DataTable.Cell>
                      {editingCategory === category.nome ? (
                        // Campo de input durante a edição
                        <TextInput
                          value={category.nome}
                          mode="outlined"
                          label="Nome da Categoria"
                          disabled={query.isLoading}
                        />
                      ) : (
                        // Nome da categoria
                        category.nome
                      )}
                    </DataTable.Cell>

                    <DataTable.Cell>
                      {!editingCategory && (
                        <>
                          <IconButton
                            icon="pencil"
                            disabled={query.isLoading}
                            onPress={() => handleEditCategory(category.nome)}
                          />

                          <IconButton
                            icon="delete"
                            disabled={query.isLoading}
                            onPress={() =>
                              handleDeleteCategory(category.categoriaId)
                            }
                          />
                        </>
                      )}
                      {editingCategory && editingCategory === category.nome && (
                        <IconButton
                          icon="content-save"
                          onPress={() => setEditingCategory(null)}
                        />
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          {!creatingArticle && (
            <Button
              mode="contained"
              textColor="white"
              buttonColor={theme.colors.primary}
              disabled={pc.isLoading || query.isLoading}
              loading={pc.isLoading || query.isLoading}
              style={{borderRadius: theme.roundness}}
              onPress={handleCreateArticle}>
              Criar Artigo
            </Button>
          )}
          <Button
            mode="contained"
            textColor="white"
            disabled={pc.isLoading || query.isLoading}
            loading={pc.isLoading || query.isLoading}
            style={{borderRadius: theme.roundness}}
            buttonColor={theme.colors.error}
            onPress={onCloseDialog}>
            Fechar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 16,
  },
});

export default CategoryCrudDialog;
