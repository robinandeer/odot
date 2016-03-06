import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk'

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
)

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    )

    if (module.hot) {
        // enable webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => 
            store.replaceReducer(require('../reducers').default)
        )
    }

    return store
}
