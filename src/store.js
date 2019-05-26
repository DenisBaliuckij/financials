import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {currenciesReducer} from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
export default function configureStore(initialState={}) {
 return createStore(
    currenciesReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
      )
 );
}