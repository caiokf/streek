import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import createRootReducer from './reducers'
import sagas from './sagas'

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const reducers = createRootReducer(history)

const middleware = applyMiddleware(
  thunk,
  sagaMiddleware,
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = composeEnhancers(middleware)(createStore)(reducers)

sagaMiddleware.run(sagas)

export { history }
export default store
