import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$ } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';
import { Resizer } from '../resizer/resizer';
import CanvasView from './canvas-view/canvas-view';
import ListView from './list-view/list-view';

const mapStateToProps = ({ reducers, workspaceReducers }) => {
    return {
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceRTEShown: reducers.workspaceRTEShown,
        workspaceViewIsCanvas: workspaceReducers.workspaceViewIsCanvas
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class Workspace extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { rteWidth: 500, dumpGroundWidth: 300, workspaceId: null };
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        const { workspaceId, topicId } = this.props.match.params;
        console.log(workspaceId, topicId);
        this.setState({
            workspaceId,
            topicId
        });
        this.props.actions.showWorkspaceActions();
    }
    componentWillUnmount() {
        ShowDumpBarAction$.next(false);
        ShowRTEAction$.next(false);
        this.props.actions.hideWorkspaceActions();
    }
    onRTESizeChange(width) {
        this.setState({
            rteWidth: width
        });
    }
    onDUMPBarSizeChange(width) {
        this.setState({
            dumpGroundWidth: width
        });
    }
    render() {
        const rteWidth = {
            width: `${this.state.rteWidth}px`
        }
        const dumpGroundWidth = {
            width: `${this.state.dumpGroundWidth}px`
        }
        return (
            <div className="workspace-wrapper">
                {
                    this.props.workspaceViewIsCanvas && this.state.workspaceId &&
                    <div className="working-area">
                        <CanvasView id={this.state.workspaceId} />
                    </div>
                }
                {
                    !this.props.workspaceViewIsCanvas && this.state.workspaceId &&
                    <ListView />
                }
                {
                    this.props.workspaceRTEShown &&
                    <div className="rte-area" style={rteWidth}>
                        <Resizer onSizeChange={this.onRTESizeChange.bind(this)}>
                            <RTEEditor />
                        </Resizer>
                    </div>
                }
                {
                    this.props.workspaceDumpBarShown &&
                    <div className="sticky-dumping-ground" style={dumpGroundWidth}>
                        <Resizer onSizeChange={this.onDUMPBarSizeChange.bind(this)}>
                            <DumpingGround sticky={true} workspace={true} />
                        </Resizer>
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
