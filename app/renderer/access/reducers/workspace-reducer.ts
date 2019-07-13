import InitialState from '../store/initialState';
import { TOGGLE_WORKSPACE_VIEW_AS_CANVAS, TOGGLE_WORKSPACE_ACTIONS, HIDE_WORKSPACE_ACTIONS, SHOW_WORKSPACE_ACTIONS, SHOW_WORKSPACE_CREATOR, HIDE_WORKSPACE_CREATOR, SHOW_TOPIC_CREATOR, HIDE_TOPIC_CREATOR, ACTIVATE_WORKSPACE_AND_TOPIC } from '../actions/actionTypes';
import { IState, IAction } from '../../constants/types';

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
        case SHOW_WORKSPACE_CREATOR: {
            newState = Object.assign({}, state, {
                newWorkspaceCreator: true
            });
            return newState;
        }
        case HIDE_WORKSPACE_CREATOR: {
            newState = Object.assign({}, state, {
                newWorkspaceCreator: false
            });
            return newState;
        }
        case SHOW_TOPIC_CREATOR: {
            newState = Object.assign({}, state, {
                newTopicCreator: true
            });
            return newState;
        }
        case HIDE_TOPIC_CREATOR: {
            newState = Object.assign({}, state, {
                newTopicCreator: false
            });
            return newState;
        }
        case ACTIVATE_WORKSPACE_AND_TOPIC: {
            const workspace = state.workspaceList.find(w => w.id === action.payload.workspaceId);
            if (workspace) {
                const topics = [].concat(workspace.topics);
                topics.forEach(topic => (topic as any).active = topic.id === action.payload.topicId);
                newState = Object.assign({}, state, {
                    activeWorkspace: Object.assign({}, workspace, {
                        topics
                    })
                });
                return newState;
            }
        }
        default: return state;
    }
}
