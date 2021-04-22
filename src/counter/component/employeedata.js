

import React,{Component} from 'react'
import {postToServer} from '../../lib/comm-utils'

class employeedata extends Component{
constructor(props){
    super(props)
    this.state={
       
    }

   
}

componentDidMount()
{
    alert(1)
    let ddd='';
    debugger;
   let empdata=[];
    var defre={ "index": "LoginFSDetails",  data:{}  }
   //const empdata='';
    postToServer("PrpDetailsRpt", defre).then((Result) => {
    if (Result.data.Status == 'Success') {   
        empdata.push(Result.data.data) 
 console.log(empdata,"empd")
     }
    
    }).catch(() => {
                
    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
    return empdata
}
render()
{
  
}
}
export default employeedata