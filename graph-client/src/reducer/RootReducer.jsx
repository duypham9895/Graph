import {combineReducers} from 'redux';

import VertexReducer from './VertexReducer.jsx';
import EdgeReducer from './EdgeReducer.jsx';
import SelectReducer from './SelectReducer.jsx';
import DijkstraReducer from './DijkstraReducer.jsx';
import SearchReducer from './SearchReducer.jsx';

export default combineReducers({
	VertexReducer, EdgeReducer, SelectReducer, DijkstraReducer, SearchReducer
})