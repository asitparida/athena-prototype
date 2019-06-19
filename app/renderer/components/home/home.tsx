import * as React from 'react';
import { Redirect } from 'react-router';
import './home.scss';

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }
    handleOnClick = () => {
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/dump" />;
        }
        return <div className='app-container'>
            <h1>Athena</h1>
            <button onClick={this.handleOnClick.bind(this)}>Organize</button>
        </div>
    }
}
export default Home;
