import * as React from 'react'
import Tabs from '../tabs/tabs';
import Tab from '../tabs/Tab';
import './dumping-ground.scss';
import { ContentListCollection } from '../contents/content-list-collection';
import { ShowWorkspaceAction$ } from '../../access/observables/observables';
import { ContentType, IDumpingGroundTab } from '../../constants/types';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { DumpingGrounCollectionTabs, WorkspaceCollectionTabs } from '../../constants/constants';

interface IDumpingGroundState {
    tabs: IDumpingGroundTab[];
    categories: any[];
}

interface IDumpingGroundProps {
    sticky?: boolean,
    workspace?: boolean
}

type AllProps = IDumpingGroundProps

class DumpingGround extends React.Component<AllProps, IDumpingGroundState> {
    isInWorkspace = false;
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            categories: [
                { id: 'unclassified', name: 'Unclassified' },
                { id: 'classified', name: 'Classified' },
                { id: 'workspace-1', name: 'Workspace #1' },
                { id: 'workspace-2', name: 'Workspace #2' },
                { id: 'workspace-3', name: 'Workspace #3' }
            ]
        };
    }
    componentDidMount() {
        if (this.props.workspace) {
            this.setState({
                tabs: WorkspaceCollectionTabs
            })
        } else {
            this.setState({
                tabs: DumpingGrounCollectionTabs
            });
            ShowWorkspaceAction$.next(true);
        }
    }
    componentWillUnmount() {
        ShowWorkspaceAction$.next(false);
    }
    render() {
        const index = 0;
        const classListName = `tabs-holder ${this.props.sticky ? 'is-sticky' : ''}`;
        return <Tabs activeTabIndex={index} showResizer={!this.props.sticky} showCategorySelector={!this.props.sticky} sticky={this.props.sticky} categories={this.state.categories}>
                {this.state.tabs.map((tab, i) => {
                    return <Tab title={tab.name} key={i}>
                        <div className={classListName}>
                            <ContentListCollection type={tab.type} />
                        </div>
                    </Tab>
                })}
            </Tabs>
    }
}
export default DumpingGround;
