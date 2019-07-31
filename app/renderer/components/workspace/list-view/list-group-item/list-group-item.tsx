import * as React from 'react';
import { IContentItem, IContextMenuAction } from '../../../../constants/types';
import { ContentItemWrapper } from '../../../content-item/content-item';
import './list-group-item.scss';
import { ContentItemWithMenu } from '../../../content-item/content-item-with-menu';

class ListGroupItem extends React.Component<{ data: IContentItem<any> }, { contentData: IContentItem<any>, contentSize: string}> {
    constructor(props) {
        super(props);
        this.state = {
            contentData: null,
            contentSize: 'normal'
        };
    }
    onActionInvoked(action) {
        switch (action) {
            case 'NORMAL_SIZE' : { this.setState({ contentSize: 'normal'}); break; }
            case 'DOUBLE_SIZE' : { this.setState({ contentSize: 'double'}); break; }
            case 'MAX_SIZE' : { this.setState({ contentSize: 'max'}); break; }
        }
    }
    render() {
        const resizerOptions: IContextMenuAction[] = [
            { id: 'NORMAL_SIZE',  icon: 'crop_7_5', name: 'NORMAL_SIZE'},
            { id: 'DOUBLE_SIZE',  icon: 'crop_5_4', name: 'DOUBLE_SIZE'},
            { id: 'MAX_SIZE',  icon: 'crop_din', name: 'MAX_SIZE'}
        ];
        return (
            <div className={`workspace-list-group-item-holder ${this.state.contentSize}`}>
                <ContentItemWithMenu onActionInvoked={this.onActionInvoked.bind(this)} data={this.props.data} inheritDimensions={false} resizerOptions={resizerOptions} />
            </div>
        );
    }
}

export default ListGroupItem;
