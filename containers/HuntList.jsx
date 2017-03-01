import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CompletableListView from '../components/CompletableListView'
import ListHeader from '../components/ListHeader'

import * as HuntsActions from '../actions/hunts'
import * as NavActions from '../actions/navigation'

class HuntList extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        filter: PropTypes.string.isRequired,
        sort: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired // TODO specify content of 
    }

    handleHuntCompletion(id) {
        this.props.actions.completeHunt(id)
    }

    render() {
        const { filter, sort, items, nav, actions } = this.props

        const completedItemsCount = items.reduce((count, item) =>
            item.completed ? count + 1 : count,
            0
        )
        const activeItemCount = items.length - completedItemsCount

        return (
            <div>
                <ListHeader 
                    subtitle="Hunts"
                    onMenuClick={nav.openDrawer}
                    onShow={actions.filterHunts.bind(this)}
                    onSort={actions.sortHunts.bind(this)}
                    completedCount={completedItemsCount}
                    activeCount={activeItemCount}
                    activeFilter={filter}
                    activeSort={sort}
                    />
                <CompletableListView items={items}
                        onItemCompletion={this.handleHuntCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.hunts
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HuntsActions, dispatch),
        nav: bindActionCreators(NavActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HuntList)
