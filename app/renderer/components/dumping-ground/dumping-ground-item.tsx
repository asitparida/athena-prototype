import * as React from 'react';
import { DragSource } from 'react-dnd';
import { DragAndDropTypes } from '../../constants/types';
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

class DumpingGroundItem extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    menuInvoked($event) {
        this.props.menuInvoked($event);
    }
    onActionInvoked(name) {
        if (name === 'select') {
            ToggleSelection(this.props.data.id);
        }
    }
    toggleSelection() {
        ToggleSelection(this.props.data.id);
    }
    render() {
        const { isDragging, connectDragSource, src, isSelectionEnabled } = this.props;
        return connectDragSource(
            <div className={`content-item-wrapper ${isSelectionEnabled ? 'show-selection' : ''} ${isDragging ? ' is-draging' : ''}`}>
                <div className={`selection-mask ${this.props.data.selected ? 'active' : ''}`} onClick={this.toggleSelection.bind(this)}><i className='material-icons'>check</i></div>
                <ContentItemWithMenu data={this.props.data} menuInvoked={this.menuInvoked.bind(this)} onActionInvoked={this.onActionInvoked.bind(this)}  />
            </div>
        );
    }
}
export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(DumpingGroundItem));
