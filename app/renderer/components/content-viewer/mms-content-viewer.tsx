import * as React from 'react';
import { IContentItem, IPhotoContent, INoteContent } from '../../constants/types';

export class MMSContentViewer extends React.Component<{ data: IContentItem<INoteContent> }, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const bgUrl = `url(${this.props.data.contentData.mediaUrl})`;
        return (
            <React.Fragment>
                {
                    <div className='photo-content-viewer'>
                        <div className='photo-content-image' style={{ backgroundImage: bgUrl }} />
                    </div>
                }
            </React.Fragment>
        );
    }
}
