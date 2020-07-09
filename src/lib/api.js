import {weburl} from '../constants/url'
export const getProduct = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-product?start=0&end=10';//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_FETCH', payload : response.product});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const getProductType = (data) => (dispatch,getState) => {

    //dispatch({type : 'LOADING'});

    let url = weburl + 'api-prodtype?prod_id='+data;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_VARIATION', payload : response.product});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const searchProductType = (data) => (dispatch,getState) => {

    //dispatch({type : 'LOADING'});
    //https://demo1.farmstop.in/api-searchByKeyword?term=a
    let url = weburl + 'api-searchByKeyword?term=gg';
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'AUTO_COMPLETE_PROD', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const getProductTypeByKeyword = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});
    //https://demo1.farmstop.in/api-searchByKeyword?term=a
    console.log(data.key);
    let url = weburl + 'api-productByKeyword?term='+data.key;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_VARIATION', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}