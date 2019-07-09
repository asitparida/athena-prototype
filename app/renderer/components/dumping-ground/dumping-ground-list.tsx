import * as React from 'react';
import { IContentItem, ContentType } from '../../constants/types';
import DumpingGroundItem from './dumping-ground-item';

interface IContentListProps {
    title?: string;
    items?: Array<IContentItem<any>>;
    type: ContentType;
}

export class DumpingGroundList extends React.Component<IContentListProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const label = this.props.title;
        return <div className='content-list-wrapper'>
            <h1>{label}</h1>
            <div className='content-items-wrapper'>
                {this.props.items.map((item, j) => {
                    return (
                        <div key={item.id} className='content-wrapper'>
                            <DumpingGroundItem data={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    }
}
