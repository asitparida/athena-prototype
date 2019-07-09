import { IToastItem } from "../../constants/types";

export interface IState {
    sideBarShown: boolean;
    workspaceInHeader: boolean;
    workspaceActionInHeader: boolean;
    workspaceDumpBarShown: boolean;
    workspaceDumpBarActionShown: boolean;
    workspaceRTEShown: boolean;
    workspaceRTEActionShown: boolean;
    toasts: IToastItem[];
    workspaceViewIsCanvas: boolean;
    workspaceActionsAreShown: boolean;
    newWorkspaceCreator: boolean;
}
export interface IAction {
    type: string;
    payload: any;
}

export interface IAppActions {
    actions: IAction[];
}
