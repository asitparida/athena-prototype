import * as React from 'react';
import './context-menu.scss';

export class ContextMenu extends React.Component<{}, { menuOpen: boolean, x: number, y: number }> {
    elRef;
    // tslint:disable:variable-name
    onDOMClick_bound = this.onDOMClick.bind(this);
    onKeyUp_bound = this.onKeyUp.bind(this);
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            x: 0, y: 0
        }
        this.elRef = React.createRef();
    }
    openMenu(e: MouseEvent) {
        console.log(e.clientX, e.clientY);
        this.setState({
            menuOpen: true,
            x: e.screenX,
            y: e.screenY
        });
    }
    onDOMClick(e: MouseEvent) {
        let notfound = true;
        let target = e.target as any;
        while (target && target !== document.documentElement) {
            if (target === this.elRef) {
                notfound = false;
                break;
            }
            target = target.parentNode;
        }
        if (notfound) {
           this.closeMenu();
        }
    }
    onKeyUp(e: KeyboardEvent) {
        if (e.code === "Escape") {
            this.closeMenu();
        }
    }
    addCloseMenuListener(node: any) {
        if (node) {
            this.elRef = node;
            document.removeEventListener('click', this.onDOMClick_bound);
            document.addEventListener('click', this.onDOMClick_bound);
            document.removeEventListener('contextmenu', this.onDOMClick_bound);
            document.addEventListener('contextmenu', this.onDOMClick_bound);
            document.removeEventListener('keyup', this.onKeyUp_bound);
            document.addEventListener('keyup', this.onKeyUp_bound);
        }
    }
    closeMenu() {
        document.removeEventListener('click', this.onDOMClick_bound);
        document.removeEventListener('contextmenu', this.onDOMClick_bound);
        document.removeEventListener('keyup', this.onKeyUp_bound);
        this.setState({
            menuOpen: false
        })
    }
    onContextMenuInvoked(e) {
        this.openMenu(e);
    }
    render() {
        const styles = {
            left: `${this.state.x + 10}px`,
            top: `${this.state.y - 20}px`
        };
        return <React.Fragment>
            <div className="context-menu-wrapper" onContextMenu={this.onContextMenuInvoked.bind(this)} >
                {this.props.children}
            </div>
            {
                this.state.menuOpen &&
                <div className="app-context-menu-wrapper" style={styles} ref={this.addCloseMenuListener.bind(this)}>
                    <ul className="app-context-menu">
                        <li>Action 1</li>
                        <li>Action 2</li>
                        <li>Action 3</li>
                        <li>Action 4</li>
                    </ul>
                </div>
            }
        </React.Fragment>
    }
}
