import { ISideBarNavItem } from "./constants/types";
import { WorkspaceList, Topiclist } from "./constants/constants";

export function GetWorkspaceListForSidebar(): ISideBarNavItem[] {
    const result: ISideBarNavItem[] = WorkspaceList.map(item => {
        const sideBarItem: ISideBarNavItem = {
            id: Math.floor(Math.random() * 10e8),
            name: item.name,
            link: `/workspace/${item.id}/topic/123`,
            active: false,
            subListOpen: false,
            items: Topiclist.map(topic => {
                const subItem: ISideBarNavItem = {
                    id: topic.id,
                    name: topic.name,
                    active: false,
                    items: [],
                    link: `/workspace/${item.id}/topic/${topic.id}`,
                };
                return subItem;
            })
        };
        return sideBarItem;
    });
    return result;
}
