import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import InboxIcon from 'material-ui/svg-icons/content/inbox';
import LoopIcon from 'material-ui/svg-icons/av/loop';
import SortByAlphaIcon from 'material-ui/svg-icons/av/sort-by-alpha';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon from 'material-ui/svg-icons/content/sort';

import AppBar from 'material-ui/AppBar';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/QuestFilters';
import { ORDER_NAME, ORDER_LEVEL, ORDER_CHAPTER, ORDER_LOCATION } from '../constants/QuestFilters';

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  handleMenu() {
    this.props.openDrawer();
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
              <MenuItem primaryText="By Name" onTouchTap={() => onSort(ORDER_NAME)} />
              <MenuItem primaryText="By Level" onTouchTap={() => onSort(ORDER_LEVEL)} />
              <MenuItem primaryText="By Chapter" onTouchTap={() => onSort(ORDER_CHAPTER)} />
              <MenuItem primaryText="By Location" onTouchTap={() => onSort(ORDER_LOCATION)} />
          </IconMenu>
          <IconMenu iconButtonElement={moreButton} >
              <MenuItem primaryText="Show all" leftIcon={<InboxIcon />} onTouchTap={() => onShow(SHOW_ALL)} />
              <MenuItem primaryText="Show completed" leftIcon={<LoopIcon />} onTouchTap={() => onShow(SHOW_COMPLETED)} />
              <MenuItem primaryText="Show active" leftIcon={<ArchiveIcon />} onTouchTap={() => onShow(SHOW_ACTIVE)} />
          </IconMenu>
      </ToolbarGroup>
    );

    return (
      <header className="header">
          <AppBar 
            title="FFXV Quests Tracking"
            onLeftIconButtonTouchTap={this.handleMenu.bind(this)}
          >
            {toolbar}
          </AppBar>
          <h1 style={defaultStyle} >Quests</h1>
          Something
      </header>
    );
  }
}

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Header;
