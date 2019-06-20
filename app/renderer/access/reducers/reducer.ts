import InitialState from './initialState';
import { TOGGLE_WORKSPACE_DUMP_BAR, TOGGLE_SIDEBAR, HIDE_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_DUMP_BAR_ACTION } from '../actions/actionTypes';
import { IAction, IState } from '../types';

export default (state: IState = InitialState, action: IAction) => {
    let newState: IState;
    switch (action.type) {
        case TOGGLE_WORKSPACE_DUMP_BAR: {
            const current = state.workspaceDumpBarShown;
            newState = Object.assign({}, state, {
                workspaceDumpBarShown: !current
            });
            return newState;
        }
        case TOGGLE_SIDEBAR: {
            const current = state.sideBarShown;
            newState = Object.assign({}, state, {
                sideBarShown: !current
            });
            return newState;
        }
        case SHOW_WORKSPACE_DUMP_BAR_ACTION: {
            newState = Object.assign({}, state, {
                workspaceDumpBarActionShown: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_DUMP_BAR_ACTION: {
            newState = Object.assign({}, state, {
                workspaceDumpBarActionShown: false
            });
            return newState;
        }
        default: return state;
    }
}
