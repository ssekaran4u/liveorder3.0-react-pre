import React, { useEffect,useState } from "react";
import HistoryTable from "./historyTable";
import {postToServer} from '../../lib/comm-utils'

const DrRPSHistory = (props) => {
  const {docCode} = props
  const [rpsDrHistoryList,setDrHistoryList] = useState([])
  const [header,setHeader] = useState([])
  const [body,setBody] = useState([])

  useEffect(()=>{
    if(docCode){
      const body = {"Index":"DrInvestmentHistory","Data":{"DocCode":docCode},"Token":""}  
      postToServer("Rps",body).then( (Result)=>{ 
        if(Result.data.Status == "Success"){ 
            setDrHistoryList(Result.data.data)
        }
      }).catch(  (Error)=> {  
   // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
    }
  
},[docCode])

  useEffect(() => {
    let header = []
    let body = []

    if(rpsDrHistoryList){ 
      if(rpsDrHistoryList[0]){
        if(rpsDrHistoryList[0]["Reqno"]){
          header.push({ prop: "Reqno", title: "Request No.", filterable: true })
        }
       // if(rpsHistoryList[0]["setupname"]){
          header.push({ prop: "c_name", title: "F.S. Name", filterable: true })
       // }
       // if(rpsHistoryList[0]["rpsname"]){
          header.push({ prop: "setup", title: "Setup Name", filterable: true})
       // }
       // if(rpsHistoryList[0]["Submitteddate"]){
          header.push({ prop: "invname", title: "RPS Name", filterable: true})
        //}
       // if(rpsHistoryList[0]["doctor"]){
          header.push({ prop: "rpsdate", title: "RPS Date", filterable: true })
       // }
      //  if(rpsHistoryList[0]["drcategory"]){
          header.push({ prop: "amt", title: "Request Amt.(₹)", filterable: true})
       // }
       // if(rpsHistoryList[0]["Amt"]){
          header.push({ prop: "frmdt", title: "Request Date From", filterable: true })
       // }
       // if(rpsHistoryList[0]["actualexpense"]){
          header.push({ prop: "todt", title: "Request Date To", filterable: true })
       // }
      }
    }
    rpsDrHistoryList.map(item => {
     
      body.push(item)
    })
    setHeader(header);
    setBody(body)
  },[rpsDrHistoryList])
  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "< Prev",
    next: "Next >",
    show: "Show",
    entries: "items/page",
    filterPlaceholder: "Search",
    noResults: "There is no data to be displayed"
  };

  return (
    <div className="dcr-list-sec padd-top-22">
      <HistoryTable
        tableHeader={header}
        tableBody={body}
        keyName="HistoryTable"
        tableClass="striped hover table-responsive"
        rowsPerPage={10}
        rowsPerPageOption={[10, 20, 50, 100, 200]}
        initialSort={{ prop: "username", isAscending: true, }}
        labels={customLabels}
      />
    </div>
  )
}

export default DrRPSHistory;