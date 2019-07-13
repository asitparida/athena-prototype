import * as React from 'react';
import './create-workspace.scss'
import * as _ from 'lodash';
import { GraidentSchemes } from '../../constants/gradients';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { connect } from 'react-redux';

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

class CreateWorkspace extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            activeGradientIndex: 0,
            newWorkspaceName: '',
            gradients: _.take(_.shuffle(GraidentSchemes), 8)
        }
    }
    selectColor(i) {
        this.setState({
            activeGradientIndex: i
        });
    }
    onNewWorkspaceChanged(e) {
        this.setState({
            newWorkspaceName: e.target.value
        });
    }
    closeOverlay() {
        this.props.actions.hideWorkspaceCreator();
    }
    createWorkspace() {
        this.props.actions.hideWorkspaceCreator();
    }
    render() {
        return (
            <div className="create-workspace">
                <div className='create-workspace-overlay' onClick={this.closeOverlay.bind(this)} />
                <div className='create-workspace-dialog'>
                    <label>Enter Workspace Name</label>
                    <input autoFocus value={this.state.newWorkspaceName} onChange={this.onNewWorkspaceChanged.bind(this)} />
                    <div className='create-workspace-actions'>
                        <button className='add-btn' onClick={this.createWorkspace.bind(this)}>Create</button>
                        <ul className='colors'>
                            {
                                this.state.gradients.length > 0 &&
                                this.state.gradients.map((grad, i) => {
                                    const styles = {
                                        backgroundImage: grad.gradient
                                    };
                                    return <li onClick={this.selectColor.bind(this, i)} className={`${i === this.state.activeGradientIndex ? 'active' : ''}`} key={i} style={styles} />;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(CreateWorkspace);
