import * as React from 'react';
import './dropdown.scss';

interface IDropdownProps {
    items?: any[];
    activeItem?: any;
}

interface IDropdownState {
    activeItem: any;
    open: boolean;
}

class Dropdown extends React.Component<IDropdownProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: null,
            open: false
        }
    }
    toggleMenu() {
        const open = this.state.open;
        this.setState({
            open: !open
        });
    }
    selectItem(item) {
        this.setState({
            activeItem: item,
            open: false
        });
    }
    render() {
        return (
            <div className={`dropdown-wrapper ${this.state.open ? 'open' : ''}`} >
                <label className='dropdown-item-selected' onClick={this.toggleMenu.bind(this)}>{this.props.activeItem ? this.props.activeItem.name : ''}
                    <i className='material-icons'>{this.state.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
                </label>
                {
                    this.props.items.length > 0 &&
                    <ul className='dropdown-menu'>
                        {
                            this.props.items.map((category, i) => {
                                return <li key={i} className="dropdown-item" onClick={this.selectItem.bind(this, category)}>{category.name}</li>
                            })
                        }
                    </ul>
                }
            </div>
        );
    }
}

export default Dropdown;
