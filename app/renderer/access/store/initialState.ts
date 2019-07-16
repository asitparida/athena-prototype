import { IState } from '../../constants/types';
import { WorkspaceList } from '../../constants/constants';

const IntialState: IState = {
    sideBarShown: false,
    searchBarShown: false,
    workspaceActionInHeader: false,
    workspaceInHeader: false,
    workspaceDumpBarShown: false,
    workspaceDumpBarActionShown: false,
    workspaceRTEShown: false,
    workspaceRTEActionShown: false,
    toasts: [],
    workspaceViewIsCanvas: true,
    workspaceActionsAreShown: false,
    newWorkspaceCreator: false,
    newTopicCreator: false,
    workspaceList: WorkspaceList,
    activeWorkspace: WorkspaceList[0],
    isSelectionEnabled: false,
    manageHeadersDialog: false
};

export default IntialState;
