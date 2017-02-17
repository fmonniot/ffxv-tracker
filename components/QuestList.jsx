import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/QuestFilters';
import { SORT_NAME, SORT_LEVEL, SORT_REGION, SORT_LOCATION } from '../constants/QuestFilters';

const QUEST_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: quest => !quest.completed,
  [SHOW_COMPLETED]: quest => quest.completed
};

function sortString(a, b) {
  if(a < b) return -1;
  if(a > b) return 1;
  return 0;
}

const QUEST_SORTS = {
  [SORT_NAME]: (a, b) => sortString(a.name, b.name),
  [SORT_LEVEL]: (a, b) => ((typeof a.level === 'number') ? a.level : -1) - ((typeof b.level === 'number') ? b.level : -1),
  [SORT_REGION]: (a, b) => sortString(a.region, b.region),
  [SORT_LOCATION]: (a, b) => sortString(a.location, b.location)
}

const QUEST_GROUPS = {
  [SORT_NAME]: (quest) => quest.name.charAt(0).toUpperCase(),
  [SORT_LEVEL]: (quest) => (typeof quest.level === 'number') ? `Level ${quest.level}` : 'No Level',
  [SORT_REGION]: (quest) => quest.region,
  [SORT_LOCATION]: (quest) => quest.location
}

// {region:'ab', t: 1},{region:'ab', t:2},{region:'bc', t:3},{region:'cd', t:4}

// quests = [{key:...},{key:...}]
// keyTransform = string => string
function groupQuests(quests, keyTransform) {  
  return quests.reduce((grouped, quest) => {
    const k = keyTransform(quest)
    
    grouped[k] = Array.prototype.concat( (grouped[k] || []), quest )

    return grouped
  }, {})
}

// Rename to QuestsView
class QuestList extends Component {

  static propTypes = {
    quests: PropTypes.array.isRequired,
    onQuestCompletion: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  renderQuestSecondaryText(quest) {
    const level = (typeof quest.level === 'number')
         ? (<span style={{width: '20%', display: 'inline-block'}}>{`Level ${quest.level}`}</span>)
         : undefined;
    const chapter = (quest.chapter) ? `from chapter ${quest.chapter}` : undefined
    const location = `Region: ${quest.region}` + ((quest.location) ? ` / Location: ${quest.location}` : '')

    return (
      <div>
        {level} {chapter}
        { (level === undefined && chapter === undefined) ? '' : (<br/>)}
        {location}
      </div>
    );
  }

  listStyle(completed) {
    const color = completed ? this.context.muiTheme.tableRow.selectedColor : undefined;
    return { backgroundColor: color };
  }

  render() {
    const { quests, onQuestCompletion, filter, sort } = this.props;

    const grouped = groupQuests(quests.filter(QUEST_FILTERS[filter]).sort(QUEST_SORTS[sort]), QUEST_GROUPS[sort])

    const onRowTapped = (quest) => (event, checked) => onQuestCompletion(quest.id);

    return (
      <div>
        {Object.keys(grouped).map( (group) => (
        <List key={group}>
          <Subheader>{group}</Subheader>
          {grouped[group].map( (quest) => (

            <ListItem
              key={quest.id}
              style={this.listStyle(quest.completed)}
              nestedListStyle={this.listStyle(quest.completed)}
              leftCheckbox={<Checkbox onCheck={onRowTapped(quest)} checked={quest.completed}/>}
              primaryText={quest.name}
              secondaryText={this.renderQuestSecondaryText(quest)}
              secondaryTextLines={2}
              nestedItems={quest.rewards.map((reward, index) => <ListItem key={index} primaryText={reward} />)}
            />

          ))}
        </List>
      ))}
      </div>
    );
  }
}

export default QuestList;
