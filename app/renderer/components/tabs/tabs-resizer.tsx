import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IResizerProps {
    onSizeChange: any;
    size: any;
}

export class TabsResizer extends React.Component<IResizerProps, {}> {
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
        const node = (this.myRef.current as HTMLElement).querySelector('.tabs-resizer-box');
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
    onClick(e: MouseEvent) {
        this.processPosition(e.clientX);
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
            node.addEventListener('click', this.onClick.bind(this));
            const current = (this.myRef.current as HTMLElement).querySelector('.tabs-resizer-box');
            if (this.props.size === 2) {
                (current as HTMLElement).style.left = '100%';
            } else if (this.props.size === 1) {
                (current as HTMLElement).style.left = '50%';
            } else {
                (current as HTMLElement).style.left = '0%';
            }
        }
        document.removeEventListener('mouseover', this.onDocumentMouseMove);
        document.addEventListener('mouseover', this.onDocumentMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this));
    }
    componentWillUnmount() {
        const node = (this.myRef.current as HTMLElement);
        if (node) {
            node.removeEventListener('mousedown', this.onMouseDown);
            node.removeEventListener('click', this.onClick);
        }
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }
    render() {
        return <div className='tabs-resizer-wrapper' ref={this.myRef}>
            <div className='tabs-resizer-handler' />
            <div className='tabs-resizer-box' />
        </div>
    }
}
