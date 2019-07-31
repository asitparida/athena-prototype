import * as React from 'react';
import './create-workspace.scss'
import * as _ from 'lodash';
import { GraidentSchemes } from '../../constants/gradients';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

const mapStateToProps = ({ reducers }) => {
    return {
        workspaceRTEActionShown: reducers.workspaceRTEActionShown
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class CreateTopic extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            newTopicName: '',
            activeWorkspaceIndex: 0,
            workspaceList: []
        }
    }
    selectColor(i) {
        this.setState({
            activeGradientIndex: i
        });
    }
    onNewTopicNameChanged(e) {
        this.setState({
            newTopicName: e.target.value
        });
    }
    closeOverlay() {
        this.props.actions.hideTopicCreator();
    }
    createTopic() {
        this.props.actions.hideTopicCreator();
    }
    render() {
        return ReactDOM.createPortal((
            <div className="create-workspace">
                <div className='create-workspace-overlay' onClick={this.closeOverlay.bind(this)} />
                <div className='create-workspace-dialog'>
                    <label className='title'>New Topic</label>
                    <input autoFocus value={this.state.newTopicName} onChange={this.onNewTopicNameChanged.bind(this)} />
                    <div className='create-workspace-actions'>
                        <button className='add-btn' onClick={this.createTopic.bind(this)}>Create</button>
                    </div>
                </div>
            </div>
        ), document.body);
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(CreateTopic);
