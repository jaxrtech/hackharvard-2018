import { ConfigStore, SearchBarStore, ChatStore, ShoppingCartStore } from './stores/app';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { LoginService } from './services/login';
import { Toaster, Position } from '@blueprintjs/core';

export const toaster = Toaster.create({
  position: Position.TOP,
});

export const router = new RouterStore();

export const config = new ConfigStore({
  initialCounter: 42,
  API_ROOT_URL: 'http://198.37.24.59:3000',
});

export const chat = new ChatStore();
export const cart = new ShoppingCartStore();
export const search = new SearchBarStore();
export const login = new LoginService(config, toaster, router);

export const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, router);
