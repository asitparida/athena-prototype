import * as React from 'react';
import { DragSource } from 'react-dnd';
import { DragAndDropTypes } from '../../constants/types';
import { ContentItemWrapper } from '../content-item/content-item';
import { ContentItemWithMenu } from '../content-item/content-item-with-menu';

const itemSource = {
    beginDrag(props) {
        return {
            itemLabel: props.id
        };
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DumpingGroundItem extends React.Component<any, any> {
    menuInvoked($event) {
        this.props.menuInvoked($event);
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className='content-item-wrapper'>
                <ContentItemWithMenu data={this.props.data} menuInvoked={this.menuInvoked.bind(this)}  />
            </div>
        );
    }
}
export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(DumpingGroundItem);
