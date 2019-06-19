import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tab from './Tab';

import './tab.scss';

class Tabs extends React.Component<{}, { activeTabIndex: any }> {

    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0
        };
    }

    onClickTabItem = (tabIndex) => {
        this.setState({ activeTabIndex: tabIndex });
    }

    render() {
        const tabs = this.props.children as Array<Tab>;
        const activeTab = tabs[this.state.activeTabIndex].props.children;
        return (
            <div className='tabs-wrapper'>
                <ul className='tabs-titles'>
                    {tabs.map(((t, i) => {
                        return <li className={i === this.state.activeTabIndex ? 'active' : ''} onClick={this.onClickTabItem.bind(this, i)} key={i}>{t.props.title}</li>
                    }))}
                </ul>
                <div className="tab-wrapper-content">{activeTab}</div>
            </div>
        );
    }
}

export default Tabs;