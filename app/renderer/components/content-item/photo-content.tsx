import * as React from 'react';
import { IContentItem, IPhotoContent } from '../../constants/types';

export class PhotoContentItem extends React.Component<{ data: IContentItem<IPhotoContent> }, { showImg: boolean, imgAvailable: boolean, imgUrl: string }> {
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
            window.requestAnimationFrame(() => {
                const elem = document.createElement('IMG') as HTMLImageElement;
                elem.onload = () => {
                    window.requestAnimationFrame(() => {
                        this.setState({
                            imgAvailable: true,
                            imgUrl: this.props.data.contentData.imgUrl
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
                elem.src = this.props.data.contentData.imgUrl;
            });
        }
    }
    render() {
        const bgUrl = `url(${this.state.imgUrl})`;
        return (
            <div className='photo-content'>
                {
                    this.state.imgAvailable && this.state.imgUrl &&
                    <div className={`photo ${this.state.showImg ? 'shown' : ''}`} style={{ backgroundImage: bgUrl }} />
                }
            </div>
        );
    }
}
