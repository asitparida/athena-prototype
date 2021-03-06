import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$, WorkspaceContentTransfer, CurrentEnableScrollIntoCenter } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';
import { Resizer } from '../resizer/resizer';
import { IWorkspaceContentTransfer, IContentItem, IBoardGroupWrapper, IGroupHeader } from '../../constants/types';
import { GetEmptyGroup, ExportNote } from '../../constants/constants';
import { Subscription } from 'rxjs';
import { WorkspaceViewSwitch } from './workspace-view-switch';
import { isEqual } from '../../transforms';
import ManageHeaders from '../manage-headers/manage-headers';
import { BoardGroups, GroupHeaders } from '../../constants/samples/groups';

const mapStateToProps = ({ reducers, workspaceReducers }) => {
    return {
        workspaceDumpBarShown: reducers.workspaceDumpBarShown,
        workspaceRTEShown: reducers.workspaceRTEShown,
        manageHeadersDialog: workspaceReducers.manageHeadersDialog,
        workspaceViewIsCanvas: workspaceReducers.workspaceViewIsCanvas,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

interface IState {
    rteWidth: number;
    dumpGroundWidth: number;
    workspaceId: string;
    topicId: string;
    groups: IBoardGroupWrapper[];
    headers: IGroupHeader[];
    scrollToCenter: boolean;
    composition: string;
}

class Workspace extends React.Component<any, IState> {
    transferSubscription: Subscription;
    compositionValue = null;
    constructor(props) {
        super(props);
        this.state = {
            rteWidth: 350,
            dumpGroundWidth: 350,
            workspaceId: null,
            topicId: null,
            groups: [],
            headers: [],
            scrollToCenter: true,
            composition: null
        };
    }
    componentDidUpdate(props) {
        if (isEqual(this.props.match.params, props.match.params) === false) {
            this.processParamsChange();
        }
    }
    // tslint:disable-next-line:variable-name
    processParamsChange() {
        const { workspaceId, topicId } = this.props.match.params;
        this.props.actions.activateWorkshopAndTopic(workspaceId, topicId);
        let groups = [];
        let headers = [];
        if (workspaceId === 'instagram' && topicId === 'sunscreen') {
            groups = BoardGroups;
            headers = GroupHeaders;
        } else {
            groups = [GetEmptyGroup()];
        }
        this.setState({
            workspaceId,
            topicId,
            groups,
            headers
        });
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        this.props.actions.hideWorkpsaceInHeader();
        this.processParamsChange();
        this.props.actions.showWorkspaceActions();
        this.transferSubscription = WorkspaceContentTransfer.subscribe((data: IWorkspaceContentTransfer) => {
            const content = data.data as IContentItem<any>;
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
                        group.items.push(content);
                        group.isEmpty = false;
                        change = true;
                    }
                })
            }
            if (!toGroup) {
                const group = GetEmptyGroup();
                group.items.push(content);
                group.isEmpty = false;
                groups = [].concat(...groups, group);
                change = true;
            }
            if (change) {
                const headers = this.state.headers;
                this.setState({ groups, headers, scrollToCenter: false });
            }
            CurrentEnableScrollIntoCenter.next(false);
        });
    }
    componentWillUnmount() {
        this.transferSubscription.unsubscribe();
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
    updateHeaders(headers) {
        this.setState({
            headers
        });
    }
    closeEditor() {
        this.props.actions.hideRTE();
    }
    gatherNotes() {
        let rteData = null;
        if (this.state.groups && this.state.groups.length > 0) {
            rteData = this.state.groups.reduce((prev, curr) => prev + `<p><strong>${curr.title}</strong></p><p>${curr.annotation}</p>`, '');
        }
        const compositionValue = this.compositionValue + rteData;
        this.setState({
            composition: compositionValue
        });
    }
    rteValueChange(value) {
        this.compositionValue = value;
    }
    exportComposition() {
        ExportNote(this.compositionValue);
    }
    onNotesAndTitleChanged(data) {
        const groups = [];
        const originalGroups = this.state.groups;
        originalGroups.forEach((group: IBoardGroupWrapper) => {
            groups.push(Object.assign({}, group, {
                title: group.id === data.id ? data.title : group.title,
                annotation: group.id === data.id ? data.annotation : group.annotation
            }));
        })
        this.setState({
            groups
        })
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
                <WorkspaceViewSwitch onNotesAndTitleChanged={this.onNotesAndTitleChanged.bind(this)} scrollToCenter={this.state.scrollToCenter} canvasView={this.props.workspaceViewIsCanvas} workspaceId={this.state.workspaceId} groups={this.state.groups} headers={this.state.headers} />
                {
                    this.props.workspaceRTEShown &&
                    <div className="rte-area" style={rteWidth}>
                        <Resizer onSizeChange={this.onRTESizeChange.bind(this)}>
                            <RTEEditor exportNotes={this.exportComposition.bind(this)} onChange={this.rteValueChange.bind(this)} gatherNotes={this.gatherNotes.bind(this)} closeEditor={this.closeEditor.bind(this)} value={this.state.composition} />
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
                {
                    this.props.manageHeadersDialog &&
                    <ManageHeaders fixed={true} groups={this.state.groups} headers={this.state.headers} updateHeaders={this.updateHeaders.bind(this)} />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
