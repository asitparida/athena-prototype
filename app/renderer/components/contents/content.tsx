import * as React from 'react';
import { ContextMenu } from '../context-menu/context-menu';
import { ContentType, IContextMenuAction } from '../../constants/types';
import ContentWrapper from './content-wrapper';

export class Content extends React.Component<any, {menuOpen: boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
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
    render() {
        const actions: IContextMenuAction[] = [
            { icon: 'notes', name: 'Annotate' },
            { icon: 'label', name: 'Tag' },
            { icon: 'edit', name: 'Edit' },
            { icon: 'open_in_new', name: 'Source' },
            { icon: 'archive', name: 'Archive' },
            { icon: 'delete', name: 'Delete' }
        ];
        return <div className='content-wrapper'>
            <ContextMenu actions={actions} open={this.state.menuOpen} menuClosed={this.menuClosed.bind(this)}>
                <ContentWrapper data={this.props.data} menuInvoked={this.contextMenuOpened.bind(this)} />
            </ContextMenu>
        </div>
    }
}
export default Content;
