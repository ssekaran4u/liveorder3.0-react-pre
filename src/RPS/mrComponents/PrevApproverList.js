import React, { useEffect,useState } from 'react'
import PrevApproverTable from '../mrComponents/PrevApproverTable'
import { postToServer } from '../../lib/comm-utils'

const PrevApproverList=(props)=>{
    const {prevList} = props
    const [body,setBody] = useState([])
    //const {prevList,setRpsPrevList} = useState([])
    const header = [
        { prop: 'Fsname', title: 'Name' },
        { prop: 'Desig', title: 'Designation', filterable: true },
        { prop: 'STATUS', title: 'Status', filterable: true },
        { prop: 'Note', title: 'Note', filterable: true },
        { prop: 'DATE', title: 'Date' },

    ];
    useEffect(()=>{
        if(prevList){
            let header =[]
            header.push({ prop: "division", title: "Division", filterable: true, sortable: true })
            let body = []
            prevList.map((item)=>{
                body.push(item)
            })
            setBody(body)
        }
      
     
    },[prevList])
    
    
    // const body =[
    //     prevList.map((item)=>{

    //     })
    // ]
    return(
        <div>
             <PrevApproverTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    
                />
        </div>
    )
} 
export  default PrevApproverList