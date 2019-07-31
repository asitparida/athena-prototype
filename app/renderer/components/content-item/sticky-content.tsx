import * as React from 'react';
import { IContentItem, INoteContent, MediaSourceType } from '../../constants/types';

export class StickyContentItem extends React.Component<{ data: IContentItem<INoteContent>, showEntity?: boolean }, any> {
    constructor(props) {
        super(props);
        this.state = {
            imgAvailable: true,
            showImg: true,
            imgUrl: null
        };
    }
    render() {
        const bgUrl = `url(${this.props.data.contentData.mediaUrl})`;
        return (
            <React.Fragment>
                {
                    this.props.data.sourceType === MediaSourceType.MMS && this.props.showEntity &&
                    <div className='photo-content content-marker'>
                        {
                            this.state.imgAvailable &&
                            <div className={`photo ${this.state.showImg ? 'shown' : ''}`} style={{ backgroundImage: bgUrl }} />
                        }
                    </div>
                }
                {
                    !this.props.data.sourceType && this.props.showEntity &&
                    <div className='note-content content-marker'>
                        <p className='note-text'>{this.props.data.contentData.noteText}</p>
                    </div>
                }
            </React.Fragment>
        );
    }
}
