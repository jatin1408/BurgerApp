import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends  Component{
    state={
        purchasing:false,
        loading:false,
        error:false
    }
 
    purchaseStateChange=()=>{
        const ing=this.props.ings;
        const sum=Object.keys(ing).map(el=>{
            return ing[el];
        }).reduce((val,total)=>{
            return val+total;
        },0)
        return sum>0
    }
    
    purchaseStateChangeHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseRemoveStateChangeHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueState=()=>{
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo={...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        
        
        let burger=this.state.error?<p>Something went wrong</p>:<Spinner/>
        let OS=null;
        if(this.props.ings){
            burger=( 
                <Aux>
              
              <Burger ingredients={this.props.ings}/>
            <BuildControl ingredientsAdded={this.props.onIngredientsAdded} 
            ingredientsRemoved={this.props.onIngredientsRemoved}
            disabledButtons={disabledInfo}
            price={this.props.total}
            purchasable={this.purchaseStateChange()}
            ordered={this.purchaseStateChangeHandler}/>
             </Aux>);
             OS= <OrderSummary total={this.props.total.toFixed(2)} 
            data={this.props.ings} cancel={this.purchaseRemoveStateChangeHandler} continue={this.purchaseContinueState}/>
        }
        if(this.state.loading){
            OS=<Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseRemoveStateChangeHandler}>

                {OS}
              
                </Modal>
                {burger}
             
            </Aux>
        );
    }
}
const mapStateToProps=state=>{
    return {
        ings:state.ingredients,
        total:state.total
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onIngredientsAdded:(ingName)=> dispatch({type:actionTypes.ADD_INGREDIENTS,ingredient:ingName}),
        onIngredientsRemoved:(ingName)=> dispatch({type:actionTypes.REMOVE_INGREDIENTS,ingredient:ingName})
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));