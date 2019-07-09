import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../access/actions/appActions';
import './header.scss';
import WorkspacePreviewer from '../workspace-preview/workspace-previewer';
import { BuildTopicLink } from '../../transforms';

const mapStateToProps = ({ reducers, workspaceReducers }) => {
    return {
        sideBarShown: reducers.sideBarShown,
        workspaceInHeader: reducers.workspaceInHeader,
        workspaceActionInHeader: reducers.workspaceActionInHeader,
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceRTEShown: reducers.workspaceRTEShown,
        workspaceViewIsCanvas: workspaceReducers.workspaceViewIsCanvas,
        workspaceActionsAreShown: workspaceReducers.workspaceActionsAreShown,
        workspaceList: workspaceReducers.workspaceList,
        activeWorkspace: workspaceReducers.activeWorkspace
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            workspaceList: this.props.workspaceList
        };
    }
    toggleSidebar() {
        this.props.actions.toggleSideBar();
    }
    toggleRTE() {
        this.props.actions.hideDumpBar();
        this.props.actions.toggleRTE();
    }
    toggleDumpBar() {
        this.props.actions.hideRTE();
        this.props.actions.toggleDumpBar();
    }
    toggleWorkspaceInBar() {
        this.props.actions.toggleWorkpsaceInHeader();
    }
    launchAnnotator() {
        const ipcRenderer = (window as any).ipcRenderer;
        ipcRenderer.send('launch-annotator');
    }
    toggleWorkspaceView() {
        this.props.actions.toggleWorkspaceViewAsCanvas();
    }
    addNewTopic() {
        this.props.actions.showTopicCreator();
    }
    render() {
        return (
            <React.Fragment>
                <div className='app-actions left'>
                    <div className='app-sidebar-toggle' onClick={this.toggleSidebar.bind(this)}>
                        <i className='material-icons'>menu</i>
                    </div>
                    {
                        this.props.workspaceActionsAreShown && this.props.activeWorkspace && this.props.activeWorkspace.topics.length > 0 &&
                        <ul className='topic-headers'>
                            {
                                this.props.activeWorkspace.topics.map((topic, i) => {
                                    let styles = {};
                                    if (topic.active) {
                                        styles = {
                                            backgroundImage: this.props.activeWorkspace.gradient
                                        };
                                    }
                                    const link = BuildTopicLink(this.props.activeWorkspace.id, topic.id);
                                    return (<li key={topic.id} className={`topic ${topic.active ? 'active' : ''}`}><NavLink to={link}><label ><span>{topic.name}</span><span style={styles} className='active-marker ' /></label></NavLink></li>)
                                })
                            }
                            <li className='topic' onClick={this.addNewTopic.bind(this)}>
                                <i className='material-icons'>add</i>
                            </li>
                        </ul>
                    }
                </div>
                {
                    this.props.workspaceInHeader &&
                    <WorkspacePreviewer workspaces={this.state.workspaceList} />
                }
                <div className='app-actions right'>
                    {
                        this.props.workspaceActionsAreShown &&
                        <React.Fragment>
                            <div className='toggler' onClick={this.toggleWorkspaceView.bind(this)}>
                                <label role="button" className={`${this.props.workspaceViewIsCanvas ? 'active' : ''}`}>Canvas</label>
                                <label role="button" className={`${this.props.workspaceViewIsCanvas ? '' : 'active'}`}>Grid</label>
                            </div>
                            <div className='separator' />
                            <div className={`action ${this.props.workspaceRTEShown ? 'active' : ''}`} onClick={this.toggleRTE.bind(this)}>
                                <i className="material-icons">text_fields</i>
                            </div>
                            <div className={`action ${this.props.workspaceDumpBarShown ? 'active' : ''}`} onClick={this.toggleDumpBar.bind(this)}>
                                <i className='material-icons'>apps</i>
                            </div>
                        </React.Fragment>
                    }
                    {
                        this.props.workspaceActionInHeader &&
                        <div className={`action ${this.props.workspaceInHeader ? 'active' : ''}`} onClick={this.toggleWorkspaceInBar.bind(this)}>
                            <i className='material-icons'>view_week</i>
                        </div>
                    }
                    <div className='separator' />
                    <div className='action' onClick={this.launchAnnotator.bind(this)}>
                        <i className='material-icons'>format_shapes</i>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
