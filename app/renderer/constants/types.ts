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
        this.id = `${Math.floor(Math.random() * 10e8)}`;
        this.name = name;
        this.image = image;
        this.link = `/workspace/${Math.floor(Math.random() * 10e6)}`;
    }
    getImgUrl() {
        return `url(${this.image})`;
    }
}

export const DragAndDropTypes = {
    DUMPING_GROUND_ITEM: 'DUMPING_GROUND_ITEM',
    BOARD_ITEM: 'BOARD_ITEM'
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
    Youtube,
    Vimeo,
    ACM,
    Scholar
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
    listItems: Array<IContentItem<any>>;
}

export interface IPhotoContent {
    imgUrl?: string;
}

export interface IVideoContent {
    videoId?: string;
    videoThumbnailUrl?: string;
    videoUrl?: string;
    videoStartTick?: number;
    videoEndTick?: number;
    videoLength?: number;
}

export interface IArticleContent {
    articleTitle?: string;
    articleLink?: string;
    authorName?: string;
}

export interface ILinkContent {
    ogLink?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogSiteName?: string;
    ogImage?: string;
}

export interface IContextMenuAction {
    icon: string;
    name: string;
}

export interface IContentItem<T> {
    id?: string;
    title?: string;
    contentType?: ContentType;
    sourceType?: MediaSourceType;
    contentData?: T;
    sourcePreviewAvailable?: boolean;
    tags?: any[];
    annotations?: IAnnotation[];
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

export interface IRectProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}

export interface IAnnotation {
    id?: string;
    message?: string;
}

export interface IBoardContent {
    type?: ContentType;
    label?: string;
    id?: string;
    data?: any;
    annotationData?: IAnnotation[];
    props?: IRectProps;
}
export interface IBoardGroupContent {
    annotationData?: IAnnotation[];
}
export interface IBoardGroupWrapper {
    id?: string;
    props?: IRectProps;
    annotationData?: IAnnotation[];
}

export interface ISideBarNavItem {
    id?: any;
    name?: string;
    link?: string;
    items?: ISideBarNavItem[];
    active?: boolean;
    subListOpen?: boolean;
}
