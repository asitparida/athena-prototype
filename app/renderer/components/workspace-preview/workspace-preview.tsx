import * as React from 'react';
import { DropTarget } from 'react-dnd';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../access/store/configureStore';
import { IToastItem, ToastType, DragAndDropTypes } from '../../constants/types';

const mapStateToProps = ({ reducers }) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    drop: (props) => {
        const toast: IToastItem = {
            id: `${Math.floor(Math.random() * 10e8)}`,
            message: `The clip has been pushed to the ${props.data.name}`,
            type: ToastType.Success
        };
        store.dispatch(AppActions.showToastNotification(toast))
    }
}

function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
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

export default DropTarget(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(WorkspacePreview));
