import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected:this.props.Textval,
            
        }

        this.textch = this.textch.bind(this)
    }

    textch(event,values) {
       


         const L=event.target.value
        // console.log(event.target,)
        this.setState({  Selected:L})
        this.props.selectedText(this.props.id,L)
    }
   
   
    
    render() { 
   
        return (
          
            <Form.Control type="text"  onChange={  (Event)=>{ this.textch(Event,this.props.id) } } value={ this.state.Selected    } className="customized-input inputBox" placeholder="Enter Here" />
          
        );
    }
}

 export default Text