import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { flatMap } from 'lodash-es';

import { Header } from './component/header';
import { RouteSpec } from './util/routing';
import './App.css';

export type AppRoutes = { routes: RouteSpec[]; };

export class App extends React.Component<AppRoutes> {
  public render() {
    const { routes } = this.props;
    return (
      <main>
        <Header routes={routes} />

        <div className="app-layout-container">
          <div className="app-layout-content">
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </div>
        </div>

      </main>
    );
  }
}

function renderRoutes(routes: RouteSpec[]): JSX.Element[] {
  return flatMap(routes, (route, index) => {
    const rest = route.routes ? renderRoutes(route.routes) : [];
    return [
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main} />,
      ...rest,
    ];
  });
}

