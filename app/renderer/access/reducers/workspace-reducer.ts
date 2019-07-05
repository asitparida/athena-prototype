import InitialState from '../store/initialState';
import { TOGGLE_WORKSPACE_VIEW_AS_CANVAS, TOGGLE_WORKSPACE_ACTIONS, HIDE_WORKSPACE_ACTIONS, SHOW_WORKSPACE_ACTIONS } from '../actions/actionTypes';
import { IAction, IState } from '../store/types';

export default (state: IState = InitialState, action: IAction) => {
    let newState: IState;
    switch (action.type) {
        case TOGGLE_WORKSPACE_VIEW_AS_CANVAS: {
            const current = state.workspaceViewIsCanvas;
            newState = Object.assign({}, state, {
                workspaceViewIsCanvas: !current
            });
            return newState;
        }
        case TOGGLE_WORKSPACE_ACTIONS: {
            const current = state.workspaceActionsAreShown;
            newState = Object.assign({}, state, {
                workspaceActionsAreShown: !current
            });
            return newState;
        }
        case SHOW_WORKSPACE_ACTIONS: {
            newState = Object.assign({}, state, {
                workspaceActionsAreShown: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_ACTIONS: {
            newState = Object.assign({}, state, {
                workspaceActionsAreShown: false
            });
            return newState;
        }
        default: return state;
    }
}
