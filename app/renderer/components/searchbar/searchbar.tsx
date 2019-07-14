import * as React from 'react'
import './searchbar.scss';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DumpingGround from '../dumping-ground/dumping-ground';

const mapStateToProps = ({ workspaceReducers }) => {
    return {
        workspaceList: workspaceReducers.workspaceList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class SearchBarComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            showSearchMeta: false,
            contentTypeResults: [
                { icon: 'image', name: 'Images', count: 0 },
                { icon: 'movie', name: 'Videos', count: 0 },
                { icon: 'insert_drive_file', name: 'Articles', count: 0 },
                { icon: 'attach_file', name: 'Links', count: 0 },
                { icon: 'textsms', name: 'Social', count: 0 }
            ]
        };
    }
    onFocus() {
        this.setState({
            showSearchMeta: true
        });
    }
    onBlur() {
        this.setState({
            showSearchMeta: false
        });
    }
    render() {
        return <div className='searchbar-wrapper'>
            <div className="search-meta">
                <div className={`search-box ${this.state.showSearchMeta ? 'active' : ''}`}>
                    <input className='search-input' onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} /> <i className='material-icons'>search</i>
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
            </div>
            <div className='search-results'>
                <div className='search-results-inner'>
                    <DumpingGround hideGroupTitle={true} sticky={true} workspace={true} searchBar={true} />
                </div>
            </div>
            {
                this.state.showSearchMeta &&
                <div className='overlay' />
            }
        </div >
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
