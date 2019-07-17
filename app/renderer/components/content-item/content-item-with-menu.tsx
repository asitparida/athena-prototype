import * as React from 'react';
import { IContextMenuAction } from '../../constants/types';
import { ContextMenu } from '../context-menu/context-menu';
import { ContentItemWrapper } from './content-item';
import { OpenExternalUrl } from '../../transforms';

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
        if (action === 'source') {
            OpenExternalUrl(this.props.data.sourceUrl);
        } else {
            this.props.onActionInvoked(action);
        }
    }
    propsChanged() {
        // this.props.propsChanged();
    }
    render() {
        let actions: IContextMenuAction[] = [
            { id: 'select', icon: 'select_all', name: 'Select' },
            { id: 'annotate', icon: 'notes', name: 'Annotate' },
            { id: 'tag', icon: 'label', name: 'Tag' },
            { id: 'edit', icon: 'edit', name: 'Edit' },
            { id: 'source', icon: 'open_in_new', name: 'Source' },
            { id: 'archive', icon: 'archive', name: 'Archive' },
            { id: 'delete', icon: 'delete', name: 'Delete' }
        ];
        if (!this.props.data.sourceUrl) {
            actions = actions.filter(action => action.id !== 'source');
        }
        return (
            < ContextMenu actions={actions} open={this.state.menuOpen} menuClosed={this.menuClosed.bind(this)} resizerOptions={this.props.resizerOptions || []} onAction={this.actionInvoked.bind(this)} >
                <ContentItemWrapper propsChanged={this.propsChanged.bind(this)} inheritDimensions={this.props.inheritDimensions} data={this.props.data} menuInvoked={this.contextMenuOpened.bind(this)}  />
            </ContextMenu >
        );
    }
}
