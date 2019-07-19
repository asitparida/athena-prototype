import * as React from 'react';
import * as _ from 'lodash';
import { Component } from "react";
import './annotator.scss';
import { IStickyNote } from '../../api/api-types';

export function GetAPIUrl() {
    const remote = (window as any).remote;
    return `http://localhost:${remote.getCurrentWindow().API_PORT}`;
}

interface IAnnotatorState {
    message: string;
    saved: boolean;
}

class Annotator extends Component<{}, IAnnotatorState> {
    currentSticky: IStickyNote = {};
    debouncedSaveContent = _.debounce(this.saveContent, 1000)
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            saved: false
        };
    }
    saveContent(msg) {
        const sticky: IStickyNote = Object.assign({}, this.currentSticky, {
            id: this.currentSticky.id || null,
            assigned: this.currentSticky.assigned || false ,
            text: msg,
            topicId: this.currentSticky.topicId || null,
            modified: new Date(),
            workspaceId: this.currentSticky.workspaceId || null
        });
        const api = `${GetAPIUrl()}/api/stickies`;
        fetch(api, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sticky)
        })
            .then((res) => res.json())
            .then((data) => {
                this.currentSticky = data.data;
                this.setState({
                    saved: true
                })
            }, (data) => {
                console.log(data);
            });
    }
    onMessageContentChanged(e) {
        this.debouncedSaveContent(e.target.value);
        this.setState({
            message: e.target.value
        });
    }
    render() {
        return (
            <div className="app-content">
                {/* <div className="app-dragger" /> */}
                <div className='app-content-area'>
                    <textarea placeholder="Type your notes here ..." value={this.state.message} onChange={this.onMessageContentChanged.bind(this)} />
                </div>
            </div>
        );
    }
}

export default Annotator;
