import { Subject, Subscription } from 'rxjs';
import store from '../store/configureStore';
import * as actions from '../actions/appActions';
import { IContentItem, IWorkspaceContentTransfer } from '../../constants/types';

const subscriptions: Subscription[] = [];
export const ShowDumpBarAction$ = new Subject<boolean>();
export const ShowRTEAction$ = new Subject<boolean>();
export const ShowWorkspaceAction$ = new Subject<boolean>();
export const ContentViewerData = new Subject<IContentItem<any>>();
export const WorkspaceContentTransfer = new Subject<IWorkspaceContentTransfer>();
export const DumpingGroundTransfer = new Subject<IContentItem<any>>();
export function InitializeSubscriptions() {
    const dumpBarSubscription = ShowDumpBarAction$.subscribe((data) => {
        if (data) {
            store.dispatch(actions.showDumpBarAction())
        } else {
            store.dispatch(actions.hideDumpBarAction())
        }
    });
    subscriptions.push(dumpBarSubscription);
    const rteSubscription = ShowDumpBarAction$.subscribe((data) => {
        if (data) {
            store.dispatch(actions.showRTEAction())
        } else {
            store.dispatch(actions.hideRTEAction())
        }
    });
    subscriptions.push(rteSubscription);
    const worskpaceInHeaderSubscription = ShowWorkspaceAction$.subscribe((data) => {
        if (data) {
            store.dispatch(actions.showWorkpsaceActionInHeader())
        } else {
            store.dispatch(actions.hideWorkpsaceActionInHeader())
        }
    });
    subscriptions.push(worskpaceInHeaderSubscription);
}
export function RemoveSubscriptions() {
    subscriptions.forEach(s => s.unsubscribe());
}
