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
import { ItemHeight, ItemWidth, BoardGroups, GetEmptyGroup } from '../../constants/constants';
import { Subscription } from 'rxjs';
import { WorkspaceViewSwitch } from './workspace-view-switch';
import { isEqual } from '../../transforms';

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
    componentDidUpdate(props) {
        if (isEqual(this.props.match.params, props.match.params) === false) {
            this.processParamsChange();
        }
    }
    processParamsChange() {
        const { workspaceId, topicId } = this.props.match.params;
        this.props.actions.activateWorkshopAndTopic(workspaceId, topicId);
        this.setState({
            workspaceId,
            topicId,
            groups: BoardGroups
        });
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        this.processParamsChange();
        this.props.actions.showWorkspaceActions();
        this.transferSubscription = WorkspaceContentTransfer.subscribe((data: IWorkspaceContentTransfer) => {
            const contentData = data.data as IContentItem<any>;
            let change = false;
            let groups = [];
            const originalGroups = this.state.groups;
            const fromGroup = originalGroups.find(group => group.id === data.from);
            const toGroup = originalGroups.find(group => group.id === data.to);
            originalGroups.forEach(group => {
                groups.push(Object.assign({}, group, {
                    items: [].concat(group.items)
                }));
            })
            if (fromGroup || toGroup) {
                groups.forEach(group => {
                    const groupId = group.id;
                    if (data.from === groupId) {
                        group.items = group.items.filter(temp => temp.id !== data.data.id);
                        change = true;
                    } else if (data.to === groupId) {
                        group.items.push({
                            id: contentData.id, type: contentData.contentType, props: { height: ItemHeight, width: ItemWidth }
                        });
                        change = true;
                    }
                })
            }
            if (!toGroup) {
                const group = GetEmptyGroup();
                group.items.push({
                    id: contentData.id, type: contentData.contentType, props: { height: ItemHeight, width: ItemWidth }
                });
                groups = [].concat(...groups, group);
                change = true;
            }
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
