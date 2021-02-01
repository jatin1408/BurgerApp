import * as actionTypes from './actions'
const intialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
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
        default :
        return state;    
    }
  
}
export default reducer;
