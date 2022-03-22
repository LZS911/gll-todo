import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from '../page/Login';
import routers from './router.config';
import Home from '../page/Home';
import { useLoginState } from '../hooks/useLoginState';
import { Transition } from '../components';

export default function RouterComponent() {
  const { isLogin } = useLoginState();

  return (
    <>
      <Router>
        {!isLogin && (
          <Suspense fallback={<Transition />}>
            <Login />
            <Redirect to="./login" />
          </Suspense>
        )}

        {isLogin && (
          <Suspense fallback={<Transition />}>
            <Home>
              <Switch>
                {routers.map((menu) => {
                  if (menu.component) {
                    return (
                      <Route
                        path={menu.path}
                        exact={menu.exact}
                        key={menu.name}
                        component={menu.component}
                      />
                    );
                  }
                  return null;
                })}
                <Redirect to="/login" />
              </Switch>
            </Home>
          </Suspense>
        )}
      </Router>
    </>
  );
}
