import { IContentItem, IPhotoContent, ContentType, MediaSourceType, IVideoContent, IArticleContent, ILinkContent } from "./types";
import * as _ from 'lodash';
import { func } from "prop-types";

const ItemSize = 5;

export const PhotoContentList: Array<IContentItem<IPhotoContent>> = GetSamplePhotoItems();
export const VideoContentList: Array<IContentItem<IVideoContent>> = GetSampleVideoItems();
export const ArticleContentList: Array<IContentItem<IArticleContent>> = GetSampleArticleItems();
export const LinkContentList: Array<IContentItem<ILinkContent>> = GetSampleLinkItems();

export function GetSampleItem(type: ContentType): IContentItem<any> {
    switch (type) {
        case ContentType.Photo: return _.sample(GetSamplePhotoItems())
        case ContentType.Video: return _.sample(GetSampleVideoItems())
        case ContentType.Article: return _.sample(GetSampleArticleItems())
        case ContentType.Link: return _.sample(GetSampleLinkItems())
    }
}

export function GetSamplePhotoItems(): Array<IContentItem<IPhotoContent>> {
    const result = [];
    _.range(ItemSize).forEach(() => {
        const item: IContentItem<IPhotoContent> = {
            id: `${Math.floor(Math.random() * 10e10)}`,
            title: 'Sample Photo Lorem ipsum',
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

export function GetSampleVideoItems(): Array<IContentItem<IVideoContent>> {
    const result = [];
    _.range(ItemSize).forEach(() => {
        const item: IContentItem<IVideoContent> = {
            id: `${Math.floor(Math.random() * 10e10)}`,
            title: 'Sample Photo Lorem ipsum',
            contentType: ContentType.Video,
            contentData: {
                videoThumbnailUrl: _.sample([
                    'https://picsum.photos/id/1001/5616/3744',
                    'https://picsum.photos/id/1002/4312/2868',
                    'https://picsum.photos/id/1003/1181/1772',
                    'https://picsum.photos/id/1004/5616/3744',
                    'https://picsum.photos/id/1005/5760/3840'
                ]),
                videoId: _.sample([
                    'bTqVqk7FSmY',
                    '7T2RonyJ_Ts',
                    'tq9mgTRQM8k',
                    'rKa1YLIoeN4',
                    'PxVgQrw0RVQ'
                ]),
                videoEndTick: 0,
                videoStartTick: 0,
                videoLength: _.sample(_.range(45, 200))
            },
            sourcePreviewAvailable: false,
            sourceType: _.sample([ MediaSourceType.Youtube, MediaSourceType.Vimeo]),
            tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
            annotations: [
                {
                    id: `${Math.floor(Math.random() * 10e10)}`,
                    message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
                }
            ]
        };
        item.contentData.videoUrl = `https://www.youtube.com/watch?v=${item.contentData.videoId}`
        result.push(item);
    })
    return result;
}

export function GetSampleArticleItems(): Array<IContentItem<IArticleContent>>  {
    const result = [];
    _.range(ItemSize).forEach(() => {
        const item: IContentItem<IArticleContent> = {
            id: `${Math.floor(Math.random() * 10e10)}`,
            title: 'https://dl.acm.org/citation.cfm?id=1357127',
            contentType: ContentType.Article,
            contentData: {
                articleLink: _.sample([
                    'https://picsum.photos/id/1001/5616/3744',
                    'https://picsum.photos/id/1002/4312/2868',
                    'https://picsum.photos/id/1003/1181/1772',
                    'https://picsum.photos/id/1004/5616/3744',
                    'https://picsum.photos/id/1005/5760/3840'
                ]),
                authorName: _.sample([
                    'Aniket K',
                    'Napol R',
                    'Nathan H',
                    'Niko N'
                ]),
                articleTitle: _.sample([
                    'Crowdsourcing user studies with Mechanical Turk',
                    'Towards a Universal Knowledge Accelerator',
                    'Market in Your Social Network: The Effects of Extrinsic Rewards on Friendsourcing and Relationships',
                    'Encouraging “Outside- the- box” Thinking in Crowd Innovation Through Identifying Domains of Expertise',
                    'A Contingency View of Transferring and Adapting Best Practices within Online Communities'
                ]),
            },
            sourcePreviewAvailable: false,
            sourceType: _.sample([ MediaSourceType.Quora, MediaSourceType.ACM, MediaSourceType.Scholar ]),
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

export function GetSampleLinkItems(): Array<IContentItem<ILinkContent>> {
    const result = [];
    const items: ILinkContent[] = [
        {
            ogLink: `https://www.ndcollaborative.com/sensemaking/`,
            ogTitle: `Navigating Change with Collective Sensemaking - New Directions Collaborative`,
            ogDescription: `These times call for us to practice 'sensemaking' to more clearly see what is unfolding and avoid being caught in denial or wishful thinking.`,
            ogImage: `https://www.ndcollaborative.com/wp-content/uploads/2014/06/WCJune-300x267.jpg`,
            ogSiteName: `New Directions Collaborative`
        }, {
            ogLink: `https://cognitive-edge.com/blog/what-is-sense-making/`,
            ogTitle: `What is Sense-making? - Cognitive Edge`,
            ogDescription: `This apparently innocent question was asked on the ActKM forum this morning. I replied and…`
        }, {
            ogLink: `https://www.foodlogistics.com/features/news/21013323/micro-shopping-on-the-rise`,
            ogTitle: `Micro-Shopping on the Rise`,
            ogDescription: `Micro-shopping trips are becoming more popular thanks to lockers and click-and-collect services.`
        }
    ];
    items.forEach((data) => {
        const item: IContentItem<ILinkContent> = {
            id: `${Math.floor(Math.random() * 10e10)}`,
            title: data.ogSiteName,
            contentType: ContentType.Link,
            contentData: data,
            sourcePreviewAvailable: false,
            sourceType: null,
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
