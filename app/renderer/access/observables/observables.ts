import { Subject, Subscription, BehaviorSubject } from 'rxjs';
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
export const RouteInvoke = new Subject<string>();
export const DumpingGroundSelections = new BehaviorSubject<string[]>(null);
export const OpenAllNotesAction = new Subject<boolean>();
export const CurrentEnableScrollIntoCenter = new BehaviorSubject<boolean>(true);
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
}
export function RemoveSubscriptions() {
    subscriptions.forEach(s => s.unsubscribe());
}
export function ToggleSelection(id) {
    const collection = DumpingGroundSelections.value || [];
    const record = collection.find(item => item === id);
    let newCollection = [];
    if (!record) {
        newCollection = [].concat(collection, id);
    } else {
        newCollection = [].concat(collection.filter(item => item !== id));
    }
    DumpingGroundSelections.next(newCollection);
    if (newCollection.length > 0) {
        store.dispatch(actions.enableSelectionInDumpingGround());
    } else {
        store.dispatch(actions.disableSelectionInDumpingGround());
    }
}
