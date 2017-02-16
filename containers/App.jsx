import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuestList from '../components/QuestList';
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
    this.props.actions.quests.filterQuests(filter);
  }

  handleQuestSort(sort) {
    this.props.actions.quests.sortQuests(sort);
  }

  handleQuestCompletion(id) {
      this.props.actions.quests.completeQuest(id)
  }

  render() {
    const { quests: questsState, actions, drawer, route } = this.props;
    const { filter, sort, quests} = questsState;
    const completedQuestsCount = quests.reduce((count, quest) =>
      quest.completed ? count + 1 : count,
      0
    );
    const activeQuestCount = quests.length - completedQuestsCount;

    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Drawer docked={false}
                    open={drawer.open}
                    onRequestChange={this.onMenuSelected.bind(this)} >
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
              completedCount={completedQuestsCount}
              activeCount={activeQuestCount}
              activeFilter={filter}
              activeSort={sort}
            />
            <QuestList quests={quests}
                         onQuestCompletion={this.handleQuestCompletion.bind(this)}
                         filter={filter} 
                         sort={sort} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  quests: PropTypes.object.isRequired,
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
