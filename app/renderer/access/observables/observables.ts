import { Subject } from 'rxjs';
import store from '../store/configureStore';
import { showDumpBarAction, hideDumpBarAction } from '../actions/appActions';

export const ShowDumpBarAction$ = new Subject<boolean>();
const subscription = ShowDumpBarAction$.subscribe((data) => {
    console.log(data);
    if (data) {
        store.dispatch(showDumpBarAction())
    } else {
        store.dispatch(hideDumpBarAction())
    }
});
