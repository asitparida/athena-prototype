import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$, WorkspaceContentTransfer } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';
import { Resizer } from '../resizer/resizer';
import { IWorkspaceContentTransfer, IContentItem } from '../../constants/types';
import { ItemHeight, ItemWidth, BoardGroups } from '../../constants/constants';
import { Subscription } from 'rxjs';
import { WorkspaceViewSwitch } from './workspace-view-switch';

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
    transferSubscription: Subscription;
    constructor(props) {
        super(props);
        this.state = { rteWidth: 500, dumpGroundWidth: 350, workspaceId: null, groups: [] };
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        const { workspaceId, topicId } = this.props.match.params;
        this.setState({
            workspaceId,
            topicId,
            groups: BoardGroups
        });
        this.props.actions.showWorkspaceActions();
        this.transferSubscription = WorkspaceContentTransfer.subscribe((data: IWorkspaceContentTransfer) => {
            const groups = [];
            const originalGroups = this.state.groups;
            let change = false;
            const contentData = data.data as IContentItem<any>;
            originalGroups.forEach(group => {
                const groupId = group.id;
                let currentItems = [].concat(group.items);
                if (data.from === groupId) {
                    currentItems = currentItems.filter(temp => temp.id !== data.data.id);
                    change = true;
                } else if (data.to === groupId) {
                    currentItems.push({
                        id: contentData.id, type: contentData.contentType, props: { height: ItemHeight, width: ItemWidth }
                    });
                    change = true;
                }
                groups.push(Object.assign({}, group, {
                    items: currentItems
                }));
            })
            if (change) {
                this.setState({ groups });
            }
        });
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
                <WorkspaceViewSwitch canvasView={this.props.workspaceViewIsCanvas} workspaceId={this.state.workspaceId} groups={this.state.groups} />
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
