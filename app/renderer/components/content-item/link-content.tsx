import * as React from 'react';
import { IContentItem, IArticleContent, ILinkContent } from '../../constants/types';

export class LinkContentItem extends React.Component<{ data: IContentItem<ILinkContent>, showEntity?: boolean }, { }> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='link-content content-marker'>
                {
                    this.props.showEntity &&
                    <label className='link-title'>{this.props.data.contentData.ogDescription}</label>
                }
            </div>
        );
    }
}
