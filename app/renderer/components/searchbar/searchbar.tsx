import * as React from 'react'
import './searchbar.scss';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../dropdown/dropdown';
import { DumpingGroundListCollection } from '../dumping-ground/dumping-ground-list-collection';
import ComboDropdown from '../combo-dropdown/combo-dropdown';

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
            searchToken: '',
            contentTypeResults: [
                { icon: 'image', name: 'Images', count: 0 },
                { icon: 'movie', name: 'Videos', count: 0 },
                { icon: 'insert_drive_file', name: 'Articles', count: 0 },
                { icon: 'attach_file', name: 'Links', count: 0 },
                { icon: 'textsms', name: 'Social', count: 0 }
            ],
            categories: [
                { id: 'all', name: 'All' },
                { id: 'unclassified', name: 'Unclassified' },
                { id: 'classified', name: 'Classified' },
                { id: 'workspace-1', name: 'Workspace #1' },
                { id: 'workspace-2', name: 'Workspace #2' },
                { id: 'workspace-3', name: 'Workspace #3' }
            ],
            activeCategory:  { id: 'all', name: 'All' }
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
    onSearchTokenChanged(data) {
        this.setState({
            searchToken: data
        });
    }
    render() {
        return <div className='searchbar-wrapper'>
            <div className="search-meta">
                <ComboDropdown propagateChange={this.onSearchTokenChanged.bind(this)} onInputFocus={this.onFocus.bind(this)}  contentTypeResults={this.state.contentTypeResults} onInputBlur={this.onBlur.bind(this)} categories={this.state.categories} activeItem={this.state.activeCategory} />
            </div>
            <div className='search-results'>
                <div className='search-results-inner'>
                    <div className='search-results-bottom'>
                        <div className='dumping-ground-list-wrapper'>
                            <DumpingGroundListCollection searchBar={true} hideGroupTitle={true} searchToken={this.state.searchToken} />
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
