import{ Alert } from 'react-native';
import store from '../store';
//import { byPassLogOut } from '../actions/auth';
import NetInfo from "@react-native-community/netinfo";

const api = async (url, method, body = null, headers = {}) => {
    try {
        const endPoint = url;
        const reqBody = body ? JSON.stringify(body) : null;
        const fetchParams = {method, headers, body};
        if((method === "POST" || method === "PUT") && !reqBody) {
          throw new Error("Request body required");
        }
        const fetchPromise = await fetch(endPoint, fetchParams);
        return fetchPromise;
    } catch (e) {
      return e;
    }
}

const fetchApi = async (endPoint, method, body, statusCode, token = null) => {
    const state = await NetInfo.fetch()
    //console.log("state",state);
    if(state.isConnected == true){
      try {
          const headers = {};
          const result = {
            token:null, 
            success: false,
            response: null,
            headers: null,
            body: body,
            status: statusCode,
            endPoint:endPoint
          };
          
          if(token) {
              headers["token"]    = `${token}`;
              //headers["hosturl"]          =  `${endPoint}`; 
          }
          
          const reqBody = body ?body: null;
          const fetchParams = {method, headers, body};
          
          if((method === "POST" || method === "PUT") && !reqBody){
            return result.response = { 'message' : 'Invalid request'};
          }

          if(reqBody) {
              fetchParams.body = reqBody;
          }

          fetchParams.headers["Accept"] = "application/json";
          fetchParams.headers["Content-type"] = "multipart/form-data";

          //console.log("Fetch APi  =>>",endPoint, fetchParams);
          const fetchPromise = await fetch(endPoint, fetchParams);
          const response = fetchPromise;
          
          //console.log("response=>fetch_api ",response);

          if(response.status === statusCode){
              if(response.headers.get("Authorization")) {
                  result.token = response.headers.get("Authorization");
              }
              let responseBody;
              const responseText = await response.text();
              try {
                  responseBody = JSON.parse(responseText);
              } catch (e) {
                  responseBody = responseText;
              }
              result.success  = true;
              result.response     = responseBody;
              result.headers  = headers;
              result.status   = response.status;

              //console.log("responseBody1",responseBody);
              return result;
          }else{
              
              let responseBody;
              const responseText = await response.text();
              try {
                  responseBody = JSON.parse(responseText);
              } catch (e) {
                  responseBody = responseText;
              }

              result.success  = false;
              result.status   = response.status
              result.response     = responseBody;
              result.headers  = headers;
              //console.log("responseBody2",responseBody);
              if(responseBody.responseCode === 402){
                // Alert.alert(
                //     `Error`,
                //     responseBody.result.message,
                //     [
                //       { text: constants.AppConstant.ok, onPress: () => store.dispatch(byPassLogOut("auth")) },
                //     ],
                //     { cancelable: false }
                //   );
                //   return -1;
                // setTimeout(() => {
                //     store.dispatch(byPassLogOut()) 
                // }, 4000);
              }
              return result;
          }
      } catch (error) {

          let result = {
              success :   false,
              status  :   false,
              body    :   body,
              response    :   {
                    message: "failed",
                    result: {code: 0, message: error.message},
                    status: false
                },
              headers :   {},
              url     :   endPoint,
          }
          return result;
      }
    }else{
      let result={
        success :   false,
        status  :   false,
        body    :   body,
        response    :   {
          message: "Network Error",
          result: {code: 0, message:"Network Error"},
          status: false
        },
        headers :   {},
        url     :   endPoint,
      }
        return result;
    }
}

export default fetchApi;