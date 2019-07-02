import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$ } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';
import { Resizer } from '../resizer/resizer';
import Board from './board/board';

const mapStateToProps = ({ reducers }) => {
    return {
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceRTEShown: reducers.workspaceRTEShown
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
        this.state = { rteWidth: 500, dumpGroundWidth : 300, workspaceId: null };
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        const { id } = this.props.match.params
        this.setState({
            workspaceId: id
        });
    }
    componentWillUnmount() {
        ShowDumpBarAction$.next(false);
        ShowRTEAction$.next(false);
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
                <div className="working-area">
                    {
                        this.state.workspaceId &&
                        <Board id={this.state.workspaceId} />
                    }
                </div>
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
