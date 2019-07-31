import * as React from 'react';
import { IBoardGroupWrapper, IGroupHeader } from '../../constants/types';
import CanvasView from './canvas-view/canvas-view';
import ListView from './list-view/list-view';

export class WorkspaceViewSwitch extends React.Component<{
    canvasView?: boolean, workspaceId?: string, groups?: IBoardGroupWrapper[], headers?: IGroupHeader[], scrollToCenter?: boolean,
    onNotesAndTitleChanged: (data: any) => {}
}, any> {
    onNotesAndTitleChanged(data) {
        this.props.onNotesAndTitleChanged(data);
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.props.canvasView &&
                    <div className="working-area">
                        <CanvasView scrollToCenter={this.props.scrollToCenter} id={this.props.workspaceId} groups={this.props.groups} headers={this.props.headers} />
                    </div>
                }
                {
                    !this.props.canvasView &&
                    <ListView id={this.props.workspaceId} groups={this.props.groups} onNotesAndTitleChanged={this.onNotesAndTitleChanged.bind(this)} />
                }
            </React.Fragment>
        );
    }
}
