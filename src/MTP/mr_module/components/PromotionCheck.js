import React,{Component} from 'react'
import {Form} from 'react-bootstrap'

import QtyCounter from '../../../dcr/components/QtyCounter'

class PromotionCheck extends Component{
    constructor(props){
        super(props)
        this.state={
           qtyCounter: 1,
           localQty:'1'
        }
        this.handleChange = this.handleChange.bind(this)
        this.decrement = this.decrement.bind(this)
        this.increment = this.increment.bind(this)
    }
    
    handleChange(){  
    const {name,id,checked}= event.target
  
        this.props.getData(id,name, checked, this.state.qtyCounter,this.props.item,this.props.type)
    }
    componentDidMount(){



        if(this.props.editQty[this.props.item.c_name]){
            this.props.getData(this.props.item.c_name, this.props.item.c_name, true, this.props.editQty[this.props.item.c_name] ,this.props.item,this.props.type)
     const val= this.props.editQty[this.props.item.c_name]  ==undefined ||  this.props.editQty[this.props.item.c_name] ==''  ? '1':   this.props.editQty[this.props.item.c_name]

        this.setState({
            localQty:val
        })
    }
    }
    
    
    increment(){ 
        const {c_name} = this.props.item

        
        if(this.props.editQty){
            this.setState({
                localQty: ++this.state.localQty                  
            });
            this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
        }else{
        this.setState({
            qtyCounter: ++this.state.qtyCounter,
        });
        
        this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
        }
    }
  
    decrement(){ 
        const {c_name} = this.props.item
      //  let localqty = this.props.editQty[this.props.item.c_name]
        if(this.props.editQty){
            if(this.state.localQty > 1){
                this.setState({
                    localQty: --this.state.localQty                  
                });
            }
           
            this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
        }else{
        if(this.state.qtyCounter > 1){
            this.setState({
                qtyCounter: --this.state.qtyCounter                  
            });
        }
        this.setState({
            qtyCounter: this.state.qtyCounter
        });
        console.log("edit",this.state.qtyCounter)
        this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
        }
    }

    render(){ 
       
        return(
            <div className="flex-row samples-item">
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={ this.props.selection }
                    id={  "checkboxid"+this.props.dsccode + this.props.item.c_code + this.props.id }
                    label={this.props.item.c_name.toLowerCase()}
                    className="mb-2 jointCheck"
                    data-tag={this.props.item}
                    key={  "checkbox"+this.props.dsccode + this.props.item.c_code + this.props.id }
                    name={this.props.item.c_name}
                    onChange={this.handleChange}
                    className="m-0"
                />
                 {this.props.selection ? <QtyCounter qtyCounter={this.state.qtyCounter} localincreQty={this.increment} localdecQty={this.decrement} editQty={this.props.editQty  ? this.state.localQty :'edit'} increment={this.increment} decrement={this.decrement} /> : null}
            </div>
        )
    }
}
export default PromotionCheck