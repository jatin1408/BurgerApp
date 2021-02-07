import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseSucess=(id,orderData)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseFail=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const callToUploadContactData=(orderData)=>{
   

    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('orders.json',orderData).then(res=>{
            dispatch(purchaseSucess(res.data.name,orderData));
        }).catch(e=>dispatch(purchaseFail(e)));
    }
}
export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}
export const orderFetchSucess=(orderData)=>{
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        data:orderData
    }
}
export const orderFail=(err)=>{
    return {
        type:actionTypes.FETCH_ORDER_FAILED,
        error:err
    }
}
export const orderFetchStart=()=>{
    return {
        type:actionTypes.FETCH_ORDER_START,

    }
}
export const fetchOrders=()=>{
    return dispatch =>{
        dispatch(orderFetchStart())
        axios.get('/orders.json').then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
           
            dispatch(orderFetchSucess(fetchedOrders));            

        }).catch(err=> dispatch(orderFail(err)))
    }
    
}