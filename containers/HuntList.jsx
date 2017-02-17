import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CompletableListView from '../components/CompletableListView'
import * as HuntsActions from '../actions/hunts'

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
        const { filter, sort, items } = this.props

        return (
                <CompletableListView items={items}
                        onItemCompletion={this.handleHuntCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
        )
    }
}

function mapStateToProps(state) {
    return state.hunts
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HuntsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HuntList)
