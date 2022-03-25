import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

let store;
const initialState = {user: {}, history: []};
const middleware = [thunk];
let params = [applyMiddleware(...middleware)];

if(window && window.navigator && window.navigator.userAgent) {
    if((window.navigator.userAgent.includes('Chrome') || window.navigator.userAgent.includes('Firefox')) && window.__REDUX_DEVTOOLS_EXTENSION__) {
        params = [applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })];
    } 

} 

store = createStore(
  rootReducer,
  initialState,
  compose(
      ...params
  )
);

export default store;