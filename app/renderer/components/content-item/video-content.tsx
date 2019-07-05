import * as React from 'react';
import { IContentItem, IVideoContent } from '../../constants/types';
import { GetDuration } from '../../helper';

export class VideoContentItem extends React.Component<{ data: IContentItem<IVideoContent> }, { showImg: boolean, imgAvailable: boolean, imgUrl: string }> {
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
            (window as any).requestIdleCallback(() => {
                const elem = document.createElement('IMG') as HTMLImageElement;
                elem.onload = () => {
                    window.requestAnimationFrame(() => {
                        this.setState({
                            imgAvailable: true,
                            imgUrl: this.props.data.contentData.videoThumbnailUrl
                        });
                        setTimeout(() => {
                            this.setState({
                                showImg: true
                            });
                            setTimeout(() => {
                                elem.remove();
                            });
                        }, 100)
                    })
                }
                elem.src = this.props.data.contentData.videoThumbnailUrl;
            });
        }
    }
    render() {
        const duration = GetDuration(this.props.data.contentData.videoLength);
        const bgUrl = `url(${this.state.imgUrl})`;
        return (
            <div className='video-content'>
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
