import * as React from 'react';
import './board-content.scss'
import { DragSource } from 'react-dnd';
import { DragAndDropTypes } from '../../../constants/types';

const itemSource = {
    beginDrag(props) {
        /* code here */
        // console.log('beginDrag', props);
        return {
            itemLabel: props.id
        };
    },
    endDrag(props) {
        /* code here */
        // console.log(this.props);
        // console.log('endDrag');
    },
    canDrag(props, monitor) {
        return !props.isBeingResized;
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class BoardContent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className="board-content">
                <h1>Board Content</h1>
            </div>
        );
    }
}

export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(BoardContent);
