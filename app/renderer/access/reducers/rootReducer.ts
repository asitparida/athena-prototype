import { combineReducers } from 'redux';
import reducers from './reducer';
import workspaceReducers from './workspace-reducer';

export default combineReducers({
    reducers,
    workspaceReducers
});
