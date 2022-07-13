import Index from '../Index/index';
import About from '../About/index';
import Data from '../Data/index';
import User from '../User';
import Home from '../Home';
import Login from '../Login';
import Detail from '../Detail';
import UserInfo from '../UserInfo';
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/data',
    component: Data,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/userInfo',
    component: UserInfo,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
];

export default routes;
