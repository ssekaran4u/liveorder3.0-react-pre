import React,{Component} from 'react'
import { Row, Col, Form } from 'react-bootstrap';
const re = /^[0-9]*$/;

class InputBox extends Component{
    constructor(props){
        super(props)
        this.state={
            val:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        if(this.props.inputVal){
            this.setState({
                val:this.props.inputVal
            })
        }else{
            this.setState({
                val:this.state.val
            })
        }
    }

    handleChange(){
        const value = event.target.value
        //console.log("val",value)
       if(re.test(value)){
           this.setState({
                val:value
           })
           this.props.getValue(this.props.name,value)
       }
      
    }
    render(){
        return(
            <div className="nodetail">
                <Form.Label className="customized-label">{this.props.name}</Form.Label>
                <Form.Control type="text" className="customized-input" placeholder="Enter the Number" value={this.state.val}  onChange={this.handleChange} />
            </div>
        )
    }
}

export default InputBox