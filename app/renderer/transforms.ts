import { ISideBarNavItem, IWorkspace } from "./constants/types";

export function GetWorkspaceListForSidebar(Workspaces): ISideBarNavItem[] {
    const result: ISideBarNavItem[] = Workspaces.map((item: IWorkspace) => {
        const sideBarItem: ISideBarNavItem = {
            id: Math.floor(Math.random() * 10e8),
            name: item.name,
            link: `/workspace/${item.id}/topic/123`,
            active: false,
            subListOpen: false,
            gradient: item.gradient,
            items: item.topics.map(topic => {
                const subItem: ISideBarNavItem = {
                    id: topic.id,
                    name: topic.name,
                    active: false,
                    items: [],
                    link: BuildTopicLink(item.id, topic.id),
                };
                return subItem;
            })
        };
        return sideBarItem;
    });
    return result;
}

export function BuildTopicLink(workspaceId, topicLink) {
    return `/workspace/${workspaceId}/topic/${topicLink}`;
}

export function isEqual(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b) === 0;
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b;
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
            for (let i = 0; i < a.length; i++) {
                const equal = isEqual(a[i], b[i]);
                if (!equal) {
                    return false;
                }
            }
            return true;
        }
    }
    if (a instanceof Object && b instanceof Object) {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < aProps.length; i++) {
                const prop = aProps[i];
                const equal = isEqual(a[prop], b[prop]);
                if (!equal) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

export function GetGroupWrapperId(id) { return `GROUP-${id}`};

export function OpenExternalUrl(url) {
    const shell = (window as any).shell;
    if (shell) {
       shell.openExternal(url);
    } else {
        window.open(url, '_blank');
    }
}
