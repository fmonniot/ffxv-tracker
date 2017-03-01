import React, { Component, PureComponent, PropTypes } from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Infinite from 'react-infinite';

import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/Filters';
import { SORT_NAME, SORT_LEVEL, SORT_REGION, SORT_LOCATION } from '../constants/Filters';

const ITEM_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: item => !item.completed,
  [SHOW_COMPLETED]: item => item.completed
};

function sortString(a, b) {
  if(a < b) return -1;
  if(a > b) return 1;
  return 0;
}

const ITEM_SORTS = {
  [SORT_NAME]: (a, b) => sortString(a.name, b.name),
  [SORT_LEVEL]: (a, b) => ((typeof a.level === 'number') ? a.level : -1) - ((typeof b.level === 'number') ? b.level : -1),
  [SORT_REGION]: (a, b) => sortString(a.region, b.region),
  [SORT_LOCATION]: (a, b) => sortString(a.location, b.location)
}

const ITEM_GROUPS = {
  [SORT_NAME]: (item) => item.name.charAt(0).toUpperCase(),
  [SORT_LEVEL]: (item) => (typeof item.level === 'number') ? `Level ${item.level}` : 'No Level',
  [SORT_REGION]: (item) => item.region,
  [SORT_LOCATION]: (item) => item.location
}


class CompletableListView extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemCompletion: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {height: 400};
  }

  renderItemSecondaryText(item) {
    const level = (typeof item.level === 'number')
         ? (<span style={{width: '20%', display: 'inline-block'}}>{`Level ${item.level}`}</span>)
         : undefined;
    const chapter = (item.chapter) ? `from chapter ${item.chapter}` : undefined
    const location = `Region: ${item.region}` + ((item.location) ? ` / Location: ${item.location}` : '')

    return (
      <div>
        {level} {chapter}
        { (level === undefined && chapter === undefined) ? '' : (<br/>)}
        {location}
      </div>
    );
  }

  // items = [{key:...},{key:...}] with key created from `keyTransform`
  // keyTransform = string => string
  groupItems(items, keyTransform) {  
    return items.reduce((grouped, quest) => {
      const k = keyTransform(quest)
      
      grouped[k] = Array.prototype.concat( (grouped[k] || []), quest )

      return grouped
    }, {})
  }

  listStyle(completed) {
    const color = completed ? this.context.muiTheme.tableRow.selectedColor : undefined;
    return { backgroundColor: color };
  }

  updateDimensions() {
    let height = this.state.height
    
    if(!!this.container) {
      height = this.container.clientHeight
    }

    console.log("updateDimensions ->", height)

    this.setState({ height });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { items, onItemCompletion, filter, sort } = this.props;

    const grouped = this.groupItems(items.filter(ITEM_FILTERS[filter]).sort(ITEM_SORTS[sort]), ITEM_GROUPS[sort])

    const onRowTapped = (item) => (event, checked) => onItemCompletion(item.id);

    const children = []
    for(const title in grouped) {
      const group = grouped[title]
      children.push((<Subheader key={title + "sub"}>{title}</Subheader>))

      for(const item of group) {
        children.push((<CompletableListItem key={item.id} onTapped={onRowTapped(item)} {...item} />))
      }
    }

    return (
      <div style={{height: 'calc(100vh - 64px)'}} ref={(container) => this.container = container}>
        <Infinite containerHeight={this.state.height} elementHeight={88}>
          {children}
        </Infinite>
      </div>
    );
  }
}

class CompletableListItem extends PureComponent {

  static propTypes = {
    onTapped: PropTypes.func.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  listStyle() {
    const { completed } =  this.props
    const color = completed ? this.context.muiTheme.tableRow.selectedColor : undefined;
    return { backgroundColor: color };
  }

  renderItemSecondaryText(item) {
    const { level, chapter, region, location } = this.props

    const levelBlock = (typeof level === 'number')
         ? (<span style={{width: '20%', display: 'inline-block'}}>{`Level ${level}`}</span>)
         : undefined;
    const chapterBlock = (chapter) ? `from chapter ${chapter}` : undefined
    const locationBlock = `Region: ${region}` + ((location) ? ` / Location: ${location}` : '')

    return (
      <div>
        {levelBlock} {chapterBlock}
        { (levelBlock === undefined && chapterBlock === undefined) ? undefined : (<br/>)}
        {locationBlock}
      </div>
    );
  }

  render() {
    const { id, completed, name, rewards, onTapped, link } = this.props

    const nested = rewards.map((reward, index) => <ListItem key={index} primaryText={reward} />)
    if(link !== undefined) {
      nested.unshift((
        <ListItem key={'link'} primaryText={
          <a key={'link'} href={`https://www.ign.com${link}`}>See on IGN.com</a>
          } />
      ))
    }
    

    return (
      <ListItem
          style={this.listStyle()}
          nestedListStyle={this.listStyle()}
          leftCheckbox={<Checkbox onCheck={onTapped} checked={completed}/>}
          primaryText={name}
          secondaryText={this.renderItemSecondaryText()}
          secondaryTextLines={2}
          nestedItems={nested}
        />
      )
  }
}

export default CompletableListView;
