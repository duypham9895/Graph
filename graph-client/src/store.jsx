import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './reducer/RootReducer.jsx';

export default createStore(
	RootReducer, applyMiddleware(thunk, logger));