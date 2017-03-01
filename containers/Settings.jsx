import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as NavActions from '../actions/navigation'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import AppBar from 'material-ui/AppBar'

class Settings extends Component {
    static propTypes = {
        versions: PropTypes.object.isRequired,
        openDrawer: PropTypes.func.isRequired
    }

    render() {
        const { versions } = this.props
        console.log(versions)

        const versionsItem = Object.keys(versions).map((kind) => {

            return (<ListItem
                    key={kind}
                    primaryText={kind}
                    disabled={true}
                    secondaryText={`Version ${versions[kind]}`}
                    />)
        })

        return (
            <div>
                <header className="header">
                    <AppBar 
                        title="FFXV Tracking - Settings"
                        onLeftIconButtonTouchTap={this.props.openDrawer} />
                </header>
                <List>
                    <Subheader>Versions</Subheader>
                    {versionsItem}
                </List>
                <Divider />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.system
}

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: bindActionCreators(NavActions, dispatch).openDrawer
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)
