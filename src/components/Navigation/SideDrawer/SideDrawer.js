import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sidedrawer=(props)=>{
    let assignedClasses=[classes.SideDrawer,classes.Close];
    if(props.show){
        assignedClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.closed}/>
        <div className={assignedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxiliary>
    )
}
export default sidedrawer;