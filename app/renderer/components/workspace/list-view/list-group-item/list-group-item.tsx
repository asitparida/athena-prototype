import * as React from 'react';
import { IBoardContent, IContentItem, IContextMenuAction } from '../../../../constants/types';
import { ContentItemWrapper } from '../../../content-item/content-item';
import './list-group-item.scss';
import { GetSampleItem } from '../../../../constants/dummy-data';
import { ContentItemWithMenu } from '../../../content-item/content-item-with-menu';

class ListGroupItem extends React.Component<{ data: IBoardContent }, { contentData: IContentItem<any>, contentSize: string}> {
    constructor(props) {
        super(props);
        this.state = {
            contentData: null,
            contentSize: 'normal'
        };
    }
    componentDidMount() {
        const data = GetSampleItem((this.props.data as IBoardContent).type);
        data.id = (this.props.data as IBoardContent).id;
        this.setState({
            contentData: data
        })
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
            {  icon: 'crop_7_5', name: 'NORMAL_SIZE'},
            {  icon: 'crop_5_4', name: 'DOUBLE_SIZE'},
            {  icon: 'crop_din', name: 'MAX_SIZE'}
        ];
        return (
            <div className={`workspace-list-group-item-holder ${this.state.contentSize}`}>
                {
                        this.state.contentData &&
                        <ContentItemWithMenu onActionInvoked={this.onActionInvoked.bind(this)} data={this.state.contentData} inheritDimensions={false} resizerOptions={resizerOptions} />
                    }
            </div>
        );
    }
}

export default ListGroupItem;
