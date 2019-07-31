import * as React from 'react';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { IBoardGroupWrapper, IGroupHeader } from '../../constants/types';
import HeadersBlockItem from './headers-block';
import GroupsBlockItem from './groups-block';
import { GetRandomId } from '../../constants/constants';
import './manage-headers.scss';

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

class ManageHeaders extends React.Component<{
    actions: any;
    fixed?: boolean;
    groups?: IBoardGroupWrapper[],
    headers?: IGroupHeader[]
    updateHeaders?: (headers?: IGroupHeader[]) => {}
}, {
    groups?: IBoardGroupWrapper[],
    headers?: IGroupHeader[],
    newGroupId: string
}> {
    newGroupId;
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            groups: [],
            newGroupId: GetRandomId()
        };
    }
    closeOverlay() {
        this.props.actions.hideTopicCreator();
    }
    componentDidMount() {
        const usedGroupHeaders = [];
        this.props.headers.forEach(head => {
            head.groups.forEach(group => {
                if (_.indexOf(usedGroupHeaders, group.id)) {
                    usedGroupHeaders.push(group.id);
                }
            });
        });
        const groups = [].concat(this.props.groups);
        groups.forEach(group => {
            group.available = _.indexOf(usedGroupHeaders, group.id) !== -1
        })
        this.setState({
            headers: this.props.headers,
            groups,
            newGroupId: GetRandomId()
        });
    }
    saveHeaders() {
        const headers = this.state.headers.filter(head => head.groups.length > 0);
        this.props.updateHeaders(headers);
        this.props.actions.hideTopicCreator();
    }
    groupAdded(headerId, isNew = false, group) {
        const headers: IGroupHeader[] = [].concat(this.state.headers);
        let newHeaders: IGroupHeader[] = [];
        const newGroupProps = {
            id: group.id, name: group.title
        };
        if (isNew) {
            const newHeader: IGroupHeader = {
                groups: [newGroupProps],
                id: headerId,
                name: 'New Group'
            };
            newHeaders = headers;
            newHeaders.push(newHeader);
        } else {
            headers.forEach(head => {
                let _groups = [].concat(head.groups);
                if (head.id === headerId) {
                    _groups = [].concat(_groups, newGroupProps)
                }
                newHeaders.push({
                    groups: _groups,
                    id: head.id,
                    name: head.name
                });
            });
        }
        const usedGroupHeaders = [];
        newHeaders.forEach(head => {
            head.groups.forEach(item => {
                if (_.indexOf(usedGroupHeaders, item.id)) {
                    usedGroupHeaders.push(item.id);
                }
            });
        });
        const groups = [].concat(this.state.groups);
        groups.forEach(item => {
            item.available = _.indexOf(usedGroupHeaders, item.id) !== -1
        })
        this.setState({
            headers: newHeaders,
            groups,
            newGroupId: GetRandomId()
        });
    }
    removeGroup(headerId, groupId) {
        const headers: IGroupHeader[] = [].concat(this.state.headers);
        const newHeaders: IGroupHeader[] = [];
        headers.forEach(head => {
            // tslint:disable-next-line:variable-name
            let _groups = [].concat(head.groups);
            if (head.id === headerId) {
                _groups = _groups.filter(group => group.id !== groupId);
            }
            newHeaders.push({
                groups: [].concat(_groups),
                id: head.id,
                name: head.name
            });
        });
        const usedGroupHeaders = [];
        newHeaders.forEach(head => {
            head.groups.forEach(item => {
                if (_.indexOf(usedGroupHeaders, item.id)) {
                    usedGroupHeaders.push(item.id);
                }
            });
        });
        const groups = [].concat(this.state.groups);
        groups.forEach(item => {
            item.available = _.indexOf(usedGroupHeaders, item.id) !== -1
        })
        this.setState({
            headers: newHeaders,
            // groups,
            newGroupId: GetRandomId()
        });
    }
    updateHeaderTitle(headerId, title) {
        const headers = [].concat(this.state.headers);
        const header = headers.find(head => head.id === headerId);
        if (header) {
            header.name = title;
        }
        this.setState({
            headers
        })
    }
    render() {
        const { headers, newGroupId, groups } = this.state;
        return ReactDOM.createPortal((
            <div className={`create-workspace w1000`}>
                <div className='create-workspace-overlay' onClick={this.closeOverlay.bind(this)} />
                <div className='create-workspace-dialog'>
                    <label className='title'>Manage Headers</label>
                    <div className='headers-block'>
                        {
                            headers.length > 0 &&
                            headers.map((item, i) => <HeadersBlockItem updateHeaderTitle={this.updateHeaderTitle.bind(this, item.id)} key={item.id} data={item} groupAdded={this.groupAdded.bind(this, item.id, false)} removeGroup={this.removeGroup.bind(this, item.id)} />)
                        }
                        <HeadersBlockItem updateHeaderTitle={this.updateHeaderTitle.bind(this, newGroupId)} key={newGroupId} groupAdded={this.groupAdded.bind(this, newGroupId, true)} removeGroup={this.removeGroup.bind(this, newGroupId)} />
                    </div>
                    <label className='avaialble-group-label'>Avaialble Groups</label>
                    <div className='groups-block'>
                        {
                            groups.length > 0 &&
                            groups.map((item: any, i) => {
                                if (!item.available) {
                                    return <GroupsBlockItem key={item.id} data={item} />
                                }
                            })
                        }
                    </div>
                    <div className='create-workspace-actions'>
                        <button className='add-btn' onClick={this.saveHeaders.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        ), document.body);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageHeaders);
