import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IResizerProps {
    onSizeChange: Function;
}

export class Resizer extends React.Component<IResizerProps, {}> {
    myRef;
    domRef;
    capture = false;
    rectProps: ClientRect = null;
    currentSize = 1;
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    processPosition(clientX) {
        const left = this.rectProps.left;
        const width = this.rectProps.width;
        let currentPosition = (clientX - left) / width;
        currentPosition = currentPosition < 0  ? 0 : currentPosition;
        currentPosition = currentPosition > 1 ? 1 : currentPosition;
        const node = (this.myRef.current as HTMLElement).querySelector('.resizer-box');
        if (currentPosition > 0.66) {
            (node as HTMLElement).style.left = '100%';
            this.changeSize(2);
        } else if (currentPosition > 0.33) {
            (node as HTMLElement).style.left = '50%';
            this.changeSize(1);
        } else {
            (node as HTMLElement).style.left = '0%';
            this.changeSize(0.5);
        }
    }
    changeSize(size) {
        if (this.currentSize !== size) {
            this.currentSize = size;
            this.props.onSizeChange(this.currentSize);
        }
    }
    onMouseDown(e: MouseEvent) {
        this.capture = true;
        const node = this.myRef.current as HTMLElement;
        this.rectProps = node.getBoundingClientRect();
    }
    onDocumentMouseMove(e: MouseEvent) {
        if (this.capture) {
            window.requestAnimationFrame(() => {
                this.processPosition(e.clientX);
            });
        }
    }
    onDocumentMouseUp(e: MouseEvent) {
        this.capture = false;
    }
    componentDidMount()  {
        const node = (this.myRef.current as HTMLElement);
        if (node) {
            node.addEventListener('mousedown', this.onMouseDown.bind(this));
        }
        document.removeEventListener('mouseover', this.onDocumentMouseMove.bind(this));
        document.addEventListener('mouseover', this.onDocumentMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onDocumentMouseUp.bind(this));
        document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this));
    }
    componentWillUnmount() {
        const node = (this.myRef.current as HTMLElement);
        if (node) {
            node.removeEventListener('mousedown', this.onMouseDown.bind(this));
        }
        document.removeEventListener('mousemove', this.onDocumentMouseMove.bind(this));
        document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this));
    }
    render() {
        return <div className='resizer-wrapper' ref={this.myRef}>
            <div className='resizer-handler' />
            <div className='resizer-box' />
        </div>
    }
}