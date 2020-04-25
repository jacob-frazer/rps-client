import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from "./modules/store"

import {Provider as ReduxProvider} from "react-redux"

const reduxStore = configureStore({
    socket_id: null,
    room_id: null,
    outcome: false,
    submitted: false,
    choice: "Rock",
    your_score: 0,
    opp_score: 0,
    hello_sent: false
  })

ReactDOM.render(
<ReduxProvider store={reduxStore}>
<App />
</ReduxProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
