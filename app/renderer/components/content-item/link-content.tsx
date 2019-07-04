import * as React from 'react';
import { IContentItem, IArticleContent, ILinkContent } from '../../constants/types';

export class LinkContentItem extends React.Component<{ data: IContentItem<ILinkContent> }, { }> {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.data);
        return (
            <div className='link-content'>
                <label className='link-title'>{this.props.data.contentData.ogTitle}</label>
                <label className='link-author'>{this.props.data.contentData.ogDescription}</label>
            </div>
        );
    }
}
