import React, { Component, PropTypes, cloneElement } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from '../src/material_ui_raw_theme_file'

import Header from '../components/Header'
import * as QuestsActions from '../actions/quests'
import * as HuntsActions from '../actions/hunts'
import * as NavActions from '../actions/navigation'

// TODO Move to /constants
const HUNTS = 'hunts'
const SIDE_QUESTS = 'quests'
const NO_KIND = 'NO_KIND'

const PATH_TO_KIND = {
  ['/hunts']: HUNTS,
  ['/side-quests']: SIDE_QUESTS
}

class App extends Component {

  static propTypes = {
    items: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired, // TODO specify content of 
    drawer: PropTypes.object.isRequired
  }

  onMenuTapped(open, reason) {
    if(reason === 'clickaway') {
      this.props.actions.nav.closeDrawer()
    }
  }

  onMenuItemTapped(path) {
    const { router, actions: { nav } } = this.props

    router.push(path)
    nav.closeDrawer()
  }

  handleShow(filter) {
    const kind = this.props.kind

    const f = {
      [HUNTS]: this.props.actions.hunts.filterHunts,
      [SIDE_QUESTS]: this.props.actions.quests.filterQuests,
      [NO_KIND]: () => undefined
    }[kind]

    f(filter)
  }

  handleSort(sort) {
    const kind = this.props.kind

    const f = {
      [HUNTS]: this.props.actions.hunts.sortHunts,
      [SIDE_QUESTS]: this.props.actions.quests.sortQuests,
      [NO_KIND]: () => undefined
    }[kind]

    f(sort)
  }

  render() {
    const { items: { filter, sort, items}, actions, drawer, children, kind } = this.props

    const completedItemsCount = items.reduce((count, item) =>
      item.completed ? count + 1 : count,
      0
    )
    const activeItemCount = items.length - completedItemsCount

    const openSnackBar = items.error !== undefined
    const messageSnackBar = openSnackBar ? items.error : ''

    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Snackbar
              open={openSnackBar}
              message={messageSnackBar}
              autoHideDuration={4000}
            />
            <Drawer docked={false}
                    open={drawer.open}
                    onRequestChange={this.onMenuTapped.bind(this)} >
              <MenuItem onTouchTap={this.onMenuItemTapped.bind(this, '/side-quests')}>Side Quests</MenuItem>
              <MenuItem onTouchTap={this.onMenuItemTapped.bind(this, '/hunts')}>Hunts</MenuItem>
            </Drawer>
            <Header 
              subtitle={kind}
              onMenuClick={actions.nav.openDrawer}
              onShow={this.handleShow.bind(this)}
              onSort={this.handleSort.bind(this)}
              completedCount={completedItemsCount}
              activeCount={activeItemCount}
              activeFilter={filter}
              activeSort={sort}
            />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const path = state.routing.locationBeforeTransitions.pathname

  const kind = PATH_TO_KIND[path] || NO_KIND
  const items = {
    [HUNTS]: state.hunts,
    [SIDE_QUESTS]: state.quests,
    [NO_KIND]: {}
  }[kind]

  return {
    items, kind,
    drawer: state.drawer
    //,
    //route: state.routing.
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      quests: bindActionCreators(QuestsActions, dispatch),
      hunts: bindActionCreators(HuntsActions, dispatch),
      nav: bindActionCreators(NavActions, dispatch)
    }
    //, route: bindActionCreators(RouteActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
