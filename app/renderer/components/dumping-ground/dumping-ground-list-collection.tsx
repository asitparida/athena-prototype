import * as React from 'react';
import * as _ from 'lodash';
import { DumpingGroundList } from './dumping-ground-list';
import { ContentType, IContentListItem, IContentItem } from '../../constants/types';
import { PhotoContentList, VideoContentList, ArticleContentList, LinkContentList, SocialMediaContentList, GetDummifiedCollection } from '../../constants/dummy-data';
import { Subscription } from 'rxjs';
import { DumpingGroundTransfer } from '../../access/observables/observables';

interface IProps {
    type: ContentType
}

interface IContentCollectionState {
    listItems: IContentListItem[];
}

export class DumpingGroundListCollection extends React.Component<IProps, IContentCollectionState> {
    dumpingGroundTransferSubscription: Subscription;
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
        this.dumpingGroundTransferSubscription = DumpingGroundTransfer.subscribe((data: IContentItem<any>) => {
            const collection = this.state.listItems;
            const newCollection = [];
            collection.forEach(collect => {
                newCollection.push(Object.assign({}, collect, {
                    listItems: [].concat(collect.listItems.filter(t => t.id !== data.id))
                }));
            })
            this.setState({
                listItems: newCollection
            })
        });
    }
    componentWillUnmount() {
        this.dumpingGroundTransferSubscription.unsubscribe();
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
                    return <DumpingGroundList title={item.title} key={i} type={this.props.type} items={item.listItems} />
                })
            }
        </React.Fragment>
    }
}
