import * as React from 'react';
import { IContentItem, ISocialMediaContent, MediaSourceType } from '../../constants/types';

export class SocialMediaContentItem extends React.Component<{ data: IContentItem<ISocialMediaContent>, showEntity?: boolean }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            backgroundImage: `url(${this.props.data.contentData.profileImgUrl})`
        };
        const instaStyles = {
            backgroundImage: `url(${this.props.data.contentData.instragramImageUrl})`
        };
        return (
            <div className='social-media-content content-marker'>
                {
                    this.props.showEntity &&
                    <React.Fragment>
                        {
                            this.props.data.sourceType === MediaSourceType.Twitter &&
                            <label className='tweet-text'>{this.props.data.contentData.tweetText}</label>
                        }
                        {
                            this.props.data.sourceType === MediaSourceType.Instagram &&
                            <div className='insta-photo' style={instaStyles} />
                        }
                        <div className={`social-media-handle ${this.props.data.sourceType === MediaSourceType.Twitter ? 'twitter' : 'instagram'}`}>
                            <div className='social-media-text'>{this.props.data.contentData.handle}</div>
                            <div className={`social-media-pic ${this.props.data.sourceType === MediaSourceType.Twitter ? 'twitter' : 'instagram'}`} style={styles} />
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}
