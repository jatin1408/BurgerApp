import React from 'react';
import classes from './Order.css'
const Order=(props)=>{
    const ingredients=[]
     for(let igName in props.ingredients){
          ingredients.push({
              item:igName,
              quantity:props.ingredients[igName]
          })  
     }
     const output=ingredients.map(ig=>{
        return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding:'5px' 

        }} key={ig.item}>{ig.item} ({ig.quantity})</span>
     })
    return(
        <div className={classes.Order}>
            <p>{output}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
    }
export default Order;