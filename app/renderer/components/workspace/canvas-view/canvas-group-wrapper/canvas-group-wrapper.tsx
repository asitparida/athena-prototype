import * as React from 'react';
import './canvas-group-wrapper.scss';
import CanvasGroup from '../canvas-group/canvas-group';
import { IBoardGroupWrapper } from '../../../../constants/types';
import { GetGroupWrapperId } from '../../../../transforms';

class CanvasGroupWrapper extends React.Component<{
    data?: IBoardGroupWrapper,
    parentX: number,
    parentY: number,
    onPropsChange: (data: any) => {},
    showAnchor?: boolean;
}, {
    groupTitle?: string
}> {
    constructor(props) {
        super(props);
        this.state = {
            groupTitle: this.props.data.title
        };
    }
    groupPropsChanged(data) {
        data.width = data.width + 20;
        this.props.onPropsChange(data);
    }
    titleChange(e) {
        this.setState({groupTitle: e.target.value});
    }
    render() {
        const { props } = this.props.data;
        const {parentX = 0, parentY = 0} = this.props;
        const styles = {
            top: `${parentY + props.top}px`,
            left: `${parentX + props.left}px`,
        }
        return (
            <div className="group-wrapper" style={styles} id={GetGroupWrapperId(this.props.data.id)}>
                <input className='group-title' value={this.state.groupTitle} onChange={this.titleChange.bind(this)} />
                <CanvasGroup data={this.props.data} onPropsChange={this.groupPropsChanged.bind(this)} />
                {
                    this.props.showAnchor &&
                    <div className='group-anchor' />
                }
            </div>
        );
    }
}

export default CanvasGroupWrapper;
