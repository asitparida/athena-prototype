import * as React from 'react';

class ListView extends React.Component<any, any> {

    render() {
        return (
            <div className="tab-content">{this.props.children}</div>
        );
    }
}

export default ListView;
