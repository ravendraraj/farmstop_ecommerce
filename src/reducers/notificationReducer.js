import {navigate} from '../appnavigation/RootNavigation'
import constants from '../constants'

const initialDataState = { 
    userNotifications:[],
    userNotifications_status:constants.constStrings.loading,
    notification_load:false,
    totalNewNotification: 0, 
};

const notificationReducer = (state = initialDataState,action)=>{
    switch(action.type){
        case 'SET_NEW_NOTIFICATION_COUNTER':
        return{
            ...state,
            totalNewNotification:action.totalNotification
        }

        case 'LOADING_USER_NOTIFICATION':
        return{
            ...state,
            notification_load:true,
            userNotifications_status:constants.constStrings.loading,
        }

        case 'FAILED_LOADING_USER_NOTIFICATION':
        return{
            ...state,
            notification_load:false,
            userNotifications_status:constants.constStrings.failed,
        }

        case 'FETCH_NOTIFICATION_LIST':
        return{
            ...state,
            userNotifications:action.notification,
            userNotifications_status:constants.constStrings.success,
            notification_load:false,
        }

        default:
        return state;
    }

    //navigate('SellerInfo', { userName: 'Lucy' });
}
  
export default notificationReducer;