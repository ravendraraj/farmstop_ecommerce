const initialErrorState = { err: null, respStatus: null ,success:null };
const error = (state = initialErrorState, action) => {
    switch (action.type) {
      case 'ERROR_LOGIN':
      return { 
        ...state,
        err : action.payload || 'Something Went Wrong',
      };

      case 'REMOVE_ERROR':
      return { 
        ...state,
        err : null,
        success:null,
      };

      case 'ERROR_SUBMIT':
      return { 
        ...state,
        err : action.payload
      };

      case 'SUCCESS':
      return { 
        ...state,
        success: action.payload
      };

      case 'ERROR_CODE':
        return{
          ...state,
          codeError :action.payload
        }

      default:
      return state;
    }
}
  
export default error;