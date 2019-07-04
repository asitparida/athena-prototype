import * as React from 'react';
import Tab from './Tab';

import './tab.scss';
import { TabsResizer } from './tabs-resizer';
import Dropdown from '../dropdown/dropdown';

class Tabs extends React.Component<{
    showResizer?: boolean,
    sticky?: boolean,
    showCategorySelector?: boolean,
    categories: any[],
    activeTabIndex?: number;
}, { activeTabIndex: any, currentSize: number }> {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: this.props.activeTabIndex || 0,
            currentSize: 0.5
        };
    }

    onClickTabItem = (tabIndex) => {
        this.setState({ activeTabIndex: tabIndex });
    }

    onResizerChange(data) {
        this.setState({
            currentSize: data
        });
    }

    render() {
        const tabs = this.props.children as Tab[];
        const activeTab = tabs[this.state.activeTabIndex] ? tabs[this.state.activeTabIndex].props.children : null;
        return (
            <div className='tabs-wrapper'>
                <div className={`tabs-header ${this.props.sticky ? 'compressed' : ''}`}>
                    <ul className={`tabs-titles ${this.props.sticky ? 'compressed' : ''}`}>
                        {tabs.map(((t, i) => {
                            return <li className={i === this.state.activeTabIndex ? 'active' : ''} onClick={this.onClickTabItem.bind(this, i)} key={i}>{t.props.title}</li>
                        }))}
                    </ul>
                    {
                        this.props.showResizer &&
                        <div className='tabs-resizer-container'>
                            <TabsResizer size={this.state.currentSize} onSizeChange={this.onResizerChange.bind(this)} />
                        </div>
                    }
                    {
                        this.props.showCategorySelector &&
                        <div className='items-filter-container'>
                            <Dropdown items={this.props.categories} />
                        </div>
                    }
                </div>
                <div className={`tab-wrapper-content ${this.props.sticky ? 'compressed' : ''}`} data-size={this.props.sticky ? null : this.state.currentSize}>{activeTab}</div>
            </div>
        );
    }
}

export default Tabs;
