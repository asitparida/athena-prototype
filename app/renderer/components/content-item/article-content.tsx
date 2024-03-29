import * as React from 'react';
import { IContentItem, IArticleContent } from '../../constants/types';

export class ArticleContentItem extends React.Component<{ data: IContentItem<IArticleContent>, showEntity?: boolean }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='article-content content-marker'>
                {
                    this.props.showEntity &&
                    <React.Fragment>
                        <label className='article-title'>{this.props.data.contentData.articleTitle}</label>
                        <label className='article-author'>{this.props.data.contentData.authorName}</label>
                    </React.Fragment>
                }
            </div>
        );
    }
}
