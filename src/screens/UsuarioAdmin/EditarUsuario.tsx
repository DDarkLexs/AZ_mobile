// Importando bibliotecas necessárias
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, Snackbar, TextInput} from 'react-native-paper';

interface User {
  usuarioId: number;
  contacto: string;
  senha: string;
  Permissao: IPermissao;
  Funcionario: IFuncionario;
}

interface EditUserScreenProps {
  user: User;
}

const EditUserScreen: React.FC<EditUserScreenProps> = ({user}) => {
  const [editedUser, setEditedUser] = useState<User>(user);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSaveChanges = () => {
    // Implemente aqui a lógica para salvar as alterações no usuário
    // Pode ser uma chamada a uma API, por exemplo

    setSnackbarVisible(true);
  };

  return (
    <ScrollView style={{flex: 1, padding: 16}}>
      {/* Campos de edição do usuário */}
      <TextInput
        label="Nome"
        value={editedUser.Funcionario.nome}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, nome: text},
          })
        }
      />
      <TextInput
        label="Email"
        value={editedUser.Funcionario.email}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, email: text},
          })
        }
      />
      <TextInput
        label="Endereço"
        value={editedUser.Funcionario.endereco}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, endereco: text},
          })
        }
      />
      <TextInput
        label="Bi"
        value={editedUser.Funcionario.bi}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, bi: text},
          })
        }
      />
      <TextInput
        label="Sexo"
        value={editedUser.Funcionario.sexo}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, sexo: text},
          })
        }
      />
      <TextInput
        label="Data de Nascimento"
        value={new Date(editedUser.Funcionario.nascimento).toLocaleDateString(
          'pt',
        )}
        onChangeText={text =>
          setEditedUser({
            ...editedUser,
            Funcionario: {...editedUser.Funcionario, nascimento: text},
          })
        }
      />
      <TextInput
        label="Contacto"
        value={editedUser.contacto}
        onChangeText={text => setEditedUser({...editedUser, contacto: text})}
      />
      <TextInput
        label="Senha"
        value={editedUser.senha}
        onChangeText={text => setEditedUser({...editedUser, senha: text})}
        secureTextEntry
      />

      {/* Botão para salvar as alterações */}
      <Button
        mode="contained"
        onPress={handleSaveChanges}
        style={{marginTop: 16}}>
        Salvar Alterações
      </Button>

      {/* Snackbar para mostrar mensagem de confirmação */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        Alterações salvas com sucesso!
      </Snackbar>
    </ScrollView>
  );
};

export default EditUserScreen;
