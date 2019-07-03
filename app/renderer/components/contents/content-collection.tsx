import * as React from 'react';
import { ContentList } from './content-list';
import { PhotosList } from '../../constants/constants';
import { ContentType, IContentListItem } from '../../constants/types';
import { PhotoContentList } from '../../constants/dummy-data';

interface IProps {
    type: ContentType
}

interface IContentCollectionState {
    listItems: IContentListItem[];
}

export class ContentCollection extends React.Component<IProps, IContentCollectionState> {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        };
    }
    updateCollection() {
        console.log('please update collection');
    }
    componentDidMount() {
        this.updateCollection();
        let items = [];
        const type = this.props.type;
        switch (type) {
            case ContentType.Photo: { items = PhotoContentList; break; };
            default: {
                items = PhotoContentList; break;
            }
        }
        const collection = [
            { title: 'Recent',  listItems: items },
            { title: 'Yesterday',  listItems: items},
            { title: 'June 12, 2019',  listItems: items},
            { title: 'June 11, 2019',  listItems: items }
        ];
        this.setState({
            listItems: collection
        });
    }
    componentDidUpdate(props) {
        if (this.props.type !== props.type) {
            this.updateCollection();
        }
    }
    render() {
        console.log(this.state.listItems);
        return <React.Fragment>
            {
                this.state.listItems.map((item, i) => {
                    return <ContentList title={item.title} key={i} type={this.props.type} items={item.listItems} />
                })
            }
        </React.Fragment>
    }
}
