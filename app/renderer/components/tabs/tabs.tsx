import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tab from './Tab';

import './tab.scss';
import { Resizer } from './resizer';

class Tabs extends React.Component<{}, { activeTabIndex: any, currentSize: number }> {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            currentSize: 1
        };
    }

    onClickTabItem = (tabIndex) => {
        this.setState({ activeTabIndex: tabIndex });
    }

    onResizerChange(data) {
        console.log('onSizeChange', data);
        this.setState({
            currentSize: data
        });
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
                <div className='resizer-container'>
                    <Resizer onSizeChange={this.onResizerChange.bind(this)} />
                </div>
                <div className="tab-wrapper-content" data-size={this.state.currentSize}>{activeTab}</div>
            </div>
        );
    }
}

export default Tabs;