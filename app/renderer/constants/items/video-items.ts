import { IContentItem, ContentType, MediaSourceType, IVideoContent } from "../types";
import * as _ from 'lodash';
import { ItemHeight, ItemWidth } from "../constants";

export const DummyVideoItems: Array<IContentItem<IVideoContent>> = [
    {
        id: 'video_1',
        title: 'Sample Photo Lorem ipsum 1',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: 'https://picsum.photos/id/1001/5616/3744',
            videoId: 'bTqVqk7FSmY',
            videoUrl: `https://www.youtube.com/watch?v=bTqVqk7FSmY`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '1The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_2',
        title: 'Sample Photo Lorem ipsum 2',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: 'https://picsum.photos/id/1002/4312/2868',
            videoId:  '7T2RonyJ_Ts',
            videoUrl: `https://www.youtube.com/watch?v=bTqVqk7FSmY`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '2The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_3',
        title: 'Sample Photo Lorem ipsum 3',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: 'https://picsum.photos/id/1003/1181/1772',
            videoId: 'tq9mgTRQM8k',
            videoUrl: `https://www.youtube.com/watch?v=bTqVqk7FSmY`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '3The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_4',
        title: 'Sample Photo Lorem ipsum 4',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: 'https://picsum.photos/id/1004/5616/3744',
            videoId:  'rKa1YLIoeN4',
            videoUrl: `https://www.youtube.com/watch?v=bTqVqk7FSmY`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '4The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_5',
        title: 'Sample Photo Lorem ipsum 5',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: 'https://picsum.photos/id/1005/5760/3840',
            videoId: 'PxVgQrw0RVQ',
            videoUrl: `https://www.youtube.com/watch?v=bTqVqk7FSmY`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '5The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
