import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, withRouter } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from '../containers/App';
import QuestList from '../containers/QuestList'
import configureStore from '../store/configureStore';
import { fetchGeneratedData } from '../actions/init';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Init the app
store.dispatch(fetchGeneratedData())

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={withRouter(App)}>
        <IndexRedirect to="/side-quests" />
        <Route path="/side-quests" component={QuestList} />
        <Route path="/hunts" component={QuestList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
