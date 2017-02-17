
import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CompletableListView from '../components/CompletableListView'
import * as HuntsActions from '../actions/hunts'

class HuntList extends Component {

    static propTypes = {
        hunts: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired // TODO specify content of 
    }

    handleHuntCompletion(id) {
        this.props.actions.completeHunt(id)
    }

    render() {
        const { hunts: { filter, sort, hunts} } = this.props;

        return (
                <CompletableListView items={hunts}
                        onItemCompletion={this.handleHuntCompletion.bind(this)}
                        filter={filter} 
                        sort={sort} />
        );
    }
}

function mapStateToProps(state) {
    return {
        hunts: state.hunts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HuntsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HuntList)
