import React,{Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input  from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component{
    state={
        orderForm:{
            name:this.createInputConfig('input','text','Your Name','',false,true,5,20,false),
            street:this.createInputConfig('input','text','Street','',false,true,5,25,false),
            zipCode:this.createInputConfig('input','text',"ZIP CODE",'',false,true,4,7,false),
            country:this.createInputConfig('input','text',"Country",'',false,true,5,10,false),
            email:this.createInputConfig('input','email','Your Mail','',false,true,5,40,false),
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'cheapest',
                isValid:true,
                touched:false,
                validation:{}
            }
        
        },
        isFormValid:false,
        loading:false
    }
    postData=(event)=>{
        event.preventDefault();
       
     
        const formData={};
        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
    
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order);
        
     }
     createInputConfig(elementType,type,placeholder,value,isValid,required,minLength,maxLength,touched){
            const obj={
                elementType,
                elementConfig:{
                    type,
                    placeholder
                },
                value,
                isValid,
                validation:{
                    required:required,
                    minLength,
                    maxLength
                },
                touched
            }
            return obj;
     }
     checkValidity(value,rules){
         let isValid=false
        if(rules.required){
                isValid=value.trim() !=='';
        }
        isValid=rules.minLength <= value.length && rules.maxLength >= value.length
        return isValid;
     }
     inputChangedHandler=(event,key)=>{
        
        const updatedState={...this.state.orderForm};
        const updatedStateFormElement={...updatedState[key]}
        if(updatedStateFormElement.elementType==='select') return;
        updatedStateFormElement.value=event.target.value
        updatedStateFormElement.isValid=this.checkValidity(updatedStateFormElement.value,updatedStateFormElement.validation)
        updatedStateFormElement.touched=true
        updatedState[key]=updatedStateFormElement
        let formIsValid=true
        for(let key in updatedState){
            formIsValid=updatedState[key].isValid && formIsValid
        }

        this.setState({orderForm:updatedState,isFormValid:formIsValid})
      
     }
    render(){
       let formElements=[]
       for(let key in this.state.orderForm){
           formElements.push({
               id:key,
               config:this.state.orderForm[key]
           })
       }
        let form=(
            <form>
                    {formElements.map(element=>(
                        <Input key={element.id} elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        inValid={!element.config.isValid}
                        touched={element.config.touched}
                        value={element.config.value}
                        changed={(event)=>this.inputChangedHandler(event,element.id)}
                        />
                    ))}
                    <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.postData}>ORDER</Button>
                </form>
        )
        if(this.props.loading) form=<Spinner/>
        return(
            <div className={classes.ContactData}>
                <h4>Please fill in your information</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.total,
        loading:state.order.loading
}
}
const mapDispatchToProps=dispatch=>{
    return {

    onOrderBurger: (orderData)=> dispatch(actions.callToUploadContactData(orderData))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
