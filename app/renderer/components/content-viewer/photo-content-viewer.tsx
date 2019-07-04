import * as React from 'react';
import { IContentItem, IPhotoContent } from '../../constants/types';

export class PhotoContentViewer extends React.Component<{ data: IContentItem<IPhotoContent> }, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const bgUrl = `url(${this.props.data.contentData.imgUrl})`;
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
