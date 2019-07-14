import * as React from 'react';
import * as _ from 'lodash';
import { DumpingGroundList } from './dumping-ground-list';
import { ContentType, IContentListItem, IContentItem } from '../../constants/types';
import { PhotoContentList, VideoContentList, ArticleContentList, LinkContentList, SocialMediaContentList, GetDummifiedCollection, BuildStickyContentItem } from '../../constants/dummy-data';
import { Subscription } from 'rxjs';
import { DumpingGroundTransfer } from '../../access/observables/observables';
import { GetAPIUrl } from '../../constants/constants';

interface IProps {
    type?: ContentType,
    hideGroupTitle?: boolean,
    searchBar?: boolean;
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
                // tslint:disable-next-line:variable-name
                const _items = _.shuffle([].concat(
                    PhotoContentList,
                    VideoContentList,
                    ArticleContentList,
                    LinkContentList,
                    SocialMediaContentList));
                if (this.props.searchBar) {
                    items = _.take(_items, _items.length / 2);
                } else {
                    items = _.take(_items, _items.length);
                }
                break;
            }
        }
        const collection = GetDummifiedCollection(items);
        this.setState({
            listItems: collection
        });
        setTimeout(() => {
            if (typeof this.props.type === 'undefined') {
                const api = `${GetAPIUrl()}/api/stickies/unassigned`;
                fetch(api)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.data && data.data.length > 0) {
                            const mappedItems = data.data.sort((a, b) => (new Date(b.modified) as Date).getTime() - (new Date(a.modified) as Date).getTime()).map(item => BuildStickyContentItem(item));
                            const mappedCollection = this.state.listItems;
                            if (mappedCollection.length > 0) {
                                mappedCollection[0].listItems = [].concat(...mappedItems, ...mappedCollection[0].listItems);
                                this.setState({
                                    listItems: mappedCollection
                                });
                            }
                        }
                    }, (data) => {
                        console.log(data);
                    });
            }
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
                    return <DumpingGroundList hideGroupTitle={this.props.hideGroupTitle} title={item.title} key={i} type={this.props.type} items={item.listItems} />
                })
            }
        </React.Fragment>
    }
}
