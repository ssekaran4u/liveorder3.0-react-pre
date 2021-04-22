import React,{Component} from 'react'
import { Form} from 'react-bootstrap'
import OtherexAmount from '../SfcMr/otherexammount'

class OtherExcheck extends Component{
    constructor(props){
        super(props)
       this.state={
           parent:false,
           val:'',
           amt:''
       }
       this.handleChange = this.handleChange.bind(this)
       this.getAmount = this.getAmount.bind(this)
    }
    
    handleChange(){ 
        const {name,id,checked} = event.target
        let val
        if(checked ==  true){
             val = "A"
        }
        this.setState({
            val:val,
            id:id,
            name:name,
            check:checked,
            item:this.props.item
        },this.props.getData(id, name, checked ,this.props.item,''))
        
    }

    getAmount(data){
        this.props.getAmount(data)
        this.setState({
            amt:data
        },this.props.getData(this.state.id, this.state.name,this.state.check ,this.state.item,data))
        
    }
    
    render(){ 
        return( 
            <div className="flex-row sfcCheck">
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={this.props.selection }
                    id={this.props.id}
                    label={this.props.item.Name.toLowerCase() }  
                    className="mb-2 jointCheck"
                    name={this.props.item.Name}
                    onChange={this.handleChange}
                   
                />
                {this.state.val == 'A' ?
                <OtherexAmount getAmount={this.getAmount} />:this.props.item.Amount != 0.00 ? this.props.selection ? <OtherexAmount getAmount={this.getAmount} amount={ this.props.item.Amount } />: null :null}
            </div>
        )
    }
}
export default OtherExcheck