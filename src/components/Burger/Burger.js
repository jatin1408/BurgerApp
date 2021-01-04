import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger=(props)=>{
   let transformed=[];
   for(let attr in props.ingredients){
       for(let i=0;i<props.ingredients[attr];i++){
           transformed.push(<BurgerIngredient key={attr+i} type={attr}/>)
       }
   }
   if(transformed.length===0) transformed.push("Please add something!");
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformed}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    )
}   
export default burger;