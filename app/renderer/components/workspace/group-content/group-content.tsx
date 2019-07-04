import * as React from 'react';
import './group-content.scss';
import { BoardContentWrapper } from '../board-content-wrapper/board-content-wrapper';
import { IBoardGroupContent, ContentType, IToastItem, ToastType, DragAndDropTypes, IBoardGroupWrapper, IWorkspaceContentTransfer } from '../../../constants/types';
import { ItemHeight, ItemWidth } from '../../../constants/constants';
import { bindActionCreators } from 'redux';
import store from '../../../access/store/configureStore';
import * as AppActions from '../../../access/actions/appActions';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs';
import { WorkspaceContentTransfer } from '../../../access/observables/observables';

const mapStateToProps = ({ reducers }) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

const itemSource = {
    drop: (props: IPropType | any, monitor) => {
        // const toast: IToastItem = {
        //     id: `${Math.floor(Math.random() * 10e8)}`,
        //     message: `The clip has been pushed to the Group`,
        //     type: ToastType.Success
        // };
        // store.dispatch(AppActions.showToastNotification(toast))
        const dropItemResult = monitor.getItem();
        const data = {
            from: dropItemResult.from,
            to: props.data.id,
            data: dropItemResult.dragObject
        };
        if (data.from !== data.to) {
            WorkspaceContentTransfer.next(data);
        }
    }
}

function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver()
    }
}

interface IPropType { data?: IBoardGroupWrapper, onPropsChange: (data: any) => {}};

class GroupContent extends React.Component<IPropType | any, any> {
    transferSubscription: Subscription;
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    boardPropsChanged(i, data) {
        const rowItems = [].concat(this.state.items);
        rowItems[i].props.width = data.width + 20;
        rowItems[i].props.height = data.height;
        this.setState({
            items: rowItems
        });
        this.calculateGroupWidth(rowItems);
    }
    componentDidMount() {
        const rowItems = [
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Video, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Article, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Photo, props: { height: ItemHeight, width: ItemWidth } },
        ];
        this.setState({
            items: rowItems
        });
        this.calculateGroupWidth(rowItems);
        const groupId = this.props.data.id;
        this.transferSubscription = WorkspaceContentTransfer.subscribe((data: IWorkspaceContentTransfer) => {
            if (data.from === groupId) {
                let currentItems = [].concat(this.state.items);
                currentItems = currentItems.filter(temp => temp.id !== data.data.id);
                this.setState({
                    items: currentItems
                });
            } else if (data.to === groupId) {
                const currentItems = [].concat(this.state.items);
                currentItems.push({
                    id: data.data.id, type: data.data.contentType, props: { height: ItemHeight, width: ItemWidth }
                });
                this.setState({
                    items: currentItems
                })
            }
        });
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
        const { items } = this.state;
        return connectDropTarget(
            <div className={`group-content ${isOver ? 'entity-over' : ''}`} >
                {
                    items.length > 0 &&
                    items.map((item, i) => <BoardContentWrapper group={data.id} onPropsChange={this.boardPropsChanged.bind(this, i)} data={item} key={item.id} />)
                }
            </div>
        );
    }
}
export default DropTarget(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(GroupContent));
