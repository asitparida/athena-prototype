import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$ } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';

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
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
    }
    componentWillUnmount() {
        ShowDumpBarAction$.next(false);
        ShowRTEAction$.next(false);
    }
    render() {
        return (
            <div className="workspace-wrapper">
                <div className="working-area">
                    {this.props.children}
                </div>
                {
                    this.props.workspaceRTEShown &&
                    <div className="rte-area">
                        <RTEEditor />
                    </div>
                }
                {
                    this.props.workspaceDumpBarShown &&
                    <div className="sticky-dumping-ground">
                        <DumpingGround sticky={true} workspace={true} />
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
