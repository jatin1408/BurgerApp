import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
const Prices={
    'cheese':8,
    'bacon':20,
    'meat':15,
    'salad':4
}
class BurgerBuilder extends  Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        total:5
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const newCount=oldCount+1;
        const upgraded={...this.state.ingredients};
        upgraded[type]=newCount
        const priceAddition=Prices[type];
        const oldPrice=this.state.total;
        const newPrice=oldPrice+priceAddition;
        this.setState({total:newPrice,ingredients:upgraded})
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0) return;
        const newCount=oldCount-1;
        const upgraded={...this.state.ingredients};
        upgraded[type]=newCount
        const priceAddition=Prices[type];
        const oldPrice=this.state.total;
        const newPrice=oldPrice-priceAddition;
        this.setState({total:newPrice,ingredients:upgraded})
    }
    render(){
        const disabledInfo={...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControl ingredientsAdded={this.addIngredientHandler} 
                ingredientsRemoved={this.removeIngredientHandler}
                disabledButtons={disabledInfo}
                price={this.state.total}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;