import React,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckoutSummary'
import {Redirect, Route} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component{
   
   
    goBackStateHandler=()=>{
            this.props.history.goBack();
    }
    continueStateHandler=()=>{
        this.props.history.replace('/checkout/contact-data') 
    }
    render(){
        const purchaseRedirect=this.props.purchased? <Redirect to ="/"/>:null;
        return(
            <div>
                {purchaseRedirect}
            <CheckOutSummary ingredients={this.props.ings} continue={this.continueStateHandler} 
            goBack={this.goBackStateHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
        }
}
const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout); 