import * as React from 'react';
import { DragSource } from 'react-dnd';
import { DragAndDropTypes } from '../../constants/types';
import { ContentItemWrapper } from '../content-item/content-item';

const itemSource = {
    beginDrag(props) {
        /* code here */
        console.log('beginDrag', props);
        return {
            itemLabel: props.id
        };
    },
    endDrag(props) {
        /* code here */
        console.log(this.props);
        console.log('endDrag');
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ContentWrapper extends React.Component<any, any> {
    menuInvoked($event) {
        this.props.menuInvoked($event);
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className='content-item-wrapper'>
                <ContentItemWrapper data={this.props.data} menuInvoked={this.menuInvoked.bind(this)}  />
            </div>
        );
    }
}
export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(ContentWrapper);
