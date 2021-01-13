import React,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
class Checkout extends Component{
    state={
        ingredients:null,
        price:0
    }
    componentWillMount(){
        const ingredients={};
        let price=0;
        const query=new URLSearchParams(this.props.location.search);
        for(let param of query.entries()){
            if(param[0] === "price"){
                price=param[1]
            }
            else{
            ingredients[param[0]]=+param[1];
        } 
    }
        this.setState({ingredients,price})       
    }
    goBackStateHandler=()=>{
            this.props.history.goBack();
    }
    continueStateHandler=()=>{
        this.props.history.replace('/checkout/contact-data') 
    }
    render(){
        return(
            <div>
            <CheckOutSummary ingredients={this.state.ingredients} continue={this.continueStateHandler} goBack={this.goBackStateHandler}/>
            <Route path={this.props.match.path + '/contact-data'} render={(props)=> (<ContactData 
            ingredients={this.state.ingredients} 
            totalPrice={this.state.price}
            {...props} />)}/>
            </div>
        )
        }
}
export default Checkout; 