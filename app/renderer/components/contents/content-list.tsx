import * as React from 'react';
import { ContentWithMenuWrapper } from './content-with-menu-wrapper';
import { IContentItem, ContentType } from '../../constants/types';

interface IContentListProps {
    title?: string;
    items?: Array<IContentItem<any>>;
    type: ContentType;
}

export class ContentList extends React.Component<IContentListProps, {}> {
    constructor(props) {
        super(props);
    }
    onContextMenu(e) {
        console.log(e, 'onContextMenu');
    }
    render() {
        const label = this.props.title;
        return <div className='content-list-wrapper'>
            <h1>{label}</h1>
            <div className='content-items-wrapper'>
                {this.props.items.map((item, j) => {
                    return <ContentWithMenuWrapper key={j} data={item} />
                })}
            </div>
        </div>
    }
}
