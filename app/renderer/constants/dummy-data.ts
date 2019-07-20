import { IContentItem, IPhotoContent, ContentType, MediaSourceType, IVideoContent, IArticleContent, ILinkContent, ISocialMediaContent, INoteContent } from "./types";
import * as _ from 'lodash';
import { IStickyNote, IMms } from "../../api/api-types";
import { GetRandomId } from "./constants";
import { DummyPhotoItems } from "./items/photo-items";
import { DummyVideoItems } from "./items/video-items";
import { DummyArticleItems } from "./items/article-items";
import { DummyLinkItems } from "./items/link-items";
import { DummySocialMediaItems } from "./items/socialmedia-items";

// export const PhotoContentList: Array<IContentItem<IPhotoContent>> = GetSamplePhotoItems();
// export const VideoContentList: Array<IContentItem<IVideoContent>> = GetSampleVideoItems();
// export const ArticleContentList: Array<IContentItem<IArticleContent>> = GetSampleArticleItems();
// export const LinkContentList: Array<IContentItem<ILinkContent>> = GetSampleLinkItems();
// export const SocialMediaContentList: Array<IContentItem<ISocialMediaContent>> = GetSampleSocialMediaItems();

// export function GetSampleItem(type: ContentType, data?: any): IContentItem<any> {
//     switch (type) {
//         case ContentType.Photo: return _.sample(DummyPhotoItems);
//         case ContentType.Video: return _.sample(DummyVideoItems);
//         case ContentType.Article: return _.sample(DummyArticleItems);
//         case ContentType.Link: return _.sample(DummyLinkItems);
//         case ContentType.SocialMedia: return _.sample(DummySocialMediaItems);
//         case ContentType.Sticky: return GetSampleStickyItem(data);
//     }
// }

export function GetDummifiedCollection(items) {
    return [
        { title: 'Recent',  listItems: _.shuffle(items) },
        { title: 'Yesterday',  listItems: _.shuffle(items) },
        { title: 'June 12, 2019', listItems: _.shuffle(items) },
        { title: 'June 11, 2019', listItems: _.shuffle(items) }
    ];
}

export function BuildStickyContentItem(data: IStickyNote): IContentItem<INoteContent> {
    return {
        id: data.id,
        title: null,
        contentType: ContentType.Sticky,
        contentData: {
            noteText: data.text
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    };
}

export function BuildMMSContentItem(data: IMms): IContentItem<INoteContent> {
    return {
        id: data.sid,
        title: null,
        contentType: ContentType.Sticky,
        contentData: {
            noteText: data.text,
            mediaUrl: data.mediaUrl
        },
        sourcePreviewAvailable: false,
        sourceType: data.mediaUrl ? MediaSourceType.MMS : null,
        tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    };
}

export function GetSampleStickyItem(data): IContentItem<INoteContent> {
    return {
        id: data.id,
        title: null,
        contentType: ContentType.Sticky,
        contentData: {
            noteText: data.text
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    };
}

// export function GetSamplePhotoItems(): Array<IContentItem<IPhotoContent>> {
//     const result = [];
//     _.range(ItemSize).forEach(() => {
//         const item: IContentItem<IPhotoContent> = {
//             id: GetRandomId(),
//             title: 'Sample Photo Lorem ipsum',
//             contentType: ContentType.Photo,
//             contentData: {
//                 imgUrl: _.sample([
//                     'https://picsum.photos/id/1001/5616/3744',
//                     'https://picsum.photos/id/1002/4312/2868',
//                     'https://picsum.photos/id/1003/1181/1772',
//                     'https://picsum.photos/id/1004/5616/3744',
//                     'https://picsum.photos/id/1005/5760/3840'
//                 ])
//             },
//             sourcePreviewAvailable: false,
//             sourceType: MediaSourceType.Browser,
//             tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
//             annotations: {
//                 id: GetRandomId(),
//                 message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
//             }
//         };
//         item.sourceUrl = null;
//         result.push(item);
//     })
//     return result;
// }

// export function GetSampleVideoItems(): Array<IContentItem<IVideoContent>> {
//     const result = [];
//     _.range(ItemSize).forEach(() => {
//         const item: IContentItem<IVideoContent> = {
//             id: GetRandomId(),
//             title: 'Sample Photo Lorem ipsum',
//             contentType: ContentType.Video,
//             contentData: {
//                 videoThumbnailUrl: _.sample([
//                     'https://picsum.photos/id/1001/5616/3744',
//                     'https://picsum.photos/id/1002/4312/2868',
//                     'https://picsum.photos/id/1003/1181/1772',
//                     'https://picsum.photos/id/1004/5616/3744',
//                     'https://picsum.photos/id/1005/5760/3840'
//                 ]),
//                 videoId: _.sample([
//                     'bTqVqk7FSmY',
//                     '7T2RonyJ_Ts',
//                     'tq9mgTRQM8k',
//                     'rKa1YLIoeN4',
//                     'PxVgQrw0RVQ'
//                 ]),
//                 videoEndTick: 0,
//                 videoStartTick: 0,
//                 videoLength: _.sample(_.range(45, 200))
//             },
//             sourcePreviewAvailable: false,
//             sourceType: _.sample([MediaSourceType.Youtube, MediaSourceType.Vimeo]),
//             tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
//             annotations: {
//                 id: GetRandomId(),
//                 message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
//             }
//         };
//         item.contentData.videoUrl = `https://www.youtube.com/watch?v=${item.contentData.videoId}`
//         item.sourceUrl = item.contentData.videoUrl;
//         result.push(item);
//     })
//     return result;
// }

// export function GetSampleArticleItems(): Array<IContentItem<IArticleContent>> {
//     const result = [];
//     _.range(ItemSize).forEach(() => {
//         const item: IContentItem<IArticleContent> = {
//             id: GetRandomId(),
//             title: 'https://dl.acm.org/citation.cfm?id=1357127',
//             contentType: ContentType.Article,
//             contentData: {
//                 articleLink: _.sample([
//                     'https://picsum.photos/id/1001/5616/3744',
//                     'https://picsum.photos/id/1002/4312/2868',
//                     'https://picsum.photos/id/1003/1181/1772',
//                     'https://picsum.photos/id/1004/5616/3744',
//                     'https://picsum.photos/id/1005/5760/3840'
//                 ]),
//                 authorName: _.sample([
//                     'Aniket K',
//                     'Napol R',
//                     'Nathan H',
//                     'Niko N'
//                 ]),
//                 articleTitle: _.sample([
//                     'Crowdsourcing user studies with Mechanical Turk',
//                     'Towards a Universal Knowledge Accelerator',
//                     'Market in Your Social Network: The Effects of Extrinsic Rewards on Friendsourcing and Relationships',
//                     'Encouraging “Outside- the- box” Thinking in Crowd Innovation Through Identifying Domains of Expertise',
//                     'A Contingency View of Transferring and Adapting Best Practices within Online Communities'
//                 ]),
//             },
//             sourcePreviewAvailable: false,
//             sourceType: _.sample([MediaSourceType.Quora, MediaSourceType.ACM, MediaSourceType.Scholar]),
//             tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
//             annotations: {
//                 id: GetRandomId(),
//                 message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
//             }
//         };
//         item.sourceUrl = item.title;
//         result.push(item);
//     })
//     return result;
// }

// export function GetSampleLinkItems(): Array<IContentItem<ILinkContent>> {
//     const result = [];
//     const items: ILinkContent[] = [
//         {
//             ogLink: `https://www.ndcollaborative.com/sensemaking/`,
//             ogTitle: `Navigating Change with Collective Sensemaking - New Directions Collaborative`,
//             ogDescription: `These times call for us to practice 'sensemaking' to more clearly see what is unfolding and avoid being caught in denial or wishful thinking.`,
//             ogImage: `https://www.ndcollaborative.com/wp-content/uploads/2014/06/WCJune-300x267.jpg`,
//             ogSiteName: `New Directions Collaborative`
//         }, {
//             ogLink: `https://cognitive-edge.com/blog/what-is-sense-making/`,
//             ogTitle: `What is Sense-making? - Cognitive Edge`,
//             ogDescription: `This apparently innocent question was asked on the ActKM forum this morning. I replied and…`
//         }, {
//             ogLink: `https://www.foodlogistics.com/features/news/21013323/micro-shopping-on-the-rise`,
//             ogTitle: `Micro-Shopping on the Rise`,
//             ogDescription: `Micro-shopping trips are becoming more popular thanks to lockers and click-and-collect services.`
//         }
//     ];
//     items.forEach((data) => {
//         const item: IContentItem<ILinkContent> = {
//             id: GetRandomId(),
//             title: data.ogSiteName,
//             contentType: ContentType.Link,
//             contentData: data,
//             sourcePreviewAvailable: false,
//             sourceType: null,
//             tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
//             annotations: {
//                 id: GetRandomId(),
//                 message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
//             }
//         };
//         item.sourceUrl = item.contentData.ogLink;
//         result.push(item);
//     });
//     return result;
// }

// export function GetSampleSocialMediaItems(): Array<IContentItem<ISocialMediaContent>> {
//     const result = [];
//     _.range(ItemSize).forEach((data) => {
//         const item: IContentItem<ISocialMediaContent> = {
//             id: GetRandomId(),
//             title: null,
//             contentType: ContentType.SocialMedia,
//             contentData: {
//                 profileImgUrl: _.sample([
//                     'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?cs=srgb&dl=adult-beautiful-blush-1547971.jpg',
//                     'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=adult-athlete-businessman-697509.jpg'
//                 ])
//             },
//             sourcePreviewAvailable: false,
//             sourceType: _.sample([
//                 MediaSourceType.Instagram,
//                 MediaSourceType.Twitter
//             ]),
//             tags: _.range(Math.floor(Math.random() * 5)).map(t => `tag-${t}`),
//             annotations: {
//                 id: GetRandomId(),
//                 message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
//             }
//         };
//         if (item.sourceType === MediaSourceType.Twitter) {
//             item.contentData.tweetText = _.sample([
//                 `These times call for us to practice 'sensemaking' to more clearly see what is unfolding and avoid being caught in denial or wishful thinking.`,
//                 `And just like that the problem is fixed. I hope all customers get the same treatment. All of a sudden we have rapid internet at home 🤷🏻‍♂️🤣`
//             ]);
//             item.contentData.handle = _.sample([
//                 '@anomaly123',
//                 '@anonymous42',
//             ]);
//         } else if (item.sourceType === MediaSourceType.Instagram) {
//             item.contentData.instragramImageUrl = _.sample([
//                 'https://scontent-iad3-1.cdninstagram.com/vp/02e2c9b7cd13e4d61b73dd3722b17005/5DBC4E37/t51.2885-15/e35/s1080x1080/66482941_333196790963340_5558223065797026893_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
//                 'https://scontent-iad3-1.cdninstagram.com/vp/7c679e2c759bd989da1e5f75042044df/5DB7824F/t51.2885-15/e35/s1080x1080/65320371_106901343830524_2782665837482159845_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
//                 'https://picsum.photos/id/1003/1181/1772',
//                 'https://picsum.photos/id/1004/5616/3744',
//             ]);
//             item.contentData.handle = _.sample([
//                 'anomaly_123',
//                 'anonymous_42',
//             ]);
//         }
//         result.push(item);
//     })
//     return result;
// }
