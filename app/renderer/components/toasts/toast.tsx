import * as React from 'react';
import { IToastItem, ToastType } from '../../constants/types';
import './toasts.scss';
import * as AppActions from '../../access/actions/appActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = ({ reducers }) => {
    return {
        toasts: reducers.toasts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

class Toasts extends React.Component<any, { toasts: IToastItem[] }> {
    constructor(props) {
        super(props);
        this.state = {
            toasts: [
                { id: '1', message: 'The clip has been pushed to the Workspace.', type: ToastType.Success }
            ]
        };
    }
    onToastClose(id) {
        this.props.actions.removeToastNotification(id);
    }
    render() {
        const { toasts } = this.props;
        return (
            <React.Fragment>
                {
                    toasts.length > 0 &&
                    <div className='toasts-wrapper'>
                        {
                            toasts.map((toast: IToastItem, i) => {
                                let toastType = '';
                                switch (toast.type) {
                                    case ToastType.Success: toastType = 'Success'; break;
                                    case ToastType.Failure: toastType = 'Failure'; break;
                                    case ToastType.Warning: toastType = 'Warning'; break;
                                }
                                return <div key={i} className="toast-item-wrapper" data-type={toastType}>
                                    <label>{toast.message}</label>
                                    <div className='toast-item-close' onClick={this.onToastClose.bind(this, toast.id)}>
                                        <i className='material-icons'>close</i>
                                        </div>
                                </div>
                            })
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
