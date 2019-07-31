import * as React from 'react';
import { IBoardGroupWrapper } from '../../../constants/types';
import ListGroupWrapper from './list-group-wrapper/list-group-wrapper';
import './list-view.scss';

class ListView extends React.Component<{ id?: string, groups?: IBoardGroupWrapper[], onNotesAndTitleChanged: (data: any) => {} }, any> {
    onNotesAndTitleChanged(data) {
        this.props.onNotesAndTitleChanged(data);
    }
    render() {
        return (
            <div className='workspace-list-groups'>
                {
                    this.props.groups.map((group, i) => <ListGroupWrapper onNotesAndTitleChanged={this.onNotesAndTitleChanged.bind(this)} key={group.id} group={group} />)
                }
            </div>
        );
    }
}

export default ListView;
