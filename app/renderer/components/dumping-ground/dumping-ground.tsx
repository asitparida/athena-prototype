import * as React from 'react'
import Tabs from '../tabs/tabs';
import Tab from '../tabs/Tab';
import { AllContentList, ContentType } from '../../constants/constants';
import { Content } from '../contents/content';
import './dumping-ground.scss';

interface IDumpingGroundState {
    tabs: any[];
}
interface IDumpingGroundProps {
    sticky?: boolean,
    workspace?: boolean
}

type AllProps = IDumpingGroundProps

class DumpingGround extends React.Component<AllProps, IDumpingGroundState> {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                // tslint:disable:max-line-length
                { id: 'all', title: 'All', content: 'See ya later, All', items: AllContentList.reduce((prev, curr) => prev.concat(curr.items), []) },
                { id: 'photos', title: 'Photos', content: 'See ya later, Photos', items: AllContentList.find(p => p.type === ContentType.Photo).items, type: ContentType.Photo },
                { id: 'videos', title: 'Videos', content: 'See ya later, Videos', items: AllContentList.find(p => p.type === ContentType.Video).items, type: ContentType.Video },
                { id: 'articles', title: 'Acticles', content: 'See ya later, Acticles', items: [] },
                { id: 'links', title: 'Links', content: 'See ya later, Links', items: [] },
            ]
        };
    }
    componentDidMount() {
        if (this.props.workspace) {
            const tabs = this.state.tabs;
            const tab = tabs[1];
            tab.title = 'Current Worskpace';
            this.setState({
                tabs: [tabs[0], tab]
            })
        }
    }
    render() {
        const classListName = `tabs-holder ${this.props.sticky ? 'is-sticky' : ''}`;
        return <Tabs showResizer={!this.props.sticky} sticky={this.props.sticky}>
                {this.state.tabs.map((tab, i) => {
                    return <Tab title={tab.title} key={i}>
                        <div className={classListName}>
                            {tab.items.map((item, j) => {
                                return <Content key={j} data={item} type={item.type} />
                            })}
                        </div>
                    </Tab>
                })}
            </Tabs>
    }
}
export default DumpingGround;
