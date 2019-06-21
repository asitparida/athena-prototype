import * as React from 'react';
import './resizer.scss';
import Hammer from 'react-hammerjs';
import * as _ from 'lodash';

interface IProp {
    onSizeChange: (x: number) => {};
}

export class Resizer extends React.Component<IProp, any> {
    panStartX;
    ticking = false;
    domRef;
    domProps: ClientRect;
    constructor(props) {
        super(props);
        this.domRef = React.createRef();
    }
    onSizeChange() {
        console.log('onSizeChange');
    }
    onPanStart(e) {
        this.panStartX = e.center.x;
        this.domProps = (this.domRef.current as HTMLElement).getBoundingClientRect();
    }
    onPan(e) {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.onPanDebounced(e);
                this.ticking = false;
            });
        }
        this.ticking = true;
    }
    onPanDebounced(e) {
        const x = e.center.x;
        let change = this.domProps.right - e.center.x;
        change = change < 300 ? 300 : change;
        this.props.onSizeChange(change);
    }
    render() {
        return (
            <div className="resizer-wrapper" ref={this.domRef}>
                {this.props.children}
                <Hammer onPanStart={this.onPanStart.bind(this)} onPan={this.onPan.bind(this)}>
                    <div className='resizer-handler'>
                        <i className='material-icons'>drag_indicator</i>
                    </div>
                </Hammer>
            </div>
        );
    }
}
