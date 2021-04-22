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
      //  console.log("aa",this.props.slectcheck,this.props.item.C_CUST_CODE,this.props.slectcheck ? this.props.slectcheck==true?true:null:null)
        //Removed by kunal  below line
    
        return (
            <div className="">
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={this.props.slectcheck ? this.props.slectcheck==true?true:false:false }
                    id={this.props.item.C_CUST_CODE}
                    label=""
                    name={this.props.item.C_NAME}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
export default CustomCheckbox