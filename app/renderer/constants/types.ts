import * as _ from 'lodash';

export interface IState {
    sideBarShown: boolean;
    searchBarShown: boolean;
    workspaceInHeader: boolean;
    workspaceActionInHeader: boolean;
    workspaceDumpBarShown: boolean;
    workspaceDumpBarActionShown: boolean;
    workspaceRTEShown: boolean;
    workspaceRTEActionShown: boolean;
    toasts: IToastItem[];
    workspaceViewIsCanvas: boolean;
    workspaceActionsAreShown: boolean;
    newWorkspaceCreator: boolean;
    newTopicCreator: boolean;
    manageHeadersDialog: boolean;
    workspaceList?: IWorkspace[];
    activeWorkspace?: IWorkspace;
    isSelectionEnabled?: boolean;
}
export interface IAction {
    type: string;
    payload: any;
}

export interface IAppActions {
    actions: IAction[];
}

export interface IContentItemsList {
    list: ContentList;
    title: string;
}

export interface ITopic {
    id?: string;
    name?: string;
    image?: any;
    gradient?: string;
}

export interface IWorkspace {
    id?: string;
    name: string;
    image: any;
    gradient: string;
    topics?: ITopic[];
}
export class Workspace implements IWorkspace {
    id?: string;
    name: string;
    image: any;
    link: string;
    gradient: string;
    topics: ITopic[] = [];
    constructor(name, image, gradient = null) {
        this.id = `${Math.floor(Math.random() * 10e8)}`;
        this.name = name;
        this.image = image;
        this.link = `/workspace/${Math.floor(Math.random() * 10e6)}`;
        this.gradient = gradient;
    }
    getImgUrl() {
        return `url(${this.image})`;
    }
}

export const DragAndDropTypes = {
    DUMPING_GROUND_ITEM: 'DUMPING_GROUND_ITEM',
    BOARD_ITEM: 'BOARD_ITEM',
    HEADER_ITEM: 'HEADER_ITEM'
}

export enum ContentType {
    Photo,
    Video,
    Link,
    Article,
    SocialMedia,
    Sticky
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
    Scholar,
    MMS
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

export interface INoteContent {
    noteText?: string;
    mediaUrl?: string;
}

export interface ISocialMediaContent {
    tweetText?: string;
    instragramImageUrl?: string;
    handle?: string;
    profileLink?: string;
    profileImgUrl?: string;
}

export interface IContextMenuAction {
    id: string;
    icon: string;
    name: string;
}

export interface IContentItem<T> {
    id?: string;
    title?: string;
    contentType?: ContentType;
    sourceType?: MediaSourceType;
    contentData?: T;
    sourceUrl?: string;
    sourcePreviewAvailable?: boolean;
    tags?: any[];
    annotation?: string;
    props?: IRectProps;
}

export interface IWorkspaceContentTransfer {
    from: string;
    to: string;
    data: IContentItem<any>;
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

export interface IBoardGroupWrapper {
    id?: string;
    title?: string;
    props?: IRectProps;
    annotation?: string;
    items?: Array<IContentItem<any>>;
}

export interface ISideBarNavItem {
    id?: any;
    name?: string;
    link?: string;
    items?: ISideBarNavItem[];
    active?: boolean;
    subListOpen?: boolean;
    gradient?: string;
}

export interface IGroupHeader {
    id: string;
    name: string;
    groups: Array<{ id?: string; name?: string}>;
    drawProps?: {
        groupProps?: Array<{top: number, left: number }>;
        top?: number;
        left?: number;
        right?: number;
    }
}
