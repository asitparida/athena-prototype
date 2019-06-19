import * as React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

interface ChildProps {
    name: string;
}
interface ChildState {
    value: string;
}

export default class SidebarComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    render() {
        return <div className='sidebar-wrapper'>
            <ul className="workspace-list">
                <li className='active'><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/dump">All Clips</NavLink></li>
                <li><NavLink to='/w1'>Workspace #1</NavLink></li>
                <li><NavLink to='/w2'>Workspace #2</NavLink></li>
                <li><NavLink to='/w3'>Workspace</NavLink></li>
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
