import React, { useEffect,useState } from "react";
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'
//const re = /^[0-9]*$/;
import ConfirmationBox from '../../lib/ConfirmationBox'

const RPSEstimatedAmt=(props)=>{
    const {itemCode,rpsAmountData,advAmount,editJson,srNo,apprid,stagAmount,nAmtFlag} = props
    const [estimatedAMount,getEstimatedAmount] = useState('')
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidMsg] = useState('')
    const[advanceAmt,setAdvMount] = useState('')
    const [confirmPopup,setConfirmPoup] = useState(false)
    const [cnfMsg,setConfmMsg] = useState('')
    //const [amt,setAmount]= useState()
    useEffect(()=>{ 
        if(editJson){
            let m=[]
            let amt = ''
            let invCode
          //  rpsAmountData.filter(x => x.c_invcode == itemCode).map((a)=>m.push(a))
           // getEstimatedAmount(m[0].n_amount)
        //    rpsAmountData.map((item)=>{
        //         amt = item.n_amount;
        //         invCode = item.c_invcode;
        getEstimatedAmount(editJson['estamt'])
      //  props.getEstAmount(editJson['advamt'],editJson['estamt'],editJson['code'])
        setAdvMount(editJson['advamt'])
       // console.log("edit11",advanceAmt)
            // getEstimatedAmount(rpsJson['estamt'])
            // props.getEstAmount(item.n_AdvanceAmount,rpsJson['estamt'],rpsJson['code'])
        //    })
        }
       
      },[editJson,itemCode])
     // console.log("edit",advanceAmt)
    const getAmount=()=>{
        const re = /^[0-9\b]+$/;
        let amount= event.target.value;
        if(amount === '' || re.test(amount)){ 
            if(parseFloat(stagAmount) < parseFloat(amount)){
            if(nAmtFlag == 1){
              // getEstimatedAmount('')
              // setValidStatus(true)
               
              // setValidMsg('RPS Amount exceeds staging amount')
              setConfirmPoup(true)
              setConfmMsg('RPS Amount exceeds staging amount ? Do You want to Continue')
               return
            }else{
                getEstimatedAmount(amount)
                props.getEstAmount(advAmount,amount,itemCode)
            }
        }else{
            getEstimatedAmount(amount)
            props.getEstAmount(advAmount,amount,itemCode)
        }
           
        }else{
            getEstimatedAmount('')
             setValidStatus(true)
            setValidMsg('Please Enter Number only')
            return
        }
    }
    const btnResponse=(data)=>{
        if(data == 'yes'){
            setConfirmPoup(false)
            props.getEstAmount(advAmount,estimatedAMount,itemCode)
        }else{
            getEstimatedAmount('')
            setConfirmPoup(false)
        }
    }
    const updateAmount=()=>{
        // if(nAmtFlag == "0"){
            // let m ={}
            // m = datajson
            // m[itemCode] = estimatedAMount
            // setDataObj(m)
            if(estimatedAMount != "" && advAmount ==""){
            // getEstimatedAmount('')
            //  console.log(m,"data")
            //  delete m[itemCode]
            //  setValidStatus(true)
            //  setValidMsg('Please Enter Advance Amount')
            }else{
             props.getEstAmount(advAmount,estimatedAMount,itemCode)
            }
             
         // }else{
         //     if(estimatedAMount > stagAmount){
         //         setValidStatus(true)
         //         setValidMsg('Estimate Amount Can not be greater than staging Amount')
         //         return
         //     }
         // }
         
     }

    return(
        <div>
        <Form.Control type="text" 
            className="customized-input" 
            value={estimatedAMount} 
            onChange={apprid == "0" ? ()=>getAmount():''} 
            placeholder="Enter amount here" 
            onBlur={apprid == "0" ? ()=>updateAmount():''} 
        /> 
        
        <StatusPopup 
            show={validStatus} 
            success={false}
            message={sValidMsg} 
            onClose={()=>setValidStatus(false)} 
        />
        <ConfirmationBox 
            show={confirmPopup}
            msg={cnfMsg}
            btnResponse={btnResponse}
        />
        </div>
    )
}

export default RPSEstimatedAmt