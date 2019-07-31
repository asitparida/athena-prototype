import * as React from 'react';
import './canvas-group-item-wrapper.scss'
import CanvasGroupItem from '../canvas-group-item/canvas-group-item';
import { IContentItem } from '../../../../constants/types';

interface IPropType {
    data: IContentItem<any>,
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
        setTimeout(() => {
            const el = this.ref.current;
            const props = (el as Element).getBoundingClientRect();
            this.originalPointerProps = {
                height: props.height,
                width: props.width
            }
            this.props.onPropsChange({
                width: props.width, height: props.height
            });
        });
    }
    propsChanged() {
        console.log(11123);
    }
    render() {
        const { props } = this.props.data;
        const styles = {
            width: `240px`,
        }
        let inheritDimensions = false;
        if (!props.height) {
            // tslint:disable-next-line:no-string-literal
            styles['minHeight'] = '180px';
            inheritDimensions = false;
        }
        return (
            <div className="board-content-wrapper" style={styles} ref={this.ref}>
                <CanvasGroupItem isBeingResized={this.state.isBeingResized} data={this.props.data} group={this.props.group} propsChanged={this.propsChanged.bind(this)} inheritDimensions={inheritDimensions} />
            </div>
        );
    }
}
