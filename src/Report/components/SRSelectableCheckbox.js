import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class SRSelectableCheckbox extends Component{
    constructor(props){
        super(props)
        
        this.state={
            
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){
        const {name,id,checked} = event.target
        this.props.getData(id, name, checked ,this.props.item)
    }
    
    render(){ 
        return(
            <Form.Check 
                custom
                type="checkbox"
                checked={ this.props.selection }
                id={this.props.id}
                label={this.props.item}
                className="mb-2 jointCheck"
                name={this.props.item}
                onChange={this.handleChange}
                
            />
        )
    }
}
export default SRSelectableCheckbox
