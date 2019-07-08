import * as React from 'react';
import './canvas-group-item.scss'
import { DragSource } from 'react-dnd';
import { DragAndDropTypes, IContentItem, IBoardContent } from '../../../../constants/types';
import { GetSampleItem } from '../../../../constants/dummy-data';
import { ContentItemWrapper } from '../../../content-item/content-item';
import { ContentItemWithMenu } from '../../../content-item/content-item-with-menu';
import { WorkspaceContentTransfer } from '../../../../access/observables/observables';

const itemSource = {
    beginDrag(props) {
        return {
            from: props.group,
            dragObject: props.data
        };
    },
    canDrag(props) {
        return !props.isBeingResized;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            const data = {
                from: props.group,
                to: null,
                data: props.data
            };
            WorkspaceContentTransfer.next(data);
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

interface IPropType {
    data: IBoardContent;
}

class CanvasGroupItem extends React.Component<IPropType | any, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className="board-content">
                {
                    this.props.data &&
                    <ContentItemWithMenu data={this.props.data} inheritDimensions={true} />
                }
            </div>
        );
    }
}

export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(CanvasGroupItem);
