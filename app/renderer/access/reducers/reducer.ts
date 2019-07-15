import InitialState from '../store/initialState';
import { TOGGLE_WORKSPACE_DUMP_BAR, TOGGLE_SIDEBAR, HIDE_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_RTE_ACTION, HIDE_WORKSPACE_RTE_ACTION, TOGGLE_WORKSPACE_RTE, SHOW_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_RTE, SHOW_WORKSPACE_RTE, HIDE_WORKSHOP_IN_HEADER, SHOW_WORKSHOP_IN_HEADER, TOGGLE_WORKSHOP_IN_HEADER, TOGGLE_WORKSHOP_ACTION_IN_HEADER, SHOW_WORKSHOP_ACTION_IN_HEADER, HIDE_WORKSHOP_ACTION_IN_HEADER, SHOW_TOAST_NOTIFICATION, REMOVE_TOAST_NOTIFICATION, HIDE_SEARCH_BAR, SHOW_SEARCH_BAR, SHOW_SIDEBAR, HIDE_SIDEBAR, TOGGLE_SEARCH_BAR, TOGGLE_SELECTION_IN_DUMPING_GROUND, ENABLE_SELECTION_IN_DUMPING_GROUND, DISABLE_SELECTION_IN_DUMPING_GROUND } from '../actions/actionTypes';
import store from '../store/configureStore';
import * as actions from '../actions/appActions';
import { IToastItem, ToastType, IState, IAction } from '../../constants/types';

export default (state: IState = InitialState, action: IAction) => {
    let newState: IState;
    switch (action.type) {
        case TOGGLE_WORKSPACE_DUMP_BAR: {
            const current = state.workspaceDumpBarShown;
            newState = Object.assign({}, state, {
                workspaceDumpBarShown: !current,
                searchBarShown: false
            });
            return newState;
        }
        case TOGGLE_SIDEBAR: {
            const current = state.sideBarShown;
            newState = Object.assign({}, state, {
                sideBarShown: !current,
                searchBarShown: false
            });
            return newState;
        }
        case SHOW_SIDEBAR: {
            newState = Object.assign({}, state, {
                sideBarShown: true,
                searchBarShown: false
            });
            return newState;
        }
        case HIDE_SIDEBAR: {
            newState = Object.assign({}, state, {
                sideBarShown: false,
                searchBarShown: false
            });
            return newState;
        }
        case TOGGLE_SEARCH_BAR: {
            const current = state.searchBarShown;
            newState = Object.assign({}, state, {
                searchBarShown: !current
            });
            return newState;
        }
        case SHOW_SEARCH_BAR: {
            newState = Object.assign({}, state, {
                searchBarShown: true,
                workspaceDumpBarShown: false
            });
            return newState;
        }
        case HIDE_SEARCH_BAR: {
            newState = Object.assign({}, state, {
                searchBarShown: false
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
                workspaceDumpBarShown: true,
                searchBarShown: false
            });
            return newState;
        }
        case HIDE_WORKSPACE_DUMP_BAR: {
            newState = Object.assign({}, state, {
                workspaceDumpBarShown: false,
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
                workspaceRTEShown: true,
                searchBarShown: false
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
                workspaceRTEShown: !current,
                searchBarShown: false
            });
            return newState;
        }
        case TOGGLE_WORKSHOP_IN_HEADER: {
            const current = state.workspaceInHeader;
            newState = Object.assign({}, state, {
                workspaceInHeader: !current,
                sideBarShown: false
            });
            return newState;
        }
        case SHOW_WORKSHOP_IN_HEADER: {
            newState = Object.assign({}, state, {
                workspaceInHeader: true
            });
            return newState;
        }
        case HIDE_WORKSHOP_IN_HEADER: {
            newState = Object.assign({}, state, {
                workspaceInHeader: false
            });
            return newState;
        }
        case TOGGLE_WORKSHOP_ACTION_IN_HEADER: {
            const current = state.workspaceActionInHeader;
            newState = Object.assign({}, state, {
                workspaceActionInHeader: !current
            });
            return newState;
        }
        case SHOW_WORKSHOP_ACTION_IN_HEADER: {
            newState = Object.assign({}, state, {
                workspaceActionInHeader: true
            });
            return newState;
        }
        case HIDE_WORKSHOP_ACTION_IN_HEADER: {
            newState = Object.assign({}, state, {
                workspaceActionInHeader: false
            });
            return newState;
        }
        case SHOW_TOAST_NOTIFICATION: {
            const toasts = state.toasts;
            const newToast = action.payload as IToastItem;
            newState = Object.assign({}, state, {
                toasts: [].concat(toasts, [newToast])
            });
            if (newToast.type === ToastType.Success) {
                setTimeout(() => {
                    store.dispatch(actions.removeToastNotification(action.payload.id));
                }, 5000);
            }
            return newState;
        }
        case REMOVE_TOAST_NOTIFICATION: {
            const toasts = state.toasts;
            newState = Object.assign({}, state, {
                toasts: [].concat(toasts.filter(t => t.id !== action.payload))
            });
            return newState;
        }
        case TOGGLE_SELECTION_IN_DUMPING_GROUND: {
            const current = state.isSelectionEnabled;
            newState = Object.assign({}, state, {
                isSelectionEnabled: !current,
            });
            return newState;
        }
        case ENABLE_SELECTION_IN_DUMPING_GROUND: {
            newState = Object.assign({}, state, {
                isSelectionEnabled: true,
            });
            return newState;
        }
        case DISABLE_SELECTION_IN_DUMPING_GROUND: {
            newState = Object.assign({}, state, {
                isSelectionEnabled: false,
            });
            return newState;
        }
        default: return state;
    }
}
