import * as React from 'react';
import './board.scss';
import GroupWrapper from '../group-wrapper/group-wrapper';
import { BoardGroups, GroupBufffer } from '../../../constants/constants';
import { IBoardGroupWrapper } from '../../../constants/types';
import { tsThisType } from '@babel/types';

class Board extends React.Component<{ id: any }, { boardGroups: IBoardGroupWrapper[], positionX: number, positionY: number }> {
    currentZoom = 1;
    constructor(props) {
        super(props);
        this.state = {
            boardGroups: [],
            positionX: 0,
            positionY: 0
        };
    }
    adjustPosition(zoom = 1, smooth = false) {
        const groupHolders = document.querySelectorAll('.group-wrapper');
        let top = Number.MAX_VALUE;
        let left = Number.MAX_VALUE;
        let right = Number.MIN_VALUE;
        let bottom = Number.MIN_VALUE;
        let width = 0;
        let height = 0;
        Array.from(groupHolders).forEach(bg => {
            const props = bg.getBoundingClientRect();
            top = Math.min(top, props.top);
            left = Math.min(left, props.left);
            right = Math.max(right, props.right);
            bottom = Math.max(bottom, props.bottom);
        });
        width = (right - left) * zoom;
        height = (bottom - top) * zoom;
        const currentPositioner = document.querySelector('.board-group-outer');
        const currentPositionerProps = currentPositioner.getBoundingClientRect();
        const currentHolder = document.querySelector('.board-group-holder');
        if (currentHolder) {
            const currentHolderProps = currentHolder.getBoundingClientRect();
            if (currentHolderProps) {
                const differenceWidth = currentHolderProps.width - width;
                const differenceHeight = currentHolderProps.height - height;
                this.setState({
                    positionX: differenceWidth / 2,
                    positionY: differenceHeight / 2
                });
            }
            const topOffset = (((currentHolderProps.height * zoom) / 2) - (currentPositionerProps.height / 2));
            const leftOffset = (((currentHolderProps.width * zoom) / 2) - (currentPositionerProps.width / 2));
            window.requestAnimationFrame(() => {
                currentPositioner.scroll({
                    top: topOffset,
                    left: leftOffset,
                    behavior: smooth ? "smooth" : 'auto'
                });
            });
        }
    }
    changeZoom(dir) {
        this.currentZoom = this.currentZoom + (0.1 * dir);
        this.currentZoom = this.currentZoom < 0.30 ? 0.30 : this.currentZoom;
        this.currentZoom = this.currentZoom > 1 ? 1 : this.currentZoom;
        const currentHolder = document.querySelector('.board-group-holder');
        (currentHolder as HTMLElement).style.zoom = `${this.currentZoom}`;
        window.requestAnimationFrame(() => {
            this.adjustPosition(this.currentZoom);
        });
    }
    processGroupProps() {
        this.setState({
            boardGroups: BoardGroups
        })
        window.requestAnimationFrame(() => {
            this.adjustPosition(1, true);
        });
    }
    componentDidMount() {
        this.processGroupProps();
    }
    onGroupPropsChange(colIndex, data) {
        const groups: IBoardGroupWrapper[] = [].concat(BoardGroups);
        const group = groups.find((g, i) => i === colIndex);
        if (group) {
            group.props.width = data.width;
            group.props.height = data.height;
        }
        let left = 0;
        groups.forEach((bg) => {
            bg.props.left = left;
            left = left + (bg.props.width || 0) + GroupBufffer;
        });
        this.setState({
            boardGroups: groups
        });
    }
    render() {
        const { boardGroups = [] } = this.state;
        return (
            <React.Fragment >
                <div className="board-group-outer">
                    {
                        boardGroups.length > 0 &&
                        <div className='board-group-holder'>
                            <div className='board-group-inner'>
                                {
                                    boardGroups.map((bg, i) => <GroupWrapper onPropsChange={this.onGroupPropsChange.bind(this, i)} parentX={this.state.positionX} parentY={this.state.positionY} key={i} data={bg} />)
                                }
                            </div >
                        </div >
                    }
                </div >
                <div className="workspace-actions">
                    <div className="workspace-action" role='button' onClick={this.changeZoom.bind(this, 1)}><i className='material-icons'>zoom_in</i></div>
                    <div className="workspace-action" role='button' onClick={this.changeZoom.bind(this, -1)}><i className='material-icons'>zoom_out</i></div>
                </div>
            </React.Fragment>
        );
    }
}

export default Board;
