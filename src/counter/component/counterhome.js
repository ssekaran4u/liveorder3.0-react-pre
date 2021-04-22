import React from 'react';
import {postToServer} from '../../lib/comm-utils'
const columnHeader =["Id","firstName","lastName","email","gender"];
export default class ChildComponent extends React.Component{
   constructor(props){
       super(props);
       this.state={
           empdata:[]
       }
       this.generateHeader = this.generateHeader.bind(this);
       this.generateHeadertwo=this.generateHeadertwo.bind(this);
       this.generateTableData = this.generateTableData.bind(this);
   }
   componentDidMount()
   {
    let ddd='';
    debugger;
   let empdata=[];
   var brnd = {"Report":"RegionWiseDistDetailsSummary","index": "DistanceCall",  data:{}  }
   // var defre={ "index": "LoginFSDetails",  data:{}  }
   //const empdata='';
    postToServer("Reportsapi", brnd).then((Result) => {
    if (Result.data.Status == 'Success') {   
      //  empdata.push(Result.data.data) 
      this.setState({empdata:Result.data.DistanceCall});
 console.log(this.state.empdata,"empd")
     }
    
    }).catch(() => {
                
    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
   // this.setState.columnHeader =empdata
   }
   generateHeader(){
       console.log(this.state.empdata,"empd1")
       let res=[];
       let  columnHeader1=[];
      columnHeader1.push(this.state.empdata)
        console.log(columnHeader1,"empd2")
        console.log(columnHeader1.length,"empd3")
    //  for(var i =0; i < columnHeader1.length; i++){
        
    //      res.push(<th key={columnHeader1.c_name}>{columnHeader1.c_name}</th>)
    //  }
   
    columnHeader1[0].map((item4) => {
        console.log(item4.c_name,"name")
                res.push(
                  
                <th colSpan={2} key={item4.c_name}>{item4.c_name}</th>
              
              

              
                )
            
        
        })
    
     return res;
     
   }

   generateHeadertwo(){
    console.log(this.state.empdata,"empd1")
    let res=[];
    let  columnHeader1=[];
   columnHeader1.push(this.state.empdata)
     console.log(columnHeader1,"empd2")
     console.log(columnHeader1.length,"empd3")
 //  for(var i =0; i < columnHeader1.length; i++){
     
 //      res.push(<th key={columnHeader1.c_name}>{columnHeader1.c_name}</th>)
 //  }

 columnHeader1[0].map((item4) => {
     console.log(item4.c_name,"name")
             res.push(
               
             <th  key={item4.c_name}>{item4.c_name}</th>
           
        

           
             )
         
     
     })
 
  return res;
  
}
   generateTableData(){
       let res=[];
       //let tableData = this.state.empdata;
      // console.log(this.state.empdata,"emp")
    //    for(var i =0; i < tableData.length; i++){
    //        res.push(
    //         <tr >
    //        <td colSpan={2} key={tableData[i].id}>{tableData[i].id}</td>
    //        <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
    //        <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
    //        <td key={tableData[i].email}>{tableData[i].email}</td>
    //        <td key={tableData[i].gender}>{tableData[i].gender}</td>
    //        </tr>
    //        )
    //    }
       return res;
   }
   render(){
       return(
           <div>
        <table className="table  table-hover">
        <thead>
            <tr>
            {this.generateHeader()}
            </tr>
            <tr>
            {this.generateHeadertwo()}
            </tr>
        </thead>
        <tbody>
            {this.generateTableData()}
        </tbody>
        </table>
           </div>
       )
   }
}