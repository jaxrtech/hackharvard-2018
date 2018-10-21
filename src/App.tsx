import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { flatMap } from 'lodash-es';

import { Header } from './component/header';
import { RouteSpec } from './util/routing';
import './App.css';
import { observer, inject } from 'mobx-react';
import { ChatStore } from './stores/app';
import * as classNames from 'classnames';
import { RouterStore } from 'mobx-react-router';
import { when, autorun, IReactionDisposer } from 'mobx';
import { ChatBotPanel } from './component/chatbot/chatbot';

export type AppProps = {
  routes: RouteSpec[];
  chat: ChatStore;
  router?: RouterStore;
};

@inject('router')
export class App extends React.Component<AppProps> {

  private dispose: IReactionDisposer;

  public componentDidMount() {
    const router = this.props.router;
    if (router) {
      this.dispose = autorun(() => router.location);
    }
  }

  public componentWillUnmount() {
    if(this.dispose) {
      this.dispose();
    }
  }

  public render() {
    const { routes } = this.props;
    const isChatHidden = this.props.chat.hidden;

    const appClassNames = classNames(["app-layout-container", (isChatHidden) ? "app-chat-hide" : "app-chat-show"]);
    const chatClassNames = classNames(["rw-chat-panel", (isChatHidden) ? "rw-chat-panel-hide" : "rw-chat-panel-show"]);

    return (
      <main>
        <Header routes={routes} chat={this.props.chat} />
        
        <div className={classNames(appClassNames)}>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>

        <aside className={classNames(chatClassNames)}>
          <ChatBotPanel />
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

