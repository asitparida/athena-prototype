import { Subject } from 'rxjs';
import store from '../store/configureStore';
import * as actions from '../actions/appActions';

export const ShowDumpBarAction$ = new Subject<boolean>();
const dumpBarSubscription = ShowDumpBarAction$.subscribe((data) => {
    if (data) {
        store.dispatch(actions.showDumpBarAction())
    } else {
        store.dispatch(actions.hideDumpBarAction())
    }
});

export const ShowRTEAction$ = new Subject<boolean>();
const rteSubscription = ShowDumpBarAction$.subscribe((data) => {
    if (data) {
        store.dispatch(actions.showRTEAction())
    } else {
        store.dispatch(actions.hideRTEAction())
    }
});
