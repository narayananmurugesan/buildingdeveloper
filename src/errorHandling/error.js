import notify from '../notification/notifications';
import { createHashHistory } from 'history'

const history = createHashHistory();

export const errorHandling = {
    ErrorMessage
};
function ErrorMessage(param) {
    var error = param;
    const statusCode = error.response ? error.response.status : null;
    var err = {
        type: "danger",
        title: "Message",
        message: ""
    }    

    // if(err.message.toLowerCase() == "user is not logged in"){
    //     history.push('/login');
    // }

    // if (statusCode === 404) {
    //     err.message = 'The requested resource does not exist or has been deleted';
    // }

    if (statusCode === 401) {
        // err.message = 'Please login to access this resource';
        localStorage.clear();
        // history.push('/welcome');
        // setTimeout(()=>{
        //     window.location.reload();
        // }, 300);        
    }

    if (statusCode === 500) {
         err.message = 'Inconsistent data in request. Please check data';
    }

    // if (statusCode === 405) {
    //     err.message = 'The requested resource have been denied';
    // }
    else if (statusCode !== null) {
        err.message = error.response.data.errors[0];
    }
    notify.notification(err);
}