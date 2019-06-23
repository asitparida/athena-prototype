import * as React from 'react';
import { ContentList } from './content-list';
import { PhotosList } from '../../constants/constants';
import { ContentType, IContentListItem } from '../../constants/types';

interface IProps {
    type: ContentType
}

interface IContentCollectionState {
    listItems: IContentListItem[];
}

export class ContentCollection extends React.Component<IProps, IContentCollectionState> {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                { title: 'Recent',  items: PhotosList.map(p => Object.assign({}, p, { type: this.props.type })) },
                { title: 'Yesterday',  items: PhotosList.map(p => Object.assign({}, p, { type: this.props.type })) },
                { title: 'June 12, 2019',  items: PhotosList.map(p => Object.assign({}, p, { type: this.props.type })) },
                { title: 'June 11, 2019',  items: PhotosList.map(p => Object.assign({}, p, { type: this.props.type })) }
            ]
        };
    }
    render() {
        return <React.Fragment>
            {
                this.state.listItems.map((item, i) => {
                    return <ContentList title={item.title} key={i} type={this.props.type} items={item.items} />
                })
            }
        </React.Fragment>
    }
}
