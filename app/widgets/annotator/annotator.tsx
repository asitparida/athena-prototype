import * as React from 'react';
import { Component } from "react";
import './annotator.scss';

interface IMainState {
    sideBarCollpased: boolean
}

class Annotator extends Component<{}, IMainState> {
    render() {
        return (
            <div className="app-content">
                <div className="app-dragger" />
                <div className='app-content-area'>
                    <textarea placeholder="Type your notes here ..."></textarea>
                </div>
            </div>
        );
    }
}

export default Annotator;