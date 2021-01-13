import React,{Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        },
        loading:false
    }
    postData=(event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer:{
                name:'Dhruv Gupta',
                zipCode:282004,
                country:'India'
            },
            email:"dhruvgupta@example.com"
        }
        axios.post('orders.json',order).then(res=>{
            this.setState({loading:false})
            this.props.history.push('/');
        }).catch(e=>this.setState({loading:false}));
     }
    render(){
        let form=(
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" required/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" required/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your Address" required/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" required/>
                    <Button btnType="Success" clicked={this.postData}>ORDER</Button>
                </form>
        )
        if(this.state.loading) form=<Spinner/>
        return(
            <div className={classes.ContactData}>
                <h4>Please fill in your information</h4>
                {form}
            </div>
        )
    }
}
export default ContactData;
