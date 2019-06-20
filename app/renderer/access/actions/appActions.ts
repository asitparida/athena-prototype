import * as types from './actionTypes';

function SampleFetchUrl() {
    const remote = (window as any).remote;
    const api = `http://localhost:${remote.getCurrentWindow().API_PORT}/api/meta/`;
    return api;
}

const toggleDumpBar = () => ({
    type: types.TOGGLE_WORKSPACE_DUMP_BAR, payload: {}
})

const showDumpBarAction = () => ({
    type: types.SHOW_WORKSPACE_DUMP_BAR_ACTION, payload: {}
})

const hideDumpBarAction = () => ({
    type: types.HIDE_WORKSPACE_DUMP_BAR_ACTION, payload: {}
})

const toggleSideBar = () => ({
    type: types.TOGGLE_SIDEBAR, payload: {}
})

export {
    toggleDumpBar,
    toggleSideBar,
    showDumpBarAction,
    hideDumpBarAction
};
