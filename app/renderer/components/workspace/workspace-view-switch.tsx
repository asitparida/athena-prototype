import * as React from 'react';
import { IBoardGroupWrapper } from '../../constants/types';
import CanvasView from './canvas-view/canvas-view';
import ListView from './list-view/list-view';

export class WorkspaceViewSwitch extends React.Component<{ canvasView?: boolean, workspaceId?: string, groups?: IBoardGroupWrapper[]}, any> {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.canvasView &&
                    <div className="working-area">
                        <CanvasView id={this.props.workspaceId} groups={this.props.groups} />
                    </div>
                }
                {
                    !this.props.canvasView &&
                    <ListView id={this.props.workspaceId} groups={this.props.groups} />
                }
            </React.Fragment>
        );
    }
}