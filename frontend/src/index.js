import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import index from "./redux/store";

ReactDOM.render(
  <Provider store={index}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
