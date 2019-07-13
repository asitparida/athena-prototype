import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import DumpingGround from '../components/dumping-ground/dumping-ground';
import Home from '../components/home/home';
import SidebarComponent from '../components/sidebar/sidebar';
import SearchBarComponent from '../components/searchbar/searchbar';
import Workspace from '../components/workspace/workspace';
import RouterRoot from './router-root';
import Header from '../components/header/header';

export class RouterWrapper extends React.Component<{ sideBarCollpased: string, searchBarShown: boolean } | any, {}> {
    onChangeHandler() {
        this.props.onLocationChanged();
    }
    render() {
        const sideBarCollpased = this.props.sideBarShown ? 'expanded' : 'collapsed';
        return (
            <React.Fragment>
                <div className="app-content-sidebar left" data-state={sideBarCollpased} >
                    <SidebarComponent sideBarCollpased={!this.props.sideBarShown} />
                </div>
                <div className='app-content-holder'>
                    <div className='app-header-holder'>
                        <div className={`app-content-top ${this.props.workspaceInHeader ? 'expanded' : 'collapsed'}`}>
                            <Header />
                        </div>
                    </div>
                    <div className='app-content-container'>
                        <div className="app-content-area">
                            <RouterRoot onLocationChanged={this.onChangeHandler.bind(this)}>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path='/home' component={Home} />
                                    <Route exact path='/dump' component={DumpingGround} />
                                    <Route exact path='/workspace/:workspaceId/topic/:topicId' component={Workspace} />
                                    <Route component={() => <h1>204 No Content</h1>} />
                                    <Redirect from='' exact to='/home' />
                                </Switch>
                            </RouterRoot>
                        </div>
                        {
                            this.props.searchBarShown &&
                            <div className="app-content-sidebar search-bar right" data-state={'expanded'} >
                                <SearchBarComponent />
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
