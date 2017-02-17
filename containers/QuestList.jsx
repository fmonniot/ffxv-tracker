import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CompletableListView from '../components/CompletableListView'
import * as QuestsActions from '../actions/quests'

class QuestList extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        filter: PropTypes.string.isRequired,
        sort: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired // TODO specify content of 
    }

    handleQuestCompletion(id) {
        this.props.actions.completeQuest(id)
    }

    render() {
        const { filter, sort, items} = this.props

        return (
                <CompletableListView items={items}
                        onItemCompletion={this.handleQuestCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
        )
    }
}

function mapStateToProps(state) {
    return state.quests
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(QuestsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestList)
