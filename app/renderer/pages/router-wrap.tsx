import * as React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import DumpingGround from '../components/dumping-ground/dumping-ground';
import Home from '../components/home/home';
import SidebarComponent from '../components/sidebar/sidebar';
import Workspace from '../components/workspace/workspace';
import RouterRoot from './router-root';

export class RouterWrapper extends React.Component<{ sideBarCollpased: string } | any, {}> {
    onChangeHandler() {
        this.props.onLocationChanged();
    }
    render() {
        return (
            <HashRouter hashType='noslash' >
                <div className="app-content-sidebar left" data-state={this.props.sideBarCollpased} >
                    <SidebarComponent />
                </div>
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
            </HashRouter>
        )
    }
}
