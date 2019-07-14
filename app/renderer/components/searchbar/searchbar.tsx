import * as React from 'react'
import './searchbar.scss';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../dropdown/dropdown';
import { DumpingGroundListCollection } from '../dumping-ground/dumping-ground-list-collection';

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
            ],
            categories: [
                { id: 'unclassified', name: 'Unclassified' },
                { id: 'classified', name: 'Classified' },
                { id: 'workspace-1', name: 'Workspace #1' },
                { id: 'workspace-2', name: 'Workspace #2' },
                { id: 'workspace-3', name: 'Workspace #3' }
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
                    <div className='search-results-top'>
                        <Dropdown items={this.state.categories} />
                    </div>
                    <div className='search-results-bottom'>
                        <div className='dumping-ground-list-wrapper'>
                            <DumpingGroundListCollection searchBar={true} hideGroupTitle={true} />
                        </div>

                    </div>
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
