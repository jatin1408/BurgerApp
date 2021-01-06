import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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
        purchaseBool:false,
        total:5,
        purchasing:false
    }
    purchaseStateChange=(ing)=>{
     
        const sum=Object.keys(ing).map(el=>{
            return ing[el];
        }).reduce((val,total)=>{
            return val+total;
        },0)
        this.setState({purchaseBool:sum>0})
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
        this.purchaseStateChange(upgraded)
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
        this.purchaseStateChange(upgraded)
    }
    purchaseStateChangeHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseRemoveStateChangeHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueState=()=>{
        alert('Worked')
    }
    render(){
        const disabledInfo={...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseRemoveStateChangeHandler}>

                    <OrderSummary total={this.state.total.toFixed(2)} 
                    data={this.state.ingredients} cancel={this.purchaseRemoveStateChangeHandler} continue={this.purchaseContinueState}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControl ingredientsAdded={this.addIngredientHandler} 
                ingredientsRemoved={this.removeIngredientHandler}
                disabledButtons={disabledInfo}
                price={this.state.total}
                purchasable={this.state.purchaseBool}
                ordered={this.purchaseStateChangeHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;