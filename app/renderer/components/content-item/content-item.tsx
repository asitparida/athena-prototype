import * as React from 'react';
import { IContentItem, ContentType } from '../../constants/types';
import { PhotoContentItem } from './photo-content';
import './content-item.scss'

export class ContentItemWrapper extends React.Component<{ data: IContentItem<any>, menuInvoked: () => {}}, {}> {
    invokeMenu() {
        this.props.menuInvoked();
    }
    render() {
        const type = this.props.data.contentType;
        let label = '';
        switch (type) {
            case ContentType.Article: { label = 'Article'; break; }
            case ContentType.Link: { label = 'Link'; break; }
            case ContentType.Photo: { label = 'Photo'; break; }
            case ContentType.Video: { label = 'Video'; break; }
            case ContentType.SocialMedia: { label = 'Social Media'; break; }
        }
        let currentContent = <React.Fragment><h1>Content</h1><h2>...</h2></React.Fragment>;
        switch (type) {
            case ContentType.Photo: {
                currentContent = <PhotoContentItem data={this.props.data} />
                break;
            }
            default: {
                currentContent = <React.Fragment><h1>Content</h1><h2>...</h2></React.Fragment>
                break;
            }
        }
        return (
            <div className='content'>
                <div className='inner-content-wrapper '>
                    {
                        currentContent
                    }
                </div>
                <div className='content-item-actions'>
                    <i className='material-icons smaller'>notes</i>
                    <i className='material-icons' onClick={this.invokeMenu.bind(this)}>more_horiz</i>
                </div>
                <label className='content-label'>{label}</label>
            </div>);
    }
}
