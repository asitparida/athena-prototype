import * as React from 'react';
import { IContentItem, IVideoContent } from '../../constants/types';
import { GetDuration } from '../../helper';
import { CancellabelRequests, Cancellable } from '../../constants/constants';

export class VideoContentItem extends React.Component<{ data: IContentItem<IVideoContent> }, { showImg: boolean, imgAvailable: boolean, imgUrl: string }> {
    imageElement: HTMLImageElement;
    cancellable = new CancellabelRequests();
    constructor(props) {
        super(props);
        this.state = {
            imgAvailable: false,
            showImg: false,
            imgUrl: null
        };
    }
    componentDidMount() {
        if (this.props.data.contentData.videoThumbnailUrl) {
            const idleCallbackID = (window as any).requestAnimationFrame(() => {
                this.imageElement = new Image();
                this.imageElement.onload = () => {
                    const animationId = window.requestAnimationFrame(() => {
                        this.setState({
                            imgAvailable: true,
                            imgUrl: this.props.data.contentData.videoThumbnailUrl
                        });
                        const timer1 = setTimeout(() => {
                            this.setState({
                                showImg: true
                            });
                            const timer2 = setTimeout(() => {
                                if (this.imageElement) {
                                    this.imageElement.remove();
                                    this.imageElement = null;
                                }
                                this.cancellable.clean(timer2);
                            });
                            this.cancellable.clean(timer1);
                            this.cancellable.push(timer2, Cancellable.Timeout);
                        }, 100);
                        this.cancellable.clean(animationId);
                        this.cancellable.push(timer1, Cancellable.Timeout);
                    });
                    this.cancellable.push(animationId, Cancellable.AnimationFrame);
                }
                this.cancellable.clean(idleCallbackID);
                this.imageElement.src = this.props.data.contentData.videoThumbnailUrl;
            });
            this.cancellable.push(idleCallbackID, Cancellable.AnimationFrame);
        }
    }
    componentWillUnmount() {
        if (this.imageElement) {
            this.imageElement.onload = null;
            this.imageElement.remove();
            this.imageElement = null;
        }
        this.cancellable.clean();
    }
    render() {
        const duration = GetDuration(this.props.data.contentData.videoLength);
        const bgUrl = `url(${this.state.imgUrl})`;
        return (
            <div className='video-content content-marker'>
                <label className='video-duration'>{duration}</label>
                {
                    this.state.imgAvailable && this.state.imgUrl &&
                    <div className={`video-photo ${this.state.showImg ? 'shown' : ''}`} style={{ backgroundImage: bgUrl }} />
                }
                <div className={`video-overlay ${this.state.imgAvailable && this.state.imgUrl ? 'darken-bg' : ''}`}>
                    <i className='material-icons play-icon'>play_circle_filled</i>
                </div>
            </div>
        );
    }
}
