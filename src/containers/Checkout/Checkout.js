import React,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
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
        return(
            <div>
            <CheckOutSummary ingredients={this.props.ings} continue={this.continueStateHandler} goBack={this.goBackStateHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
        }
}
const mapStateToProps=state=>{
    return {
        ings:state.ingredients

    }
}

export default connect(mapStateToProps)(Checkout); 