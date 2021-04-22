import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RPSListTable from "./RPSListTable";
import ExpensePopup from "../popup/expensePopup";
import { getRPSList } from "../../actions/RPS/RPSList";
import { withRouter } from 'react-router-dom'
import DashLoader from "../../lib/DashboardLoader";
import Loader from '../../lib/Loader'

const RPSList = (props) => {
  const [isFull, setIsFull] = useState(false);
  const [show, setShow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [header, setHeader] = useState([])
  const [body, setBody] = useState([])
  const [srno, setSrNo] = useState('')
  const [rpsName, setRpsName] = useState('')
  const [fsName, setFsname] = useState('')
  const [rDate, serRpsdate] = useState()
  const [dCode, setDocCode] = useState()
  const [dName, setDocName] = useState('')
  const [rpsAmt, setRpsAmt] = useState()
  const [dGrade, setGrade] = useState('')
  const [expRejBtn,setexpRejBtn] = useState('')
  const [nStatus,setnStatus] = useState('')
  const [showLoader, setshowLoader] = useState(true)

  useEffect(() => {
    setshowLoader(true)  
    var body = {
      "Index": "RequestForProfessionalServiceList",
      "Data": { "month": month.toString(), "year": year.toString() },
    }
    props.getRPSList(body,setloader)

  }, [month, year])

  const getMonth = (value) => {
    setMonth(value)
  }

  const getYear = (value) => {
    setYear(value)
  }
  const redirectEdit=(id,app,status)=>{ 
    props.history.push('/rps-entry/'+id)
    localStorage.setItem("approval",app)
    
    let c_status
    if(status == 'REQUESTED' ){
      c_status = 'S'
    }
    if(status == 'DESK REJECTED' ){
      c_status = 'R'
    }
    if(status == 'APPROVED' ){
      c_status = 'A'
    }
    if(status == 'CONFIRMED' ){
      c_status = 'C'
    }
    if(status == 'DESK CONFIRMED' ){
      c_status = 'D'
    }
    if(status == 'HOLD' ){
      c_status = 'H'
    }
    if(status == ""){
      c_status = ''
    }
//console.log("pin",c_status,status)
    sessionStorage.setItem('currentStatus',c_status)
    // if(status == 'REQUESTED' ){
    //   sessionStorage.setItem("view",'1')
    // }else{
      sessionStorage.setItem("view",'1')
   // }
    
  }


  useEffect(() => {
    let header = []
    let body = []

    if (props.listData) {
      if (props.listData[0]) {
       // if (props.listData[0]["REQ_NO"]) {
          header.push({ prop: "REQ_NO1", title: "Req. No.", filterable: true, sortable: true })
        }
       // if (localStorage.getItem("type") == "1") {
       // }
       // if (localStorage.getItem("type") == "1") {
          //if (props.listData[0]["ExpStatus"]) {
            header.push({ prop: "expStatus", title: "Exp. Entry" })
          //}
//        }

      //  if (props.listData[0]["division"]) {
          header.push({ prop: "division", title: "Division", filterable: true, sortable: true })
      //  }
      //  if (props.listData[0]["FSNAME"]) {
          header.push({ prop: "FSNAME", title: "FS Name", filterable: true, sortable: true })
      //  }
      //  if (props.listData[0]["AMOUNT"]) {
          header.push({ prop: "AMOUNT", title: "RPS Amount (₹)", filterable: true, sortable: true })
      //  }
       // if (props.listData[0]["SETUP"]) {
          header.push({ prop: "SETUP", title: "Setup Name", filterable: true, sortable: true })
       // }
       // if (props.listData[0]["RPS_Name"]) {
          header.push({ prop: "RPS_Name", title: "RPS Name", filterable: true, sortable: true })
       // }
      //  if (props.listData[0]["DOCTORNAME"]) {
          header.push({ prop: "DOCTORNAME", title: "Dr. Name", filterable: true, sortable: true })
       // }
       // if (props.listData[0]["CATEGORY"]) {
          header.push({ prop: "CATEGORY", title: "Dr. Category", filterable: true, sortable: true })
        //}
        // if(props.listData[0]["STATUS"]){
        header.push({ prop: "status1", title: "Status", filterable: true, sortable: true })
        header.push({ prop: "initiatedon", title: "Initiated On", filterable: true, sortable: true })
        header.push({ prop: "accdate", title: "Accountable Date", filterable: true, sortable: true })
        // }
    //  }
      props.listData.map(item => {
        const editReq = <span>{item.STATUS == "REQUESTED" ||  item.STATUS == "" ? 
            <img src="../public/assets/images/edit_icon.svg" className="dcrimg mr-3" 
            onClick={()=>redirectEdit(item["REQ_NO"],'0',item.DESK_STATUS)} />: 
          item.STATUS == "REJECTED" ? 
            <img src="../public/assets/images/eye.svg" className="dcrimg mr-3" />
          :
            <img src="../public/assets/images/eye.svg" className="dcrimg mr-3" 
            onClick={()=>redirectEdit(item["REQ_NO"],'0',item.DESK_STATUS)} />
          }
        {item["REQ_NO"]}</span>

          
          const editReq1 = <span> 
          <img src="../public/assets/images/eye.svg" className="dcrimg mr-3" onClick={()=>redirectEdit(item["REQ_NO"],'1',item.DESK_STATUS)} />
          {item["REQ_NO"]}</span>
        const expenseLink = <span className="expense-link"
          onClick={() => getExpenseModal(item["REQ_NO"],
            item["RPS_Name"],
            item['FSNAME'],
            item['DATE'],
            item['DOCTOCODE'],
            item['DOCTORNAME'],
            item['AMOUNT'],
            item['GRADE'],
            item["ExpStatforlink"],
            item["n_status"])}
        >
          Expense
                            </span>
         const reqested = <span className="reqested-status">Requested</span>
         const deskConfirmed = <span className="confirmed-status">Desk Confirmed</span>
         const approved = <span className="approved-status">Approved</span>
         const rejected = <span className="rejected-status">Rejected</span>
         const confirmed = <span className="confirmed-status">Confirmed</span>
         const hold = <span className="confirmed-status">Hold</span>

         if(item["DESK_STATUS"] == 'DESK CONFIRMED'){
          item["REQ_NO1"] = editReq1
         }else{
            item["REQ_NO1"] = editReq
         }
        
        if((item["DESK_STATUS"] == 'DESK CONFIRMED' && item["advanceamt"] != "0.00") ||  item["ExpStatus"] == "1"){
          item["expStatus"] = expenseLink
        } else {
          item["expStatus"] = ''
        }
        if (item["DESK_STATUS"] == 'REQUESTED') {
          item.status1 = reqested
        }
        if (item["DESK_STATUS"] == 'APPROVED') {
          item.status1 = approved
        }
        if (item["DESK_STATUS"] == 'DESK REJECTED') {
          item.status1 = rejected
        }
        if (item["DESK_STATUS"] == 'CONFIRMED') {
          item.status1 = confirmed
        }
        if (item["DESK_STATUS"] == 'HOLD') {
          item.status1 = hold
        }
        if (item["DESK_STATUS"] == 'DESK CONFIRMED') {
          item.status1 = deskConfirmed
        }

        body.push(item)
      })
    }

    setHeader(header);
    setBody(body)
  }, [props.listData])

  const handleViewChange = () => {
    setIsFull(!isFull);
  }
  const getExpenseModal = (srNO, rpsname, fsName, date, doccode, docname, rpsAmt, dGrade,expRejBtn,nStatus) => {
    setModalShow(true)
    setSrNo(srNO)
    setRpsName(rpsname)
    setFsname(fsName)
    serRpsdate(date)
    setDocCode(doccode)
    setDocName(docname)
    setRpsAmt(rpsAmt)
    setGrade(dGrade)
    setexpRejBtn(expRejBtn)
    setnStatus(nStatus)
  }

  const handleToggleChange = () => {
    setShow(!show)
  }

  const setloader = (f) => {
    setshowLoader(false)
  }
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

  const yearFilter = []

  for (let i = 0; i <= 5; i++) {
    let obj = {
      key: year - i,
      text: year - i,
      value: year - i,
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    }
    yearFilter.push(obj)
  }

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
      
      <div className="sweta">
        <ExpensePopup
          srno={srno}
          rpsName={rpsName}
          fsName={fsName}
          dName={dName}
          dCode={dCode}
          rDate={rDate}
          rpsAmt={rpsAmt}
          dGrade={dGrade}
          expRejBtn ={expRejBtn}
          nStatus = {nStatus}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      <div className={isFull ? "fullscreenView" : ""}>
        <div className="dcr-head">
          <div>
            <h5 className="dcr-list-sec-head">RPS List</h5>
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
          <div>
        {body && header ?
          <RPSListTable
            tableHeader={header}
            tableBody={body}
            keyName="RPSListTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true, }}
            labels={customLabels}
            show={show}
            month={month}
            getMonth={getMonth}
            year={year}
            getYear={getYear}
            monthFilter={monthFilter}
            yearFilter={yearFilter}
            setloader={setloader}
          /> : null}
          </div> }
          <Loader show={showLoader} />
      </div>
    </div>
  )

}

const mapStateToProps = (state) => ({
  listData: state.RPS.data
})

const mapDispatchToProps = (dispatch) => ({
  getRPSList: (data, setloader) => dispatch(getRPSList(data, setloader))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RPSList));
