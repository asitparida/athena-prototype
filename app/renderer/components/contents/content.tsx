import * as React from 'react';
import { ContentType } from '../../constants/constants';

export class Content extends React.Component<{ type?: ContentType, data: any}, {}> {
    render() {
        let label = '';
        switch (this.props.type) {
            case ContentType.Article: { label = 'Article'; break; }
            case ContentType.Link: { label = 'Link'; break; }
            case ContentType.Photo: { label = 'Photo'; break; }
            case ContentType.Video: { label = 'Video'; break; }
        }
        return <div className='content-wrapper'>
            <div className='content'>
                <h1>Content</h1>
                <h2>...</h2>
                <label className='content-label'>{label}</label>
            </div>
        </div>
    }
}
