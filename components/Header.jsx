import React, { PropTypes, Component } from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

import InboxIcon from 'material-ui/svg-icons/content/inbox'
import LoopIcon from 'material-ui/svg-icons/av/loop'
import SortByAlphaIcon from 'material-ui/svg-icons/av/sort-by-alpha'
import ArchiveIcon from 'material-ui/svg-icons/content/archive'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import SortIcon from 'material-ui/svg-icons/content/sort'

import AppBar from 'material-ui/AppBar'

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/Filters'
import { SORT_NAME, SORT_LEVEL, SORT_REGION, SORT_LOCATION } from '../constants/Filters'

const defaultStyle = {
  marginLeft: 20
}

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

const FILTER_ICONS = {
  [SHOW_ALL]: <InboxIcon />,
  [SHOW_ACTIVE]: <LoopIcon />,
  [SHOW_COMPLETED]: <ArchiveIcon />
}

const SORT_TITLES = {
  [SORT_NAME]: 'By Name',
  [SORT_LEVEL]: 'By Level',
  [SORT_REGION]: 'By Region',
  [SORT_LOCATION]: 'By Location'
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

class Header extends Component {

  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    subtitle: PropTypes.string.isRequired,

    onSort: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,

    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,

    activeFilter: PropTypes.string.isRequired,
    activeSort: PropTypes.string.isRequired
  }

  countForFilter(filter) {
    const { activeCount, completedCount } = this.props

    if (filter === SHOW_ALL) return activeCount + completedCount
    if (filter === SHOW_ACTIVE) return activeCount
    if (filter === SHOW_COMPLETED) return completedCount
  }

  renderFilterLink(filter) {
    const { onShow, activeFilter } = this.props
    const count = this.countForFilter(filter)
    const title = FILTER_TITLES[filter] + (count > 0 ? ' (' +  count + ')' : '')
    const style = (activeFilter === filter) ? {fontWeight: 'bold'} : {}

    return (
      <MenuItem key={filter}
                style={style}
                focusState={'keyboard-focused'}
                primaryText={`Show ${title}`}
                leftIcon={FILTER_ICONS[filter]}
                onTouchTap={() => onShow(filter)}
      />
    )
  }

  renderSortLink(sort) {
    const { onSort, activeSort } = this.props
    const style = (activeSort === sort) ? {fontWeight: 'bold'} : {}

    return (
      <MenuItem key={sort} style={style} primaryText={SORT_TITLES[sort]} onTouchTap={() => onSort(sort)} />
    )
  }

  render() {
    const {onSort, onShow, subtitle} = this.props

    const sortButton = (
      <IconButton touch={true}>
          <SortIcon />
      </IconButton>
    )

    const moreButton = (
      <IconButton touch={true}>
          <FilterIcon />
      </IconButton>
    )

    return (
      <header className="header">
        <AppBar title={`FFXV Tracking - ${capitalize(subtitle)}`} onLeftIconButtonTouchTap={this.props.onMenuClick}>
          <ToolbarGroup>
            <IconMenu iconButtonElement={sortButton}>
              {[SORT_NAME, SORT_LEVEL, SORT_REGION, SORT_LOCATION].map(sort =>
                this.renderSortLink(sort)
              )}
            </IconMenu>
            <IconMenu iconButtonElement={moreButton} >
              {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
                this.renderFilterLink(filter)
              )}
            </IconMenu>
          </ToolbarGroup>
        </AppBar>
      </header>
    )
  }
}

export default Header
