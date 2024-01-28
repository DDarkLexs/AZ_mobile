/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Badge,
  Card,
  Icon,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';
import {Cargo} from '../../constants/Enum';
import Font from '../../constants/Font';
import {API_BASE_URL} from '../../constants/Index';
import {calcularIdade} from '../../utils/functions';

interface UserCardProps {
  user: IUsuario;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const showMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const theme = useTheme();
  const avatarBadgeColor = user.Permissao.ativo
    ? '#83bf6e'
    : theme.colors.outlineVariant;
  const styles = StyleSheet.create({
    card: {
      margin: 12,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarText: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    badgeView: {
      position: 'absolute',
      top: 5,
      right: 2,
    },
    badge: {
      borderWidth: 1.5,
      borderColor: theme.colors.backdrop,
    },
    friendView: {
      flex: 100,
    },
    avatarImage: {
      marginLeft: 10,
      width: 45,
      height: 45,
    },
    avatarContainer: {
      // marginRight: 15,
      // alignItems: 'center',
    },
  });

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Card
          onPress={showMenu}
          style={{margin: 12, borderRadius: theme.roundness}}>
          <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              {user.Funcionario.imagem ? (
                <View style={styles.avatarContainer}>
                  <Avatar.Image
                    source={{uri: API_BASE_URL + user.Funcionario.imagem}}
                    style={styles.avatarImage}
                  />
                </View>
              ) : (
                <Avatar.Text
                  color={theme.colors.secondary}
                  label={user.Funcionario.nome
                    .split(' ')[0][0]
                    .toLocaleUpperCase()}
                  style={styles.avatarText}
                />
              )}
              <View style={styles.badgeView}>
                <Badge
                  size={12}
                  style={(styles.badge, {backgroundColor: avatarBadgeColor})}
                />
              </View>
            </View>
            {/* Informações do usuário */}
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{...Font.bold, fontWeight: 'bold'}}>
                {user.Funcionario.nome}
              </Text>
              <Text>{String(user.Funcionario.sexo).toLocaleLowerCase()}</Text>
              <Text>{String(user.contacto).toLocaleLowerCase()}</Text>
              {/* <Text>{String(user.Funcionario.endereco)}</Text> */}
            </View>
            <View>
              <Badge
                style={{
                  color:
                    user.Permissao.cargo === Cargo.ADMIN
                      ? theme.colors.onTertiary
                      : theme.colors.onSecondary,
                  fontSize: 11,
                  fontWeight: 'bold',
                  backgroundColor:
                    user.Permissao.cargo === Cargo.ADMIN
                      ? theme.colors.tertiary
                      : theme.colors.secondary,
                }}>
                {user.Permissao.cargo}
              </Badge>
              <Text style={{textAlign: 'center', marginVertical: 10}}>
                <Icon
                  color={theme.colors.primary}
                  size={20}
                  source={'account-details'}
                />{' '}
                {calcularIdade(new Date(user.Funcionario.nascimento))}
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
          // onViewPress();
        }}
        title="Visualizar"
      />
      <Menu.Item
        leadingIcon={'pencil'}
        onPress={() => {
          closeMenu();
          // onEditPress(item);
        }}
        title="Editar"
      />
      <Menu.Item
        leadingIcon={'delete'}
        onPress={() => {
          closeMenu();
          // onDeletePress();
        }}
        title="Apagar"
      />
    </Menu>
  );
};

export default UserCard;
