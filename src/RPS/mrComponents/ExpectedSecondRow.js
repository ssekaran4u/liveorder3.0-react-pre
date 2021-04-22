import React,{useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'

const ExpectedSecondRow =(props) =>{
    const{monthCode,selectedrate,editData,rxItem,itemList,editSelrate,itemCode,apprid} = props
    const[rxval,setRxVal] = useState()
    const [value,setval] = useState()
    const [qtyval,setQty] = useState()
    const [totalv,setTotalVal] = useState()
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidmsg] = useState()

    useEffect(()=>{ 
      //  console.log("rxItem",itemList)
        Object.keys(rxItem).map((item)=>{
            if(monthCode == item){
                let res = rxItem[item].split('|')
                setRxVal(res[0])
                setQty(res[1])
                let rate
                let m = []
                itemList.filter(x => x.value == itemCode).map((a)=>m.push(a))
                m.map((item)=>{ 
                  rate = item.key
                })
                let  total = 0 
                total =  Math.round(parseFloat(rate) * parseInt(res[1]))
               // console.log("selectedrate",selectedrate,total)
               //let y = parseInt(total) + total
                setTotalVal(total)
                props.sendRx(res[0],monthCode)
                props.sendQty(res[1],monthCode,total)
                 //props.sendQty(res[1],monthCode)
            }
        })
        // return
      //  })
      },[itemList,rxItem,itemCode])
    //  console.log("itemList",itemList)
    const handlerx =()=>{
        const re = /^[0-9\b]+$/;
        const a = event.target.value
        if(a === '' || re.test(a)) {
            setRxVal(a)
           // props.sendRx(a,monthCode)
        }else{
            setRxVal('')
            setValidStatus(true)
            setValidmsg('Please Enter Numbers')
        }
       
    }

    const handlevalue =()=>{
        const re = /^[0-9\b]+$/;
        const a = event.target.value
        if(a === '' || re.test(a)) {
            setval(a)
            props.sendVal(a,monthCode)
        }else{
            setval('')
            setValidStatus(true)
            setValidmsg('Please Enter Numbers')
        }
       
    }

    const handleQty =()=>{
        const a = event.target.value
        setQty(a)
        // let t= parseInt(selectedrate) * a
        // setTotalVal(t)
       // props.sendQty(a,monthCode,t)
    }
    const handleAutoQty=(e)=>{
        if(e.keyCode == "9"){
            let t= Math.round(parseFloat(selectedrate) * 1)
            setTotalVal(t)
            setQty("1")
            props.sendQty("1",monthCode,t)
        }else{
            let t= Math.round(parseFloat(selectedrate) * qtyval)
            setTotalVal(t)
           props.sendQty(qtyval,monthCode,t)
        }
    }
    const handleAutoRx=(e)=>{
        if(e.keyCode == "9"){
            setRxVal("1")
            props.sendRx("1",monthCode)
        }else{
            props.sendRx(rxval,monthCode)
        }
    }

    return(
        <div className="rate-qty-sec">
        <Form.Control 
            type="text" 
            className="customized-input"
            onChange={apprid== "1" ? '' :handlerx} 
            placeholder="Rx." 
            onKeyUp={apprid == "1" ? '' :(e)=>handleAutoRx(e)}
            value={rxval}
        />
        <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="Qty" 
            onChange={apprid== "1" ? '' :handleQty}
            onKeyUp={apprid == "1" ? '' :(e)=>handleAutoQty(e)}
            value={qtyval}
        />
        <Form.Control 
            type="text" 
            className="customized-input" 
            placeholder="value" 
            // onChange={handlevalue}
           
            value={totalv}
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

export default ExpectedSecondRow