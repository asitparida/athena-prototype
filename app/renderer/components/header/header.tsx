import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../access/actions/appActions';
import './header.scss';
import { WorkspaceList } from '../../constants/constants';
import { Workspace } from '../../constants/types';

const mapStateToProps = ({ reducers }) => {
    return {
        sideBarShown: reducers.sideBarShown,
        workspaceInHeader: reducers.workspaceInHeader,
        workspaceActionInHeader: reducers.workspaceActionInHeader,
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

class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            workspaces: WorkspaceList
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
    render() {
        return (
            <React.Fragment>
                <div className='app-actions left'>
                    <div className='app-sidebar-toggle' onClick={this.toggleSidebar.bind(this)}>
                        <i className='material-icons'>menu</i>
                    </div>
                </div>
                {
                    this.props.workspaceInHeader &&
                    <div className='app-workspace-preview'>
                        {
                            this.state.workspaces.map((w: Workspace, i) => {
                                const styles = {
                                    backgroundImage: w.getImgUrl()
                                };
                                return <div key={i} className='workspace' style={styles}>
                                    <label>{w.name}</label>
                                </div>;
                            })
                        }
                    </div>
                }
                <div className='app-actions right'>
                    {
                        this.props.workspaceRTEActionShown &&
                        <div className={`action ${this.props.workspaceRTEShown ? 'active' : ''}`} onClick={this.toggleRTE.bind(this)}>
                            <i className="material-icons">text_fields</i>
                        </div>
                    }
                    {
                        this.props.workspaceDumpBarActionShown &&
                        <div className={`action ${this.props.workspaceDumpBarShown ? 'active' : ''}`} onClick={this.toggleDumpBar.bind(this)}>
                            <i className='material-icons'>apps</i>
                        </div>
                    }
                    {
                        this.props.workspaceActionInHeader &&
                        <div className={`action ${this.props.workspaceInHeader ? 'active' : ''}`} onClick={this.toggleWorkspaceInBar.bind(this)}>
                            <i className='material-icons'>storage</i>
                        </div>
                    }
                    <div className='action' onClick={this.launchAnnotator.bind(this)}>
                        <i className='material-icons'>notes</i>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
