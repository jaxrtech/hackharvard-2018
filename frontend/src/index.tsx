import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { Provider as MobxProvider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';

import './index.css'; // import before custom styles
import { App } from './App';
import { routes } from './routes';
import * as stores from './stores';

ReactDOM.render(
  <MobxProvider {...stores}>
      <Router history={stores.history}>
        <App router={stores.router} routes={routes} chat={stores.chat} login={stores.login} />
      </Router>
  </MobxProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
