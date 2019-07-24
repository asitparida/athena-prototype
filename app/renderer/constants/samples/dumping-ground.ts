import * as _ from 'lodash';
import { ContentType, IContentItem } from '../types';
import { DummifiedSocialMediaItems } from './socialmedia-items';
import { DummifiedVideoItems } from './video-items';
import { DummifiedPhotoItems } from './photo-items';
import { DummifiedArticleItems } from './article-items';

export function FilterDumpingGroundCollection(type: ContentType = null, searchToken = '') {
    const result = [];
    DumpingGroundCollection.forEach(item => {
        const list = [].concat(...item.listItems);
        let tempList = type ? list.filter(t => t.contentType === type) : list;
        if (!_.isEmpty(searchToken)) {
            tempList = tempList.filter(_i => JSON.stringify(_i).indexOf(searchToken) !== -1);
        }
        result.push(Object.assign({}, item, {
            listItems: tempList
        }));
    });
    return result;
}

const _allCollections = [
    DummifiedArticleItems.reverse(),
    DummifiedPhotoItems.reverse(),
    DummifiedVideoItems.reverse(),
    DummifiedSocialMediaItems.reverse()
];
const recentCollection = [];
const yesterdayCollection = [];
const lastWeekCollection = [];
_allCollections.forEach((collection: Array<IContentItem<any>>) => {
    const chunks = _.chunk(collection, 3);
    if (chunks[0]) { recentCollection.push(...chunks[0]); }
    if (chunks[1]) { yesterdayCollection.push(...chunks[1]); }
    if (chunks[2]) { lastWeekCollection.push(...chunks[2]); }
});

export const DumpingGroundCollection = [
    {
        title: 'Recent', listItems: _.shuffle(recentCollection)
    },
    {
        title: 'Yesterday', listItems: _.shuffle(yesterdayCollection)
    },
    {
        title: 'Last Week', listItems: _.shuffle(lastWeekCollection)
    }
];
