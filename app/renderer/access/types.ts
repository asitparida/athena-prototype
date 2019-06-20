export interface IState {
    workspaceDumpBarShown: boolean;
    sideBarShown: boolean;
    workspaceDumpBarActionShown: boolean;
}
export interface IAction {
    type: string;
    payload: any;
}

export interface IAppActions {
    actions: IAction[];
}
