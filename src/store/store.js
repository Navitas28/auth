import {applyMiddleware, compose, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/index';

let middlewares = [ReduxThunk];

const store = createStore(
  rootReducer,
  compose(composeWithDevTools(applyMiddleware(...middlewares)))
);

export default store;
