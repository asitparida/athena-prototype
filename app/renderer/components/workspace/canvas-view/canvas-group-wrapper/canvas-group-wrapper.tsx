import * as React from 'react';
import './canvas-group-wrapper.scss';
import CanvasGroup from '../canvas-group/canvas-group';
import { IBoardGroupWrapper } from '../../../../constants/types';

class CanvasGroupWrapper extends React.Component<{data?: IBoardGroupWrapper, parentX: number, parentY: number, onPropsChange: (data: any) => {}}, any> {
    constructor(props) {
        super(props);
    }
    groupPropsChanged(data) {
        data.width = data.width + 20;
        this.props.onPropsChange(data);
    }
    render() {
        const { props } = this.props.data;
        const {parentX = 0, parentY = 0} = this.props;
        const styles = {
            top: `${parentY + props.top}px`,
            left: `${parentX + props.left}px`,
        }
        return (
            <div className="group-wrapper" style={styles}>
                <CanvasGroup data={this.props.data} onPropsChange={this.groupPropsChanged.bind(this)} />
            </div>
        );
    }
}

export default CanvasGroupWrapper;
