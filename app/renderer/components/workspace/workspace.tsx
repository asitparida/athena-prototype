import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$ } from '../../access/observables/observables';

const mapStateToProps = ({ reducers }) => {
    return {
        workspaceDumpBarShown: reducers.workspaceDumpBarShown
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class Workspace extends React.Component<any, any> {
    componentDidMount() {
        console.log('componentDidMount');
        ShowDumpBarAction$.next(true);
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
        ShowDumpBarAction$.next(false);
    }
    render() {
        return (
            <div className="workspace-wrapper">
                <div className="working-area">
                    {this.props.children}
                </div>
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
