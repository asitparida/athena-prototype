import * as types from './actionTypes';
import { IToastItem } from '../../constants/types';

function SampleFetchUrl() {
    const remote = (window as any).remote;
    const api = `http://localhost:${remote.getCurrentWindow().API_PORT}/api/meta/`;
    return api;
}

export const toggleDumpBar = () => ({
    type: types.TOGGLE_WORKSPACE_DUMP_BAR, payload: {}
})

export const showDumpBar = () => ({
    type: types.SHOW_WORKSPACE_DUMP_BAR, payload: {}
})

export const hideDumpBar = () => ({
    type: types.HIDE_WORKSPACE_DUMP_BAR, payload: {}
})

export const showDumpBarAction = () => ({
    type: types.SHOW_WORKSPACE_DUMP_BAR_ACTION, payload: {}
})

export const hideDumpBarAction = () => ({
    type: types.HIDE_WORKSPACE_DUMP_BAR_ACTION, payload: {}
})

export const toggleRTE = () => ({
    type: types.TOGGLE_WORKSPACE_RTE, payload: {}
})

export const hideRTEAction = () => ({
    type: types.HIDE_WORKSPACE_RTE_ACTION, payload: {}
})

export const showRTEAction = () => ({
    type: types.SHOW_WORKSPACE_RTE_ACTION, payload: {}
})

export const hideRTE = () => ({
    type: types.HIDE_WORKSPACE_RTE, payload: {}
})

export const showRTE = () => ({
    type: types.SHOW_WORKSPACE_RTE, payload: {}
})

export const toggleSideBar = () => ({
    type: types.TOGGLE_SIDEBAR, payload: {}
})

export const toggleWorkpsaceInHeader = () => ({
    type: types.TOGGLE_WORKSHOP_IN_HEADER, payload: {}
})

export const showWorkpsaceInHeader = () => ({
    type: types.SHOW_WORKSHOP_IN_HEADER, payload: {}
})

export const hideWorkpsaceInHeader = () => ({
    type: types.HIDE_WORKSHOP_IN_HEADER, payload: {}
})

export const toggleWorkpsaceActionInHeader = () => ({
    type: types.TOGGLE_WORKSHOP_ACTION_IN_HEADER, payload: {}
})

export const showWorkpsaceActionInHeader = () => ({
    type: types.SHOW_WORKSHOP_ACTION_IN_HEADER, payload: {}
})

export const hideWorkpsaceActionInHeader = () => ({
    type: types.HIDE_WORKSHOP_ACTION_IN_HEADER, payload: {}
})

export const showToastNotification = (message: IToastItem) => ({
    type: types.SHOW_TOAST_NOTIFICATION, payload: message
})

export const removeToastNotification = (toastId: string) => ({
    type: types.REMOVE_TOAST_NOTIFICATION, payload: toastId
})

export const toggleWorkspaceViewAsCanvas = () => ({
    type: types.TOGGLE_WORKSPACE_VIEW_AS_CANVAS, payload: {}
})

export const showWorkspaceActions = () => ({
    type: types.SHOW_WORKSPACE_ACTIONS, payload: {}
})

export const hideWorkspaceActions = () => ({
    type: types.HIDE_WORKSPACE_ACTIONS, payload: {}
})

export const toggleWorkspaceActions = () => ({
    type: types.TOGGLE_WORKSPACE_ACTIONS, payload: {}
})

export const showWorkspaceCreator = () => ({
    type: types.SHOW_WORKSPACE_CREATOR, payload: {}
})

export const hideWorkspaceCreator = () => ({
    type: types.HIDE_WORKSPACE_CREATOR, payload: {}
})
