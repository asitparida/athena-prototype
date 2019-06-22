import * as React from 'react';
import { Component } from "react";
import { RouterWrapper } from '../router';
import '../styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../access/actions/appActions';
import { InitializeSubscriptions, RemoveSubscriptions } from '../access/observables/observables';
import Header from '../components/header/header';

const mapStateToProps = ({ reducers }) => {
    return {
        sideBarShown: reducers.sideBarShown,
        workspaceInHeader: reducers.workspaceInHeader,
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceDumpBarActionShown: reducers.workspaceDumpBarActionShown,
        workspaceRTEShown: reducers.workspaceRTEShown,
        workspaceRTEActionShown: reducers.workspaceRTEActionShown
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
        ipcRenderer.send('launch-annotator');
        const remote = (window as any).remote;
        const api = `http://localhost:${remote.getCurrentWindow().API_PORT}/api/meta/`;
        fetch(api)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            }, (data) => {
                console.log(data);
            });
    }
    toggleRTE() {
        this.props.actions.hideDumpBar();
        this.props.actions.toggleRTE();
    }
    render() {
        const sideBarCollpased = this.props.sideBarShown ? 'expanded' : 'collapsed';
        return (
            <div className="app-content">
                <div className='app-dragger' />
                <div className={`app-content-top ${this.props.workspaceInHeader ? 'expanded' : 'collapsed'}`}>
                    <Header />
                </div>
                <div className='app-content-bottom'>
                    <RouterWrapper sideBarCollpased={sideBarCollpased} />
                </div>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
