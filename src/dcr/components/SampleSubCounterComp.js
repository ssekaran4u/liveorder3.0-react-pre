import React,{Component} from 'react'
import { Form} from 'react-bootstrap'
import QtyCounter from './QtyCounter'

class SampleSubCounterComp extends Component{
    constructor(props) {
        super(props);
        this.state={
            counter: 1,   
        }
        this.decrement = this.decrement.bind(this)
        this.increment = this.increment.bind(this)
    }


    componentDidUpdate(oldprops,oldstate){

        // console.log(this.props.selection,'kunal')
        // if(oldprops.checked!=this.props.checked){


           
        //     if(this.props.checked==false){
        //      this.setState({ counter:1 })

        //      alert('oko')
        //     }

        // }
    }
      
    increment(){

        this.setState({
            counter: this.state.counter + 1,
            //disableChk:false
             //QtyCount:true
        });
        let count = this.state.counter + 1
        let item_Value = false
        item_Value= this.props.proName+"(0"+count+")";
        this.setState({
                   itemname:this.props.proName,
                   
                },this.props.getSample(item_Value,this.props.id))
    }
  
    decrement(){ 
        if(this.state.counter > 1){
            this.setState({
                counter: this.state.counter - 1                  
            });
        this.setState({
            counter: this.state.counter - 1,
            //disableChk:false
             //QtyCount:true
        });
        let count = this.state.counter - 1
        let item_Value = false
        item_Value= this.props.proName+"(0"+count+")";
        this.setState({
                   itemname:this.props.proName,
                   
                },this.props.getSample(item_Value,this.props.id))
        }
        
        
    }
   
    render(){

     
        return(
                <div className="flex-row ">
                    <Form.Check 
                        custom
                        checked={this.props.checked}
                        type="checkbox"
                        id={this.props.index}
                        label={this.props.proName}
                        className="mb-2"
                        name={this.props.proName}
                        value={this.state.counter}
                        onChange={this.props.update} 
                    />
                   
                    {this.props.counterLink ? 
                    <QtyCounter  counter={this.state.counter} increment={this.increment} decrement={this.decrement}  />:''} 
                </div>
                )
    }
}
export default SampleSubCounterComp
