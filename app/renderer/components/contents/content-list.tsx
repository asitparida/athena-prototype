import * as React from 'react';
import { Content } from './content';
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
                    return <Content key={j} data={item} />
                })}
            </div>
        </div>
    }
}
