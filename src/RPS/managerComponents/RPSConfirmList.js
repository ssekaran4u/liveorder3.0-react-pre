import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import RPSRequestListTable from "./RPSRequestListTable";
import {postToServer} from '../../lib/comm-utils'
import {withRouter} from 'react-router-dom'
import DashLoader from "../../lib/DashboardLoader";
import Loader from '../../lib/Loader'
const RPSConfirmList = (props) => {
  const [isFull, setIsFull] = useState(false);
  const [show, setShow] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [rpslist,setRpsList] = useState([])
  const [header,setHeader] = useState([])
  const [body,setBody] = useState([])
  const [status,setStatus] = useState('All')
  const [showLoader, setshowLoader] = useState(true)
  useEffect(() => {
    setshowLoader(true) 
    const body ={"Index":"RPSApprovalReqLIstDet",
                "data":{"opt":"1","month":month.toString(),"year":year.toString(),"ReqStatus":status},
                "Token":""}  
    postToServer("Rps",body).then( (Result)=>{
      setRpsList(Result.data.data)
      setshowLoader(false) 
    }).catch(  (Error)=> {  
      setshowLoader(false) 
    })
    
  }, [month,year,status])

  const getMonth = (value) => {
    setMonth(value)
  }

  const getYear = (value) => {
    setYear(value)  
  }
  const getStatus =(value)=>{
    setStatus(value)
  }

  const handleViewChange = () => {
    setIsFull(!isFull);
  }

  const handleToggleChange = () => {
    setShow(!show)
  }
  const redirectEdit=(id,nextApproval,currStatus)=>{ 
    props.history.push('/rps-entry/'+id)
    localStorage.setItem("approval",1)
    sessionStorage.setItem("nextConfirmation",nextApproval)
    sessionStorage.setItem("currentStatus",currStatus)
    sessionStorage.setItem("confirmAmtEdit",'1')
   // if(currStatus == 'S' ){
      sessionStorage.setItem("view",'1')
   // }
    // else{
    //   sessionStorage.setItem("view",'0')
    // }
  }
 
  useEffect(()=>{ 
    let header =[]
    let body =[]
  if(rpslist){
    if(rpslist){
    
      // header.push({ prop: "REQ_NO1", title: "Req. No.", filterable: true, sortable: true })
    
      header.push({ prop: "REQ_NO1", title: "Req. No.", filterable: true })
      header.push({ prop: "Division", title: "Division", filterable: true })
      header.push({ prop: "FsName~150", title: "FS Name", filterable: true })
      header.push({ prop: "Desig~100", title: "Designation", filterable: true })
      header.push({ prop: "amount", title: "Amount (₹)", filterable: true })
      header.push({ prop: "status", title: "Status", filterable: true })
      header.push({ prop: "initiatedon", title: "Date", filterable: true})
      header.push({ prop: "deskconfirmedon", title: "Desk Confirmed Date", filterable: true })
      // header.push({ prop: "expense", title: "Expense Entry", filterable: true })
    }
    rpslist.map(item => { 
      const editReq = <span>
        {item["currentstatus"] == 'A' || item["currentstatus"] == 'R'  || item["Nextisaprovalorconfirmation"] == 'C' ? 
        <img 
          src="../public/assets/images/eye.svg" 
          className="dcrimg mr-3" 
          onClick={()=>redirectEdit(item["Request~150"])} 
        />:
        <img 
        src="../public/assets/images/edit_icon.svg" 
        className="dcrimg mr-3" 
        onClick={()=>redirectEdit(item["Request~150"])} 
      />}
        <span>{item['Request~150']}</span>
      </span>

      const reqested = <span className="reqested-status">Requested</span>
      const deskConfirmed = <span className="confirmed-status">Desk Confirmed</span>
      const hold = <span className="confirmed-status">Hold</span>
      const approved = <span className="approved-status">Approved</span>
      const rejected = <span className="rejected-status">Rejected</span>
      const confirmed = <span className="confirmed-status">Confirmed</span>

      const expenseLink = <span className="expense-link"
      onClick={() => getExpenseModal(item["REQ_NO"],
        item["RPS_Name"],
        item['FSNAME'],
        item['DATE'],
        item['DOCTOCODE'],
        item['DOCTORNAME'],
        item['AMOUNT'],
        item['GRADE'],item['singleappstat'],item['n_status'])}
        
    >
      Expense
                        </span>

      if(item["currentstatus"]  == "S"){
        item['status'] = reqested
      }
      if(item["currentstatus"]  == "A"){
        item['status'] = approved
      }
      if(item["currentstatus"]  == "R"){
        item['status'] = rejected
      }
      if(item["currentstatus"]  == "D"){
        item['status'] = deskConfirmed
      }
      if(item["currentstatus"]  == "C"){
        item['status'] = confirmed
      }
      if(item["currentstatus"]  == "H"){
        item['status'] = hold
      }
      if(item["currentstatus"]  == "D"){
        item['expense'] = expenseLink
      }
        
     
      item["REQ_NO1"] = <span>
         <img 
          src="../public/assets/images/eye.svg" 
          className="dcrimg mr-3" 
          onClick={()=>redirectEdit(item["Request~150"],item.Nextisaprovalorconfirmation,item.currentstatus)} 
        /><span>{item['Request~150']}</span>
      </span>
      // item["ExpStatus"] = expenseLink
      body.push(item)
    })
  }  
  
  setHeader(header);
  setBody(body)
}, [rpslist])
  
  const monthFilter = [
    {
      key: '1,2,3,4,5,6,7,8,9,10,11,12',
      value: '1,2,3,4,5,6,7,8,9,10,11,12',
      text: 'All',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 1,
      value: 1,
      text: 'January',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 2,
      value: 2,
      text: 'February',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 3,
      value: 3,
      text: 'March',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 4,
      value: 4,
      text: 'April',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 5,
      value: 5,
      text: 'May',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 6,
      value: 6,
      text: 'June',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 7,
      value: 7,
      text: 'July',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 8,
      value: 8,
      text: 'August',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 9,
      value: 9,
      text: 'September',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 10,
      value: 10,
      text: 'October',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 11,
      value: 11,
      text: 'November',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: 12,
      value: 12,
      text: 'December',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
  ]

  // const monthFilter = [
  //   {
  //     key: 'All',
  //     text: 'All',
  //     value: 'All',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'January',
  //     text: 'January',
  //     value: 'January',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'February',
  //     text: 'February',
  //     value: 'February',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'March',
  //     text: 'March',
  //     value: 'March',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'April',
  //     text: 'April',
  //     value: 'April',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'May',
  //     text: 'May',
  //     value: 'May',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'June',
  //     text: 'June',
  //     value: 'June',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'July',
  //     text: 'July',
  //     value: 'July',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'August',
  //     text: 'August',
  //     value: 'August',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'September',
  //     text: 'September',
  //     value: 'September',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'October',
  //     text: 'October',
  //     value: 'October',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'November',
  //     text: 'November',
  //     value: 'November',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: 'December',
  //     text: 'December',
  //     value: 'December',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  // ]

  
  const yearFilter = []

  for(let i=0; i<=5; i++){
    let obj = {
      key: year - i,
      text: year - i,
      value: year - i,
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    }
    yearFilter.push(obj)
  }
  // const yearFilter = [
  //   {
  //     key: '2020',
  //     text: '2020',
  //     value: '2020',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2019',
  //     text: '2019',
  //     value: '2019',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2018',
  //     text: '2018',
  //     value: '2018',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2017',
  //     text: '2017',
  //     value: '2017',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2016',
  //     text: '2016',
  //     value: '2016',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2015',
  //     text: '2015',
  //     value: '2015',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  //   {
  //     key: '2014',
  //     text: '2014',
  //     value: '2014',
  //     image: { avatar: true, src: '../public/assets/images/right.svg' },
  //   },
  // ]

  const statusFilter = [
    {
      key: '1',
      text: 'All',
      value: 'All',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: '2',
      text: 'Approved',
      value: 'A',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: '3',
      text: 'Confirmed',
      value: 'C',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: '4',
      text: 'Desk Con.',
      value: 'D',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: '5',
      text: 'Rejected',
      value: 'R',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
    {
      key: '6',
      text: 'Hold',
      value: 'H',
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    },
  ]

  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "< Prev",
    next: "Next >",
    show: "Show",
    entries: "items/page",
    filterPlaceholder: "Search Anything",
    noResults: "There is no data to be displayed"
  };

  return (
    <div className="dcr-list-sec">
      <div className={isFull ? "fullscreenView" : ""}>
        <div className="dcr-head">
          <div>
            <h5 className="dcr-list-sec-head">RPS Approval & Confirmation List</h5>
          </div>
          <div className="dcr-head-options">
            {isFull ? (
              <img
                src="../public/assets/images/collapse-grey.svg"
                className="fullscreen_img"
                alt="fullscreen_img"
                onClick={handleViewChange}
              />
            ) : (
                <img
                  src="../public/assets/images/fullscreen.svg"
                  className="fullscreen_img"
                  alt="fullscreen_img"
                  onClick={handleViewChange}
                />
              )}
            <button
              onClick={handleToggleChange}
              className="hide-tablehead-btn"
            >
              {show ? "Hide" : "Show"}{" "}
              <span className="hide-mobile">Table Header</span>
            </button>
          </div>
        </div>
        {!body ?
          <div className="">
          <DashLoader></DashLoader></div>
          :
        <RPSRequestListTable
          tableHeader={header}
          tableBody={body}
          keyName="RPSRequestListTable"
          tableClass="striped hover table-responsive"
          rowsPerPage={10}
          rowsPerPageOption={[10, 20, 50, 100, 200]}
          initialSort={{ prop: "username", isAscending: true, }}
          labels={customLabels}
          show={show}
          month={month}
          getMonth={getMonth}
          year={year}
          status={status}
          getYear={getYear}
          statusFilter={statusFilter}
          monthFilter={monthFilter}
          yearFilter={yearFilter}
          getStatus={getStatus}
          managerLevel='C'
        />}
        <Loader show={showLoader} />
      </div>
    </div>
  )

}

export default withRouter(RPSConfirmList)