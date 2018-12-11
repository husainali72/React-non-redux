import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import registrationModal from './registrationModal'
import iframeModal from './iframeModal'
import user from './user'
import analytics from './analytics'

const reducer = combineReducers({
	registrationModal,
	iframeModal,
	user,
	analytics

})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export * from './registrationModal'
export * from './iframeModal'
export * from './user'
export * from './analytics'
