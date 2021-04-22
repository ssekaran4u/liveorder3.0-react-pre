import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button' 

class Btngrp extends Component{
  
    render(){
      // console.log(this.props.quaty)
        return (
          <div className="btngrp-div">
            
            <ButtonGroup className="btngrpp" aria-label="Basic example">
              <Button className="cartplus" variant="secondary"><img className="cartplusimg"  src = "../public/assets/images/manager_minus.svg"/></Button>
              <Button  className="cartnum" variant="secondary">{this.props.quaty}</Button>
              <Button  className="cartplus"variant="secondary"><img className="cartplusimg" src = "../public/assets/images/manager_plus.svg"/></Button>
            </ButtonGroup>
          </div>
        );
    }
}

export default Btngrp