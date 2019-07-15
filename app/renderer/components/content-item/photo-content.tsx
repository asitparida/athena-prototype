import * as React from 'react';
import { IContentItem, IPhotoContent } from '../../constants/types';
import { CancellabelRequests, Cancellable } from '../../constants/constants';

export class PhotoContentItem extends React.Component<{ data: IContentItem<IPhotoContent> }, { showImg: boolean, imgAvailable: boolean, imgUrl: string }> {
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
        if (this.props.data.contentData.imgUrl) {
            const idleCallbackID = (window as any).requestIdleCallback(() => {
                this.imageElement = new Image();
                this.imageElement.onload = () => {
                    const animationId = window.requestAnimationFrame(() => {
                        this.setState({
                            imgAvailable: true,
                            imgUrl: this.props.data.contentData.imgUrl
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
                this.imageElement.src = this.props.data.contentData.imgUrl;
            });
            this.cancellable.push(idleCallbackID, Cancellable.IdleCallback);
        }
    }
    componentWillUnmount() {
        if (this.imageElement) {
            this.imageElement.remove();
            this.imageElement = null;
        }
        this.cancellable.clean();
    }
    render() {
        const bgUrl = `url(${this.state.imgUrl})`;
        return (
            <div className='photo-content content-marker'>
                {
                    this.state.imgAvailable && this.state.imgUrl &&
                    <div className={`photo ${this.state.showImg ? 'shown' : ''}`} style={{ backgroundImage: bgUrl }} />
                }
            </div>
        );
    }
}
