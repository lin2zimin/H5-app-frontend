import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  // useRoutes,
} from 'react-router-dom';
// import routes from '@/container/router/index';
import { ConfigProvider } from 'zarm';
import 'zarm/dist/zarm.css';
import NavBar from '@/components/NavBar';
import routes from './container/router/index';
export default function App() {
  const needNav = ['/', '/data', '/user', '/home'];
  const [showNav, setShowNav] = useState(true);
  let location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]);

  // let element = useRoutes(routes);

  return (
    <div>
      <ConfigProvider primaryColor="#007fff">
        <>
          {/* {useRoutes(routes)} */}
          <Switch>
            {routes.map((route) => (
              <Route exact key={route.path} path={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </>
      </ConfigProvider>
      <NavBar showNav={showNav} />
    </div>
  );
}
