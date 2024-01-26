import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {TabActions} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
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
import {useAppDispatch} from '../../hooks/redux';
import {useAuth} from '../../hooks/useAuth';
import {navDrawerItem} from '../../utils/data/navigationDrawerIcon';

export const DrawerContent: React.FC<DrawerContentComponentProps> = (
  props,
): React.JSX.Element => {
  const theme = useTheme();
  const {descriptors, navigation, state} = props;
  const {usuario, logOutAccount} = useAuth();
  const dispath = useAppDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Image
            source={require('../../assets/icon/icon.png')}
            style={{width: 100, height: 100}}
          />
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
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
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
});
