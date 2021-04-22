import React, { useEffect,useState } from "react";
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'
//const re = /^[0-9]*$/;

const DeskConfimEstimatedAmt =(props)=>{
    const {itemCode,rpsAmountData,advAmount,editJson,srNo,apprid,AmtEditable,nextConfirm,status,requesterFlag} = props
    const [estimatedAMount,getEstimatedAmount] = useState('')
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidMsg] = useState('')
    const[advanceAmt,setAdvMount] = useState('')
    
    useEffect(()=>{ 
        if(rpsAmountData){
            let m=[]
            let amt = ''
            let invCode
            rpsAmountData.filter(x => x.c_invcode == itemCode).map((a)=>m.push(a))
           // console.log("sweta11",m)
           nextConfirm == "D" ?
                getEstimatedAmount(m[0]['n_confirmeramt'])
            :
                getEstimatedAmount(editJson['estamt'])
              props.getDeskConfirmEstAmount('',editJson['estamt'],itemCode)
        }
       
      },[rpsAmountData,editJson])
    
    const getAmount=()=>{
        const re = /^[0-9\b]+$/;
        let amount= event.target.value
        if(amount === '' || re.test(amount)){
            getEstimatedAmount(amount)
          
            props.getDeskConfirmEstAmount(advAmount,amount,itemCode)
        }else{
            getEstimatedAmount('')
             setValidStatus(true)
            setValidMsg('Please Enter Number only')
            return
        }
    }
//console.log("chauhan",status)
    return(
        <div>
        <Form.Control type="text" 
            className="customized-input" 
            value={estimatedAMount} 
            onChange={AmtEditable == "1" ||  status == "D" || status == "H" || status == "A" || status == "C" ? '' : ()=>getAmount()} 
            placeholder="Enter amount here" 
            maxLength="10"
        /> 
        
        <StatusPopup 
        show={validStatus} 
        success={false}
        message={sValidMsg} 
        onClose={()=>setValidStatus(false)} 
        />
        </div>
    )
}

export default DeskConfimEstimatedAmt