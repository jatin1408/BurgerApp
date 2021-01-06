import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
const orderSummary=(props)=>{
    const inSummary=Object.keys(props.data).map(igKey=>{
        return (
            <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey+" "}</span>{props.data[igKey]}</li>
        )
    });
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the follwing ingredients :</p>
            <ul>
                {inSummary}
            </ul>
            <p><strong>Total Price: {props.total}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Auxiliary>
    )
}
export default orderSummary;