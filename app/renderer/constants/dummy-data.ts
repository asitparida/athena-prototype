import { IContentItem, ContentType, MediaSourceType, INoteContent } from "./types";
import * as _ from 'lodash';
import { IStickyNote, IMms } from "../../api/api-types";

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
        tags: [],
        annotation: ''
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
        tags: [],
        annotation: data.text
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
        tags: [],
        annotation: ' '
    };
}
