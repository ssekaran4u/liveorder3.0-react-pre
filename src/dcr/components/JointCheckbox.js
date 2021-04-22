import React,{Component} from 'react'
import { Form} from 'react-bootstrap'


class JointCheckbox extends Component{
    constructor(props){
        super(props)
       this.state={
           parent:false
           
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
                    label={this.props.item.nm.toLowerCase() +'(   '+ this.props.item.desg.toUpperCase() +')' }  
                    className="mb-2 jointCheck"
                    name={this.props.item.desg}
                    onChange={this.handleChange}
                   
                />
        )
    }
}
export default JointCheckbox