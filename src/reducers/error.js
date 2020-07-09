const initialErrorState = { err: null, respStatus: null };
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
      };

      case 'ERROR_SUBMIT':
      return { 
        ...state,
        err : action.payload
      };

      default:
      return state;
    }
}
  
export default error;