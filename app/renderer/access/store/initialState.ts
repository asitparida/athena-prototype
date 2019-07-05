import { IState } from "./types";

const IntialState: IState = {
    sideBarShown: false,
    workspaceActionInHeader: false,
    workspaceInHeader: false,
    workspaceDumpBarShown: false,
    workspaceDumpBarActionShown: false,
    workspaceRTEShown: false,
    workspaceRTEActionShown: false,
    toasts: [],
    workspaceViewIsCanvas: true,
    workspaceActionsAreShown: false
};

export default IntialState;
