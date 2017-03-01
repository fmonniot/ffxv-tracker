import { SYSTEM_INIT, SYSTEM_CONFIG_RESPONSE, SYSTEM_VERSION_UPDATED } from '../constants/ActionTypes'
import { updateVersion, fetchHunts, fetchSideQuests } from '../actions/system'
import { V_APP, V_HUNTS, V_SIDE_QUESTS, V_HUNTER_RANKS } from '../constants/Config'

const initialState = {

    // Start at 0, that way we can be sure to load a more recent one (in localstorage)
    versions: {
        [V_APP]: 0,
        [V_HUNTER_RANKS]: 0,
        [V_SIDE_QUESTS]: 0,
        [V_HUNTS]: 0
    },
    loading: false,
    error: undefined
}

const ACTIONS = {
    [V_SIDE_QUESTS]: fetchSideQuests,
    [V_HUNTS]: fetchHunts,
    [V_APP]: (v) => updateVersion('app', v)
}

export default function system(state = initialState, action) {
    switch(action.type) {
        case SYSTEM_INIT:

            return Object.assign({}, state, {loading: true})

        case SYSTEM_CONFIG_RESPONSE:

            if(action.success) {
                const versions = action.json.versions
                Object.keys(action.json.versions).forEach(key => {
                    if (versions[key] > state.versions[key]) {
                        if(ACTIONS[key] !== undefined) {
                            action.asyncDispatch(ACTIONS[key](versions[key]))
                        }
                    }
                })

                return Object.assign({}, state, {loading: false})
            } else {
                return Object.assign({}, state, {loading: false, error: action.err})
            }

        case SYSTEM_VERSION_UPDATED:
            const versions = Object.assign({}, state.versions, { [action.key]: action.version })
            console.log("SYSTEM_VERSION_UPDATED", action, versions)
            return Object.assign({}, state, { versions })

        default:
            return state
    }
}