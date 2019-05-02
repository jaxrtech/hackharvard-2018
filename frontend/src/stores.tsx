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
});

export const chat = new ChatStore();
export const cart = new ShoppingCartStore();
export const search = new SearchBarStore();
export const login = new LoginService(toaster, router);

export const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, router);
