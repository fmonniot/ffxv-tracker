import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/QuestFilters';
import { Checkbox, List } from 'material-ui';

const defaultStyle = {
  width: 300,
  marginLeft: 20
};

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.quests.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderFooter(completedCount) {
    const { quests } = this.props;
    const { filter } = this.state;
    const activeCount = quests.length - completedCount;

    if (quests.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
    }
  }

  render() {
    const { quests, actions } = this.props;
    const { filter } = this.state;

    const filteredQuests = quests.filter(TODO_FILTERS[filter]);
    const completedCount = quests.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main" style={defaultStyle}>
        <List className="todo-list">
          {filteredQuests.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions.quests} />
          )}
        </List>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  quests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
