import {BaseToast, ErrorToast} from 'react-native-toast-message';

/*
  1. Create the config
*/

import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Paragraph, Title, useTheme} from 'react-native-paper';
import Font from '../../../constants/Font';

export const PrimaryNotification: React.FC<ToastNotificationProps> = ({
  text1,
  text2,
  img,
}) => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');

  const containerWidth = width * 0.97; // Definindo a largura como 90% da largura da tela

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 4,
      width: containerWidth,
      borderColor: theme.colors.primary,
      borderWidth: 0.5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    icon: {
      backgroundColor: 'orange',
      marginRight: 10,
    },
    notificationLabel: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 6,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.onBackground,
    },
    paragraph: {
      fontSize: 16,
      color: theme.colors.onBackground,
    },
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Avatar.Icon size={24} icon="bell" style={styles.icon} />
        <Text style={styles.notificationLabel}>Notificação agora!</Text>
      </View> */}

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={img} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <Title style={{...styles.title, ...Font.bold}}>{text1}</Title>
          <Paragraph style={styles.paragraph}>
            {text2}
            {/* Chama-se Adilson, e o seu carro é um Hyundai I10, LD-30-42-20 */}
          </Paragraph>
        </View>
      </View>
    </View>
  );
};

/* 

▓█████  ██▀███   ██▀███   ▒█████   ██▀███        ▄▄▄█████▓ ▒█████   ▄▄▄        ██████ ▄▄▄█████▓
▓█   ▀ ▓██ ▒ ██▒▓██ ▒ ██▒▒██▒  ██▒▓██ ▒ ██▒      ▓  ██▒ ▓▒▒██▒  ██▒▒████▄    ▒██    ▒ ▓  ██▒ ▓▒
▒███   ▓██ ░▄█ ▒▓██ ░▄█ ▒▒██░  ██▒▓██ ░▄█ ▒      ▒ ▓██░ ▒░▒██░  ██▒▒██  ▀█▄  ░ ▓██▄   ▒ ▓██░ ▒░
▒▓█  ▄ ▒██▀▀█▄  ▒██▀▀█▄  ▒██   ██░▒██▀▀█▄        ░ ▓██▓ ░ ▒██   ██░░██▄▄▄▄██   ▒   ██▒░ ▓██▓ ░ 
░▒████▒░██▓ ▒██▒░██▓ ▒██▒░ ████▓▒░░██▓ ▒██▒        ▒██▒ ░ ░ ████▓▒░ ▓█   ▓██▒▒██████▒▒  ▒██▒ ░ 
░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒▓ ░▒▓░        ▒ ░░   ░ ▒░▒░▒░  ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░  ▒ ░░   
 ░ ░  ░  ░▒ ░ ▒░  ░▒ ░ ▒░  ░ ▒ ▒░   ░▒ ░ ▒░          ░      ░ ▒ ▒░   ▒   ▒▒ ░░ ░▒  ░ ░    ░    
   ░     ░░   ░   ░░   ░ ░ ░ ░ ▒    ░░   ░         ░      ░ ░ ░ ▒    ░   ▒   ░  ░  ░    ░      
   ░  ░   ░        ░         ░ ░     ░                        ░ ░        ░  ░      ░                                                                                                      
 */

export const ErrorNotification: React.FC<ToastNotificationProps> = ({
  text1,
  text2,
  img,
}) => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');

  const containerWidth = width * 0.97; // Definindo a largura como 90% da largura da tela

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 4,
      borderWidth: 1,
      width: containerWidth,
      borderColor: '#ff000080', // Vermelho mais claro - ajuste a transparência conforme necessário
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    icon: {
      backgroundColor: 'orange',
      marginRight: 10,
    },
    notificationLabel: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
    image: {
      width: 80,
      height: 80,
      marginTop: 15,
      borderRadius: 6,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.onBackground,
    },
    paragraph: {
      fontSize: 16,
      color: theme.colors.onBackground,
    },
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Avatar.Icon size={24} icon="bell" style={styles.icon} />
        <Text style={styles.notificationLabel}>Notificação agora!</Text>
      </View> */}

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={img} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <Title style={{...styles.title, ...Font.bold}}>{text1}</Title>
          <Paragraph style={styles.paragraph}>
            {text2}
            {/* Chama-se Adilson, e o seu carro é um Hyundai I10, LD-30-42-20 */}
          </Paragraph>
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  //   tomatoToast: ({text1, props}: any) => <NotificationComponent />,
  PrimaryNotification: ({text1, text2, props}: any) => (
    <PrimaryNotification img={props.img} text1={text1} text2={text2} />
  ),
  ErrorNotification: ({text1, text2, props}: any) => (
    <ErrorNotification img={props.img} text1={text1} text2={text2} />
  ),
};
