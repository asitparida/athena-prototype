import * as React from 'react';
import { Component } from "react";
import { RouterWrapper } from '../router';
import '../styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../access/actions/appActions';

const mapStateToProps = ({ reducers }) => {
    return {
        sideBarShown: reducers.sideBarShown,
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
    toggleSidebar() {
        this.props.actions.toggleSideBar();
    }
    toggleDumpBar() {
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
    launchRTE() {
        this.props.actions.toggleRTE();
    }
    render() {
        const sideBarCollpased = this.props.sideBarShown ? 'expanded' : 'collapsed';
        return (
            <div className="app-content">
                <div className='app-dragger' />
                <div className='app-content-top'>
                    <div className='app-sidebar-toggle' onClick={this.toggleSidebar.bind(this)}>
                        <i className='material-icons'>menu</i>
                    </div>
                    <div className='app-actions-right'>
                        <div className='action' onClick={this.launchAnnotator.bind(this)}>
                            <i className='material-icons'>notes</i>
                        </div>
                        {
                            this.props.workspaceRTEActionShown &&
                            <div className={`action ${this.props.workspaceRTEShown ? 'active' : ''}`}  onClick={this.launchRTE.bind(this)}>
                                <i className="material-icons">text_fields</i>
                            </div>
                        }
                        {
                            this.props.workspaceDumpBarActionShown &&
                            <div className={`action ${this.props.workspaceDumpBarShown ? 'active' : ''}`}  onClick={this.toggleDumpBar.bind(this)}>
                                <i className='material-icons'>apps</i>
                            </div>
                        }
                    </div>
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
