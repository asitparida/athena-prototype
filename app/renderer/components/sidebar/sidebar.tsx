import * as React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { ISideBarNavItem } from '../../constants/types';
import { GetWorkspaceListForSidebar } from '../../transforms';
import * as actions from '../../access/actions/appActions';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const elementLogo = require('../../assets/blue-element-logo.png');

const mapStateToProps = ({ reducers, workspaceReducers }) => {
    return {
        workspaceList: workspaceReducers.workspaceList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class SidebarComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            sideBarItems: GetWorkspaceListForSidebar(this.props.workspaceList)
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
        if (this.props.sideBarCollpased) {
            this.props.actions.showSideBar();
        }
    }
    closeList() {
        const sideBarItems: ISideBarNavItem[] = [].concat(this.state.sideBarItems);
        sideBarItems.forEach((item, i) => {
            item.subListOpen = false;
        });
        this.setState({
            sideBarItems
        });
    }
    createNewWorkspace() {
        this.props.actions.showWorkspaceCreator();
    }
    toggleSidebar() {
        if (this.props.sideBarCollpased) {
            this.closeList();
        }
        this.props.actions.toggleSideBar();
    }
    render() {
        const { sideBarItems } = this.state;
        return <div className={`sidebar-wrapper ${this.props.sideBarCollpased ? 'collapsed' : 'expanded'}`}>
            <ul className="workspace-list" >
                <li className='hamburger' onClick={this.toggleSidebar.bind(this)}><i className='material-icons'>menu</i></li>
                {/* <li><NavLink to="/home"><label className='first-level-label'><i className='material-icons'>home</i><span className='name'>Home</span></label></NavLink></li> */}
                <li><NavLink to="/dump"><label className='first-level-label'><i className='material-icons'>apps</i><span className='name'>Collections</span></label></NavLink></li>
                <React.Fragment>
                {
                    sideBarItems.length > 0 &&
                    (sideBarItems as ISideBarNavItem[]).map(((item, i) => {
                        const styles = {
                            backgroundImage: item.gradient
                        };
                        return <li key={i} className="first-level">
                            <label className='first-level-label' onClick={this.openList.bind(this, i)}>
                                {
                                    item.subListOpen && <i className={`material-icons folder-icon ${item.gradient ? 'apply-gradient' : ''}`} style={styles}>folder_open</i>
                                }
                                {
                                    !item.subListOpen && <i className={`material-icons folder-icon ${item.gradient ? 'apply-gradient' : ''}`} style={styles}>folder</i>
                                }
                                <span className='name'>{item.name}</span>
                                </label>
                            {
                                !this.props.sideBarCollpased && item.items.length > 0 &&
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
                                !this.props.sideBarCollpased && item.subListOpen && item.items.length > 0 &&
                                <ul className='sub-list'>
                                    {
                                        item.items.map((subItem, j) => {
                                            return <li key={`${i}-${j}`}><NavLink to={subItem.link}><label className='second-level'><span className='name'>{subItem.name}</span></label></NavLink></li>
                                        })
                                    }
                                </ul>
                            }
                        </li>
                    }))
                }
                <li className='newWorkspace' onClick={this.createNewWorkspace.bind(this)}><label><i className='material-icons'>add</i><span className='name'>New Workspace</span></label></li>
                </React.Fragment>
            </ul>
            <div className="user-space">
                <div className='user-space-content'>
                    <div className='user-picture-wrapper'>
                        <NavLink to="/home"><img src={elementLogo} /></NavLink>
                    </div>
                    {
                        !this.props.sideBarCollpased &&
                        <React.Fragment>
                            <label>Asit Parida</label>
                            <p>asitparida@live.in</p>
                        </React.Fragment>
                    }
                </div>
            </div>
            {
                !this.props.sideBarCollpased &&
                <ul className='copyright-info'>
                    <li className='copyright-info'>© Knowledge Accelerator 2019</li>
                </ul>
            }
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
