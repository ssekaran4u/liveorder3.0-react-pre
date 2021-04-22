import React,{useEffect,useState} from 'react'
// import Dropdown from '../../BasicComponet/DropDown'
import Form from "react-bootstrap/Form";
import ExpectedRowComp from '../mrComponents/ExpectedRowComp'
import ExpectedSingleValComp from '../mrComponents/ExpectedSingleValComp'
import ExpectedSecondRow from '../mrComponents/ExpectedSecondRow'
import StatusPopup from '../../lib/StatusPopup'
import Drop from '../../BasicComponet/DropDown'

const AddRowItem=(props)=>{  
    const {itemList,rows,expectedBuss,idx,selcetdCodeval,srNo,editOneRx,editOneQty,editData,singleRx,itemCode,rxItem,apprid} = props
    const [selctedItem,setSlectedItem] = useState()
    const [selectedrate,setrate] = useState()
    const [currqty,setCurrQty] = useState()
    const [itemval,setTVal] = useState()
    const [getCurrVal,setCurrValue] = useState()
    const [getOneQty,setQty_one] = useState()
    const [getCurrRxval,setCurrRxVal] = useState()
    const [getCurrSecRx,setCurrSecRx] = useState()
    const [getCurrSecQty,setCurrSecQty] = useState()
    const [expQtyJson,setExpOneQty] = useState({})
    const [validStatus,setValidStatus] = useState(false)
    const [sValidMsg,setValidmsg] = useState()
    const[resultSet,setResult] = useState([])
    const[totalLoop,setTotalLop] = useState({})
    const [editSelrate,setEditSelRate] = useState({})
    const [singleRowTotal,setSingleTotal] = useState()
    const [singleRowJson,setSingleRowSet] = useState({})
    const [totalval,setItemTotal] = useState('0')
    const [mjson,setMJson] = useState({})
    const [filterList,setFilterItem] = useState([])
    //const [editOneData,sendEditjsonData] = useState({})
    const [itemSelvalue,setItemValue] = useState({})
 
    useEffect(()=>{ 
      if(srNo != "add"){
        //SelectedItemCode(Result.data.data[0].c_itemcode)
        setSlectedItem(itemCode)
        let m =[]
        let rate
        itemList.filter(x => x.value == itemCode).map((a)=>m.push(a))
        m.map((item)=>{ 
          rate = item.key
        })
        setrate(rate)
        props.selectedItem(itemCode,rate,idx)
        
        itemList.map((item)=>{
          if(item['value'] == itemCode){
          item['disabled'] = true
          }
        })
         
       // if(rxItem[0])
       let res
       if(localStorage.getItem("roi_det") == "0"){ 
        //  console.log("garima",rxItem['c_itemcode'])
        let to = 0
         Object.keys(rxItem).map((val) => { 
           if(val == 'c_itemcode' || val == 0){
            res = rxItem[0].split('|')
            setCurrQty(res[1])
            setCurrRxVal(res[0])
            let itemc 
            if(rxItem[val].indexOf('|')== "-1") {
              itemc = rxItem[val]
            }else{
              itemc =''
            }
            //console.log("chauhan",itemc)
           // setResult(res)
            props.handleCurrOneRx(res[0],'',itemCode)
          //  props.getCurrOneQty(res[1],'',rxItem[val])
           
            props.getCurrOneQty(res[1],'',itemCode)
           }
           if(val != 'c_itemcode' && val != 0){
             // if(rxItem[val] != undefined){
              let a =rxItem[val].split('|')
               to = parseInt(to) + parseInt(a[0])
              //}
           }
         
          // props.handleCurrOneRx('','',itemCode)
         })
         setSingleTotal(to)
        
       }
       if(localStorage.getItem("roi_det") == "1"){
        let to = 0
        let a
        let res
        Object.keys(rxItem).map((val) => {
          if(val == 'c_itemcode' || val == 0){
           res = rxItem[0].split('||')
           setCurrValue(res[1])
          // setCurrRxVal(res[0])
          // setResult(res)
            props.sendCurrValue(res[1],'',itemCode)
          }
          if(val != 'c_itemcode' && val != 0){
         //   console.log("rx",rxItem[val])
             a =rxItem[val].split('||')
             to = parseInt(to) + parseInt(a[1])
             
          }
        //   let p = rxItem[val].split('||')
        //   let m={};
        //   let code = rxItem[val]
        //   if(!m[code]){
        //     m[code] ={}
        //   }
        //   // m = editOneData
        //   // m[code][val] = p[1] 
        //  sendEditjsonData(m)
        //  console.log("fff",code)
        })
       
        setSingleTotal(to)

      }
      if(localStorage.getItem("roi_det") == "2"){
       
        Object.keys(rxItem).map((val) => {
          if(val == 'c_itemcode' || val == 0){
           res = rxItem[0].split('|')
           setCurrSecRx(res[0])
           setCurrSecQty(res[1])
           let tval = parseInt(rate) * parseInt(res[1])
           setTVal(tval)
           props.SendCurrRx(res[0],itemCode,'')
           props.sendCurrQty(res[1],itemCode,tval)
          }else{
            let m={}
            m[itemCode] = rate
            setEditSelRate(m)
          }
          let m ={}
          m =mjson
          if(val != 'c_itemcode' && val != 0){
            //   console.log("rx",rxItem[val])
               let a =rxItem[val].split('|')
               let tval = parseInt(rate) * parseInt(a[1])
               if(!m[itemCode]){
                 m[itemCode] = {}
               }
               m[itemCode][val] = tval
               setItemTotal(tval)
               setMJson(m)
               let total = 0
               Object.keys(m).map((ut)=>{
                 if(ut == itemCode){
                   Object.keys(m[ut]).map((pt)=>{
                     total = parseInt(total) + parseInt(m[ut][pt])
                   })
                 }
               })
              // console.log("kk",total)
               setSingleTotal(total)
             
          }
       
        })
       
      }

      
      }
     
    },[itemList,selcetdCodeval,editOneRx,editOneQty,editData,expectedBuss,singleRx,rxItem])
    const selectItems=(value,itemlist,filterlist,idx,rows)=>{
      // console.log("value",value)
      //  if(value == selctedItem){}
     
        let m =[]
        let filterItem =[]

        let a
        itemList.filter(x => x.value == value).map((a)=>m.push(a))
        if(filterlist.length == 0){
          itemList.filter(x => x.value != value).map((a)=>filterItem.push(a))
        }else{
          filterlist.filter(x => x.value != value).map((a)=>filterItem.push(a))
         
           //a = filterItem.includes(value)
        }
        // itemlist.map((item)=>{
        //   if(item.value == value){
        //    a = itemlist.indexOf(value)
        //   }
          
        // })
        // itemList.slice()
        let t ={}
        t = itemSelvalue
        t[idx] = value
        setItemValue(t)
        //console.log("swetaitem",t)
        // if(value == "-1"){
        //   //m[0]['disabled'] = false
        //    itemList.filter(x => x.value == selctedItem).map((a)=>m.push(a))
        //    console.log("jj",m)
        //    m[1][disabled] =  false
        // }else{
        //   m[0]['disabled'] = true
        // }
        // Object.keys(t).map((item)=>{
        //   if(t[item] == "-1"){

        //   }
        // })
       
        // console.log("disable",m)
        let rate
        let code
        m.map((item)=>{ 
          rate = item.key
          // code = item.key
        })
        setFilterItem(filterItem)
        setSlectedItem(value)
        setrate(rate)
        props.selectedItem(value,rate,idx,t,itemlist)
       // props.SelectedItemList(filterItem)
      }
     
    const handleCurrRx=()=>{
      const re = /^[0-9\b]+$/;
      const rxcount = event.target.value
      if(rxcount === '' || re.test(rxcount)) {
        // if(rxcount.length > 10){
        //   // setCurrRxVal('')
        //   setValidStatus(true)
        //   setValidmsg('Please Enter 10 Digits only')
        // }else{
          setCurrRxVal(rxcount)
      //  }
        
        
      }else{
        setCurrRxVal('')
        setValidStatus(true)
        setValidmsg('Please Enter Numbers')
      }
      
    }
    const handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...rows];
        rows[idx] = {
          [name]: value
        };
       props.handleChange(rows)
        
    };
    
    const handleDelete=(idx,selecteditem,itemList,r_ows)=>{  
        // const rows = [...r_ows]
        // const index = r_ows.indexOf(idx);
        // if (index > -1) {
        
         // r_ows.splice(idx, 1);
        // }
       //rows.splice(idx,-1)
      // let id = parseInt(idx)+1
        
        let m =[]
        itemList.filter(x => x.value == selecteditem).map((a)=>m.push(a))
        if(selecteditem){
          m[0]['disabled'] = false
        }
       

        props.handleDelete(rows,idx,selecteditem,itemList)
    }
    const handleCurrQty=()=>{
      const re = /^[0-9\b]+$/;
      const q = event.target.value
      if(q === '' || re.test(q)) {
        // if(q.length >10){
        //   // setCurrQty('')
        //   setValidStatus(true)
        //   setValidmsg('Please Enter 10 Digits only')
        // }else{
          setCurrQty(q)
      //  }
        
       // props.getCurrOneQty(q)
      }else{
        setCurrQty('')
        setValidStatus(true)
        setValidmsg('Please Enter Numbers')
      }
     
    }
    const handleCurrValue=()=>{
      const re = /^[0-9\b]+$/;
      const q = event.target.value
      if(q === '' || re.test(q)) {
        setCurrValue(q)
      //  props.sendCurrValue(q)
      }else{
        setCurrValue('')
        setValidStatus(true)
        setValidmsg('Please Enter Numbers')
      }
     
    }
    const handleQty=()=>{
      const q = event.target.value
      setQty_one(q)
     // props.sendValue(q)
    }
   
   
    const getExpOneQty=(val,month)=>{
    
      props.getExpOneQty(val,month,idx,selctedItem)
    }
    const getExpOneRx=(val,month)=>{
      let p ={}
      p = singleRowJson
      if(!p[selctedItem])
      {
        p[selctedItem]= {}
      }
      p[selctedItem][month] =  val
      setSingleRowSet(p)
      let total = 0
      Object.keys(p).map((item)=>{
        Object.keys(p[item]).map((nitem)=>{
          total = parseInt(total) + parseInt(p[item][nitem])
        })
       
      })
      setSingleTotal(total)
      props.getExpOneRx(val,month,idx,selctedItem)
    }

    const getExpMonthlyval=(val,month)=>{ 
      let p ={}
      p = singleRowJson
      if(!p[selctedItem])
      {
        p[selctedItem]= {}
      }
      p[selctedItem][month] =  val
      setSingleRowSet(p)
      let total = 0
      Object.keys(p).map((item)=>{
        Object.keys(p[item]).map((nitem)=>{
          total = parseInt(total) + parseInt(p[item][nitem])
        })
       
      })
      setSingleTotal(total)
      props.sendExpMonthlyvalue(val,month,idx,selctedItem)
    }
   
   
    /*---third current vales-*/
    const handleSecQty=()=>{
      const re = /^[0-9\b]+$/;
      const q = event.target.value
      if(q === '' || re.test(q)) {
        setCurrSecQty(q)
        let v = parseFloat(selectedrate) * q
        setTVal(v)
       
     //   props.sendCurrQty(q,v)
      }else{
        setCurrSecQty('')
        setValidStatus(true)
        setValidmsg('Please Enter Numbers')
      }
     
    }
    const handleCurrSecrx=()=>{
      const re = /^[0-9\b]+$/;
      const q = event.target.value
      if(q === '' || re.test(q)) {
        setCurrSecRx(q)
       // props.SendCurrRx(q)
      }else{
        setCurrSecRx('')
        setValidStatus(true)
        setValidmsg('Please Enter Numbers')
      }
     
      
    }
/*------third expected vales------*/
    const sendRx=(val,month)=>{
      const q = event.target.value
      props.sendRx(val,month,selctedItem)
    }
    const sendQty=(val,month,tval,njson)=>{ 
      const q = event.target.value
      let p ={}
      p = singleRowJson
      if(!p[selctedItem])
      {
        p[selctedItem]= {}
      }
      p[selctedItem][month] =  tval
      setSingleRowSet(p)
      let total = 0
      Object.keys(p).map((item)=>{
        Object.keys(p[item]).map((nitem)=>{
          total = parseInt(total) + parseInt(p[item][nitem])
        })
       
      })
      setSingleTotal(total)
      props.sendQty(val,month,tval,selctedItem,njson)
    }
    const sendVal=(val)=>{
      const q = event.target.value
      props.sendval(val,month)
    }

 
    const updateRx=(e)=>{
      if(e.keyCode == "9"){
        setCurrRxVal("1")
        props.handleCurrOneRx("1",idx,selctedItem)
      }else{
        props.handleCurrOneRx(getCurrRxval,idx,selctedItem)
      }
     
    }
    const updateSecRx=(e)=>{ 
      if(e.keyCode == "9"){
        setCurrValue("1")
        props.sendCurrValue("1",idx,selctedItem)
      }else{
        props.sendCurrValue(getCurrVal,idx,selctedItem)
      }
    }
    const updateThrRx=(e)=>{
      if(e.keyCode == "9"){
        setCurrSecRx("1")
        props.SendCurrRx("1",selctedItem,idx)
      }else{
        props.SendCurrRx(getCurrSecRx,selctedItem,idx)
      }
    }
    const updateThrQty=(e)=>{
      if(e.keyCode == "9"){
        setCurrSecQty("1")
        let itemval = parseFloat(selectedrate) * 1
        setTVal(itemval)
        props.sendCurrQty("1",selctedItem,itemval)
      }else{
        props.sendCurrQty(getCurrSecQty,selctedItem,itemval)
      }
    }
    const updateOneInput =(e)=>{
      if(e.keyCode == "9"){
      setCurrQty("1")
      props.getCurrOneQty("1",idx,selctedItem)
      }else{
        props.getCurrOneQty(currqty,idx,selctedItem)
      }
      
    }

    return(
        <tr className="tbody-tr-default">
                <td className="tbody-td-default">{selctedItem}</td>
                  <td className="tbody-td-default">
                    {/* <div className="singledropdown dcrStay rps-item-details">
                     
                       <Dropdown   
                          name={"from"} 
                          Type={1}     
                          Selected={selctedItem}
                          selectedProduct={(value)=>selectItems(value,itemList)} 
                          data={itemList} 
                          onClick={()=>expandArea()}
                      />
                      
                    </div> */}
                    <div className="dcrStay rps-item-details">
                     <Drop name={"from"} 
                     Type={1} 
                     Selected={selctedItem} 
                     selectedProduct={(value)=>selectItems(value,itemList,filterList,idx,rows)} 
                     data={itemList} 
                     />
                     </div>
                  </td>
                  <td className="tbody-td-default">{selectedrate}</td>
                  <td className="tbody-td-default">
                    {localStorage.getItem("roi_det") == "0" ?
                    <div className="rate-qty-sec">
                      <Form.Control 
                        type="text" 
                        className="customized-input" 
                        onChange={apprid == "1" ? '' :handleCurrRx} 
                        placeholder="Rx." 
                        maxLength={10}
                        value={getCurrRxval}
                       // onClick={handleRxClick}
                        onKeyUp={apprid == "1" ? '' :(e)=>updateRx(e)}
                      />
                      <Form.Control 
                        type="text" 
                        className="customized-input" 
                        placeholder="Qty" 
                        onChange={apprid == "1" ? '' :handleCurrQty} 
                        value={currqty}
                        maxLength={10}
                        // onClick={handleQtyClick}
                        onKeyUp={apprid == "1" ? '' :(e)=>updateOneInput(e)}
                      />
                    </div>:
                    localStorage.getItem("roi_det") == "1" ?
                    <div className="rate-qty-sec">
                      <Form.Control 
                        type="text"
                        className="customized-input" 
                        value={getCurrVal}
                        maxLength={10}
                        onChange={apprid == "1" ? '' :handleCurrValue} 
                        placeholder="value" 
                        // onClick={handleTwoRxClick}
                        onKeyUp={apprid == "1" ? '' :(e)=>updateSecRx(e)}
                      />
                    </div>:
                    <div className="rate-qty-sec">
                    <Form.Control 
                      type="text" 
                      className="customized-input"
                      onChange={apprid == "1" ? '' :handleCurrSecrx} 
                      placeholder="Rx." 
                      maxLength={10}
                      value={getCurrSecRx}
                      // onClick={handleThirdRxClick}
                      onKeyUp={apprid == "1" ? '' :(e)=>updateThrRx(e)}
                    />
                    <Form.Control 
                      type="text" 
                      className="customized-input" 
                      placeholder="Qty"
                      maxLength={10}
                      value={getCurrSecQty} 
                      // onClick={handleThirdQtyClick}
                      onChange={apprid == "1" ? '' :handleSecQty}
                      onKeyUp={apprid == "1" ? '' :(e)=>updateThrQty(e)}
                    />
                    <Form.Control 
                      type="text" 
                      className="customized-input" 
                      placeholder="value" 
                      value={itemval} 
                      
                    />
                  </div>}
                  </td>
                  
                  {expectedBuss.map((item)=>(
                    <td className="tbody-td-default">
                      {localStorage.getItem("roi_det") == "0" ?
                      <ExpectedRowComp 
                        getExpOneQty={getExpOneQty}
                        getExpOneRx={getExpOneRx}
                        monthCode={item.id}
                        monthVal={item.val}
                        editData={editData}
                        rxItem={rxItem}
                        apprid={apprid}
                      />
                     :
                     localStorage.getItem("roi_det") == "1" ?
                     
                     <div className="rate-qty-sec">
                        <ExpectedSingleValComp 
                          getExpMonthlyval={getExpMonthlyval}
                          monthCode={item.id}
                          monthVal={item.val}
                          editData={editData}
                          rxItem={rxItem}
                          apprid={apprid}
                        />
                       
                     </div>:
                        <ExpectedSecondRow 
                          sendVal={sendVal}
                          sendQty={sendQty}
                          sendRx={sendRx}
                          monthCode={item.id}
                          monthVal={item.val}
                          selectedrate={selectedrate}
                          editData={editData}
                          rxItem={rxItem}
                          itemList={itemList}
                          editSelrate={editSelrate}
                          itemCode={itemCode}
                          apprid={apprid}
                        //  sendTotalValueJson={sendTotalValueJson}
                        />
                      }
                    </td>
                  ))}
                  {localStorage.getItem("roi_value") == "1" ?
                    <td>{singleRowTotal}</td>:''}
                  {apprid == "0" ? 
                  <td>{idx == 0 ? ' ' :<img src="../public/assets/images/delete.svg" alt="delete" onClick={()=>handleDelete(idx,selctedItem,itemList,rows)} />}</td>
                  :''}
                 <StatusPopup 
                  show={validStatus} 
                  success={false}
                  message={sValidMsg} 
                  onClose={()=>setValidStatus(false)} 
                />
                </tr>
    )
}

export default AddRowItem