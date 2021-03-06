import { ContentList, ContentType, Workspace, IWorkspace, IBoardGroupWrapper } from "./types";
import * as _ from 'lodash';
const img1 = require('../assets/carnegie_museum_art.jpg');
const img2 = require('../assets/church_brew.jpg');
const img3 = require('../assets/duquesne_incline.jpg');

export const MediaTypeImages = {
    instagram: require('../assets/media-types/instagram.png'),
    medium: require('../assets/media-types/medium.png'),
    news: require('../assets/media-types/open-book.png'),
    photo: require('../assets/media-types/photo.png'),
    quora: require('../assets/media-types/quora.png'),
    twitter: require('../assets/media-types/twitter.png'),
    videoPlayer: require('../assets/media-types/video-player.png'),
    vimeo: require('../assets/media-types/vimeo.png'),
    youtube: require('../assets/media-types/youtube.png'),
    notes: require('../assets/media-types/notes.png'),
    link: require('../assets/media-types/link.png')
}

export const ItemWidth = 240;
export const ItemHeight = null;
export const GroupBufffer = 60;

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
    new Workspace('Instagram', img1, [
        { id: 'sunscreen', name: 'Sunscreen Debate', active: true },
        { id: 'microdermabrasion', name: 'Microdermabrasion', active: false },
        { id: 'copper-peptides', name: 'Copper Peptides', active: false }
    ], `linear-gradient(to right, rgb(17, 153, 142), rgb(56, 239, 125))`, 'rgb(56, 239, 125)', 'rgb(17, 153, 142)'),
    new Workspace('Blog', img3, [
        { id: 'k-beauty', name: 'K-Beauty Trends', active: true },
        { id: 'retinol', name: 'Retinol Routine', active: false },
        { id: 'routine', name: 'Peptides Routine', active: false }
    ], `linear-gradient(to right, rgb(84, 51, 255), rgb(32, 189, 255), rgb(165, 254, 203))`, '#8fddfe', 'rgb(32, 189, 255)'),
];

export const WorkspaceCollectionTabs = [
    { id: 'all', name: 'All' },
    { id: 'photos', name: 'Worskpace', type: ContentType.Photo }
];
export const DumpingGrounCollectionTabs = [
    { id: 'all', name: 'All' },
    { id: 'photos', name: 'Photos', type: ContentType.Photo },
    { id: 'videos', name: 'Videos', type: ContentType.Video },
    { id: 'articles', name: 'Articles', type: ContentType.Article },
    // { id: 'links', name: 'Links', type: ContentType.Link },
    { id: 'social-media', name: 'Social Media', type: ContentType.SocialMedia },
];
export const Topiclist = [
    { id: GetRandomId(), name: 'Sunscreen Debate', active: true },
    { id: GetRandomId(), name: 'Microdermabrasion', active: false },
    { id: GetRandomId(), name: 'Copper Peptides', active: false }
];

export function GetSampleTopicItems() {
    const items = [
        { id: GetRandomId(), name: 'Sunscreen Debate', active: true },
        { id: GetRandomId(), name: 'Microdermabrasion', active: false },
        { id: GetRandomId(), name: 'Copper Peptides', active: false }
    ];
    return items;
}

export function GetEmptyGroup() {
    return {
        id: GetRandomId(),
        title: 'New Group *',
        props: { top: 0, left: 0 },
        items: [],
        annotation: '',
        isEmpty: true
    };
}

export enum Cancellable {
    IdleCallback,
    AnimationFrame,
    Timeout,
    Interval
}

export class CancellabelRequests {
    cancellableList: Array<{ type: Cancellable, requestId: any, cleaned?: boolean }> = [];
    push(requestId, type: Cancellable) {
        this.cancellableList.push({ type, requestId, cleaned: false })
    }
    clean(id?) {
        if (typeof id !== 'undefined') {
            this.cancellableList = this.cancellableList.filter(t => t.requestId !== id);
        } else if (this.cancellableList.length > 0) {
            this.cancellableList.forEach((item: { type: Cancellable, requestId: any, cleaned?: boolean }) => {
                switch (item.type) {
                    case Cancellable.AnimationFrame: { window.cancelAnimationFrame(item.requestId); item.cleaned = true; break; }
                    case Cancellable.Timeout: { clearTimeout(item.requestId); item.cleaned = true; break; }
                    case Cancellable.Interval: { clearInterval(item.requestId); item.cleaned = true; break; }
                    case Cancellable.IdleCallback: { (window as any).cancelIdleCallback(item.requestId); item.cleaned = true; break; }
                }
            });
            this.cancellableList = this.cancellableList.filter(t => !t.cleaned);
        }
    }
}

export function GetAPIUrl() {
    const remote = (window as any).remote;
    if (remote) {
        return `http://localhost:${remote.getCurrentWindow().API_PORT}`;
    }
    return null;
}

export function ExportNote(value) {
    const ipcRenderer = (window as any).ipcRenderer;
    if (ipcRenderer) {
        ipcRenderer.send('export-composition', value);
    }
}

export function GetRandomId() { return `${Math.floor(Math.random() * 10e10)}` };
