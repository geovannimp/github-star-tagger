import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom'
import * as mobx from 'mobx';
import { Provider } from 'mobx-react';
import { create, persist } from 'mobx-persist'

import App from './App';
import { userStore } from './stores';
import './assets/scss/index.scss';

mobx.configure({ enforceActions: true });

const hydrate = create();
hydrate('userStore', userStore);

ReactDOM.render(
  <Provider userStore={userStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));