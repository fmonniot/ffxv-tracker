import {OPEN_DRAWER, CLOSE_DRAWER, OPEN_PAGE} from '../constants/ActionTypes';

const initialState = {
    open: false
};

export default function drawer(state = initialState, action) {
    switch(action.type) {
        case OPEN_DRAWER:
            return {
                open: true
            };

        case CLOSE_DRAWER:
        case OPEN_PAGE:
            return {
                open: false
            };

        default:
        return state;
    }
}