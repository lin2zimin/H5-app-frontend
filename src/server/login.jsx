import { get, post } from '../utils/index';

export const login = (userName, pwd) => post('/user/login', { userName, pwd });

export const register = (userName, pwd) =>
  post('/user/register', { userName, pwd });
