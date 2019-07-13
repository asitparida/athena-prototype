import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './context-menu.scss';
import { IContextMenuAction } from '../../constants/types';

export class ContextMenuList extends React.Component<{
        resizerOptions?: IContextMenuAction[],
        actions: IContextMenuAction[],
        x: number,
        y: number
        open?: boolean,
        menuClosed: () => {}
        onAction?: (name: string) => {}
    }, { menuOpen: boolean, x: number, y: number }> {
    domElRef;
    elRef;
    // tslint:disable:variable-name
    onDOMClick_bound = this.onDOMClick.bind(this);
    onKeyUp_bound = this.onKeyUp.bind(this);
    constructor(props) {
        super(props);
        this.domElRef = React.createRef();
        this.elRef = React.createRef();
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
        this.props.menuClosed();
    }
    onAction(actionName) {
        if (this.props.onAction) {
            this.props.onAction(actionName);
        }
    }
    render() {
        const styles = {
            left: `${this.props.x + 10}px`,
            top: `${this.props.y - 20}px`
        };
        return ReactDOM.createPortal((
            <div className="app-context-menu-wrapper" style={styles} ref={this.addCloseMenuListener.bind(this)}>
                <ul className="app-context-menu">
                    {
                        this.props.resizerOptions.length > 0 &&
                        <li className='resizer-holder'>
                            {
                                this.props.resizerOptions.map((option, i) => <div onClick={this.onAction.bind(this, option.name)} tabIndex={0} key={i} className='resizer'><i className='material-icons'>{option.icon}</i></div>)
                            }
                        </li>
                    }
                    {
                        this.props.actions.length > 0 &&
                        this.props.actions.map((action, i) => {
                            return <li onClick={this.onAction.bind(this, action.name)} tabIndex={0} key={i}><i className='material-icons'>{action.icon}</i>{action.name}</li>
                        })
                    }
                </ul>
            </div>
        ), document.body);
    }
}
