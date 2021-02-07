import axios from '../../axios-orders'
import * as actions from './actionTypes'
export const addIngredient=(name)=>{
    return {
        type:actions.ADD_INGREDIENTS,
        ingredient:name
    }
}
export const removeIngredient=(name)=>{
    return {
        type:actions.REMOVE_INGREDIENTS,
        ingredient:name
    }
}
export const setIngredients=(ingredient)=>{
    return {
        type:actions.SET_INGREDIENTS,
        ingredient
    }
}
export const setError=()=>{
    return {
        type:actions.FETCH_FAILED
    }
}
export const initIngredient=()=>{
    return dispach=>{

    
    axios.get('https://burger-builder-ffc0a-default-rtdb.firebaseio.com/Ingredients.json').then(res=>{

            dispach(setIngredients(res.data))})
            .catch(e=>dispach(setError()))
}
}
