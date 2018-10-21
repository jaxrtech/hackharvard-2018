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
import { ConfigStore, SearchBarStore, ChatStore, ShoppingCartStore } from './stores/app';

const routingStore = new RouterStore();

const configStore = new ConfigStore({
  initialCounter: 42,
});

const chatStore = new ChatStore();
const cartStore = new ShoppingCartStore();

const stores = {
  router: routingStore,
  config: configStore,
  search: SearchBarStore,
  chat: chatStore,
  cart: cartStore
};

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <MobxProvider {...stores}>
      <Router history={history}>
        <App routes={routes} chat={chatStore} />
      </Router>
  </MobxProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
