import * as React from 'react';
import * as _ from 'lodash';
import Dropdown from '../dropdown/dropdown';
import './combo-dropdown.scss';

class ComboDropdown extends React.Component<any, any> {
    debouncedPropagate = _.debounce(this.propagateChange, 300);
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showSearchMeta: false,
            contentTypeResults: [],
            searchToken: ''
        };
    }
    propagateChange() {
        if (this.props.propagateChange) {
            const token = this.state.searchToken;
            if (token.length > 2 || _.isEmpty(token)) {
                this.props.propagateChange(token);
            }
        }
    }
    onFocus() {
        this.props.onInputFocus();
        this.setState({
            showSearchMeta: true
        });
    }
    onBlur() {
        this.props.onInputBlur();
        this.setState({
            showSearchMeta: false
        });
    }
    onSearchTokenChange(e) {
        this.setState({
            searchToken: e.target.value
        });
        this.debouncedPropagate();
    }
    componentDidMount() {
        this.setState({
            categories: this.props.categories,
            contentTypeResults: this.props.contentTypeResults
        });
    }
    componentWillUnmount() {
        this.propagateChange();
        this.debouncedPropagate.cancel();
    }
    render() {
        return (
            <React.Fragment>
                <div className={`combo-dropdown ${this.state.showSearchMeta ? 'expanded' : ''}`}>
                    <div className='search-part'>
                        <i className='material-icons'>search</i>
                        <input placeholder='Search' onChange={this.onSearchTokenChange.bind(this)} value={this.state.searchToken} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
                    </div>
                    <div className='dropdown-part'>
                        <Dropdown items={this.state.categories} activeItem={this.props.activeItem} />
                    </div>
                </div>
                {
                    this.state.showSearchMeta &&
                    <React.Fragment>
                        <div className='search-meta-wrapper'>
                            <div className='search-meta-top'>
                                <div className='search-meta-content'>
                                    <div className='search-meta-content-left'>
                                        <i className='material-icons'>label</i> Tags
                                </div>
                                    <div className='search-meta-content-right'>
                                        <ul>
                                            <li>tag 1</li>
                                            <li>tag 2</li>
                                            <li>tag 3</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='search-meta-bottom'>
                                <div className='search-meta-content'>
                                    {
                                        this.state.contentTypeResults.length > 0 &&
                                        <ul>
                                            {
                                                this.state.contentTypeResults.map(type => <li key={type.name}><i className='material-icons'>{type.icon}</i><label>{type.name} ({type.count})</label></li>)
                                            }
                                        </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default ComboDropdown;
