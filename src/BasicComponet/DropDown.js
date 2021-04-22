import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected:'-1',
            
        }

        this.selectedProduct = this.selectedProduct.bind(this)
    }

    selectedProduct(event,values) {
       

       // console.log("event",values.value,values)
        this.setState({  Selected:values.value, brandcode: values.value })
        this.props.selectedProduct(values.value,this.props.Type,this.props.name)
    }
    // selectedProduct(event) {
    //     const product=event.target.value;
    //     this.setState({ Selected: product });
    //    // this.props.selectedProduct(product)
    // }
    componentDidUpdate(old,olds){
       // console.log("chauhan",old.Selected,this.props.Selected)


        if(old.Selected!=this.props.Selected){
            
       if(this.props.Selected==undefined){
        let selected = "-1"
        this.setState({ Selected:selected})
        return
       }
            const j=this.props.Selected;
            let selected
            if(this.props.Type == "month"){ 
            selected= j.toString()
        }else if(this.props.Selected.toString() == "-2"){
            selected = "-1"
        }else{
            selected = j
        }
           
            this.setState({ Selected:selected})
        }

    }
    componentDidMount(){ 
        if(this.props.Selected){
            let selected = this.props.Selected
            if(this.props.Type == "month"){ 
                selected= selected.toString()
            }else{
                selected = selected
            }
            this.setState({
                Selected:selected
            })
        }
        
    }
    
    render() { 
   
        return (
            <div className="sfcMrDropdown">
                <Dropdown   onChange={this.selectedProduct} 
                search fluid selection options={this.props.data} 
                className={this.state.Selected == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "}
                value={this.state.Selected}
               
                 />
            </div>
        );
    }
}

 export default DropDown