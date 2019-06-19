import * as React from 'react'
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
                <li>Workspace #1</li>
                <li>Workspace #2</li>
                <li>Workspace #3</li>
            </ul>
            <ul className="user-space"></ul>
        </div>
    }
}
