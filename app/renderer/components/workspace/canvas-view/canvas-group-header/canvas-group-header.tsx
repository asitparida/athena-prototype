import * as React from 'react';
import { IGroupHeader } from '../../../../constants/types';
import './canvas-group-header.scss';
import { GetGroupWrapperId } from '../../../../transforms';

class CanvasGroupHeader extends React.Component<{
    data?: IGroupHeader
}, {
    top?: number,
    left?: number,
    width?: number,
    groupProps?: [],
    midLine?: {}
} | any> {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            width: 0
        };
    }
    buildHeader() {
        let groupProps = [];
        let top = Number.MAX_VALUE;
        let left = Number.MAX_VALUE;
        let right = Number.MIN_VALUE;
        const groups = this.props.data.groups;
        if (groups.length > 0) {
            this.props.data.groups.forEach(groupId => {
                const elem = document.getElementById(GetGroupWrapperId(groupId));
                if (elem) {
                    groupProps.push({
                        top: elem.offsetTop,
                        left: elem.offsetLeft + (elem.offsetWidth / 2)
                    });
                    top = Math.min(top, elem.offsetTop);
                    left = Math.min(left, elem.offsetLeft);
                    right = Math.max(right, elem.offsetLeft + elem.offsetWidth);
                }
            });
            groupProps = groupProps.sort((a, b) => a.left - b.left);
            const midLine = {
                left: groupProps[0].left,
                right: groupProps[groupProps.length - 1].left,
                width: groupProps[groupProps.length - 1].left - groupProps[0].left,
                top
            };
            const width = right - left;
            this.setState({
                groupProps,
                left,
                top,
                width,
                midLine
            });
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.buildHeader();
        });
    }
    render() {
        const { top, left, width, midLine, groupProps } = this.state;
        const styles = {
            left: `${left}px`,
            top: `${top - 144}px`,
            width: `${width}px`
        };
        let midLineStyles = {};
        if (midLine) {
            midLineStyles = {
                left: `${midLine.left}px`,
                top: `${midLine.top - 48}px`,
                width: `${midLine.width}px`
            }
        }
        return (
            <React.Fragment>
                <div className="group-header" style={styles}>
                    <div className='group-header-title'>{this.props.data.name}</div>
                </div>
                {
                    midLine &&
                    <div className='mid-line' style={midLineStyles} />
                }
                {
                    groupProps && groupProps.length > 0 &&
                    groupProps.map((prop, i) => {
                        let dropLineStyles = {};
                        dropLineStyles = {
                            left: `${prop.left}px`,
                            top: `${midLine.top - 48}px`,
                            height: `48px`
                        }
                        return (<div key={i} className='drop-line' style={dropLineStyles} />);
                    })
                }
            </React.Fragment>
        );
    }
}

export default CanvasGroupHeader;
