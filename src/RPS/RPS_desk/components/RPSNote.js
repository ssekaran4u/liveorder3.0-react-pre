import React,{Component} from 'react'
import {Form} from 'react-bootstrap'

class RPSNote extends Component{
    constructor(props){
        super(props)
        this.state={
            note:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){
        let a = event.target.value
        this.setState({
            note:a
        })
        this.props.getNote(a)
    }
    render(){
        return(
            <Form.Control 
                type="text" 
                className="customized-input" 
                placeholder="Enter" 
                value={this.state.note} 
                onChange={()=>this.handleChange()}
            />
        )
    }
}

export default RPSNote