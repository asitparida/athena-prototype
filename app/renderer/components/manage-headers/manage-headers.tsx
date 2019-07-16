import * as React from 'react';
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
}, {
}> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    closeOverlay() {
        this.props.actions.hideTopicCreator();
    }
    saveHeaders() {
        console.log('saveHeaders');
    }
    componentDidMount() {
        console.log(this.props.groups);
        console.log(this.props.headers);
    }
    render() {
        const { groups, headers } = this.props;
        const newGroupId = GetRandomId();
        return ReactDOM.createPortal((
            <div className={`create-workspace w1000`}>
                <div className='create-workspace-overlay' onClick={this.closeOverlay.bind(this)} />
                <div className='create-workspace-dialog'>
                    <label className='title'>Manage Headers</label>
                    <div className='headers-block'>
                        {
                            headers.length > 0 &&
                            headers.map((item, i) => <HeadersBlockItem key={item.id} data={item} />)
                        }
                        <HeadersBlockItem key={newGroupId} />
                    </div>
                    <div className='groups-block'>
                        {
                            groups.length > 0 &&
                            groups.map((item, i) => <GroupsBlockItem key={item.id} data={item} />)
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
