import * as React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { WorkspaceList } from '../../constants/constants';
import { Workspace } from '../../constants/types';

export default class SidebarComponent extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            workspaceList: WorkspaceList
        };
    }
    render() {
        const { workspaceList } = this.state;
        return <div className='sidebar-wrapper'>
            <ul className="workspace-list">
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/dump">All Clips</NavLink></li>
                {
                    (workspaceList as Workspace[]).map(((space, i) => <li key={i}><NavLink to={space.link}>{space.name}</NavLink></li>)
                }
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
            <ul>
                <li className='copyright-info'>© Knowledge Accelerator 2019</li>
            </ul>
        </div>
    }
}
