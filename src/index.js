import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/index';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
