import * as React from 'react';
import { DragSource } from 'react-dnd';
import { DragAndDropTypes, IBoardGroupWrapper } from '../../constants/types';
import { ContentItemWithMenu } from '../content-item/content-item-with-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../access/actions/appActions';
import { ToggleSelection } from '../../access/observables/observables';

const mapStateToProps = ({ reducers }) => {
    return {
        isSelectionEnabled: reducers.isSelectionEnabled
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    beginDrag(props) {
        return {
            dragObject: props.data
        };
    }
}

function collect(connector, monitor) {
    return {
        connectDragSource: connector.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class GroupsBlockItem extends React.Component<{
    data?: IBoardGroupWrapper
} | any, any> {
    constructor(props) {
        super(props);
    }
    // onActionInvoked(name) {}
    toggleSelection() {
        ToggleSelection(this.props.data.id);
    }
    render() {
        const { isDragging, connectDragSource } = this.props;
        return connectDragSource(
            <div className={`groups-block-item-wrapper ${isDragging ? 'entity-dragged' : ''}`}>
                <label className='group-title'>{this.props.data.title}</label>
            </div>
        );
    }
}
export default DragSource(DragAndDropTypes.HEADER_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(GroupsBlockItem));
