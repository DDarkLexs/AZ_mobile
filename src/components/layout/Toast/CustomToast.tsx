import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {ErrorNotification, PrimaryNotification} from './Toast.component';

/*
  1. Create the config
*/
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
