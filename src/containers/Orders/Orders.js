import React,{Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        const orders=[]
        axios.get('/orders.json').then(res=>{
            for(let key in res.data){
                orders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({loading:false,orders })
        }).catch(err=> this.setState({loading:false}))
    }
    render(){
        return (
            <div>

         
               {this.state.orders.map(order=>(
                  <Order price={+order.price}
                  ingredients={order.ingredients} key={order.id}/>  
               ))}
                  </div>    
        )
    }
}
export default withErrorHandler(Orders,axios);