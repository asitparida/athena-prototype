import { Subject, Subscription } from 'rxjs';
import store from '../store/configureStore';
import * as actions from '../actions/appActions';

const subscriptions: Subscription[] = [];
export const ShowDumpBarAction$ = new Subject<boolean>();
export const ShowRTEAction$ = new Subject<boolean>();
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
}
export function RemoveSubscriptions() {
    subscriptions.forEach(s => s.unsubscribe());
}
