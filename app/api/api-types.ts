export interface IStickyNote {
    id?: string;
    text?: string;
    workspaceId?: string;
    topicId?: string;
    assigned?: boolean;
    modified?: Date;
}
