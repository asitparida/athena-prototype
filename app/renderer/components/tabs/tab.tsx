import * as React from 'react';
import * as PropTypes from 'prop-types';

class Tab extends React.Component<{ title: any, active?: boolean}, any> {

    onClick = () => {
        const { title } = this.props;
    }

    render() {
        return (
            <div className="tab-content">{this.props.children}</div>
        );
    }
}

export default Tab;
