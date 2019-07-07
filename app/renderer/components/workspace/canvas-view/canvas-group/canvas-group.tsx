import * as React from 'react';
import * as _ from 'lodash';
import './canvas-group.scss';
import { CanvasGroupItemWrapper } from '../canvas-group-item-wrapper/canvas-group-item-wrapper';
import { ContentType, DragAndDropTypes, IBoardGroupWrapper, IWorkspaceContentTransfer } from '../../../../constants/types';
import { ItemHeight, ItemWidth } from '../../../../constants/constants';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../../../access/actions/appActions';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs';
import { WorkspaceContentTransfer, DumpingGroundTransfer } from '../../../../access/observables/observables';

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    drop: (props: IPropType | any, monitor) => {
        const dropItemResult = monitor.getItem();
        const data = {
            from: dropItemResult.from,
            to: props.data.id,
            data: dropItemResult.dragObject
        };
        if (data.from !== data.to) {
            WorkspaceContentTransfer.next(data);
        }
        if (!data.from) {
            DumpingGroundTransfer.next(dropItemResult.dragObject);
        }
    }
}

function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver()
    }
}

interface IPropType { data?: IBoardGroupWrapper, onPropsChange: (data: any) => {} };

class GroupContent extends React.Component<IPropType | any, any> {
    transferSubscription: Subscription;
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    boardPropsChanged(i, data) {
        const rowItems = [].concat(this.props.data.items);
        rowItems[i].props.width = data.width + 20;
        rowItems[i].props.height = data.height;
        this.setState({
            items: rowItems
        });
        this.calculateGroupWidth(rowItems);
    }
    componentDidMount() {
        this.calculateGroupWidth(this.props.data.items);
    }
    calculateGroupWidth(items) {
        const data = {
            width: Math.max.apply(null, items.map(item => item.props.width)),
            height: items.reduce((curr, prev) => curr + prev.props.height, 0)
        };
        this.props.onPropsChange(data);
    }
    render() {
        const { connectDropTarget, isOver, data } = this.props;
        const { items } = this.props.data;
        return connectDropTarget(
            <div className={`group-content ${isOver ? 'entity-over' : ''}`} >
                {
                    items.length > 0 &&
                    items.map((item, i) => <CanvasGroupItemWrapper group={data.id} onPropsChange={this.boardPropsChanged.bind(this, i)} data={item} key={item.id} />)
                }
            </div>
        );
    }
}
export default DropTarget(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(GroupContent));
