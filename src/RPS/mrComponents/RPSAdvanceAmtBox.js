import React, { useEffect,useState } from "react";
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'

const RPSAdvanceAmtBox=(props)=>{
    const {itemCode,rpsAmountData,estimateAmt,editJson,srNo,apprid,rpsJson} = props
    const [advanceAmount,getAdvAmount] = useState()
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidMsg] = useState('')
    const [editEst,setFlag] = useState(false)
    const [estAmt,setEstMount] = useState('')
    //const [rpsJsonList,setRpsJson] = useState({})
   
    useEffect(()=>{
        if(editJson){
            let m=[]
            let amt =''
         //   rpsAmountData.filter(x => x.c_invcode == itemCode).map((a)=>m.push(a))
            // getAdvAmount(m[0].n_amount)
            // setFlag(true)
            // rpsAmountData.map((item)=>{
            //      amt = item.n_AdvanceAmount
            //      getAdvAmount(amt)
            //      props.getAdvAmount(item.n_amount,amt,itemCode)
            // })
            getAdvAmount(editJson['advamt'])
           // props.getAdvAmount(editJson['estamt'],editJson['advamt'],editJson['code'])
            setEstMount(editJson['estamt'])
            
        }
       
    },[])
    //console.log("sweta",estAmt)
    const getAdvanceAmount=()=>{
       
        const re = /^[0-9\b]+$/;
        let amount= event.target.value; 
        // getAdvAmount(amount)
      //  if(editEst == false){
            if(amount === '' || re.test(amount)) {
                getAdvAmount(amount)
                setFlag(true)
                // let m ={}
                // m = rpsJsonList
                // m[itemCode] = amount
                // setRpsJson(m)
                props.getAdvAmount(estimateAmt,amount,itemCode)
            }else{
                getAdvAmount('')
                setValidStatus(true)
                setValidMsg('Please Enter Number only')
                return
              }
          
      //  }
        // else{
        //     if( re.test(amount)) {
        //         getAdvAmount(amount)
        //         // setFlag(true)
        //         props.getAdvAmount("adv"+amount,amount,itemCode)
        //     }
        // }
        
    }
    const updateInput=(rpsJson)=>{ 
        var adv = parseFloat(advanceAmount).toFixed(2)
        
        if(srNo == "add"){ 
            Object.keys(rpsJson).map((item)=>{
                if(rpsJson[item]['code'] == itemCode){
                    if(rpsJson[item]['estamt'] != advanceAmount && advanceAmount != "0"){
                        getAdvAmount('')
                        setValidStatus(true)
                        setValidMsg('Advance Amount Should be same as Estimated Amount')
                    }
                }
            })
        }else{
            if(parseInt(editJson['estamt']) != advanceAmount && adv != "0.00"){
                getAdvAmount('')
                setValidStatus(true)
                setValidMsg('Advance Amount Should be same as Estimated Amount')
            }
        }
    
    }
    

    return(
        <div>
            <Form.Control type="text"
                className="customized-input" 
                placeholder="Enter amount here" 
                value={advanceAmount} 
                // onChange={()=>getAdvanceAmount()}
                onChange={apprid == "0" ? ()=>getAdvanceAmount() :''}
                onBlur={apprid == "0" ? ()=>updateInput(rpsJson) :'' }
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

export default RPSAdvanceAmtBox