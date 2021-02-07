import * as actionTypes from '../actions/actionTypes'
const intialState={
    ingredients:null,
    error:false,
    total:5
}
const Prices={
    'cheese':8,
    'bacon':20,
    'meat':15,
    'salad':4
}
const reducer=(state=intialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredient]:state.ingredients[action.ingredient]+1
                    },
                    total:state.total+Prices[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENTS :
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]:state.ingredients[action.ingredient]-1
                },
                total:state.total-Prices[action.ingredient]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.ingredient,
                error:false,
                total:5
            }
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error:true
            }
        default :
        return state;    
    }
  
}
export default reducer;
