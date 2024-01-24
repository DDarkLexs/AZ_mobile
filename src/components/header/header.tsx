import React, {useState} from 'react';
import {Image, useColorScheme} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import { useAppNavigation } from '../../hooks/useNavigation';
import { DrawerHeaderProps } from '@react-navigation/drawer';

const Header: React.FC<DrawerHeaderProps> = (props): React.JSX.Element => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const nav = useAppNavigation();
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <Appbar.Header
      style={{
        elevation: 1,
        borderBottomWidth: 0.16,
        borderBottomColor: 'gray',
      }}
      theme={{colors: {primary: theme.colors.background}}}>
      {/* <Appbar.Content title={''} mode="medium" color={theme.colors.surface} /> */}
      <Appbar.Content title={props.route.name} />
      <Appbar.Action icon="menu" />
      {/* <Appbar.Content title={''} mode="medium" color={theme.colors.surface} /> */}
    </Appbar.Header>
  );
};
export const HeaderProps: React.FC<{title: string}> = ({
  title,
}): React.JSX.Element => {
  const theme = useTheme();
  const navigation = useAppNavigation();
  const goBack = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      <Appbar.BackAction onPress={() => goBack()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
