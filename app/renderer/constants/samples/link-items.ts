import { IContentItem, ContentType, MediaSourceType, ILinkContent } from "../types";
import * as _ from 'lodash';
import { ItemWidth, ItemHeight } from "../constants";

export const DummyLinkItems: Array<IContentItem<ILinkContent>> = [
    {
        id: 'link_1',
        title: `New Directions Collaborative`,
        contentType: ContentType.Link,
        contentData: {
            ogLink: `https://www.ndcollaborative.com/sensemaking/`,
            ogTitle: `Navigating Change with Collective Sensemaking - New Directions Collaborative`,
            ogDescription: `These times call for us to practice 'sensemaking' to more clearly see what is unfolding and avoid being caught in denial or wishful thinking.`,
            ogImage: `https://www.ndcollaborative.com/wp-content/uploads/2014/06/WCJune-300x267.jpg`,
            ogSiteName: `New Directions Collaborative`
        },
        sourceUrl: `https://www.ndcollaborative.com/sensemaking/`,
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Scholar,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '1The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'link_2',
        title: 'Sample Photo Lorem ipsum 2',
        contentType: ContentType.Link,
        contentData: {
            ogLink: `https://cognitive-edge.com/blog/what-is-sense-making/`,
            ogTitle: `What is Sense-making? - Cognitive Edge`,
            ogDescription: `This apparently innocent question was asked on the ActKM forum this morning. I replied and…`
        },
        sourceUrl: `https://cognitive-edge.com/blog/what-is-sense-making/`,
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Scholar,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '2The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'link_3',
        title: 'Sample Photo Lorem ipsum 3',
        contentType: ContentType.Link,
        contentData: {
            ogLink: `https://www.foodlogistics.com/features/news/21013323/micro-shopping-on-the-rise`,
            ogTitle: `Micro-Shopping on the Rise`,
            ogDescription: `Micro-shopping trips are becoming more popular thanks to lockers and click-and-collect services.`
        },
        sourceUrl: `https://www.foodlogistics.com/features/news/21013323/micro-shopping-on-the-rise`,
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Scholar,
        tags: [ 'tag-1', 'tag-2' ],
        annotation: '3The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
