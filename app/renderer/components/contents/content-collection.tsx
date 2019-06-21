import * as React from 'react';
import { ContentList } from './content-list';

export class ContentCollection extends React.Component<{ title?: string, items?: any[] }, {listItems?: any[]}> {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                { title: 'Recent' },
                { title: 'June 12, 2019' },
                { title: 'June 11, 2019' }
            ]
        };
    }
    render() {
        const label = this.props.title;
        return <React.Fragment>
            {
                this.state.listItems.map((item, i) => {
                    return <ContentList title={item.title} key={i} />
                })
            }
        </React.Fragment>
    }
}
