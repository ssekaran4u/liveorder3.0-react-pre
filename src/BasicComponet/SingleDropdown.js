import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
class SingleDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected:'-1',
            
        }

        this.selectedProduct = this.selectedProduct.bind(this)
    }

    selectedProduct(event,values) {
    
        const selectedText  = event.currentTarget.textContent
       // console.log("event",values.value,values)
        this.setState({  Selected:values.value, brandcode: values.value })
        this.props.selectedProduct(values.value,this.props.Type,this.props.name,selectedText)
    }
    // selectedProduct(event) {
    //     const product=event.target.value;
    //     this.setState({ Selected: product });
    //    // this.props.selectedProduct(product)
    // }
    componentDidUpdate(old,olds){

        if(old.Selected!=this.props.Selected){
            const j=this.props.Selected
            this.setState({ Selected:j })
        }

    }
    componentDidMount(){ 
        if(this.props.Selected){
            this.setState({
                Selected:this.props.Selected
            })
        }
        
    }
    
    render() {  //console.log("anayu12",this.props.data)
       
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

 export default SingleDropDown