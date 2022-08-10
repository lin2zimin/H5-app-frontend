import { get, post } from '../utils/index';

export const getInfo = () => get(`/user/userInfo`);

export const editInfo = (params) =>post ('/user/editUserInfo' , params)