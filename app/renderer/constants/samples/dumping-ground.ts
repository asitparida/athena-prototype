import * as _ from 'lodash';
import { DummyPhotoItems } from '../../constants/items/photo-items';
import { DummyVideoItems } from '../../constants/items/video-items';
import { DummyArticleItems } from '../../constants/items/article-items';
import { DummyLinkItems } from '../../constants/items/link-items';
import { ContentType } from '../types';
import { DummifiedSocialMediaItems } from './socialmedia-items';
import { DummifiedVideoItems } from './video-items';
import { DummifiedPhotoItems } from './photo-items';
import { DummifiedArticleItems } from './article-items';

export function FilterDumpingGroundCollection(type: ContentType) {
    const result = [];
    DumpingGroundCollection.forEach(item => {
        const list = [].concat(...item.listItems);
        result.push(Object.assign({}, item, {
            listItems: list.filter(t => t.contentType === type)
        }));
    });
    return result;
}

export const DumpingGroundCollection = [
    {
        title: 'Recent', listItems: [
            ...DummifiedArticleItems,
            ...DummifiedPhotoItems,
            ...DummifiedVideoItems,
            ...DummifiedSocialMediaItems
        ]
    },
    {
        title: 'Yesterday', listItems: [
            DummyArticleItems[4],
            DummyPhotoItems[4],
            DummyVideoItems[4]
        ]
    }
];
