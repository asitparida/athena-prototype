import * as React from 'react';
import * as _ from 'lodash';
import { ContentList } from './content-list';
import { ContentType, IContentListItem } from '../../constants/types';
import { PhotoContentList, VideoContentList, ArticleContentList, LinkContentList, SocialMediaContentList, GetDummifiedCollection } from '../../constants/dummy-data';

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
            case ContentType.SocialMedia: { items = SocialMediaContentList; break; };
            default: {
                items = _.shuffle([].concat(
                    PhotoContentList,
                    VideoContentList,
                    ArticleContentList,
                    LinkContentList,
                    SocialMediaContentList));
                break;
            }
        }
        const collection = GetDummifiedCollection(items);
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
