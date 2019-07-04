import InitialState from '../store/initialState';
import { TOGGLE_WORKSPACE_DUMP_BAR, TOGGLE_SIDEBAR, HIDE_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_DUMP_BAR_ACTION, SHOW_WORKSPACE_RTE_ACTION, HIDE_WORKSPACE_RTE_ACTION, TOGGLE_WORKSPACE_RTE, SHOW_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_DUMP_BAR, HIDE_WORKSPACE_RTE, SHOW_WORKSPACE_RTE, HIDE_WORKSHOP_IN_HEADER, SHOW_WORKSHOP_IN_HEADER, TOGGLE_WORKSHOP_IN_HEADER, TOGGLE_WORKSHOP_ACTION_IN_HEADER, SHOW_WORKSHOP_ACTION_IN_HEADER, HIDE_WORKSHOP_ACTION_IN_HEADER, SHOW_TOAST_NOTIFICATION, REMOVE_TOAST_NOTIFICATION } from '../actions/actionTypes';
import { IAction, IState } from '../store/types';
import store from '../store/configureStore';
import * as actions from '../actions/appActions';
import { IToastItem, ToastType } from '../../constants/types';

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
                workspaceRTEShown: !current,
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
        default: return state;
    }
}
