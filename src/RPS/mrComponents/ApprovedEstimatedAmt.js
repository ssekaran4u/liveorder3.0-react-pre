import React, { useEffect,useState } from "react";
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'
//const re = /^[0-9]*$/;

const ApprovedEstimatedAmt =(props)=>{
    const {itemCode,rpsAmountData,advAmount,editJson,srNo,apprid,confirmAmtEdit,nextConfirm,status} = props
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
           if(nextConfirm == "C" ){
                getEstimatedAmount(m[0]['n_approveramt'])
            }else{
                getEstimatedAmount(editJson['estamt'])
                props.getApprEstAmount('',editJson['estamt'],itemCode)
            }
            
     
        }
       
      },[rpsAmountData,editJson])
    
    const getAmount=()=>{
        const re = /^[0-9\b]+$/;
        let amount= event.target.value
        if(amount === '' || re.test(amount)){
            getEstimatedAmount(amount)
            props.getApprEstAmount(advAmount,amount,itemCode)
        }else{
            getEstimatedAmount('')
             setValidStatus(true)
            setValidMsg('Please Enter Number only')
            return
        }
    }
console.log("sweta",confirmAmtEdit,nextConfirm)
    return(
        <div>
        <Form.Control type="text" 
            className="customized-input" 
            value={estimatedAMount} 
            onChange={confirmAmtEdit == "1"  || nextConfirm == "C" || status == "H" || status == "A" || status == "C" || status == "D" ? '' : ()=>getAmount()} 
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

export default ApprovedEstimatedAmt