import * as React from 'react';
import './board-content.scss'
import { DragSource } from 'react-dnd';
import { DragAndDropTypes, IContentItem, IBoardContent } from '../../../constants/types';
import { GetSampleItem } from '../../../constants/dummy-data';
import { ContentItemWrapper } from '../../content-item/content-item';

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
    componentDidMount() {
        const data = GetSampleItem((this.props.data as IBoardContent).type);
        this.setState({
            contentData: data
        })
    }
    render() {
        const { isDragging, connectDragSource, src } = this.props;
        return connectDragSource(
            <div className="board-content">
                {
                    this.state.contentData &&
                    <ContentItemWrapper data={this.state.contentData} inheritDimensions={true} />
                }
            </div>
        );
    }
}

export default DragSource(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(BoardContent);
