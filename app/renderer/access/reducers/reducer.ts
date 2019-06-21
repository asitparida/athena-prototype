import InitialState from './initialState';
import { TOGGLE_WORKSPACE_DUMP_BAR, TOGGLE_SIDEBAR, HIDE_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_RTE_ACTION, HIDE_WORKSPACE_RTE_ACTION, TOGGLE_WORKSPACE_RTE, SHOW_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_RTE, SHOW_WORKSPACE_RTE } from '../actions/actionTypes';
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
        case SHOW_WORKSPACE_DUMP_BAR: {
            newState = Object.assign({}, state, {
                workspaceDumpBarShown: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_DUMP_BAR: {
            newState = Object.assign({}, state, {
                workspaceDumpBarShown: false
            });
            return newState;
        }
        case SHOW_WORKSPACE_RTE_ACTION: {
            newState = Object.assign({}, state, {
                workspaceRTEActionShown: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_RTE_ACTION: {
            newState = Object.assign({}, state, {
                workspaceRTEActionShown: false
            });
            return newState;
        }
        case SHOW_WORKSPACE_RTE: {
            newState = Object.assign({}, state, {
                workspaceRTEShown: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_RTE: {
            newState = Object.assign({}, state, {
                workspaceRTEShown: false
            });
            return newState;
        }
        case TOGGLE_WORKSPACE_RTE: {
            const current = state.workspaceRTEShown;
            newState = Object.assign({}, state, {
                workspaceRTEShown: !current
            });
            return newState;
        }
        default: return state;
    }
}