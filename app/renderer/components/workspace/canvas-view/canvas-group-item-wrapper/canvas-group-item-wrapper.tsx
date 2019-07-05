import * as React from 'react';
import './canvas-group-item-wrapper.scss'
import CanvasGroupItem from '../canvas-group-item/canvas-group-item';
import { IBoardContent } from '../../../../constants/types';
import { GetSampleItem } from '../../../../constants/dummy-data';

interface IPropType {
    data: IBoardContent,
    group: string;
    onPropsChange: (props: any) => {}
}

export class CanvasGroupItemWrapper extends React.Component<IPropType | any, any> {
    pointerPositionStart;
    ref;
    originalPointerProps;
    lastPositionProps;
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            isBeingResized: false,
            contentData: null
        };
    }
    // tslint:disable:member-ordering
    onPointerDownBind = this.onPointerDown.bind(this);
    onPointerMoveBind = this.onPointerMove.bind(this);
    onPointerUpBind = this.onPointerUp.bind(this);
    onPointerMove(e) {
        window.requestAnimationFrame(() => {
            this.onChangeSize(e);
        });
    }
    onChangeSize(e: PointerEvent) {
        const { clientX, clientY } = e;
        const changeX = clientX - this.pointerPositionStart.x;
        const changeY = clientY - this.pointerPositionStart.y;
        let newWidth = this.originalPointerProps.width + changeX;
        let newHeight = this.originalPointerProps.height + changeY;
        newWidth = newWidth < 100 ? 100 : newWidth;
        newHeight = newHeight < 100 ? 100 : newHeight;
        this.props.onPropsChange({
            width: newWidth, height: newHeight
        });
        this.lastPositionProps = {
            width: newWidth, height: newHeight
        };
    }
    onPointerDown(e: PointerEvent) {
        this.pointerPositionStart = {
            x: e.clientX,
            y: e.clientY
        };
        document.removeEventListener('pointerup', this.onPointerUpBind);
        document.removeEventListener('pointermove', this.onPointerMoveBind);
        document.addEventListener('pointerup', this.onPointerUpBind);
        document.addEventListener('pointermove', this.onPointerMoveBind);
        this.setState({
            isBeingResized: true
        });
    }
    onPointerUp() {
        this.originalPointerProps = Object.assign({}, this.lastPositionProps);
        document.removeEventListener('pointermove', this.onPointerMoveBind);
        document.removeEventListener('pointerup', this.onPointerUpBind);
        this.setState({
            isBeingResized: false
        });
    }
    componentWillUnmount() {
        document.removeEventListener('pointermove', this.onPointerMoveBind);
        document.removeEventListener('pointerup', this.onPointerUpBind);
    }
    componentDidMount() {
        this.originalPointerProps = Object.assign({}, this.props.data.props);
        const data = GetSampleItem((this.props.data as IBoardContent).type);
        data.id = (this.props.data as IBoardContent).id;
        this.setState({
            contentData: data
        })
    }
    render() {
        const { props } = this.props.data;
        const styles = {
            width: `${props.width}px`,
            height: `${props.height}px`,
        }
        return (
            <div className="board-content-wrapper" style={styles} ref={this.ref}>
                <CanvasGroupItem isBeingResized={this.state.isBeingResized} data={this.state.contentData} group={this.props.group} />
                <div className="board-content-resizer" onPointerDown={this.onPointerDown.bind(this)}>
                    <i className='material-icons'>navigate_next</i>
                </div>
            </div>
        );
    }
}