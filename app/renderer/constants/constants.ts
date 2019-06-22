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
    { id: "1015", author: "Alexey Topolyanskiy", width: 6000, height: 4000, url: "https://unsplash.com/photos/-oWyJoSqBRM", download_url: "https://picsum.photos/id/1015/6000/4000" }];

export enum ContentType {
    Photo,
    Video,
    Link,
    Article,
    SocialMedia
}
export enum MediaSourceType {
    Browser,
    Instagram,
    Twitter,
    Facebook,
    Medium,
    Quora,
    Youtube
}
class ContentList {
    items: any[];
    type: ContentType
}
export const AllContentList: ContentList[] = [
    { items: PhotosList.map( p => Object.assign({}, p, { type: ContentType.Photo })), type: ContentType.Photo },
    { items: PhotosList.map( p => Object.assign({}, p, { thumbnail: p.download_url, type: ContentType.Video })), type: ContentType.Video }
];

export interface IContentItemsList {
    list: ContentList;
    title: string;
}
