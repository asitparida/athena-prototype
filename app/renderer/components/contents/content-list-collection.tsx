import * as React from 'react';
import { ContentList } from './content-list';
import { ContentType, IContentListItem } from '../../constants/types';
import { PhotoContentList, VideoContentList, ArticleContentList, LinkContentList } from '../../constants/dummy-data';

interface IProps {
    type: ContentType
}

interface IContentCollectionState {
    listItems: IContentListItem[];
}

export class ContentListCollection extends React.Component<IProps, IContentCollectionState> {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        };
    }
    updateCollection() {
        let items = [];
        const type = this.props.type;
        switch (type) {
            case ContentType.Photo: { items = PhotoContentList; break; };
            case ContentType.Video: { items = VideoContentList; break; };
            case ContentType.Article: { items = ArticleContentList; break; };
            case ContentType.Link: { items = LinkContentList; break; };
            default: {
                items = [].concat(PhotoContentList, VideoContentList, ArticleContentList, LinkContentList); break;
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
    componentDidMount() {
        this.updateCollection();
    }
    componentDidUpdate(props) {
        if (this.props.type !== props.type) {
            this.updateCollection();
        }
    }
    render() {
        return <React.Fragment>
            {
                this.state.listItems.map((item, i) => {
                    return <ContentList title={item.title} key={i} type={this.props.type} items={item.listItems} />
                })
            }
        </React.Fragment>
    }
}
