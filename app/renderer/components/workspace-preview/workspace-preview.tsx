import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Workspace } from '../../constants/types';
import { DropTarget } from 'react-dnd';
const Types = {
    ITEM: 'toy'
}

const itemSource = {
    drop: (props) => {
        console.log('drop');
        console.log(props);
    },
    hover: (props) => {
        // console.log(props);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class WorkspacePreview extends React.Component<any, any> {

    render() {
        const { connectDropTarget, isOver, data } = this.props;
        const styles = {
            backgroundImage: data.getImgUrl()
        };
        return connectDropTarget(
            <div className={`workspace ${isOver ? 'entity-over' : ''}`} style={styles}>
                <label>{data.name}</label>
            </div>
        );
    }
}

export default DropTarget(Types.ITEM, itemSource, collect)(WorkspacePreview);
