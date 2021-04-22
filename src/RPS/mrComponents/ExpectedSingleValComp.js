import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import StatusPopup from '../../lib/StatusPopup'

const ExpectedSingleValComp = (props) => {
    const { monthCode, editData, rxItem } = props
    const [expvalue, setValue] = useState()
    const [validStatus, setValidStatus] = useState(false)
    const [sValidMsg, setValidmsg] = useState()

    useEffect(() => {
        //console.log("rxItem",rxItem)
        Object.keys(rxItem).map((item) => {
            if (monthCode == item) {
                let res = rxItem[item].split('||')
                setValue(res[1])
                //   setExpOneQty(res[1])
                //  props.setValue(res[0],monthCode)
                // props.getExpOneQty(res[1],monthCode)
                props.getExpMonthlyval(res[1], monthCode)
            }
        })
        return
        //  })
       
    }, [rxItem])

    const handlerx = () => {
        const re = /^[0-9\b]+$/;
        const a = event.target.value
        if (a === '' || re.test(a)) {
            setValue(a)
            //  props.getExpMonthlyval(a,monthCode)
        } else {
            setValue('')
            setValidStatus(true)
            setValidmsg('Please Enter Numbers')
        }

    }
    const handleBlurRx = () => {
        props.getExpMonthlyval(expvalue, monthCode)
    }
    const handleAutoRx = (e) => {
        //setValue("1")
        if(e.keyCode == "9"){
            setValue("1")
            props.getExpMonthlyval("1",monthCode)
        }else{
            props.getExpMonthlyval(expvalue,monthCode)
        }
    }

    return (
        <div>
            <Form.Control
                type="text"
                className="customized-input"
                onChange={handlerx}
                placeholder="Value"
                maxLength={10}
                value={expvalue}
                // onClick={handleAutoRx}
                // onBlur={handleBlurRx}
                onKeyUp={(e)=>handleAutoRx(e)}
            />
            <StatusPopup
                show={validStatus}
                success={false}
                message={sValidMsg}
                onClose={() => setValidStatus(false)}
            />
        </div>
    )
}

export default ExpectedSingleValComp