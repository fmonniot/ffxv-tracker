import { SYSTEM_INIT, SYSTEM_CONFIG_RESPONSE, SYSTEM_VERSION_UPDATED } from '../constants/ActionTypes'
import { fetchGeneratedData } from '../actions/system'

const initialState = {
    versions: {
        app: 1,
        generated: 0 // Start at 0, that way we can be sure to load a more recent one (in localstorage)
        //quests: 0
    },
    loading: false,
    error: undefined
}

const ACTIONS = {
    generated: fetchGeneratedData
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
                        action.asyncDispatch(ACTIONS[key](versions[key]))
                    }
                })

                return Object.assign({}, state, {loading: false})
            } else {
                return Object.assign({}, state, {loading: false, error: action.err})
            }

        case SYSTEM_VERSION_UPDATED:
            return Object.assign({}, state, {versions: { [action.key]: action.version }})

        default:
            return state
    }
}