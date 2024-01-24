import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '../modules';

type ParamListBase = StackScreen;

export const useAppNavigation = () =>
  useNavigation<NavigationProp<ParamListBase>>();
export const useAppRoute = <T extends keyof ParamListBase>() =>
  useRoute<RouteProp<ParamListBase, T>>();

export {};
