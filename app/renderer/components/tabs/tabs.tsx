import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tab from './Tab';

import './tab.scss';
import { Resizer } from './resizer';

class Tabs extends React.Component<{
    showResizer?: boolean,
    sticky?: boolean
}, { activeTabIndex: any, currentSize: number }> {
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
        const tabs = this.props.children as Tab[];
        const activeTab = tabs[this.state.activeTabIndex].props.children;
        return (
            <div className='tabs-wrapper'>
                <ul className={`tabs-titles ${this.props.sticky ? 'compressed' : ''}`}>
                    {tabs.map(((t, i) => {
                        return <li className={i === this.state.activeTabIndex ? 'active' : ''} onClick={this.onClickTabItem.bind(this, i)} key={i}>{t.props.title}</li>
                    }))}
                </ul>
                {
                    this.props.showResizer &&
                    <div className='resizer-container'>
                        <Resizer onSizeChange={this.onResizerChange.bind(this)} />
                    </div>
                }
                <div className={`tab-wrapper-content ${this.props.sticky ? 'compressed' : ''}`} data-size={this.props.sticky ? null : this.state.currentSize}>{activeTab}</div>
            </div>
        );
    }
}

export default Tabs;
