import * as React from 'react';
import { IBoardContent, IContentItem } from '../../../../constants/types';
import { ContentItemWrapper } from '../../../content-item/content-item';
import './list-group-item.scss';
import { GetSampleItem } from '../../../../constants/dummy-data';

class ListGroupItem extends React.Component<{ data: IBoardContent }, { contentData: IContentItem<any>}> {
    constructor(props) {
        super(props);
        this.state = { contentData: null };
    }
    componentDidMount() {
        const data = GetSampleItem((this.props.data as IBoardContent).type);
        data.id = (this.props.data as IBoardContent).id;
        this.setState({
            contentData: data
        })
    }
    render() {
        return (
            <div className='workspace-list-group-item-holder'>
                {
                        this.state.contentData &&
                        <ContentItemWrapper data={this.state.contentData} inheritDimensions={false} />
                    }
            </div>
        );
    }
}

export default ListGroupItem;
