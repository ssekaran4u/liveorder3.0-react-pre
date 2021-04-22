import React,{useEffect,useState} from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from 'react-datepicker'
import AddAccntDate from '../popup/AddAccntDate';

const AccountableDate=(props)=>{
    const [date, setDate] = useState(new Date())
    const [datemodal,setShow] = useState(false)
    const [accDate,setADate] = useState('')

    const dateChanged = (d) => {
        // let tdate = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate()
        // let m_on = parseInt(new Date().getMonth()+1)
        // let tmonth =  m_on > 9 ? m_on : '0'+ m_on
        // let currdate = tmonth+'/'+tdate+'/'+new Date().getFullYear();
        // let pdate =  d.getDate() > 9 ? d.getDate() : '0'+d.getDate()
        // let sMon =parseInt(d.getMonth()+1)
        // let pMonth =  sMon > 9 ? sMon : '0'+sMon
        // let selecteddate = pMonth+'/'+pdate+"/"+d.getFullYear();
        setDate(d)
        let tdate = d.getDate() > 9 ? d.getDate() : '0'+d.getDate()
        let m_on = parseInt(d.getMonth()+1)
        let tmonth =  m_on > 9 ? m_on : '0'+ m_on
        let currdate = tdate+'/'+tmonth+'/'+d.getFullYear();
        //console.log("month",m_on)
       props.sendAccountDate(currdate)
      }
      const selectDate=()=>{
        setShow(true)
      }
      const AccDate=(d)=>{
        let d_date = d.getDate() > 9 ? d.getDate() : '0'+parseInt(d.getDate())
        let mon = parseInt(d.getMonth()+1) > 9 ? parseInt(d.getMonth()+1) : '0'+parseInt(d.getMonth()+1)
       // console.log("ff",mon)
        let currDate = d_date+'/'+mon+'/'+d.getFullYear()
        // let req_No = reqNo.toString()
        // let s = status.toString()
         let date 
        //  if(this.state.deskDate == ''){
        //   date = currDate.toString()
        //  }else{
        //   date = d.toString()
        //  }
        setShow(false)
        props.AccDate(currDate)
        setADate(currDate)
      }
      const handleClose=()=>{
        setShow(false)
      }
    return(
        <React.Fragment>
            {accDate == "" ? 
        <div className="rpsAccountDate hcursur" style={{"color":"#1b84e7"}} onClick={()=>selectDate()}>
         
            Add Date
        </div> : accDate}
        <AddAccntDate 
                reqno={props.srno}
                 show={datemodal} 
                 AccDate={(d)=>AccDate(d)} 
                 closeModal={()=>handleClose()} 
                //  showSuccess={this.showSuccess}
                />
        </React.Fragment>
    )
}

export default AccountableDate