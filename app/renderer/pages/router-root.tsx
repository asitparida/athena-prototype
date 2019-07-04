import * as React from 'react'
import { withRouter } from 'react-router-dom'

class RouterRoot extends React.Component<any, any> {
    historyListener;
    componentWillMount() {
        this.historyListener = this.props.history.listen((location, action) => {
            if (action === 'PUSH') {
                this.props.onLocationChanged();
            }
        });
    }
    componentWillUnmount() {
        this.historyListener();
    }
    render() {
        return (<React.Fragment>{this.props.children}</React.Fragment>);
    }
}

export default withRouter(RouterRoot);
