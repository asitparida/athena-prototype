import * as React from 'react';
import './context-menu.scss';
import { IContextMenuAction } from '../../constants/types';

export class ContextMenu extends React.Component<{ actions: IContextMenuAction[], open?: boolean, menuClosed: () => {}}, { menuOpen: boolean, x: number, y: number }> {
    domElRef;
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
        this.domElRef = React.createRef();
        this.elRef = React.createRef();
    }
    openMenu(e?: MouseEvent) {
        let posX = 0;
        let posY = 0;
        if (e) {
            posX = e.clientX;
            posY = e.clientY;
        } else {
            const elem = this.domElRef.current;
            if (elem) {
                const props = (elem as HTMLElement).getBoundingClientRect();
                posX = props.left;
                posY = props.bottom
            }
        }
        this.setState({
            menuOpen: true,
            x: posX,
            y: posY
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
        });
        this.props.menuClosed();
    }
    onContextMenuInvoked(e) {
        this.openMenu(e);
    }
    componentDidUpdate(props) {
        if (this.props.open !== props.open) {
            if (this.props.open && !this.state.menuOpen) {
                this.openMenu();
            }
        }
    }
    render() {
        const styles = {
            left: `${this.state.x + 10}px`,
            top: `${this.state.y - 20}px`
        };
        return <React.Fragment>
            <div className="context-menu-wrapper" onContextMenu={this.onContextMenuInvoked.bind(this)} ref={this.domElRef}>
                {this.props.children}
            </div>
            {
                this.state.menuOpen &&
                <div className="app-context-menu-wrapper" style={styles} ref={this.addCloseMenuListener.bind(this)}>
                    <ul className="app-context-menu">
                        {
                            this.props.actions.length > 0 &&
                            this.props.actions.map((action, i) => {
                                return <li key={i}><i className='material-icons'>{action.icon}</i>{action.name}</li>
                            })
                        }
                    </ul>
                </div>
            }
        </React.Fragment>
    }
}
