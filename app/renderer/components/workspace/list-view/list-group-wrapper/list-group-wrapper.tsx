import * as React from 'react';
import * as _ from 'lodash';
import { IBoardGroupWrapper } from '../../../../constants/types';
import ListGroupItem from '../list-group-item/list-group-item';
import './list-group-wrapper.scss';

class ListGroupWrapper extends React.Component<{ group: IBoardGroupWrapper, onNotesAndTitleChanged: (data: any) => {} }, any> {
    debouncedPropagate = _.debounce(this.propagateChange, 1000);
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.group.title,
            annotation: this.props.group.annotation
        };
    }
    onTitleTextChange(e) {
        this.setState({
            title: e.target.value
        })
        this.debouncedPropagate();
    }
    onNotesTextChange(e) {
        this.setState({
            annotation: e.target.value
        });
        this.debouncedPropagate();
    }
    propagateChange() {
        const { title, annotation } = this.state;
        if (this.props.onNotesAndTitleChanged) {
            this.props.onNotesAndTitleChanged({
                id: this.props.group.id,
                title,
                annotation
            })
        }
    }
    componentWillUnmount() {
        this.propagateChange();
        this.debouncedPropagate.cancel();
    }
    render() {
        return (
            <div className='workspace-list-group'>
                <input placeholder='What would like to name this group ?' value={this.state.title} onChange={this.onTitleTextChange.bind(this)} />
                <textarea placeholder="What are your thoughts ?" value={this.state.annotation} onChange={this.onNotesTextChange.bind(this)} />
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
