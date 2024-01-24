import {useMemo} from 'react';
import {logout} from '../store/features/auth';
import {useAppDispatch, useAppSelector} from './redux';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const logOutAccount = async () => {
    dispatch(logout());
  };
  const {token, usuario} = useAppSelector(state => state.auth);
  return useMemo(
    () => ({usuario, token, logOutAccount}),
    [usuario, token, logOutAccount],
  );
};
