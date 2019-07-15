import * as React from 'react';
import { IContextMenuAction } from '../../constants/types';
import { ContextMenu } from '../context-menu/context-menu';
import { ContentItemWrapper } from './content-item';

export class ContentItemWithMenu extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }
    contextMenuOpened() {
        this.setState({
            menuOpen: true
        });
    }
    menuClosed() {
        this.setState({
            menuOpen: false
        });
    }
    actionInvoked(action) {
        if (this.props.onActionInvoked) {
            this.props.onActionInvoked(action);
        }
    }
    propsChanged() {
        // this.props.propsChanged();
    }
    render() {
        const actions: IContextMenuAction[] = [
            { icon: 'notes', name: 'Annotate' },
            { icon: 'label', name: 'Tag' },
            { icon: 'edit', name: 'Edit' },
            { icon: 'open_in_new', name: 'Source' },
            { icon: 'archive', name: 'Archive' },
            { icon: 'delete', name: 'Delete' }
        ];
        return (
            < ContextMenu actions={actions} open={this.state.menuOpen} menuClosed={this.menuClosed.bind(this)} resizerOptions={this.props.resizerOptions || []} onAction={this.actionInvoked.bind(this)} >
                <ContentItemWrapper propsChanged={this.propsChanged.bind(this)} inheritDimensions={this.props.inheritDimensions} data={this.props.data} menuInvoked={this.contextMenuOpened.bind(this)}  />
            </ContextMenu >
        );
    }
}
