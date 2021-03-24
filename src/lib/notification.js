import {weburl} from '../constants/url'
import { navigate,check_notification,navigateWithParams } from '../appnavigation/RootNavigation'
import fetchApi from './fetchApi'

export const getNotification =(userData)=>{
    return async (dispatch,getState)=>{
        let url = weburl + 'api-get-notification';
        var formData = new FormData();
        formData.append("user_id", getState().data.authUserID);
        formData.append("token",getState().data.token);
        let token = getState().data.token;

        let result = await fetchApi(url,'POST',formData, 200, token);
        try{
            if(result.response.message !== "Network Error"){
                if (result.response.status == 1){
                    //dispatch({ type : 'GET_NOTIFICATIONS', payload : result.response.notification});
                    dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:result.response.user_notification });
                    return "success";
                }else{
                    dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
                    return "failed";
                }
            }else{
                dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
                navigate('internetError');
            }
        }catch(e){
            dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
            return "failed";
        }
    }
}


export const removeNotification= (data) =>{
    return async (dispatch,getState) => {
        console.log(data);

        dispatch({type:"LOADING_USER_NOTIFICATION"});
        let url = weburl + 'api-delete-notification';

        var formData = new FormData();
        
        formData.append("user_id", getState().data.authUserID);
        formData.append("token",getState().data.token);
        formData.append("notify_id",data);

        let token = getState().data.token;
        console.log(url,post_req);

        let result = await fetchApi(url,'POST',formData, 200, token);

        try{
            if(result.response.message !== "Network Error"){
                if (result.response.status == 1){
                    dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:result.response.user_notification });
                    return "success";
                }else{
                    dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
                    return "failed";
                }
            }else{
                dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
                navigate("internetError");
            }
        }catch(e){
            dispatch({type:"FAILED_LOADING_USER_NOTIFICATION"});
            return "failed";
        }
    }
}