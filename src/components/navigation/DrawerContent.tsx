/* eslint-disable react/no-unstable-nested-components */
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {TabActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Icon,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Cargo} from '../../constants/Enum';
import {API_BASE_URL} from '../../constants/Index';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAuth} from '../../hooks/useAuth';
import {setAuthBiometric} from '../../store/features/auth';
import {navDrawerItem} from '../../utils/data/navigationDrawerItem';

export const DrawerContent: React.FC<DrawerContentComponentProps> = (
  props,
): React.JSX.Element => {
  const theme = useTheme();
  const {descriptors, navigation, state} = props;
  const {usuario, logOutAccount} = useAuth();
  const dispatch = useAppDispatch();
  const {authBiometrico} = useAppSelector(state => state.auth);

  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
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
      // width: 60,
      // height: 60,
    },
    avatarContainer: {
      // marginRight: 15,
      // alignItems: 'center',
    },
  });

  return (
    <DrawerContentScrollView scrollEnabled={true} {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            {usuario?.imagem ? (
              <View style={styles.avatarContainer}>
                <Avatar.Image
                  size={70}
                  source={{uri: API_BASE_URL + usuario?.imagem}}
                  style={styles.avatarImage}
                />
              </View>
            ) : (
              <Avatar.Text
                size={70}
                color={theme.colors.secondary}
                label={String(
                  usuario?.nome.split(' ')[0][0].toLocaleUpperCase(),
                )}
                style={styles.avatarText}
              />
            )}
            {/* <View style={styles.badgeView}>
                <Badge
                  size={12}
                  style={(styles.badge, {backgroundColor: 'gre'})}
                />
              </View> */}
          </View>
          {/* <Image
            source={require('../../assets/icon/icon.png')}
            style={{width: 100, height: 100}}
          /> */}
          <Title style={styles.title}>{usuario?.nome}</Title>
          <Caption style={styles.caption}>{usuario?.contacto}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {state.routes.map((route, index) => (
            <View key={route.key}>
              {/* <Text key={index}>
                {navDrawerItem[route.name].adminRequired ? 'yes' : 'no'}
              </Text> */}

              {navDrawerItem[route.name].adminRequired ? (
                <>
                  {usuario?.cargo === Cargo.ADMIN && (
                    <DrawerItem
                      focused={descriptors[route.key].navigation.isFocused()}
                      activeTintColor={theme.colors.primary}
                      onPress={() => {
                        const isFocused = state.index === index;
                        const event = navigation.emit({
                          type: 'drawerItemPress',
                          target: route.key,
                          canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                          navigation.dispatch({
                            ...TabActions.jumpTo(route.name, route.params),
                            target: state.key,
                          });
                        }
                      }}
                      icon={({color, size, focused}) => {
                        return (
                          <Icon
                            source={navDrawerItem[route.name].icon}
                            color={color}
                            size={size}
                          />
                        );
                      }}
                      inactiveTintColor={theme.colors.onBackground}
                      label={navDrawerItem[route.name].label}
                    />
                  )}
                </>
              ) : (
                <DrawerItem
                  key={route.key}
                  focused={descriptors[route.key].navigation.isFocused()}
                  activeTintColor={theme.colors.primary}
                  onPress={() => {
                    const isFocused = state.index === index;
                    const event = navigation.emit({
                      type: 'drawerItemPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                      navigation.dispatch({
                        ...TabActions.jumpTo(route.name, route.params),
                        target: state.key,
                      });
                    }
                  }}
                  icon={({color, size, focused}) => {
                    return (
                      <Icon
                        source={navDrawerItem[route.name].icon}
                        color={color}
                        size={size}
                      />
                    );
                  }}
                  inactiveTintColor={theme.colors.onBackground}
                  label={navDrawerItem[route.name].label}
                />
              )}
            </View>
          ))}
        </Drawer.Section>
        <Drawer.Section title="Preferência">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Tema escuro</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          {/* <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple> */}
          <TouchableRipple
            onPress={() => dispatch(setAuthBiometric(!authBiometrico))}>
            <View style={styles.preference}>
              <Text>Auto autenticar</Text>
              <View pointerEvents="none">
                <Switch value={authBiometrico} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            inactiveTintColor={theme.colors.onBackground}
            icon={({color, size}) => (
              <Icon
                source="logout"
                color={theme.colors.onBackground}
                size={size}
              />
            )}
            label="Terminar sessão"
            onPress={() => {
              props.navigation.toggleDrawer();
              logOutAccount();
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
