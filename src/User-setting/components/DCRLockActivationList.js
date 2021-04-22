import React,{useEffect,useState} from 'react'
import CustomTable from './CustomTable'
import DCRUnlockFormPopup from '../popup/DCRUnlockFormPopup'

const DCRLockActivationList=(props)=>{
    const [header, setHeader] = useState([])
    const [body, setBody] = useState([])
    const [dcrUnlockForm,setDcrUnlockForm] = useState(false)

    const handleAction=()=>{
        setDcrUnlockForm(true)
    }

    useEffect(()=>{
        let header=[]

        let body =[]
        header.push({ prop: "action", title: "Action", filterable: true, sortable: true })
        header.push({ prop: "mrcode", title: "M.R.Code", filterable: true, sortable: true })
        header.push({ prop: "Mrname", title: "MR Name", filterable: true, sortable: true })
        header.push({ prop: "lastdate", title: "Last DCR Date", filterable: true, sortable: true })
        header.push({ prop: "unlockdate", title: "Unlock Date(From & to)", filterable: true, sortable: true })
        header.push({ prop: "entry", title: "Entry Mandatory", filterable: true, sortable: true })
        header.push({ prop: "remark", title: "Remark", filterable: true, sortable: true })
        setHeader(header)
        body=[
            {"Action":"action","mrcode":"1234","Mrname":"Srinivas","lastdate":"19-AUG-21",
            "unlockdate":"01-Aug-2020 to 02 Aug 2020","entry":"yes","remark":"Entry Activated"},
            {"Action":"action","mrcode":"1234","Mrname":"Srinivas","lastdate":"19-AUG-21",
            "unlockdate":"01-Aug-2020 to 02 Aug 2020","entry":"yes","remark":"Entry Activated"},
            {"Action":"action","mrcode":"1234","Mrname":"Srinivas","lastdate":"19-AUG-21",
            "unlockdate":"01-Aug-2020 to 02 Aug 2020","entry":"yes","remark":"Entry Activated"}
        ]
        body.map((item)=>{
            item.action = <img src="../public/assets/images/edit_icon.svg" className="hcursur" onClick={handleAction} />
        })
        setBody(body)
    },[])

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
    const closeModal=()=>{
        setDcrUnlockForm(false)
    }

    return(
        <div>
            <CustomTable
                // tempdata={this.state.data}
                tableHeader={header}
                tableBody={body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true, }}
                labels={customLabels}
                type="activation"
                // toggleHeader={toggleHeader}
                   
            />
            <DCRUnlockFormPopup 
                show={dcrUnlockForm} 
                // docHistoryData={docHistoryData}
                onHide={()=>closeModal()}
            />
        </div>
    )
}

export default DCRLockActivationList