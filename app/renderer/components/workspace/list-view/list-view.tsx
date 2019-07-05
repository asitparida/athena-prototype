import * as React from 'react';
import { IBoardGroupWrapper } from '../../../constants/types';
import ListGroupWrapper from './list-group-wrapper/list-group-wrapper';
import './list-view.scss';

class ListView extends React.Component<{ id?: string, groups?: IBoardGroupWrapper[] }, any> {

    render() {
        return (
            <div className='workspace-list-groups'>
                {
                    this.props.groups.map((group, i) => <ListGroupWrapper key={group.id} group={group} />)
                }
            </div>
        );
    }
}

export default ListView;
