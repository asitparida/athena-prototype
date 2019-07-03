import { IContentItem, IPhotoContent, ContentType, MediaSourceType } from "./types";
import * as _ from 'lodash';

export const PhotoContentList: Array<IContentItem<IPhotoContent>> = GetSamplePhotoItems();

export function GetSamplePhotoItems(): Array<IContentItem<IPhotoContent>> {
    const result = [];
    _.range(10).forEach(() => {
        const item: IContentItem<IPhotoContent> = {
            id: `${Math.floor(Math.random() * 10e10)}`,
            title: 'Sample Photo',
            contentType: ContentType.Photo,
            contentData: {
                imgUrl: _.sample([
                    'https://picsum.photos/id/1001/5616/3744',
                    'https://picsum.photos/id/1002/4312/2868',
                    'https://picsum.photos/id/1003/1181/1772',
                    'https://picsum.photos/id/1004/5616/3744',
                    'https://picsum.photos/id/1005/5760/3840'
                ])
            },
            sourcePreviewAvailable: false,
            sourceType: MediaSourceType.Browser,
            tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
            annotations: [
                {
                    id: `${Math.floor(Math.random() * 10e10)}`,
                    message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
                }
            ]
        };
        result.push(item);
    })
    return result;
}
