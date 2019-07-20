import * as React from 'react';
import { IBoardGroupWrapper } from '../../../../constants/types';
import ListGroupItem from '../list-group-item/list-group-item';
import './list-group-wrapper.scss';

class ListGroupWrapper extends React.Component<{ group: IBoardGroupWrapper }, any> {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.group.title
        };
    }
    onTextChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    render() {
        return (
            <div className='workspace-list-group'>
                <input placeholder='What would like to name this group ?' value={this.state.title} onChange={this.onTextChange.bind(this)} />
                <textarea placeholder="What are your thoughts ?" defaultValue={this.props.group.annotation} />
                <div className='workspace-list-group-items'>
                    <div className='workspace-list-group-items-inner'>
                        {
                            this.props.group.items.map((item, i) => <ListGroupItem data={item} key={item.id} />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ListGroupWrapper;
