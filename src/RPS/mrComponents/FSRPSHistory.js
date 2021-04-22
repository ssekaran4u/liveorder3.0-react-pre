import React, { useEffect,useState } from "react";
import HistoryTable from "./historyTable";
import {postToServer} from '../../lib/comm-utils'

const FSRPSHistory = () => {
    const [month,setMonth] = useState([])
    const [rpsHistoryList,setRpsHistoryList] = useState([])
    const [header,setHeader] = useState([])
    const [body,setBody] = useState([])

    useEffect(()=>{
          const body = {"Index":"FsRPS_History","Token":"Sinusms2020"}  
          postToServer("Rps",body).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                setRpsHistoryList(Result.data.data)
            }
          }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    },[])

  useEffect(() => {
    let header = []
    let body = []

    if(rpsHistoryList){ 
      if(rpsHistoryList[0]){
        if(rpsHistoryList[0]["RequestNo"]){
          header.push({ prop: "RequestNo", title: "Req. No.", filterable: true })
        }
       // if(rpsHistoryList[0]["setupname"]){
          header.push({ prop: "setupname", title: "Setup Name", filterable: true })
       // }
       // if(rpsHistoryList[0]["rpsname"]){
          header.push({ prop: "rpsname", title: "RPS Name", filterable: true})
       // }
       // if(rpsHistoryList[0]["Submitteddate"]){
          header.push({ prop: "Submitteddate", title: "Submitted On", filterable: true})
        //}
       // if(rpsHistoryList[0]["doctor"]){
          header.push({ prop: "doctor", title: "Dr. Name", filterable: true })
       // }
      //  if(rpsHistoryList[0]["drcategory"]){
          header.push({ prop: "drcategory", title: "Dr. Category", filterable: true})
       // }
       // if(rpsHistoryList[0]["Amt"]){
          header.push({ prop: "Amt", title: "Amount (₹)", filterable: true })
       // }
       // if(rpsHistoryList[0]["actualexpense"]){
          header.push({ prop: "actualexpense", title: "Actual RPS Exp.", filterable: true })
       // }
      }
    }
    rpsHistoryList.map(item => {
     
      body.push(item)
    })
    setHeader(header);
    setBody(body)
  },[rpsHistoryList])
  
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

export default FSRPSHistory;