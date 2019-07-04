import * as React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { WorkspaceList } from '../../constants/constants';
import { Workspace, ISideBarNavItem } from '../../constants/types';
import { GetWorkspaceListForSidebar } from '../../transforms';

export default class SidebarComponent extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            sideBarItems: GetWorkspaceListForSidebar()
        };
    }
    openList(index) {
        const sideBarItems: ISideBarNavItem[] = [].concat(this.state.sideBarItems);
        sideBarItems.forEach((item, i) => {
            item.subListOpen = i === index ? !item.subListOpen : false;
        });
        this.setState({
            sideBarItems
        })
    }
    render() {
        const { sideBarItems } = this.state;
        return <div className='sidebar-wrapper'>
            <ul className="workspace-list">
                <li><NavLink to="/home"><label className='first-level-label'><i className='material-icons'>home</i>Home</label></NavLink></li>
                <li><NavLink to="/dump"><label className='first-level-label'><i className='material-icons'>apps</i>Collections</label></NavLink></li>
                <React.Fragment>
                {
                    sideBarItems.length > 0 &&
                    (sideBarItems as ISideBarNavItem[]).map(((item, i) => {
                        return <li key={i} className="first-level">
                            <NavLink to={item.link}>
                                <label className='first-level-label'>
                                {
                                    item.subListOpen && <i className='material-icons folder-icon'>folder_open</i>
                                }
                                {
                                    !item.subListOpen && <i className='material-icons folder-icon'>folder</i>
                                }
                                {item.name}
                                </label>
                            </NavLink>
                            {
                                item.items.length > 0 &&
                                <span className='list-toggler' onClick={this.openList.bind(this, i)}>
                                    {
                                        item.subListOpen &&
                                        <i className='material-icons up'>arrow_drop_up</i>
                                    }
                                    {
                                        !item.subListOpen &&
                                        <i className='material-icons down'>arrow_drop_down</i>
                                    }
                                </span>
                            }
                            {
                                item.subListOpen && item.items.length > 0 &&
                                <ul className='sub-list'>
                                    {
                                        item.items.map((subItem, j) => {
                                            return <li key={`${i}-${j}`}><NavLink to={subItem.link}><label className='second-level'>{subItem.name}</label></NavLink></li>
                                        })
                                    }
                                </ul>
                            }
                        </li>
                    }))
                }
                </React.Fragment>
            </ul>
            <div className="user-space">
                <div className='user-space-content'>
                    <div className='user-picture-wrapper'>
                        <i className="material-icons">face</i>
                    </div>
                    <label>Asit Parida</label>
                    <p>asitparida@live.in</p>
                </div>
            </div>
            <ul className='copyright-info'>
                <li className='copyright-info'>© Knowledge Accelerator 2019</li>
            </ul>
        </div>
    }
}
