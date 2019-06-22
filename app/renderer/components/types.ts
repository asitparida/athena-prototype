import { ContentType } from "../constants/constants";
import { Content } from "./contents/content";

export interface IDumpingGroundTab {
    id?: string;
    name?: string;
    type?: ContentType
}

export interface IContentListItem {
    title: string;
    items: any[];
}
