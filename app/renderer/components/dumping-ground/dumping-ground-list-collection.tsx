import * as React from 'react';
import * as _ from 'lodash';
import { DumpingGroundList } from './dumping-ground-list';
import { ContentType, IContentListItem, IContentItem } from '../../constants/types';
import { BuildStickyContentItem, BuildMMSContentItem } from '../../constants/dummy-data';
import { Subscription } from 'rxjs';
import { DumpingGroundTransfer, DumpingGroundSelections } from '../../access/observables/observables';
import { GetAPIUrl, CancellabelRequests, Cancellable } from '../../constants/constants';
import { IMms } from '../../../api/api-types';
import { DumpingGroundCollection, FilterDumpingGroundCollection } from '../../constants/items/dumping-ground';

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
    dumpingGroundSelectionSubscription: Subscription;
    mmsCollection: IMms[] = [];
    cancellable = new CancellabelRequests();
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        };
    }
    updateCollection() {
        let dumpingGroundCollection = [];
        const type = this.props.type;
        switch (type) {
            case ContentType.Photo:
            case ContentType.Video:
            case ContentType.Article:
            case ContentType.Link:
            case ContentType.SocialMedia: { dumpingGroundCollection = [].concat(FilterDumpingGroundCollection(type)); break; };
            default: { dumpingGroundCollection = [].concat(DumpingGroundCollection); break; };
        }
        this.setState({
            listItems: dumpingGroundCollection
        });
        setTimeout(() => {
            if (typeof this.props.type === 'undefined') {
                const api = `${GetAPIUrl()}/api/stickies/unassigned`;
                fetch(api)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.data && data.data.length > 0) {
                            const mappedItems = data.data.sort((a, b) => (new Date(b.modified) as Date).getTime() - (new Date(a.modified) as Date).getTime()).map(item => BuildStickyContentItem(item));
                            this.insertNewItems(mappedItems);
                        }
                    }, (data) => {
                        console.log(data);
                    });
            }
        });
    }
    insertNewItems(mappedItems: any[]) {
        const mappedCollection = this.state.listItems;
        if (mappedCollection.length > 0) {
            const mappedCollectionIds = mappedCollection[0].listItems.map(item => item.id);
            mappedItems = mappedItems.filter(item => _.indexOf(mappedCollectionIds, item.id) === -1);
            if (mappedItems.length > 0) {
                mappedCollection[0].listItems = [].concat(...mappedItems, ...mappedCollection[0].listItems);
                this.setState({
                    listItems: mappedCollection
                });
            }
        }
    }
    initializeMMSListener() {
        const interval = setInterval(() => {
            const api = `${GetAPIUrl()}/api/mms`;
            fetch(api)
                .then((res) => res.json())
                .then((data) => {
                    if (data.data && data.data.length > 0) {
                        const mmsCollection = data.data as IMms[];
                        const newCollection = [];
                        mmsCollection.forEach(item => {
                            if (!this.mmsCollection.find(t => t.sid === item.sid)) {
                                this.mmsCollection.push(item);
                                newCollection.push(item)
                            }
                        })
                        const mappedItems = newCollection.sort((a, b) => (new Date(a.modified) as Date).getTime() - (new Date(b.modified) as Date).getTime()).map(item => BuildMMSContentItem(item));
                        this.insertNewItems(mappedItems);
                    }
                }, (data) => {
                    console.log(data);
                });
        }, 10000);
        this.cancellable.push(interval, Cancellable.Interval);
    }
    componentDidMount() {
        this.updateCollection();
        this.initializeMMSListener();
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
        this.dumpingGroundSelectionSubscription = DumpingGroundSelections.subscribe((data: any) => {
            if (data === null) {
                return;
            }
            const collection = this.state.listItems;
            const newCollection = [];
            collection.forEach(collect => {
                const items = [];
                collect.listItems.forEach(item => {
                    items.push(Object.assign({}, item, {
                        selected: _.indexOf(data, item.id) !== -1
                    }));
                });
                newCollection.push(Object.assign({}, collect, {
                    listItems: items
                }));
            })
            this.setState({
                listItems: newCollection
            })
        });
    }
    componentWillUnmount() {
        this.dumpingGroundTransferSubscription.unsubscribe();
        this.dumpingGroundSelectionSubscription.unsubscribe();
        this.cancellable.clean();
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
