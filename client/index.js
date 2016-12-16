import React from 'react';
import ReactDOM from 'react-dom';
import store, { history } from './store';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import SampleComponent from './components/SampleComponent'
const app = document.getElementById('app');

const render = () => ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={SampleComponent} />
      </Route>

    </Router>
  </Provider>,
    app
  );

render()
