export interface IStickyNote {
    id?: string;
    text?: string;
    workspaceId?: string;
    topicId?: string;
    assigned?: boolean;
    modified?: Date;
}

export interface IMms {
    text?: string;
    mediaUrl?: string;
    sid?: string;
    modified?: Date;
}
