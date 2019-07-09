import { ContentList, ContentType, Workspace, IWorkspace, IBoardGroupWrapper } from "./types";
import * as _ from 'lodash';
const img1 = require('../assets/carnegie_museum_art.jpg');
const img2 = require('../assets/church_brew.jpg');
const img3 = require('../assets/duquesne_incline.jpg');

export const ItemWidth = 240;
export const ItemHeight = 180;
export const GroupBufffer = 20;

export const PhotosList: any[] = [
    { id: "1006", author: "Vladimir Kudinov", width: 3000, height: 2000, url: "https://unsplash.com/photos/-wWRHIUklxM", download_url: "https://picsum.photos/id/1006/3000/2000" },
    { id: "1008", author: "Benjamin Combs", width: 5616, height: 3744, url: "https://unsplash.com/photos/5L4XAgMSno0", download_url: "https://picsum.photos/id/1008/5616/3744" },
    { id: "1009", author: "Christopher Campbell", width: 5000, height: 7502, url: "https://unsplash.com/photos/CMWRIzyMKZk", download_url: "https://picsum.photos/id/1009/5000/7502" },
    { id: "101", author: "Christian Bardenhorst", width: 2621, height: 1747, url: "https://unsplash.com/photos/8lMhzUjD1Wk", download_url: "https://picsum.photos/id/101/2621/1747" },
    { id: "1010", author: "Samantha Sophia", width: 5184, height: 3456, url: "https://unsplash.com/photos/NaWKMlp3tVs", download_url: "https://picsum.photos/id/1010/5184/3456" },
    { id: "1011", author: "Roberto Nickson", width: 5472, height: 3648, url: "https://unsplash.com/photos/7BjmDICVloE", download_url: "https://picsum.photos/id/1011/5472/3648" },
    { id: "1012", author: "Scott Webb", width: 3973, height: 2639, url: "https://unsplash.com/photos/uAgLGG1WBd4", download_url: "https://picsum.photos/id/1012/3973/2639" },
    { id: "1013", author: "Cayton Heath", width: 4256, height: 2832, url: "https://unsplash.com/photos/D8LcRLwZyPs", download_url: "https://picsum.photos/id/1013/4256/2832" },
    { id: "1014", author: "Oscar Keys", width: 6016, height: 4000, url: "https://unsplash.com/photos/AmPRUnRb6N0", download_url: "https://picsum.photos/id/1014/6016/4000" },
    { id: "1015", author: "Alexey Topolyanskiy", width: 6000, height: 4000, url: "https://unsplash.com/photos/-oWyJoSqBRM", download_url: "https://picsum.photos/id/1015/6000/4000" }
];

export const AllContentList: ContentList[] = [
    { items: PhotosList.map(p => Object.assign({}, p, { type: ContentType.Photo })), type: ContentType.Photo },
    { items: PhotosList.map(p => Object.assign({}, p, { thumbnail: p.download_url, type: ContentType.Video })), type: ContentType.Video }
];

export const WorkspaceList: IWorkspace[] = [
    new Workspace('Workspace #1', img1, `linear-gradient(to right, rgb(17, 153, 142), rgb(56, 239, 125))`),
    new Workspace('Workspace #2', img2, `linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51))`),
    new Workspace('Workspace #3', img3, `linear-gradient(to right, rgb(84, 51, 255), rgb(32, 189, 255), rgb(165, 254, 203))`),
    new Workspace('Workspace #4', img1, `linear-gradient(to left, rgb(100, 43, 115), rgb(198, 66, 110))`)
];

WorkspaceList.forEach(w => w.topics = GetSampleTopicItems());

export const WorkspaceCollectionTabs = [
    { id: 'all', name: 'All' },
    { id: 'photos', name: 'Worskpace', type: ContentType.Photo },
    { id: 'videos', name: 'Board', type: ContentType.Video },
];
export const DumpingGrounCollectionTabs = [
    { id: 'all', name: 'All' },
    { id: 'photos', name: 'Photos', type: ContentType.Photo },
    { id: 'videos', name: 'Videos', type: ContentType.Video },
    { id: 'articles', name: 'Articles', type: ContentType.Article },
    { id: 'links', name: 'Links', type: ContentType.Link },
    { id: 'social-media', name: 'Social Media', type: ContentType.SocialMedia },
];
export const Topiclist = [
    { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #AA', active: true },
    { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #BB', active: false },
    { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #CC', active: false }
];

export function GetSampleTopicItems() {
    const items = [
        { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #AA', active: true },
        { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #BB', active: false },
        { id: `${Math.floor(Math.random() * 10e8)}`, name: 'Topic #CC', active: false }
    ];
    return _.shuffle(items);
}

export function GetSampleBoardItems() {
    const items = [
        { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Video, props: { height: ItemHeight, width: ItemWidth } },
        { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Article, props: { height: ItemHeight, width: ItemWidth } },
        { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Photo, props: { height: ItemHeight, width: ItemWidth } },
        { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.Link, props: { height: ItemHeight, width: ItemWidth } },
        { id: `${Math.floor(Math.random() * 10e8)}`, type: ContentType.SocialMedia, props: { height: ItemHeight, width: ItemWidth } },
    ];
    return _.take(_.shuffle(items), 3);
}

export let BoardGroups: IBoardGroupWrapper[] = [
    {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'Group #1',
        props: { top: 0, left: 0 },
        items: GetSampleBoardItems(),
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    },
    {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'Group #2',
        props: { top: 0, left: 0 },
        items: GetSampleBoardItems(),
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    },
    {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'Group #3',
        props: { top: 0, left: 0 },
        items: GetSampleBoardItems(),
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    },
    {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'Group #4',
        props: { top: 0, left: 0 },
        items: GetSampleBoardItems(),
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    },
    {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'Group #5',
        props: { top: 0, left: 0 },
        items: GetSampleBoardItems(),
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    }
];

export function GetEmptyGroup() {
    return {
        id: `${Math.floor(Math.random() * 10e8)}`,
        title: 'New Group *',
        props: { top: 0, left: 0 },
        items: [],
        annotation: {
            id: `${Math.floor(Math.random() * 10e10)}`,
            message: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
        }
    };
}

export enum Cancellable {
    IdleCallback,
    AnimationFrame,
    Timeout,
    Interval
}

export class CancellabelRequests {
    cancellableList: Array<{ type: Cancellable, requestId: any, cleaned?: boolean}> = [];
    push(requestId, type: Cancellable) {
        this.cancellableList.push( { type, requestId, cleaned: false })
    }
    clean(id?) {
        if (typeof id !== 'undefined') {
            this.cancellableList = this.cancellableList.filter( t => t.requestId !== id);
        } else if (this.cancellableList.length > 0) {
            this.cancellableList.forEach((item: { type: Cancellable, requestId: any, cleaned?: boolean}) => {
                switch (item.type) {
                    case Cancellable.AnimationFrame : { window.cancelAnimationFrame(item.requestId); item.cleaned = true; break; }
                    case Cancellable.Timeout : { clearTimeout(item.requestId); item.cleaned = true; break; }
                    case Cancellable.Interval : { clearInterval(item.requestId); item.cleaned = true; break; }
                    case Cancellable.IdleCallback : { (window as any).cancelIdleCallback(item.requestId); item.cleaned = true; break; }
                }
            });
            this.cancellableList = this.cancellableList.filter( t => !t.cleaned);
        }
    }
}
