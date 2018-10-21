import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { ChatStore } from './stores/app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App chat={new ChatStore()} routes={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
