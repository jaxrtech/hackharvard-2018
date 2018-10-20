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
import { ConfigStore } from './stores/app';

const routingStore = new RouterStore();

const configStore = new ConfigStore({
  initialCounter: 42,
});

const stores = {
  router: routingStore,
  config: configStore,
};

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <MobxProvider {...stores}>
    <>
      <Router history={history}>
        <App routes={routes} />
      </Router>
    </>
  </MobxProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
