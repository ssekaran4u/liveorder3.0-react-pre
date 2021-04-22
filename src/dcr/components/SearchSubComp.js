import React,{Component} from 'react'
import { Form} from 'react-bootstrap'

class SearchSubComp extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked : false,
            counter: 0,
            disableChk:true
        }
        this.handleChange = this.handleChange.bind(this)
      
    }
     handleChange(){ 
        const {name,id,checked} = event.target
        this.props.getData(id, name, checked)
    }
    
    render(){
        return(
                <div className="flex-row pad10">
                   {/* <Form.Check 
                        custom
                        type="checkbox"
                        id={this.props.proId }
                        value={this.props.proType}
                        label={this.props.proName}
                        className="mb-2"
                        name={this.props.proName}
                        onChange={this.props.update} 
                    />*/}
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={ this.props.selection }
                    id={this.props.id}
                    label={this.props.item.dname}
                    className="mb-2 jointCheck"
                    name={this.props.item.dname}
                    onChange={this.handleChange}
                   
                />
                     
                </div>
                )
    }
}
export default SearchSubComp
