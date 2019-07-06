import * as React from 'react';
import './context-menu.scss';
import { IContextMenuAction } from '../../constants/types';
import { ContextMenuList } from './context-menu-list';

export class ContextMenu extends React.Component<{
    actions: IContextMenuAction[],
    open?: boolean,
    menuClosed: () => {},
    resizerOptions?: IContextMenuAction[],
    onAction?: (name: string) => {}
}, { menuOpen: boolean, x: number, y: number }> {
    domElRef;
    // tslint:disable:variable-name
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            x: 0, y: 0
        }
        this.domElRef = React.createRef();
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
                posX = props.right;
                posY = props.bottom
            }
        }
        this.setState({
            menuOpen: true,
            x: posX,
            y: posY
        });
    }
    onKeyUp(e: KeyboardEvent) {
        if (e.code === "Escape") {
            this.closeMenu();
        }
    }
    closeMenu() {
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
    onMenuClosed() {
        this.closeMenu();
    }
    onAction(name) {
        if (this.props.onAction) {
            this.props.onAction(name);
        }
        this.closeMenu();
    }
    render() {
        return <React.Fragment>
            <div className="context-menu-wrapper" onContextMenu={this.onContextMenuInvoked.bind(this)} ref={this.domElRef}>
                {this.props.children}
            </div>
            {
                this.state.menuOpen &&
                <ContextMenuList onAction={this.onAction.bind(this)} resizerOptions={this.props.resizerOptions} x={this.state.x} y={this.state.y} actions={this.props.actions} menuClosed={this.onMenuClosed.bind(this)} />
            }
        </React.Fragment>
    }
}
