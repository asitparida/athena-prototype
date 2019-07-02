import * as React from 'react';
import './group-content.scss';
import { BoardContentWrapper } from '../board-content-wrapper/board-content-wrapper';
import { IBoardGroupContent, ContentType, IToastItem, ToastType, DragAndDropTypes } from '../../../constants/types';
import { ItemHeight, ItemWidth } from '../../../constants/constants';
import { bindActionCreators } from 'redux';
import store from '../../../access/store/configureStore';
import * as AppActions from '../../../access/actions/appActions';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

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
            message: `The clip has been pushed to the Group`,
            type: ToastType.Success
        };
        store.dispatch(AppActions.showToastNotification(toast))
    },
    hover: (props) => {
        // console.log(props);
    }
}

function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver()
    }
}

interface IPropType { data?: IBoardGroupContent, onPropsChange: (data: any) => {}};

class GroupContent extends React.Component<IPropType | any, any> {
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
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Article, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Link, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Photo, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.SocialMedia, props: { height: ItemHeight, width: ItemWidth } },
            { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Video, props: { height: ItemHeight, width: ItemWidth } },
        ];
        this.setState({
            items: rowItems.filter((item, i) => i < 3)
        });
        this.calculateGroupWidth(rowItems);
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
                    items.map((item, i) => <BoardContentWrapper onPropsChange={this.boardPropsChanged.bind(this, i)} data={item} key={i} />)
                }
            </div>
        );
    }
}
export default DropTarget(DragAndDropTypes.DUMPING_GROUND_ITEM, itemSource, collect)(connect(mapStateToProps, mapDispatchToProps)(GroupContent));
