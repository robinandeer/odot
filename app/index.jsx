import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App from './components/App.jsx'
import configureStore from './store/configureStore'
import rootReducer from './reducers'
import DevTools from './containers/DevTools';

let store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('app')
)
