import * as React from 'react';
import './workspace.scss';
import DumpingGround from '../dumping-ground/dumping-ground';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ShowDumpBarAction$, ShowRTEAction$, WorkspaceContentTransfer, CurrentEnableScrollIntoCenter } from '../../access/observables/observables';
import RTEEditor from '../rte-editor/rte-editor';
import { Resizer } from '../resizer/resizer';
import { IWorkspaceContentTransfer, IContentItem, IGroupHeader } from '../../constants/types';
import { ItemHeight, ItemWidth, BoardGroups, GetEmptyGroup } from '../../constants/constants';
import { Subscription } from 'rxjs';
import { WorkspaceViewSwitch } from './workspace-view-switch';
import { isEqual } from '../../transforms';
import ManageHeaders from '../manage-headers/manage-headers';

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

class Workspace extends React.Component<any, any> {
    transferSubscription: Subscription;
    constructor(props) {
        super(props);
        this.state = {
            rteWidth: 350,
            dumpGroundWidth: 350,
            workspaceId: null,
            groups: [],
            headers: [],
            scrollToCenter: true
        };
    }
    componentDidUpdate(props) {
        if (isEqual(this.props.match.params, props.match.params) === false) {
            this.processParamsChange();
        }
    }
    // tslint:disable-next-line:variable-name
    getHeaders(_groups) {
        const headers: IGroupHeader[] = [];
        const groups = _groups || [];
        if (groups && groups.length > 0) {
            const header: IGroupHeader = {
                id: `${Math.floor(Math.random() * 10e8)}`,
                name: 'Header',
                groups: [],
                drawProps: {}
            }
            if (groups[0]) { header.groups.push({ id: groups[0].id, name: groups[0].title})}
            if (groups[1]) { header.groups.push({ id: groups[1].id, name: groups[1].title})}
            headers.push(header);
            const header2: IGroupHeader = {
                id: `${Math.floor(Math.random() * 10e8)}`,
                name: 'Header',
                groups: [],
                drawProps: {}
            }
            if (groups[groups.length - 1]) { header2.groups.push({ id: groups[groups.length - 1].id, name: groups[groups.length - 1].title})}
            if (groups[groups.length - 2]) { header2.groups.push({ id: groups[groups.length - 2].id, name: groups[groups.length - 2].title})}
            headers.push(header2);
        }
        return headers;
    }
    processParamsChange() {
        const { workspaceId, topicId } = this.props.match.params;
        this.props.actions.activateWorkshopAndTopic(workspaceId, topicId);
        this.setState({
            workspaceId,
            topicId,
            groups: BoardGroups,
            headers: this.getHeaders(BoardGroups)
        });
    }
    componentDidMount() {
        ShowDumpBarAction$.next(true);
        ShowRTEAction$.next(true);
        this.props.actions.hideWorkpsaceInHeader();
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
                    id: contentData.id, type: contentData.contentType, props: { height: ItemHeight, width: ItemWidth + 20 }
                });
                groups = [].concat(...groups, group);
                change = true;
            }
            if (change) {
                const headers = this.getHeaders(groups);
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
    render() {
        const rteWidth = {
            width: `${this.state.rteWidth}px`
        }
        const dumpGroundWidth = {
            width: `${this.state.dumpGroundWidth}px`
        }
        return (
            <div className="workspace-wrapper">
                <WorkspaceViewSwitch scrollToCenter={this.state.scrollToCenter} canvasView={this.props.workspaceViewIsCanvas} workspaceId={this.state.workspaceId} groups={this.state.groups} headers={this.state.headers} />
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
                {
                    this.props.manageHeadersDialog &&
                    <ManageHeaders fixed={true} groups={this.state.groups} headers={this.state.headers} updateHeaders={this.updateHeaders.bind(this)} />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
