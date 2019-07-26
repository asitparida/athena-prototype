import * as React from 'react';
import { IContentItem, ContentType, MediaSourceType } from '../../constants/types';
import { PhotoContentViewer } from './photo-content-viewer';
import './content-viewer.scss';
import { VideoContentViewer } from './video-content-viewer';
import { MMSContentViewer } from './mms-content-viewer';
import { ContentViewerData } from '../../access/observables/observables';
import { Subscription } from 'rxjs';
import { InstagramContentViewer } from './instagram-content-viewer';

export class ContentViewer extends React.Component<{}, { data: IContentItem<any>, isOpen: boolean, isInstagram: boolean, instagramHTML: string }> {
    contentViewSubscription: Subscription;
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isOpen: false,
            isInstagram: false,
            instagramHTML: null
        }
    }
    componentDidMount() {
        this.contentViewSubscription = ContentViewerData.subscribe((contentData) => {
            this.setState({
                data: contentData,
                isOpen: true
            });
        });
        const onKeyUpListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (this.state.isOpen) {
                    this.closeViewer();
                }
            }
        }
        const binded = onKeyUpListener.bind(this);
        document.removeEventListener('keyup', binded);
        document.addEventListener('keyup', binded);
    }
    componentWillUnmount() {
        this.contentViewSubscription.unsubscribe();
    }

    closeViewer() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isOpen &&
                    <div className='content-viewer-holder'>
                        <div className='overlay'  onClick={this.closeViewer.bind(this)} />
                        <div className='close-viewer' onClick={this.closeViewer.bind(this)}><i className='material-icons'>close</i></div>
                        <div className='content-viewer-wrapper'>
                            <div className='content-viewer'>
                                {
                                    this.state.data.contentType === ContentType.Photo && <PhotoContentViewer data={this.state.data} />
                                }
                                {
                                    this.state.data.contentType === ContentType.Video && <VideoContentViewer data={this.state.data} />
                                }
                                {
                                    this.state.data.contentType === ContentType.Sticky && <MMSContentViewer data={this.state.data} />
                                }
                                {
                                    this.state.data.contentType === ContentType.SocialMedia && this.state.data.sourceType === MediaSourceType.Instagram && <InstagramContentViewer data={this.state.data} />
                                }
                                {
                                    this.state.data.title &&
                                    <label className='content-viewer-title'>{this.state.data.title}</label>
                                }
                                {
                                    this.state.data.tags.length > 0 &&
                                    <div className='content-viewer-tags'>
                                        {
                                            this.state.data.tags.map((tag, i) => <label key={i} className='tag'>{tag}</label> )
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}
