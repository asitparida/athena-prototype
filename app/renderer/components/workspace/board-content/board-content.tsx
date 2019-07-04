import * as React from 'react';
import './board-content.scss'
import { DragSource } from 'react-dnd';
import { DragAndDropTypes, IContentItem, IBoardContent } from '../../../constants/types';
import { GetSampleItem } from '../../../constants/dummy-data';
import { ContentItemWrapper } from '../../content-item/content-item';

const itemSource = {
    beginDrag(props) {
        return {
            from: props.group,
            dragObject: props.data
        };
    },
    canDrag(props) {
        return !props.isBeingResized;
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

class BoardContent extends React.Component<IPropType | any, { contentData: IContentItem<any>}> {
    constructor(props) {
        super(props);
        this.state = {
            contentData: null
        };
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className="board-content">
                {
                    this.props.data &&
                    <ContentItemWrapper data={this.props.data} inheritDimensions={true} />
                }
            </div>
        );
    }
}

export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(BoardContent);
