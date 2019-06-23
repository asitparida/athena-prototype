import * as React from 'react';
import { ContextMenu } from '../context-menu/context-menu';
import { ContentType } from '../../constants/types';
import ContentWrapper from './content-wrapper';

export class Content extends React.Component<any, {}> {
    id = Math.floor(Math.random() * 10e8);
    render() {
        let label = '';
        switch (this.props.type) {
            case ContentType.Article: { label = 'Article'; break; }
            case ContentType.Link: { label = 'Link'; break; }
            case ContentType.Photo: { label = 'Photo'; break; }
            case ContentType.Video: { label = 'Video'; break; }
            case ContentType.SocialMedia: { label = 'Social Media'; break; }
        }
        return <div className='content-wrapper'>
            <ContextMenu>
                <ContentWrapper id={this.id} label={label} />
            </ContextMenu>
        </div>
    }
}
export default Content;
