import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'
import {postToServer} from '../../lib/comm-utils'



class DistanceCallOptionDrop extends Component{
  constructor(props){
    super(props)
    
    this.handleChange = this.handleChange.bind(this)
    // this.sendData = this.sendData.bind(this)
  }
//   sendData(){
//     this.props.parentCallback("Hey Popsie, How’s it going?");
// }
  handleChange(e,data){
     console.log(this.props.name,"cheange done")
   let returArray={"name":this.props.name,"rvalue":data.value};
  //  this.props.update('grand child')
   // this.props.parentCallback(returArray);

    const val = data.value
    this.props.getData(val)
    
  }
  componentDidUpdate(){
   
  }
   
    render(){
      // const {Brand} = this.state;

       
        return(
          <div className="dropselect sfcFilterOpt">
            <p className="filterbydes">Filter By {this.props.name}</p>
              <Dropdown
                 className="dropop  cal-scrollbar"
                 className="customized-input"
                 placeholder={this.props.name}
                 fluid
                 selection
                 search
                 options={this.props.options}
                 onChange={this.handleChange}
                // value={this.props.value1}
                />
          </div>
         
        )
    }
}

export default DistanceCallOptionDrop