import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CompletableListView from '../components/CompletableListView'
import ListHeader from '../components/ListHeader'

import * as QuestsActions from '../actions/quests'
import * as NavActions from '../actions/navigation'

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
        const { filter, sort, items, nav, actions} = this.props

        const completedItemsCount = items.reduce((count, item) =>
            item.completed ? count + 1 : count,
            0
        )
        const activeItemCount = items.length - completedItemsCount

        return (
            <div>
                <ListHeader 
                    subtitle="Quests"
                    onMenuClick={nav.openDrawer}
                    onShow={actions.filterQuests.bind(this)}
                    onSort={actions.sortQuests.bind(this)}
                    completedCount={completedItemsCount}
                    activeCount={activeItemCount}
                    activeFilter={filter}
                    activeSort={sort}
                    />
                <CompletableListView items={items}
                        onItemCompletion={this.handleQuestCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.quests
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(QuestsActions, dispatch),
        nav: bindActionCreators(NavActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestList)
