export interface IContentItemsList {
    list: ContentList;
    title: string;
}

export interface IWorkspace {
    id?: string;
    name: string;
    image: any;
}
export class Workspace implements IWorkspace {
    id?: string;
    name: string;
    image: any;
    link: string;
    constructor(name, image) {
        console.log(image);
        this.name = name;
        this.image = image;
        this.link = `/workspace/${Math.floor(Math.random() * 10e6)}`;
    }
    getImgUrl() {
        return `url(${this.image})`;
    }
}

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
export class ContentList {
    items: any[];
    type: ContentType
}

export interface IDumpingGroundTab {
    id?: string;
    name?: string;
    type?: ContentType
}

export interface IContentListItem {
    title: string;
    items: any[];
}

export enum ToastType {
    Success,
    Failure,
    Warning
}

export interface IToastItem {
    id?: string;
    message: string;
    type: ToastType;
}
