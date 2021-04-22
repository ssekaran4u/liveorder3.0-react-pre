import React, { useEffect,useState,Component } from 'react'
import PrevApproverTable from '../mrComponents/PrevApproverTable'
import { postToServer } from '../../lib/comm-utils'

class  PrevExpenseApproverList extends Component{


    render(){

    const header = [
        { prop: 'Fsname', title: 'Name' },
        { prop: 'Desig', title: 'Designation', filterable: true },
        { prop: 'STATUS', title: 'Status', filterable: true },
        { prop: 'Note', title: 'Note', filterable: true },
        { prop: 'DATE', title: 'Date' },

    ];
    let body  = []
     this.props.prevList.map(res=>{
        body.push({
            Fsname:res.name,
            Desig:res.desig,
            STATUS:res.stat,
            Note:res.remarks,
            DATE:res.dat
        })
     })
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
} 
export  default PrevExpenseApproverList