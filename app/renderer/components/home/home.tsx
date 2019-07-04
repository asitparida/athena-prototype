import * as React from 'react';
import { Redirect } from 'react-router';
import './home.scss';

const collect = require('../../assets/collect.png');
const organize = require('../../assets/organize.png');
const create = require('../../assets/create.png');

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
        const combinedStyles: React.CSSProperties = {
            maskSize: '250px',
            WebkitMaskSize: '250px',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
        };
        const collectStyles: React.CSSProperties = {
            mask: `url('${collect}')`,
            WebkitMask: `url('${collect}')`,
            ...combinedStyles
        }
        const organizeStyles: React.CSSProperties = {
            mask: `url('${organize}')`,
            WebkitMask: `url('${organize}')`,
            ...combinedStyles
        }
        const createStyles: React.CSSProperties = {
            mask: `url('${create}')`,
            WebkitMask: `url('${create}')`,
            ...combinedStyles
        }
        return <div className='app-container'>
            <div className='app-introduction'>
                <div className="step">
                    <div className='step-pic' style={collectStyles} />
                    <label className='step-header'>Step 01</label>
                    <h1>Collect</h1>
                    <label>Capture PDFs, text excerpts, and figures into your sidebar</label>
                </div>
                <div className="step">
                <div className='step-pic' style={organizeStyles} />
                    <label className='step-header'>Step 02</label>
                    <h1>Organize</h1>
                    <label>Add structure and refine your content as you collect</label>
                </div>
                <div className="step">
                <div className='step-pic' style={createStyles} />
                    <label className='step-header'>Step 03</label>
                    <h1>Synthesize</h1>
                    <label>Drag content into your documents while Fuse manages your sources.</label>
                </div>
            </div>
            <button onClick={this.handleOnClick.bind(this)}>View Collections</button>
        </div>
    }
}
export default Home;
