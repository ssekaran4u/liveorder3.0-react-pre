import React, { useEffect,useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from 'react-datepicker'
import StatusPopup from '../../lib/StatusPopup'

const RPSDetailsDateComp = (props)=>{
     const {rpsAmountData,srNo,prevRpsDFlag,editRpsDFlag} = props
    const [date, setDate] = useState(new Date())
    const [successPop,showSuccess] = useState(false)
    const [sMsg,showMsg] =  useState(false)

    useEffect((item)=>{
        props.getRpsdate(date)
    },[date])
    const dateChanged = (d) => {
        let tdate = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate()
        let m_on = parseInt(new Date().getMonth()+1)
        let tmonth =  m_on > 9 ? m_on : '0'+ m_on
        let currdate = tmonth+'/'+tdate+'/'+new Date().getFullYear();
        let pdate =  d.getDate() > 9 ? d.getDate() : '0'+d.getDate()
        let sMon =parseInt(d.getMonth()+1)
        let pMonth =  sMon > 9 ? sMon : '0'+sMon
        let selecteddate = pMonth+'/'+pdate+"/"+d.getFullYear();
        if(prevRpsDFlag == "1"){
            setDate(d);
            props.getRpsdate(d)
        }else{
            if(selecteddate < currdate){ 
                showSuccess(true)
                showMsg("Please Enter future Date")
              }else{
                  setDate(d);
                  props.getRpsdate(d)
              }
        }
       
       
      }
    useEffect(()=>{
        if(rpsAmountData.length > 0){
            let date = rpsAmountData[0].d_date
            if(date != ""){
                 let rDate = date.split('T')
                 setDate(new Date(rDate[0]))
                props.getRpsdate(new Date(rDate))
            }
        }
       
        //setDate(date)
    },[])
  //  console.log("setupId",srNo)
    return(
        <React.Fragment >
            <InputGroup className="datepickerAligment controls">
            <DatePicker
                selected={ date=="Invalid Date"?null:date}
                onChange={dateChanged}
                placeholderText="Ex: 09/01/19"
                dateFormat="dd/mm/yyyy"
                // readOnly={srNo == "add" ? false : editRpsDFlag == "1" ? false : true}
            />
            <InputGroup.Append>
            <InputGroup.Text>
                <img src="../public/assets/images/calendar.svg" alt="calendar" />
            </InputGroup.Text>
            </InputGroup.Append>
            </InputGroup>
        <StatusPopup 
        show={successPop} 
        success={false}
        message={sMsg} 
        onClose={()=>showSuccess(false)} 
        />
    </React.Fragment>
    )
}
export default RPSDetailsDateComp