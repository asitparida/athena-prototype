import * as React from 'react';
import { DragSource } from 'react-dnd';
import { DragAndDropTypes } from '../../constants/types';

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
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className='content'>
                <h1>Content</h1>
                <h2>...</h2>
                <label className='content-label'>{this.props.label}</label>
            </div>
        );
    }
}
export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(ContentWrapper);
