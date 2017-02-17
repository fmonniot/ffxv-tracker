import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QuestListView from '../components/QuestList';
import * as QuestsActions from '../actions/quests';

class QuestList extends Component {

    static propTypes = {
        quests: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired // TODO specify content of 
    }

    handleQuestCompletion(id) {
        this.props.actions.quests.completeQuest(id)
    }

    render() {
        const { quests: questsState } = this.props;
        const { filter, sort, quests} = questsState;

        return (
                <QuestListView quests={quests}
                        onQuestCompletion={this.handleQuestCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
        );
    }
}

function mapStateToProps(state) {
    return {
        quests: state.quests
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
        quests: bindActionCreators(QuestsActions, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestList);
