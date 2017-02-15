import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as TodoActions from '../actions/todos';

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

class App extends Component {

  onMenuSelected(open, reason) {
    if(reason === 'clickaway') {
      this.props.actions.closeDrawer();
    }
  }

  render() {
    const { todos, actions, drawer } = this.props;
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Drawer
              docked={false}
              open={drawer.open}
              onRequestChange={this.onMenuSelected.bind(this)}
            >
              <MenuItem onTouchTap={actions.openPage.bind(this, 'quests')}>Quests</MenuItem>
              <MenuItem onTouchTap={actions.openPage.bind(this, 'side-quests')}>Side Quests</MenuItem>
              <MenuItem onTouchTap={actions.openPage.bind(this, 'hunts')}>Hunts</MenuItem>
            </Drawer>
            <Header addTodo={actions.addTodo} openDrawer={actions.openDrawer}/>
            <MainSection todos={todos} actions={actions}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  drawer: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    drawer: state.drawer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
