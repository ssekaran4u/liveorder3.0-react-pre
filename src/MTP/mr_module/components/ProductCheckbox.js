import React,{Component} from 'react'
import {Form} from 'react-bootstrap'


class  ProductCheckbox extends Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(){
        const {name,id,checked} = event.target
        this.props.setSelection(id, name, checked ,this.props.item,'')

       
    }
    
    render(){
        return(
            <div className="pl20">
               <Form.Check 
                    custom
                    type="checkbox"
                    checked={ this.props.selection }
                    id={this.props.id}
                    label={this.props.item.c_name.toLowerCase()}  
                    className={this.props.item.priority == null || this.props.item.priority == 2000 ? 'mb-2' : 'mb-2 coreColor'}
                    name={this.props.item.c_name}
                    onChange={this.handleChange}
                   
                />
            </div>
        )
    }
}

export default ProductCheckbox