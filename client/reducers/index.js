import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import isLoggedIn from './isLoggedIn';

const rootReducer = combineReducers({isLoggedIn, routing: routerReducer });

export default rootReducer;
