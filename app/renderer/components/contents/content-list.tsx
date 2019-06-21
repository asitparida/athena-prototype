import * as React from 'react';
import { ContentType, PhotosList } from '../../constants/constants';
import { Content } from './content';

export class ContentList extends React.Component<{ title?: string, items?: Content[] }, { items?: any[] }> {
    constructor(props) {
        super(props);
        this.state = {
            items: PhotosList.map(p => Object.assign({}, p, { type: ContentType.Photo }))
        };
    }
    render() {
        const label = this.props.title;
        return <div className='content-list-wrapper'>
            <h1>{label}</h1>
            <div className='content-items-wrapper'>
                {this.state.items.map((item, j) => {
                    return <Content key={j} data={item} type={item.type} />
                })}
            </div>
        </div>
    }
}
