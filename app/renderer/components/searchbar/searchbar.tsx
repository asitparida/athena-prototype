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
    }
    render() {
        return <div className='searchbar-wrapper'>
            <div className="search-meta">
                <div className='search-meta-top'>
                    <div className='search-meta-content'>
                        <div className='search-meta-content-left'>
                            <i className='material-icons'>local_offer</i> Tags
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
                        <ul>
                            <li>
                                <i className='material-icons'>filter_none</i>
                                <label>Photos (0)</label>
                            </li>
                            <li>
                                <i className='material-icons'>filter_none</i>
                                <label>Videos (0)</label>
                            </li>
                            <li>
                                <i className='material-icons'>filter_none</i>
                                <label>Articles (0)</label>
                            </li>
                            <li>
                                <i className='material-icons'>filter_none</i>
                                <label>Links (0)</label>
                            </li>
                            <li>
                                <i className='material-icons'>filter_none</i>
                                <label>Social (0)</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='search-results'>
                <div className='search-results-inner'>
                    <DumpingGround hideGroupTitle={true} sticky={true} workspace={true} searchBar={true} />
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
