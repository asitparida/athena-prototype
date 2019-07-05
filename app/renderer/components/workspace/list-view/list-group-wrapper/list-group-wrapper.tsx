import * as React from 'react';
import { IBoardGroupWrapper } from '../../../../constants/types';
import ListGroupItem from '../list-group-item/list-group-item';
import './list-group-wrapper.scss';

class ListGroupWrapper extends React.Component<{ group: IBoardGroupWrapper }, any> {

    render() {
        return (
            <div className='workspace-list-group'>
                <h1>Group</h1>
                <div className='workspace-list-group-items'>
                    {
                        this.props.group.items.map((item, i) => <ListGroupItem data={item} key={item.id} />)
                    }
                </div>
            </div>
        );
    }
}

export default ListGroupWrapper;
