export interface IState {
    sideBarShown: boolean;
    workspaceDumpBarShown: boolean;
    workspaceDumpBarActionShown: boolean;
    workspaceRTEShown: boolean;
    workspaceRTEActionShown: boolean;
}
export interface IAction {
    type: string;
    payload: any;
}

export interface IAppActions {
    actions: IAction[];
}
