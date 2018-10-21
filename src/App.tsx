import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { flatMap } from 'lodash-es';

import { Header } from './component/header';
import { RouteSpec } from './util/routing';
import './App.css';
import { observer, inject } from 'mobx-react';
import { ChatStore } from './stores/app';
import * as classNames from 'classnames';

export type AppProps = {
  routes: RouteSpec[];
  chat: ChatStore;
};

@inject('chat')
@observer
export class App extends React.Component<AppProps> {
  public render() {
    const { routes } = this.props;
    const isChatHidden = this.props.chat.hidden;

    const appClassNames = ["app-layout-container", (isChatHidden) ? "app-chat-hide" : "app-chat-show"];
    const chatClassNames = ["rw-chat-panel", (isChatHidden) ? "rw-chat-panel-hide" : "rw-chat-panel-show"];

    return (
      <main>
        <Header routes={routes} chat={this.props.chat} />
        
        <div className={classNames(appClassNames)}>
          <div className="app-layout-content">
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </div>
        </div>

        <aside className={classNames(chatClassNames)}>
        </aside>
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

