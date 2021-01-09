import React, {Component} from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../Backdrop/Backdrop'
class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show ||nextProps.children!==this.props.children
    }
    componentDidUpdate(){
        console.log("Updated");
    }
    render(){
        return(
            <Auxiliary>
    
            <BackDrop show={this.props.show} clicked={this.props.clicked}/>
            <div className={classes.Modal} style={{transform:this.props.show?'translateY(0)':'translateY(-110vh)',
                opacity:this.props.show?'1':'0'}}>
                {this.props.children}
            </div>
            </Auxiliary>
        )
    }
}
export default Modal;