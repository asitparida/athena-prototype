import * as React from 'react';
import { DropTarget } from 'react-dnd';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../access/store/configureStore';
import { IToastItem, ToastType, DragAndDropTypes } from '../../constants/types';
import { DumpingGroundTransfer } from '../../access/observables/observables';

const mapStateToProps = ({ reducers }) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    drop: (props, monitor) => {
        const dropItemResult = monitor.getItem();
        const toast: IToastItem = {
            id: `${Math.floor(Math.random() * 10e8)}`,
            message: `The clip has been pushed to the ${props.data.name}`,
            type: ToastType.Success
        };
        store.dispatch(AppActions.showToastNotification(toast))
        DumpingGroundTransfer.next(dropItemResult.dragObject);
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
            backgroundImage: data.gradient
        };
        const fillStyle1 = {
            fill: data.color1
        };
        const fillStyle2 = {
            fill: data.color2
        };
        return connectDropTarget(
            <div className={`workspace ${isOver ? 'entity-over' : ''}`}>
                <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 57 57" width="50px" height="40px" className='svg-container'>
                    <g>
                    <g id="XMLID_98_">
                        <polygon id="XMLID_97_" style={fillStyle1} points="23,13 20,5 0,5 0,13 0,52 48,52 48,13  " data-original="#F3D55C" data-old_color="#F3D55C" />
                        <path id="XMLID_111_" style={fillStyle2} d="M48,17h9l-8.938,34.761C48.052,51.796,48,51.79,48,51.753V17z" data-original="#F0C41B" data-old_color="#F0C41B" />
                        <rect id="XMLID_110_" x="6" y="33" style={fillStyle1} width="22" height="13" data-original="#F5F1E2" data-old_color="#F5F1E2" />
                        <path id="XMLID_109_" style={fillStyle1} d="M19,43h-9c-0.553,0-1-0.447-1-1c0-0.553,0.447-1,1-1h9c0.553,0,1,0.447,1,1   C20,42.553,19.553,43,19,43" data-original="#D6D0BB" data-old_color="#D6D0BB" />
                        <path id="XMLID_108_" style={fillStyle1} d="M14,38h-4c-0.553,0-1-0.447-1-1c0-0.553,0.447-1,1-1h4c0.553,0,1,0.447,1,1   C15,37.553,14.553,38,14,38" data-original="#D6D0BB" data-old_color="#D6D0BB" />
                        <path id="XMLID_107_" style={fillStyle1} d="M24,38h-2c-0.553,0-1-0.447-1-1c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1   C25,37.553,24.553,38,24,38" data-original="#D6D0BB" data-old_color="#D6D0BB" />
                        <path id="XMLID_106_" style={fillStyle1} d="M23,43c-0.271,0-0.521-0.11-0.71-0.3C22.109,42.52,22,42.27,22,42   c0-0.271,0.109-0.521,0.29-0.71c0.37-0.37,1.05-0.37,1.42,0C23.89,41.479,24,41.74,24,42s-0.11,0.52-0.29,0.71   C23.52,42.89,23.26,43,23,43" data-original="#D6D0BB" data-old_color="#D6D0BB" />
                        <path id="XMLID_105_" style={fillStyle1} d="M18,38c-0.26,0-0.521-0.11-0.71-0.29C17.109,37.52,17,37.26,17,37   s0.109-0.521,0.29-0.71c0.358-0.37,1.05-0.37,1.42,0C18.89,36.479,19,36.729,19,37c0,0.26-0.11,0.52-0.29,0.71   C18.52,37.89,18.26,38,18,38" data-original="#D6D0BB" data-old_color="#D6D0BB" />
                    </g>
                </g>
                </svg>
            <label>
                {/* <i className={`material-icons folder-icon`} style={styles}>folder</i> */}
                <span>{data.name}</span>
            </label>
            </div >
        );
    }
}

export default DropTarget(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(WorkspacePreview));
