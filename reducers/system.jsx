import { SYSTEM_INIT, SYSTEM_CONFIG_RESPONSE, SYSTEM_VERSION_UPDATED } from '../constants/ActionTypes'
import { fetchGeneratedData, updateVersion } from '../actions/system'

const initialState = {

    // Start at 0, that way we can be sure to load a more recent one (in localstorage)
    versions: {
        'app': 0,
        'generated': 0,
        'hunter-ranks': 0
    },
    loading: false,
    error: undefined
}

const ACTIONS = {
    generated: fetchGeneratedData,
    app: (v) => updateVersion('app', v)
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