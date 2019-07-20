import * as _ from 'lodash';
import { DummyPhotoItems } from '../../constants/items/photo-items';
import { DummyVideoItems } from '../../constants/items/video-items';
import { DummyArticleItems } from '../../constants/items/article-items';
import { DummyLinkItems } from '../../constants/items/link-items';
import { DummySocialMediaItems } from '../../constants/items/socialmedia-items';
import { ContentType } from '../types';

export function FilterDumpingGroundCollection(type: ContentType) {
    console.log(DumpingGroundCollection);
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
            DummyArticleItems[3],
            DummyLinkItems[2],
            DummyPhotoItems[3],
            DummyVideoItems[3],
            DummySocialMediaItems[3]
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
