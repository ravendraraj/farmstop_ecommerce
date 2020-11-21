import { writeStorage, readStorage, removeAllStorage, removeStorage } from './Model';
/*
 * [setDeviceToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setDeviceTokenToStorage = async (value) =>{
  return new Promise(function(resolve) {
    resolve(writeStorage('DEVICE_TOKEN', value));
  });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getDeviceTokenFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(readStorage('DEVICE_TOKEN'));
  });
}



/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserDataStorage = async (value) =>{
  return new Promise(function(resolve) {
    resolve(writeStorage('authData', value));
  });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getUserDataFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(readStorage('authData'));
  });
}

