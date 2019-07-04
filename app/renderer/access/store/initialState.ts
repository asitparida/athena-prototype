import { IState } from "./types";

const IntialState: IState = {
    sideBarShown: false,
    workspaceActionInHeader: false,
    workspaceInHeader: false,
    workspaceDumpBarShown: false,
    workspaceDumpBarActionShown: false,
    workspaceRTEShown: false,
    workspaceRTEActionShown: false,
    toasts: []
};

export default IntialState;
