import * as React from 'react';
import { HashRouter } from 'react-router-dom'
import { Component } from "react";
import { RouterWrapper } from './router-wrap';
import '../styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../access/actions/appActions';
import { InitializeSubscriptions, RemoveSubscriptions } from '../access/observables/observables';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Toasts from '../components/toasts/toast';
import { ContentViewer } from '../components/content-viewer/content-viewer';
import CreateWorkspace from '../components/create-workspace/create-workspace';
import CreateTopic from '../components/create-workspace/create-topic';
import store from '../access/store/configureStore';
import { IToastItem, ToastType } from '../constants/types';

const mapStateToProps = ({ reducers, workspaceReducers }) => {
    return {
        sideBarShown: reducers.sideBarShown,
        searchBarShown: reducers.searchBarShown,
        workspaceInHeader: reducers.workspaceInHeader,
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceDumpBarActionShown: reducers.workspaceDumpBarActionShown,
        workspaceRTEShown: reducers.workspaceRTEShown,
        workspaceRTEActionShown: reducers.workspaceRTEActionShown,
        newWorkspaceCreator: workspaceReducers.newWorkspaceCreator,
        newTopicCreator: workspaceReducers.newTopicCreator
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class Main extends Component<any, any> {
    componentWillMount() {
        InitializeSubscriptions();
    }
    componentWillUnmount() {
        RemoveSubscriptions();
    }
    toggleSidebar() {
        this.props.actions.toggleSideBar();
    }
    toggleDumpBar() {
        this.props.actions.hideRTE();
        this.props.actions.toggleDumpBar();
    }
    launchAnnotator() {
        const ipcRenderer = (window as any).ipcRenderer;
        if (ipcRenderer) {
            ipcRenderer.send('launch-annotator');
        }
        const remote = (window as any).remote;
        if (remote) {
            const api = `http://localhost:${remote.getCurrentWindow().API_PORT}/api/meta/`;
            fetch(api)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                }, (data) => {
                    console.log(data);
                });
        }
    }
    toggleRTE() {
        this.props.actions.hideDumpBar();
        this.props.actions.toggleRTE();
    }
    onLocationChanged() {
        if (this.props.sideBarShown) {
            this.props.actions.toggleSideBar();
        }
    }
    componentDidMount() {
        const ipcRenderer = (window as any).ipcRenderer;
        if (ipcRenderer) {
            ipcRenderer.on('composition-saved', (e, arg) => {
                const toast: IToastItem = {
                    id: `${Math.floor(Math.random() * 10e8)}`,
                    message: `Composition saved as "${arg}"`,
                    type: ToastType.Success
                };
                store.dispatch(AppActions.showToastNotification(toast))
            });
        }
    }
    render() {
        return (
            <div className="app-content">
                <div className='app-dragger' />
                <HashRouter hashType='noslash'>
                    <div className='app-content-bottom'>
                        <RouterWrapper sideBarShown={this.props.sideBarShown} searchBarShown={this.props.searchBarShown} onLocationChanged={this.onLocationChanged.bind(this)} />
                    </div>
                </HashRouter>
                <Toasts />
                <ContentViewer />
                {
                    this.props.newWorkspaceCreator &&
                    <CreateWorkspace />
                }
                {
                    this.props.newTopicCreator &&
                    <CreateTopic />
                }
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main));
