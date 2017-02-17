import React, { PropTypes, Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import InboxIcon from 'material-ui/svg-icons/content/inbox';
import LoopIcon from 'material-ui/svg-icons/av/loop';
import SortByAlphaIcon from 'material-ui/svg-icons/av/sort-by-alpha';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon from 'material-ui/svg-icons/content/sort';

import AppBar from 'material-ui/AppBar';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/Filters';
import { SORT_NAME, SORT_LEVEL, SORT_REGION, SORT_LOCATION } from '../constants/Filters';

const defaultStyle = {
  marginLeft: 20
};

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

const FILTER_ICONS = {
  [SHOW_ALL]: <InboxIcon />,
  [SHOW_ACTIVE]: <LoopIcon />,
  [SHOW_COMPLETED]: <ArchiveIcon />
};

class Header extends Component {
  handleMenu() {
    this.props.openDrawer();
  }

  countForFilter(filter) {
    const { activeCount, completedCount } = this.props;
    if (filter === SHOW_ALL) return activeCount + completedCount;
    if (filter === SHOW_ACTIVE) return activeCount;
    if (filter === SHOW_COMPLETED) return completedCount;
  }

  renderFilterLink(filter) {
    const { filter: selectedFilter, onShow, activeFilter } = this.props;
    const active = filter === selectedFilter;
    const count = this.countForFilter(filter);
    const title = FILTER_TITLES[filter] + (count > 0 ? ' (' +  count + ')' : '');
    const style = (activeFilter === filter) ? {fontWeight: 'bold'} : {};

    return (
      <MenuItem key={filter}
                style={style}
                focusState={'keyboard-focused'}
                primaryText={`Show ${title}`}
                leftIcon={FILTER_ICONS[filter]}
                onTouchTap={() => onShow(filter)}
      />
    );
  }

  render() {
    const {onSort, onShow} = this.props;
    const sortButton = (
      <IconButton touch={true}>
          <SortIcon />
      </IconButton>
    );
    const moreButton = (
      <IconButton touch={true}>
          <FilterIcon />
      </IconButton>
    );
    const toolbar = (
      <ToolbarGroup>
          <IconMenu iconButtonElement={sortButton}>
              <MenuItem primaryText="By Name" onTouchTap={() => onSort(SORT_NAME)} />
              <MenuItem primaryText="By Level" onTouchTap={() => onSort(SORT_LEVEL)} />
              <MenuItem primaryText="By Region" onTouchTap={() => onSort(SORT_REGION)} />
              <MenuItem primaryText="By Location" onTouchTap={() => onSort(SORT_LOCATION)} />
          </IconMenu>
          <IconMenu iconButtonElement={moreButton} >
            {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
              this.renderFilterLink(filter)
            )}
          </IconMenu>
      </ToolbarGroup>
    );

    return (
      <header className="header">
          <AppBar 
            title="FFXV Tracking - Quests"
            onLeftIconButtonTouchTap={this.handleMenu.bind(this)}
          >
            {toolbar}
          </AppBar>
      </header>
    );
  }
}

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  activeSort: PropTypes.string.isRequired
};

export default Header;
