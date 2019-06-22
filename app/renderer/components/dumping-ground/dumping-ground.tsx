import * as React from 'react'
import Tabs from '../tabs/tabs';
import Tab from '../tabs/Tab';
import { AllContentList, ContentType } from '../../constants/constants';
import { Content } from '../contents/content';
import './dumping-ground.scss';
import { ContentCollection } from '../contents/content-collection';
import { IDumpingGroundTab } from '../types';

interface IDumpingGroundState {
    tabs: IDumpingGroundTab[];
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
                { id: 'all', name: 'All'},
                { id: 'photos', name: 'Photos', type: ContentType.Photo },
                { id: 'videos', name: 'Videos', type: ContentType.Video },
                { id: 'articles', name: 'Acticles', type: ContentType.Article  },
                { id: 'links', name: 'Links', type: ContentType.Link  },
                { id: 'social-media', name: 'Social Media', type: ContentType.SocialMedia  },
            ]
        };
    }
    componentDidMount() {
        if (this.props.workspace) {
            const tabs = this.state.tabs;
            const tab = tabs[1];
            tab.name = 'Current Worskpace';
            this.setState({
                tabs: [tabs[0], tab]
            })
        }
    }
    render() {
        const classListName = `tabs-holder ${this.props.sticky ? 'is-sticky' : ''}`;
        return <Tabs showResizer={!this.props.sticky} sticky={this.props.sticky}>
                {this.state.tabs.map((tab, i) => {
                    return <Tab title={tab.name} key={i}>
                        <div className={classListName}>
                            <ContentCollection type={tab.type} />
                        </div>
                    </Tab>
                })}
            </Tabs>
    }
}
export default DumpingGround;
