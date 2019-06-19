import * as React from 'react';
import { Component } from "react";
import { RouterWrapper } from '../router';
// import { ipcRenderer } from 'electron';
import '../styles.scss';

interface IMainState {
    sideBarCollpased: boolean
}

class Main extends Component<{}, IMainState> {
    constructor(props) {
        super(props);
        this.state = { sideBarCollpased: true };
    }
    toggleSidebar() {
        const { sideBarCollpased } = this.state;
        this.setState({
            sideBarCollpased: !sideBarCollpased
        });
    }
    launchAnnotator() {
        const ipcRenderer = (window as any).ipcRenderer;
        ipcRenderer.send('launch-annotator');
    }
    render() {
        const sideBarCollpased = this.state.sideBarCollpased ? 'collapsed' : 'expanded';
        return (
            <div className="app-content">
                <div className="app-dragger" />
                <div className="app-content-top">
                    <div className="app-sidebar-toggle" onClick={this.toggleSidebar.bind(this)}>
                        <i className="material-icons">menu</i>
                    </div>
                    <div className='app-actions-right'>
                        <div className='action' onClick={this.launchAnnotator.bind(this)}>
                            <i className="material-icons">notes</i>
                        </div>
                    </div>
                </div>
                <div className="app-content-bottom">
                    <RouterWrapper sideBarCollpased={sideBarCollpased} />
                </div>
            </div>
        );
    }
}

export default Main;