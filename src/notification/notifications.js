import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const notify = {
    notification
}

function notification(params) {
    return store.addNotification({
        title: params.title || 'Message',
        message: params.message || 'Server is not responding',
        type: params.type || 'success',                         // 'default', 'success', 'info', 'warning'
        container: params.container || 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 4500 
        }
      })
}

export default notify;