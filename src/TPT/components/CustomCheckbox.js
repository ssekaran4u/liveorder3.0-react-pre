import React,{Component} from 'react'
import {Form} from 'react-bootstrap'

class CustomCheckbox extends Component{
    constructor(props){
        super(props)
        this.state={
            checkboxval:false
        }

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(){ 
        // const checked = event.target.value;
        // const name=event.target.name;
        // const id = event.target.id;
        const {name,id,checked} = event.target
       this.props.getData(name,checked,id)
    }
    render(){ 

        //Removed by kunal  below line
        //this.props.check ? this.props.check:
        return (
            <div className="">
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={this.props.slectcheck}
                    id={this.props.item.c_cust_code}
                    label=""
                    name={this.props.item.c_code}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
export default CustomCheckbox