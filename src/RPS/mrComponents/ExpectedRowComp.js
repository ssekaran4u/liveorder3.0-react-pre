import React,{useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'

const ExpectedRowComp =(props)=>{
    const {monthCode,editData,rxItem,apprid} = props
    const [expOneRx,setExpOneRx] = useState()
    const [expOneQty,setExpOneQty] = useState()
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidmsg] = useState()

    useEffect(()=>{ 
       // console.log("rxItem",rxItem)
        Object.keys(rxItem).map((item)=>{
            if(monthCode == item){
                let res = rxItem[item].split('|');
                setExpOneRx(res[0])
                setExpOneQty(res[1])
                props.getExpOneRx(res[0],monthCode)
                props.getExpOneQty(res[1],monthCode)
            }
        })
         return
      //  })
      },[rxItem])

    const handleExpOneRx=()=>{
        const re = /^[0-9\b]+$/;
        const q = event.target.value
        if(q === '' || re.test(q)) {
            // if(q.length > 10){
            //     // setExpOneRx('')
            //     setValidStatus(true)
            //     setValidmsg('Please Enter 10 Digits Only')
            // }else{
                setExpOneRx(q)
               // props.getExpOneRx(q,monthCode)
           // }
           
        }else{
            // setExpOneRx('')
            setValidStatus(true)
            setValidmsg('Please Enter Numbers')
        }
        
    }
    const handleExOneQty=()=>{
        const re = /^[0-9\b]+$/;
        const q = event.target.value
        if(q === '' || re.test(q)) {
            // if(q.length > 10){
            //     setExpOneQty('')
            //     setValidStatus(true)
            //     setValidmsg('Please Enter 10 Digits Only')
            // }else{
                setExpOneQty(q)
              //  props.getExpOneQty(q,monthCode)
           // }
            
        }else{
            setExpOneQty('')
            setValidStatus(true)
            setValidmsg('Please Enter Numbers')
        }
        
    }
    const updateExQty=(e)=>{
        if(e.keyCode == "9"){
            setExpOneQty("1")
            props.getExpOneQty("1",monthCode)
        }else{
            props.getExpOneQty(expOneQty,monthCode)
        }
       
    }
    const updateExRx=(e)=>{
        if(e.keyCode == "9"){
            setExpOneRx("1")
            props.getExpOneRx("1",monthCode)
        }else{
            props.getExpOneRx(expOneRx,monthCode)
        }
        
    }

    return(
        <div className="rate-qty-sec">
        <Form.Control 
          type="text" 
          className="customized-input" 
          placeholder="Rx." 
          maxLength={10}
        //   onClick={handleRxClick}
          onChange={apprid == "1" ? '' :handleExpOneRx}
          value={expOneRx}
          onKeyUp={apprid == "1" ? '' :(e)=>updateExRx(e)}
        />
        <Form.Control 
          type="text" 
          className="customized-input" 
          placeholder="Qty" 
          value={expOneQty}
          maxLength={10}
        //   onClick={handleQtyClick}
          onChange={apprid == "1" ? '' :handleExOneQty}
          onKeyUp={apprid == "1" ? '' :(e)=>updateExQty(e)}
        />
         <StatusPopup 
            show={validStatus} 
            success={false}
            message={sValidMsg} 
            onClose={()=>setValidStatus(false)} 
        />
      {/* <img src="../public/assets/images/delete.svg" alt="delete" onClick={()=>handleDelete()} /> */}
    </div>
    )
}

export default ExpectedRowComp