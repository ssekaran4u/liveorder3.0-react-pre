import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Component } from 'react'
import {postToServer} from '../../../lib/comm-utils'


class Filteroptionlist extends Component{
  constructor(props){
    super(props)
    this.state={
      designation:[]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    var data = {"Index":"Designation", "Token":""}
    postToServer("SFC",data).then( (Result)=>{
      if(Result.data.Status == 'Success'){
     // console.log( Result.data.Result ,"sweta")
     
        this.setState({ designation:Result.data.Result })
      
      // else{
      //   this.setState({ showReject:!this.state.showReject })
        
      // }
         
      }
      }).catch(  (Error)=> {  
          this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
       }  )
  }
  handleChange(e,data){
    const val = data.value
    this.props.getDesignation(val)
  }
    render(){
      let deg=[]
      this.state.designation.map((item)=>{
        deg.push({
          key:item.c_code,
              text:item.c_name,
              value:item.c_code,
        })
      })
        // const friendOptions = [
        //     {
        //       key: 'MR',
        //       text: 'MR',
        //       value: 'MR',
        //     },
        //     {
        //       key: 'MANAGER',
        //       text: 'MANAGER',
        //       value: 'MANAGER',
        //     },
           
        //   ]

        return(
          <div className="dropselect sfcFilterOpt">
            <p className="filterbydes">Filter By Designation</p>
          <Dropdown
           className="dropop"
            placeholder='Select Designation'
            fluid
            selection
            options={deg}
            onChange={this.handleChange}
            />
        </div>
        )
    }
}

export default Filteroptionlist