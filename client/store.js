import { createStore} from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { hashHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {
  isLoggedIn:false
};

const store = createStore(rootReducer, defaultState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(hashHistory, store);

export default store;
