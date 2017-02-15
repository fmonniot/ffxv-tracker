import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import * as RouteActions from 'react-router-redux';
import * as QuestsActions from '../actions/quests';
import * as NavActions from '../actions/navigation';

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

class App extends Component {

  onMenuSelected(open, reason) {
    if(reason === 'clickaway') {
      this.props.actions.nav.closeDrawer();
    }
  }

  handleQuestShow(filter) {
    // TODO Emit action
    console.log('filter = ', filter)
    this.props.actions.quests.filterQuests(filter);
  }

  handleQuestSort(sort) {
    // TODO Emit action
    console.log('sort = ', sort)
    this.props.actions.quests.sortQuests(sort);
  }

  render() {
    const { quests, actions, drawer, route } = this.props;
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Drawer
              docked={false}
              open={drawer.open}
              onRequestChange={this.onMenuSelected.bind(this)}
            >
              <MenuItem onTouchTap={route.push.bind(this, '/quests')}>Quests</MenuItem>
              <MenuItem onTouchTap={route.push.bind(this, '/side-quests')}>Side Quests</MenuItem>
              <MenuItem onTouchTap={route.push.bind(this, '/hunts')}>Hunts</MenuItem>
              <Divider />
              <MenuItem>Synchronize</MenuItem>
            </Drawer>
            <Header 
              openDrawer={actions.nav.openDrawer}
              onShow={this.handleQuestShow.bind(this)}
              onSort={this.handleQuestSort.bind(this)}
            />
            <MainSection quests={quests} actions={actions}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  quests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, // TODO specify content of 
  drawer: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    quests: state.quests,
    drawer: state.drawer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      quests: bindActionCreators(QuestsActions, dispatch),
      nav: bindActionCreators(NavActions, dispatch)
    },
    route: bindActionCreators(RouteActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
