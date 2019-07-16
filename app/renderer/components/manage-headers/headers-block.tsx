import * as React from 'react';
import { DropTarget } from 'react-dnd';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../access/store/configureStore';
import { IToastItem, ToastType, DragAndDropTypes, IGroupHeader } from '../../constants/types';
import { DumpingGroundTransfer } from '../../access/observables/observables';

const mapStateToProps = ({ reducers }) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    drop: (props, monitor) => {
        const dropItemResult = monitor.getItem();
        DumpingGroundTransfer.next(dropItemResult.dragObject);
    }
}

function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver()
    }
}

class HeadersBlockItem extends React.Component<{
    data?: IGroupHeader
} | any, any> {

    render() {
        const { connectDropTarget, isOver, data } = this.props;
        return connectDropTarget(
            <div className={`headers-block-item-wrapper ${isOver ? 'entity-over' : ''}`}>
                {
                    this.props.data &&
                    <React.Fragment>
                        <input className='header-title' defaultValue={this.props.data.name} />
                        {
                            <div className='groups-block'>
                                {
                                    this.props.data.groups.length > 0 &&
                                    this.props.data.groups.map((group, i) => {
                                        return (
                                            <div key={group} className={`groups-block-item-wrapper`}>
                                                <label className='group-title'>{group}</label>
                                                <i className='material-icons'>close</i>
                                            </div>);
                                    })
                                }
                            </div>
                        }
                    </React.Fragment>
                }
                {
                    !this.props.data &&
                    <React.Fragment>
                        <div className='new-header'>
                            <input className='header-title' placeholder='Group Name' />
                        </div>
                        <div className='drop-area'>
                            <label>Drag and drop groups here</label>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default DropTarget(DragAndDropTypes.HEADER_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(HeadersBlockItem));
