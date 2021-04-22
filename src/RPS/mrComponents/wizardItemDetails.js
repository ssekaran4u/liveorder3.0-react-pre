import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import SuccessPopup from "../popup/successPopup";
import { postToServer, fileUpload } from '../../lib/comm-utils'
import AddRowItem from '../mrComponents/AddRowItem'
import StatusPopup from '../../lib/StatusPopup'
import { withRouter, Redirect } from 'react-router-dom'
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from 'react-datepicker'
import ConfirmationBox from '../../lib/ConfirmationBox'
import axios from 'axios'
import PrevApproverList from '../mrComponents/PrevApproverList'
import TotalColoumn from '../mrComponents/TotalColoumn'
import  {URL_BASE} from '../../lib/constants'
import DashLoader from '../../lib/DashboardLoader'

const re = /^[0-9]*$/;

const WizardItemDetails = (props) => {
  const { handleStepChange, setupId, sMonth, srNo, fsCode, apprid, apprAmtStr, confirmAmtStr, nextConfirm, accountDate, printString, uploadFlag } = props;
  const [selected, setSelected] = useState("Rantac");
  const [modalShow, setModalShow] = React.useState(false);
  const [itemList, getItemList] = useState([])
  const [currentSaleDoc, setCurrSaleDoc] = useState()
  const [expSalesDoc, setExpSalesDoc] = useState()
  const [pateintByDoc, setPatientByDoc] = useState('')
  const [AvgBussMonth, setAvgBussMon] = useState('')
  const [AlliancesWithComp, setAllianceComp] = useState('')
  const [rows, addRows] = useState([{"value":""}])
  const [expectedBuss, setExpectedMonth] = useState([])
  const [selectedItem, setSelectedItem] = useState('')
  const [oneCurrQty, setCurrOneConQty] = useState('')
  const [oneCurrRx, setCurrOneRx] = useState('0')
  const [itemRate, setItemRate] = useState('')
  //const [expOneRx,setExpOneRx] = useState('')
  const [expQtyJson, setExpOneQty] = useState({})
  const [expOneRxJson, setExpOneRx] = useState({})
  const [exptectedOneRx, setExpectedOneRx] = useState('')
  const [itemRowsJson, setItemRow] = useState({})
  const [monthlyQty, setMOnthlyQty] = useState(0)
  const [totalQty, setTotalQty] = useState('0')
  const [expSecMonth, setExpMonthVal] = useState('0')
  const [expSecMonthJson, setExpMonthJson] = useState({})
  const [secItemRowJson, setSecItemRow] = useState({})
  //const [totalQty,setSecTotalExpVal] = useState()
  const [thirdRx, setThirdRx] = useState()
  const [thridQty, setThirdVal] = useState()
  const [thirdVal, setThirdQty] = useState()
  const [expThrRxJson, setExpThrRx] = useState({})
  const [expThrQtyJson, setExpThrQty] = useState({})
  const [expThrvalJson, setExpThrval] = useState({})
  const [thrItemRowJson, setThrItemRow] = useState({})
  const [thrCurrRx, setThrCurrRx] = useState('')
  const [thrCurrQty, setThrCurrQty] = useState()
  const [thrCurrVal, setThrCurrVal] = useState('0')
  const [validStatus, setValidStatus] = useState(false)
  const [sValidMsg, setValidMsg] = useState('')
  const [currSecVal, setCurrSecVal] = useState('0')
  const [successPop, showSuccess] = useState(false)
  const [sMsg, showMsg] = useState(false)
  const [selcetdCodeval, SelectedItemCode] = useState('')
  const [editOneRx, setEditOneCurrRx] = useState('')
  const [editOneQty, setEditOneCurrQty] = useState('')
  const [editData, SelectedEditData] = useState([])
  const [singleRx, setSingleRx] = useState()
  const [allMonJson, setAllMonth] = useState()
  const [rowID, setRowID] = useState({})
  const [setRowVal, setExpEow] = useState({})
  const [expQtyRow, setExpQtyRow] = useState({})
  const [setOneRx, setOneRxVal] = useState('')
  const [oneRowRxJson, setOneRowRx] = useState({})
  const [oneRxDataJson, setOneRxdata] = useState({})
  const [showSuccessFul, setSuccess] = useState(false)
  //const [editJson,setEditJson] = useState({})
  const [resultSet, setResult] = useState([])
  const [totalLoop, setTotalLop] = useState({})
  const [thirdIntval, setThirdIndval] = useState('')
  const [threeRowRx, setThreeRowRx] = useState({})
  const [approve_det, setApprdetails] = useState('')
  const [successMsg, setSuccessMsg] = useState()
  const [imgName, setImgName] = useState([])
  const [noOfRowsrow, setRowValidation] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [date, setDate] = useState()
  const [fileUploaded, setUploadedImg] = useState('')
  const [printArray, setPrintArray] = useState('')
  //const {prevList,setRpsPrevList} = useState([])
  const [previousList, setPrevList] = useState('')
  const [thrRxItemJson, setThrRxval] = useState({})
  const [eThrQtyJson, setERxJson] = useState({})
  const [rxoneValJson, setRxOneVal] = useState({})
  const [newRowtrig,setNewRow] = useState('')
  const [count,setCount] = useState("1")
  const [t_currrx,setTotalCurrRx] = useState('')
  const [t_currQty,setTotalCurrQty] = useState('')
  const [t_exp_rx,setExpTotalRx] = useState('')
  const [t_exp_qty,setExpTotalQty] = useState('0')
  const [rxOneColJson,setOneRxColJson] = useState({})
  const [t_row,setTotalRow] = useState('0')
  const [grpTotal,setGrpTotal] = useState({})
  const [grpQtyTotal,setGrpQtyTotal] = useState({})
   const [valueGrpTotal,setGrp1Total] = useState({})
  const [currQtyItem,setThrQtyVal] = useState({})
  const [t_onecurrrx,setTotal1CurrRx] = useState('')
  const [itemSelvalue,setItemValue] = useState({})
  const [showLoad,setShowLoader] = useState(false)
// console.log("sweta777",Object.keys(noOfRowsrow).length)
  useEffect(() => {
    let data1 = { "Index": "MrPreviousApprovalDetails", "Data": { "srno": srNo, "Desk": "" }, "Token": "" }
    postToServer("Rps", data1).then((Result) => {
      // if(Result.data.Status == "Success"){ 
      // setRpsPrevList(Result.data.data)
      // console.log("chauahn", Result.data.data)
      setPrevList(Result.data.data)
      //  }
    }).catch((Error) => {
      //this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
    if (apprid == "1") {
      let Item = { "Index": "ApprovalnewItemLists", "Data": { "srno": srNo, "childfscode": fsCode, "setupid": setupId }, "Token": "" }
      postToServer("Rps", Item).then((Result) => {
        let m = []
        m.push({
          "key": '-1',
          "text": 'Search & Select',
          "value": '-1',
        })
        if (Result.data.data) {
          Result.data.data.map((p) => {
            var item_code1
            {p.c_code ? item_code1 = p.c_code : item_code1 = p.c_item_code}
            m.push({
              'key': p.rate,
              'text': p.c_name,
              'value': item_code1
            })
          })
        }
        getItemList(m)
      }).catch((Error) => {
      })
    } else {
      let data = { "Index": "newItemLists", "Data": { "childfscode": fsCode, "setupid": setupId }, "Token": "" }
      postToServer("Rps", data).then((Result) => {
        let m = []
        m.push({
          "key": '',
          "text": 'Search & Select',
          "value": '',
        })
        if (Result.data.data) {
          Result.data.data.map((p) => {
            m.push({
              'key': p.rate,
              'text': p.c_name,
              'value': p.c_item_code
            })
          })
        }
        getItemList(m)
      }).catch((Error) => {
      })
    }
    let p_srno = srNo == "add" ? '' : srNo
    if (srNo != "add") {
      let editdata = { "Index": "ItemsdetEdit", "Data": { "srno": p_srno }, "Token": "" }
      postToServer("Rps", editdata).then((Result) => {
        if (Result.data.Status == "Success") {
          setAllianceComp(Result.data.SalesDet[0].c_Alliances)
          setTotalQty(Result.data.SalesDet[0].n_ExpTotal)
          setPatientByDoc(Result.data.SalesDet[0].n_PatientsNo)
          setAvgBussMon(Result.data.SalesDet[0].n_avgBusiness)
          setCurrOneRx(Result.data.SalesDet[0].n_totalsalesDr)
          //  SelectedItemCode(Result.data.data[0].c_itemcode)
          let res = Result.data.data[0]["0"].split('|')
          let res1 = res[0]
          let res2 = res[1]
          setEditOneCurrRx(res1)
          setEditOneCurrQty(res2)
          SelectedEditData(Result.data.data)
          setSingleRx(res[2])
          addRows(Result.data.data)
          // setEditRxVal(res[0])
          // setEditQtyVal(res[1])
          //console.log("swetchhn",Result.data.data)
        }
      }).catch((Error) => {
      })
    }
    let pString = []
    pString = printString.split('^')

    let printOpt
    if (props.curr_stat == "A") {
      printOpt = pString.includes('APP')
    }
    if (props.curr_stat == "C") {
      printOpt = pString.includes('APP')
    }
    if (props.curr_stat == "S") {
      printOpt = pString.includes('ENT')
    }
    if (props.curr_stat == "D") {
      printOpt = pString.includes('DSH')
    }
    if (props.curr_stat == "D") {
      printOpt = pString.includes('DES')
    }
    // console.log("printArray",printOpt,props.curr_stat)
    setPrintArray(printOpt)

    //to get Prev Details



  }, [])

  const CurrSalesDoctor = () => {
    const a = event.target.value
    setCurrSaleDoc(a)
  }
  const ExpSalesDoctor = () => {
    const a = event.target.value
    setExpSalesDoc(a)
  }
  const PatientByDoc = () => {
    const re = /^[0-9\b]+$/;
    const a = event.target.value
    if (a === '' || re.test(a)) {
      // if(a.length >5){
      //   setValidStatus(true)
      //   setValidMsg('Please Enter 5 Digits only')
      // }else{
      setPatientByDoc(a)
      //  }

    } else {
      setPatientByDoc('')
      setValidStatus(true)
      setValidMsg('Please Enter Numbers')
    }

  }
  // console.log("nopat",pateintByDoc)
  const BusineesPerMonth = () => {
    const re = /^[0-9\b]+$/;
    const a = event.target.value
    if (a === '' || re.test(a)) {
      // if(a.length >10){
      //   setValidStatus(true)
      //   setValidMsg('Please Enter 10 Digits ')
      // }else{
      setAvgBussMon(a)

      // }

    } else {
      setAvgBussMon('')
      setValidStatus(true)
      setValidMsg('Please Enter Numbers')
    }

  }
  const AlliancesComp = () => {
    const a = event.target.value
    if (a.length > 100) {
      setValidStatus(true)
      setValidMsg('Please Enter 100 Chars')
    } else {
      setAllianceComp(a)
    }

  }
  const handleUpload = (event) => {
    let files = event.target.files;
    let fileData = []
    Object.values(files).map((res, i) => {
      var re = /(\.doc|\.docx|\.rtf|\.pdf|\.jpeg|\.jpg|\.png|\.xlsx)$/i;
      let issql = res.name
      // let issql1 = issql.includes(".doc, .docx, .rtf, .pdf, .jpeg, .jpg, .png, .xlsx")
      if(re.exec(issql)){
        fileData.push({
          "id": i,
          "imgname": res.name,
          "path": URL.createObjectURL(res)
        })
      }

    })
    setImgName(fileData)
    setUploadedImg(files);
    // var date = this.state.date ? format(this.state.date, "YYYY-MM-DD") : "";
    //         var d = this.state.date ? date.split("-"):""
    //         let dYear = this.state.date ? d[0].toString():''
    //         let dMon = this.state.date ? d[1].toString() :''
    //         let dDate = this.state.date ? d[2].toString():''
    //         let token = localStorage.getItem("SFA_TOKEN")
    //         const data = new FormData();
    //         data.append("filename", this.state.selectedFile);
    //         data.append("srno", srno.toString());
    //         data.append("mode", this.state.modeDis);
    //         data.append("dd", dDate);
    //         data.append("mm", dMon);
    //         data.append("yyyy", dYear);
    //         data.append("address", this.state.desc);
    //         data.append(
    //             "Token",token
    //         );
    //        data.append("Index", "UpdateDispatch1");
    //        fileUpload("MaterialFileUpload", data).then( (result)=> {
    //         if(result.data.Status == "Success"){
    //             this.setState({
    //                 showModal:!this.state.showModal,
    //                 sucessmsg:result.data.data[0].msg,
    //                 success:true
    //             })
    //         }

    //     });
  }
  useEffect(() => {
    let currmon = new Date().getMonth() + 1
    let mont = []
    for (let i = 1; i <= sMonth; i++) {
      mont.push({
        'id': i,
        'val': 'month' + i
      })
    }
   // console.log("month", mont)
    let months = [{
      'id': '1',
      'val': 'jan'
    },
    {
      'id': '2',
      'val': 'Feb'
    },
    {
      'id': '3',
      'val': 'Mar'
    },
    {
      'id': '4',
      'val': 'Apr'
    },
    {
      'id': '5',
      'val': 'May'
    },
    {
      'id': '6',
      'val': 'jun'
    },
    {
      'id': '7',
      'val': 'Jul'
    },
    {
      'id': '8',
      'val': 'Aug'
    },
    {
      'id': '9',
      'val': 'Sep'
    },
    {
      'id': '10',
      'val': 'Oct'
    },
    {
      'id': '11',
      'val': 'Nov'
    },
    {
      'id': '12',
      'val': 'Dec'
    }
    ]
    let a = months.splice(sMonth, 12)
    // console.log("sweta",a)
    //let i = 0
    let m = []
    a.map((item) => {

      //   i= parseInt(i)+parseInt(1)
      m.push({
        'id': item.id,
        'val': item.val
      })

    })
    setExpectedMonth(mont)
  }, [])
  //console.log("item",expectedBuss)
  const AddRow = () => {

  }

  const handleChange = (rows) => {
    addRows(rows)
  };

  const handleAddRow = () => {

    //console.log("rows",rows)
    setCount(parseInt(count)+1)
   let len = rows.length;
   //console.log("len",count)
    const item = {
      value: count.toString()
    };
    addRows([...rows, item])
    setNewRow("added")
    // setRowID(rowID)
    // let tCurrVal = 0
    // Object.keys(rowID).map((item) => {
    //   tCurrVal = parseInt(tCurrVal) + parseInt(rowID[item])
    // })
    // setCurrOneRx(tCurrVal)
  };

  // const handleRemoveRow = () => {
  //   addRows(rows.splice(idx, 1))  
  // };
  //console.log("ncb",rows)
  const handleDelete = (rowsk, idx,itemcode,itemList) => { 
    // delete rows[idx]
   //let  klkl=rows.splice(idx, 1)
   // addRows(klkl)
   //var index = array.indexOf(idx);

   let m=[]

   rowsk.map((s,index)=>{

    if(idx!=index){

     // console.log(idx,index,s,'<--')
      m.push(s)
    }
    // console.log(s,'kunal')
   },addRows(m))
   let s =[]
   itemList.filter(x => x.value == itemcode).map((a)=>s.push(a))
   if(itemcode){
     s[0]['disabled'] = false
   }
  //  console.log("swetachhn",rows)
    if (localStorage.getItem("roi_det") == "0") {
    //  if(itemcode != "" || itemcode != undefined){
     delete itemRowsJson[itemcode]
     delete noOfRowsrow[idx]
     delete oneRowRxJson[idx]
     delete rxoneValJson[itemcode]
     
     // }
      
    }
    if (localStorage.getItem("roi_det") == "1") {
    //  if(itemcode != "" || itemcode != undefined){
      delete secItemRowJson[itemcode]
      delete noOfRowsrow[idx]
      delete expSecMonthJson[idx]
      Object.keys(secItemRowJson).map((item)=>{
        Object.keys(secItemRowJson[item]['expectedVal']).map((item2)=>{  
         delete  secItemRowJson[item]['expectedVal'][itemcode]
        })
      })
      // console.log("anayu",secItemRowJson)
      let total = 0
      Object.keys(secItemRowJson).map((item)=>{
        total =   parseFloat(total) + parseFloat(secItemRowJson[item]['currVal'])
      })
      
      setCurrOneRx(total)
      let total1 = 0
      Object.keys(secItemRowJson).map((item)=>{
        Object.keys(secItemRowJson[item]['expectedVal']).map((item2)=>{
          Object.keys(secItemRowJson[item]['expectedVal'][item2]).map((item3)=>{ 
            total1 =   parseFloat(total1) + parseFloat(secItemRowJson[item]['expectedVal'][item2][item3]['value'])
          })
        })
      })
      setTotalQty(total1)
     // }
      
    }
    if(localStorage.getItem("roi_det") == "2"){
      if(itemcode != "" || itemcode != undefined){
        delete thrItemRowJson[itemcode]
        delete thrRxItemJson[itemcode]
        delete noOfRowsrow[idx]
        delete threeRowRx[itemcode]
        delete expThrQtyJson[itemcode]
        delete eThrQtyJson[itemcode]
      }
     
      let total = 0
      Object.keys(thrItemRowJson).map((item)=>{
        total =   parseFloat(total) + parseFloat(thrItemRowJson[item]['currVal'])
      })

      setCurrOneRx(total)
      let total1 = 0
      Object.keys(thrItemRowJson).map((item)=>{
        Object.keys(thrItemRowJson[item]['expectedVal']).map((item2)=>{
          Object.keys(thrItemRowJson[item]['expectedVal'][item2]).map((item3)=>{ 
            total1 =   parseFloat(total1) + parseFloat(thrItemRowJson[item]['expectedVal'][item2][item3]['value'])
          })
        
        })
        
       })
       setTotalQty(total1)
    }

  }

  const handleRx = (rx) => {
    // console.log("rx",rx)
  }

  const selectItem = (code, rate, idx,t,itemlist) => {
    let p =[]
    let n =[]
    // itemlist.filter(x => x.value == code).map((a)=>p.push(a))
    
    
    setSelectedItem(code)
    setItemRate(rate)
    let s ={}
    s = itemSelvalue
    s[idx] = code
    setItemValue(s)
    if(itemlist != undefined){
      // if(code == "-1"){
      //   itemlist.map((a)=>{
      //     a["disabled"]=true
      //   })
      // }
      itemlist.map((a)=>{
      a["disabled"]=false
    });
    // top will finish then down loop will start 
    const promises = [];
      Object.keys(s).map((item)=>{
        Promise.all(promises).then(() => {
          itemlist.filter(x => x.value == s[item]).map((a)=>{
            p.push(a)  
           });
          p[item]['disabled'] = true
        })
        .catch((e) => {
            // handle errors here
        });
       
      })
    }
    let m = {}
    m = noOfRowsrow
    m[idx] = code
    setRowValidation(m)

    // console.log("sweta44",m,noOfRowsrow)
  }

  const getCurrOneQty = (val, id, itemcode) => { 
    setCurrOneConQty(val)
    if (srNo != "add") {
      if (Object.keys(itemRowsJson).length) {
        if(itemcode in itemRowsJson == false){ 
          let m = {}
          m = rxoneValJson
          m[itemcode] = val
          setRxOneVal(m)
          let total = 0
          Object.keys(rxoneValJson).map((item)=>{
            total = parseInt(rxoneValJson[item]) + parseInt(total)
          })
          setTotalCurrQty(total)
         
         
        }else{
        let m = {}
        m = itemRowsJson
        Object.keys(itemRowsJson).map((item) => {
          if (item == itemcode) {
            // console.log("sweta",itemRowsJson[item]['currQty'])
            itemRowsJson[item]['currQty'] = val
          }
        })
        let total = 0
        Object.keys(itemRowsJson).map((item) => {
          total = parseInt(total) + parseInt(itemRowsJson[item]['currQty'])
        })
        setTotalCurrQty(total)
      }
      } else {
        let m = {}
        m = rxoneValJson
        m[itemcode] = val
        setRxOneVal(m)
        let total = 0
        Object.keys(rxoneValJson).map((item)=>{
          total = parseFloat(total) + parseFloat(rxoneValJson[item])
        })
        setTotalCurrQty(total)
      }
    } else {
      let m = {}
      m = rxoneValJson
      m[itemcode] = val
      setRxOneVal(m)
      let total = 0
      Object.keys(rxoneValJson).map((item)=>{
        total = parseFloat(total) + parseFloat(rxoneValJson[item])
      })
      setTotalCurrQty(total)
    }


  }
  const handleCurrOneRx = (val, id, itemcode) => {
    //let one_rx = parseInt(oneCurrRx) + parseInt(val)
    let tCurr = 0
    if (srNo == "add") {

      let p = {}
      p = oneRowRxJson
      if (!p[id]) {
        p[id] = {}
      }
      p[id][itemcode] = val
      setOneRowRx(p)
      //console.log("sweta",p)
      Object.keys(p).map((item) => {
        Object.keys(p[item]).map((nitem) => {
          tCurr = parseInt(tCurr) + parseInt(p[item][nitem])
        })
      })
      setOneRxdata(p)
      setOneRxVal(val)
      setTotalCurrRx(tCurr)

    } else {

      let m = {}
      m = itemRowsJson
      if (Object.keys(itemRowsJson).length) {
        if(itemcode in itemRowsJson == false){
          let p = {}
          p = oneRowRxJson
          if (!p[id]) {
            p[id] = {}
          }
          p[id][itemcode] = val
          setOneRowRx(p)
          //console.log("sweta",p)
          // Object.keys(p).map((item) => {
          //   Object.keys(p[item]).map((nitem) => {
          //     tCurr = parseInt(tCurr) + parseInt(p[item][nitem])
          //   })
          // })
         
          setOneRxdata(p)
          setOneRxVal(val)
          let to=0
        // console.log("itemRowsJson",oneRowRxJson)
          Object.keys(oneRowRxJson).map((item) => {
            Object.keys(oneRowRxJson[item]).map((nitem)=>{
            to = parseInt(to) + parseInt(oneRowRxJson[item][nitem])
            })
          })
         setTotalCurrRx(to)
       
        //  if(newRowtrig == "added"){ 
        //   Object.keys(oneRowRxJson).map((item)=>{ 
        //     Object.keys(oneRowRxJson[item]).map((nitem)=>{
        //       if(nitem != ""){
        //         to = parseInt(oneRowRxJson[item][nitem]) + parseInt(to)
        //       }
        //     })
          
        //   })
        //   setTotalCurrRx(to)
        // }else{
         
        //   setTotalCurrRx(to)
        // }
        }else{
          //console.log("sweta22",oneRowRxJson)
        Object.keys(itemRowsJson).map((item) => {
          if (item == itemcode) {
            // console.log("sweta",itemRowsJson[item]['currRx'])
            itemRowsJson[item]['currRx'] = val

          }
        })
      
        Object.keys(itemRowsJson).map((item) => {
          
          tCurr = parseInt(tCurr) + parseInt(itemRowsJson[item]['currRx'])
          
        })
        //console.log("total",tCurr)
        let to=0
        Object.keys(itemRowsJson).map((item) => {
          to = parseInt(to) + parseInt(itemRowsJson[item]['currRx'])
        })
       setTotalCurrRx(to)
      }
        // setCurrOneRx(tCurr)
      } else {
        let p = {}
        p = oneRowRxJson
        if (!p[id]) {
          p[id] = {}
        }
        p[id][itemcode] = val
        setOneRowRx(p)
        //console.log("sweta",p)
        Object.keys(p).map((item) => {
          if(item != ""){
          Object.keys(p[item]).map((nitem) => {
            tCurr = parseInt(tCurr) + parseInt(p[item][nitem])
          })
        }
        })
        setOneRxdata(p)
        setOneRxVal(val)
        setTotalCurrRx(tCurr)
      }
    }

  }
  const getExpOneRx = (rx, month, id, item_code) => {
    if (srNo == "add") {
      let totalQty = 0
      let p = {}
      p = expQtyRow
      if (!p[id]) {
        p[id] = {}
      }
      p[id][month] = rx
      setExpQtyRow(p)
      let h ={}
      //console.log("sweta",p)
      Object.keys(p).map((item) => {
        Object.keys(p[item]).map((nitem) => {
          totalQty = parseInt(totalQty) + parseInt(p[item][nitem])
          if(!h[nitem]) {

            h[nitem] =     parseInt(p[item][nitem])
            }else{
              h[nitem] =   parseInt(h[nitem]) +     parseInt(p[item][nitem])
            }
        })
      })
      setGrpTotal(h)
      let s={}
      s = rxOneColJson
      s[id] = rx
      //setTotalQty(totalQty)
      let total = 0
      Object.keys(rxOneColJson).map((item)=>{
        total = parseFloat(total) + parseFloat(rxOneColJson[item])
      })
      setOneRxColJson(s)
      setExpTotalRx(total)

      let m = {}
      m = expOneRxJson
      m[month] = rx
      //console.log("hh",m)
      setExpOneRx(m)
      setExpectedOneRx(rx)
    } else {
      let m = {}
      m = itemRowsJson
      if (Object.keys(itemRowsJson).length) {
        if(item_code in itemRowsJson == false){
          let totalQty = 0
          let p = {}
          p = expQtyRow
          if (!p[id]) {
            p[id] = {}
          }
          p[id][month] = rx
        
          setExpQtyRow(p)
          let m = {}
          m = expOneRxJson
          m[month] = rx
          // console.log("singh",m)
          setExpOneRx(m)
          setExpectedOneRx(rx)
          //console.log("sweta",p)
          let h ={}
          Object.keys(p).map((item) => {
            Object.keys(p[item]).map((nitem) => {
              totalQty = parseInt(totalQty) + parseInt(p[item][nitem])
              if(!h[nitem]) {
                        h[nitem] =     parseInt(p[item][nitem])       
               }else{     
                     h[nitem] =   parseInt(h[nitem]) +  parseInt(p[item][nitem])      
                }
            })
          })
          setGrpTotal(h)
        }else{ 
        
        if(Object.keys(expQtyRow).length != sMonth){
          let p = {}
          p = expQtyRow
          if (!p[id]) {
            p[id] = {}
          }
          p[id][month] = rx
        
          setExpQtyRow(p)
        }
        //console.log("abc",expQtyRow)
        Object.keys(itemRowsJson).map((item) => {
          if (item == item_code) {
            Object.keys(itemRowsJson[item]['expectedQty']).map((rr) => {
              if (rr == item_code) {
                Object.keys(itemRowsJson[item]['expectedQty']).map(li => {
                  Object.keys(itemRowsJson[item]['expectedQty'][li]).map(res => {
                    if (res == month) {
                      itemRowsJson[item]['expectedQty'][rr][month]['rx'] = rx
                    }
                    else{
                      let l=itemRowsJson[item]['expectedQty'][item_code]
                      l[month]={ 
                        'rx': rx, 
                        'qty': itemRowsJson[item]['expectedQty'][rr][month]!=undefined?itemRowsJson[item]['expectedQty'][rr][month]['qty']:"", 
                      }
                    }
                  })
                })
                // console.log("sweta chhn",itemRowsJson[item]['expectedQty'][rr][month])
                // itemRowsJson[item]['expectedQty'][rr][month]['rx'] = rx
              }
            })
          }
        })
        let h ={}
        Object.keys(expQtyRow).map((item) => { 
          //console.log("swetattta",item)
         // let i = parseInt(item)+1
          Object.keys(expQtyRow[item]).map((nitem) => {
           // totalQty = parseInt(totalQty) + parseInt(expQtyRow[item][nitem])
            if(!h[nitem]) {
                      h[nitem] =     parseInt(expQtyRow[item][nitem])       
             }else{     
                   h[nitem] =   parseInt(h[nitem]) +  parseInt(expQtyRow[item][nitem])      
              }
          })
        })
        setGrpTotal(h)
     }
      } else { 
        let totalQty = 0
        let p = {}
        p = expQtyRow
        if (!p[id]) {
          p[id] = {}
        }
        p[id][month] = rx
        setExpQtyRow(p)
        let m = {}
        m = expOneRxJson
        m[month] = rx
        // console.log("singh",m)
        setExpOneRx(m)
        setExpectedOneRx(rx)
        //console.log("sweta",p)
        Object.keys(p).map((item) => {
          Object.keys(p[item]).map((nitem) => {
            totalQty = parseInt(totalQty) + parseInt(p[item][nitem])
          })
        })
        //setTotalQty(totalQty)

      }
    }
  }
  const getExpOneQty = (qty, month, id, item_code) => {  
    setMOnthlyQty(qty)
    if (srNo == "add") {
      let totalQty = 0
      // totalQty = parseInt(monthlyQty) + parseInt(qty)

      let m = {}

      m = expQtyJson

      if (!m[item_code]) {
        m[item_code] = {}
      }
      m[item_code][month] = { 'rx': exptectedOneRx, 'qty': qty }
      setExpOneQty(m)
      let total = 0
      let h={}
      Object.keys(expQtyJson).map((item)=>{
        Object.keys(expQtyJson[item]).map((item1)=>{
          total = parseFloat(total) + parseFloat(expQtyJson[item][item1]['qty'])
          if(!h[item1]) {

            h[item1] =     parseInt(expQtyJson[item][item1]['qty'])
            }else{
              h[item1] =   parseInt(h[item1]) +     parseInt(expQtyJson[item][item1]['qty'])
            }
        })
      })
      setGrpQtyTotal(h)
      setExpTotalQty(total)
      // console.log("swetachn",m)
      let t = {}
      t = itemRowsJson
      // console.log("mm",m)
      // console.log("tt",t)
      if (item_code != undefined) {
        t[item_code] = { 'code': item_code, 'month': month, 'currRx': setOneRx, "currQty": oneCurrQty, 'expectedQty': m }
      }
      // console.log("tt", t)
      setItemRow(t)

    } else {
      let m = {}
      m = itemRowsJson
      if (Object.keys(itemRowsJson).length) { 
        
        if(item_code in itemRowsJson == false){ 
          m = expQtyJson

          if (!m[item_code]) {
            m[item_code] = {}
          }
          m[item_code][month] = { 'rx': exptectedOneRx, 'qty': qty }
          setExpOneQty(m)
  			  let h ={}
			  Object.keys(itemRowsJson).map((item)=>{
				Object.keys(itemRowsJson[item]['expectedQty'][item]).map((item1)=>{  
				  if(!h[item1]) {
					h[item1] =     parseInt(itemRowsJson[item]['expectedQty'][item][item1]['qty'])
				  }else{
					  h[item1] =   parseInt(h[item1]) +     parseInt(itemRowsJson[item]['expectedQty'][item][item1]['qty'])
				  }
				})
			  })
			  setGrpQtyTotal(h)

          let t = {}
          t = itemRowsJson
          // console.log("mm",m)
          // console.log("tt",t)
          if (item_code != undefined) {
            t[item_code] = { 'code': item_code, 'month': month, 'currRx': setOneRx, "currQty": oneCurrQty, 'expectedQty': m }
          }
  
         // console.log("itemcode",t)
          setItemRow(t)
        }else{
        Object.keys(itemRowsJson).map((item) => { 
          if (item == item_code) { 
            Object.keys(itemRowsJson[item]['expectedQty']).map((rr) => { 
              if (rr == item_code) {
                Object.keys(itemRowsJson[item]['expectedQty']).map(li => {
                  Object.keys(itemRowsJson[item]['expectedQty'][li]).map(res => {
                    if (res == month) {
                      itemRowsJson[item]['expectedQty'][rr][month]['qty'] = qty
                    }
                    else{
                      let l=itemRowsJson[item]['expectedQty'][item_code]
                      l[month]={ 
                        'rx': itemRowsJson[item]['expectedQty'][rr][month]!=undefined?itemRowsJson[item]['expectedQty'][rr][month]['rx']:"", 
                        'qty': qty, 
                      }
                    }
                  })
                })
               
                // itemRowsJson[item]['expectedQty'][rr][month]['qty'] = qty
              }
            })
          }
        })
        let h={}
        Object.keys(itemRowsJson).map((item)=>{
          Object.keys(itemRowsJson[item]['expectedQty'][item]).map((item1)=>{  
            if(!h[item1]) {
              h[item1] =     parseInt(itemRowsJson[item]['expectedQty'][item][item1]['qty'])
            }else{
                h[item1] =   parseInt(h[item1]) +     parseInt(itemRowsJson[item]['expectedQty'][item][item1]['qty'])
            }
          })
        })
        setGrpQtyTotal(h)
      }
      } else {
        let totalQty = 0
        // totalQty = parseInt(monthlyQty) + parseInt(qty)
        // console.log("sweta1",expQtyJson)
        // console.log("sweta2",exptectedOneRx)
        // console.log("sweta3",qty)
        let m = {}
        m = expQtyJson

        if (!m[item_code]) {
          m[item_code] = {}
        }
        m[item_code][month] = { 'rx': exptectedOneRx, 'qty': qty }
        setExpOneQty(m)

        let t = {}
        t = itemRowsJson
        // console.log("mm",m)
        // console.log("tt",t)
        if (item_code != undefined) {
          t[item_code] = { 'code': item_code, 'month': month, 'currRx': setOneRx, "currQty": oneCurrQty, 'expectedQty': m }
        }


        setItemRow(t)
      }
    }
  }

  const sendExpMonthlyvalue = (val, month, id, item_code) => {
    setExpMonthVal(val)
    if (srNo == 'add') {
      // console.log("chauhan0")
      let tval = 0
      let p = {}
      p = setRowVal
      if (!p[id]) {
        p[id] = {}
      }
      p[id][month] = val
      setExpEow(p)
      let h={}
      Object.keys(p).map((item) => {
        Object.keys(p[item]).map((nitem) => {
          tval = parseInt(tval) + parseInt(p[item][nitem])
          if(!h[nitem]) {
                    h[nitem] =     parseInt(p[item][nitem])       
           }else{         
                 h[nitem] =   parseInt(h[nitem]) +     parseInt(p[item][nitem])       
           }
        })
      })
      setGrp1Total(h)
      setTotalQty(tval)
      let m = {}
      m = expSecMonthJson
      if (!m[selectedItem]) {
        m[selectedItem] = {}
      }
      m[selectedItem][month] = { 'value': val }
      //  m[month] ={'value':val}
      let t = {}
      t = secItemRowJson
      if (selectedItem != undefined) {
        t[selectedItem] = { 'code': selectedItem, 'month': month, 'currVal': currSecVal, 'expectedVal': m }
        setExpMonthJson(m)
        setSecItemRow(t)
      }

    } else {
      let tval = 0
      let m = {}
      m = secItemRowJson
      let pkey
      if (Object.keys(secItemRowJson).length) {
       
        let sval =0
        if(item_code in secItemRowJson == false ){ 
          // console.log("chauhan1")
         
          // Object.keys(secItemRowJson[item_code]['expectedVal']).map((pitem) => {
          //   Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => {
          //     sval = parseInt(sval) + parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
          //    // setTotalQty(tval)
          //   })
          // })
          sval =  parseInt(sval) + 1
          let tval = totalQty
          let total = 0
          let p = {}
          p = setRowVal
          if (!p[id]) {
            p[id] = {}
          }
          p[id][month] = val
          setExpEow(p)
          let h={}
          Object.keys(p).map((item) => {
            Object.keys(p[item]).map((nitem) => { 
             // tval = parseInt(tval) + parseInt(p[item][nitem])
               total = parseFloat(p[item][nitem]) + parseFloat(total )
               if(!h[nitem]) {
                        h[nitem] =parseFloat(p[item][nitem])       
               }else{         
                     h[nitem] =parseFloat(h[nitem]) +parseFloat(p[item][nitem])       
               }
            })
          })
          setGrp1Total(h)
        //let sval = totalQty
          //let total = parseFloat(tval) + parseFloat(totalQty)
          setTotalQty(total)
          let m = {}
          m = expSecMonthJson
          if (!m[selectedItem]) {
            m[selectedItem] = {}
          }
          m[selectedItem][month] = { 'value': val }
          //  m[month] ={'value':val}
          let t = {}
          t = secItemRowJson
          if (selectedItem != undefined) {
            t[selectedItem] = { 'code': selectedItem, 'month': month, 'currVal': currSecVal, 'expectedVal': m }
            setExpMonthJson(m)
            setSecItemRow(t)
          }
        }else{
          // console.log("'chauhan2")
        Object.keys(secItemRowJson).map((item) => {
          if (item == item_code) {
            Object.keys(secItemRowJson[item]['expectedVal']).map((rr) => {
              if (rr == item_code) {
                Object.keys(secItemRowJson[item]['expectedVal']).map(li => {
                  Object.keys(secItemRowJson[item]['expectedVal'][li]).map(res => {
                    if (res == month) {
                      secItemRowJson[item]['expectedVal'][rr][month]['value'] = val
                    }
                    else{
                      let l=secItemRowJson[item]['expectedVal'][item_code]
                      l[month]={ 
                        'value': val 
                      }
                    }
                  })
                })
                // console.log("sweta chhn",secItemRowJson[item]['expectedVal'][rr][month]['value'])
                // secItemRowJson[item]['expectedVal'][rr][month]['value'] = val
                // console.log("sweet",secItemRowJson[item]['expectedVal'][rr][month]['value'])
                // tval = parseInt(tval) + parseInt(secItemRowJson[item]['expectedVal'][rr][month]['value'])
                // setTotalQty(tval)
              }

            })
          }
        })
      //  if(secItemRowJson[item_code]['expectedVal'].length == sMonth){
        // Object.keys(secItemRowJson[item_code]['expectedVal']).map((pitem) => {
        //   Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => {
        //     tval = parseInt(tval) + parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
        //     setTotalQty(tval)
        //   })
        // })
      // }else{
      //   Object.keys(secItemRowJson[item_code]['expectedVal']).map((pitem) => { 
      //     //if(Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).length != sMonth){
          


      //     Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => {
      //       tval =   parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
      //       //setTotalQty(tval)
      //     })
      //     let t = totalQty
      //     console.log("total",totalQty)
      //     let bb = parseInt(tval)+parseInt(t)
      //     console.log("total11",bb)
      //     //setTotalQty(bb)
      // //  }else{
      //     let t_val = 0
      //     Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => {
      //       t_val =    parseInt(t_val) + parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
      //       console.log("tval11",t_val)
      //       //setTotalQty(t_val)
      //     })
      //  // }
      //   })
      
      //}
      // console.log("secItemRowJson",secItemRowJson)
      let t_val = 0
      let  h={}
      let tval = 0
        Object.keys(secItemRowJson[item_code]['expectedVal']).map((pitem) => {
         
            Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => {
            if(newRowtrig == "added"){ 
              // console.log("jjj",secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
            tval =   parseInt(tval) + parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
              //setTotalQty(tval)
              if(!h[litem]) {
                        h[litem] =parseFloat(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])       
               }else{         
                     h[litem] =parseFloat(h[litem]) +parseFloat(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])       
               }
              // console.log("kin11",secItemRowJson)
              // console.log("kin",h)
            let t = totalQty
            //console.log("total",totalQty)
            let bb = parseInt(tval)+parseInt(t)
            // console.log("total11",bb,tval,t)
            //setTotalQty(bb)
            setTotalQty(tval)
          }else{
           
         // Object.keys(secItemRowJson[item_code]['expectedVal'][pitem]).map((litem) => { 
            t_val = parseInt(t_val) + parseInt(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])
            // console.log("tval33",t_val)
           if(!h[litem]) {
                    h[litem] =parseFloat(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])       
           }else{         
                 h[litem] =parseFloat(h[litem]) +parseFloat(secItemRowJson[item_code]['expectedVal'][pitem][litem]['value'])       
           }
         
            setTotalQty(t_val)
           
         // })
          }
        })
        })
        setGrp1Total(h)
      }
      } else {
        // console.log("'chauhan3")
        let tval = 0
        let p = {}
        p = setRowVal
        if (!p[id]) {
          p[id] = {}
        }
        p[id][month] = val
        setExpEow(p)
        let h={}
        Object.keys(p).map((item) => {
          Object.keys(p[item]).map((nitem) => {
            tval = parseInt(tval) + parseInt(p[item][nitem])
            if(!h[nitem]) {
                      h[nitem] =parseFloat(p[item][nitem])       
             }else{         
                   h[nitem] =parseFloat(h[nitem]) +parseFloat(p[item][nitem])       
             }
          })
        })
        setGrp1Total(h)
        setTotalQty(tval)
        let m = {}
        m = expSecMonthJson
        if (!m[selectedItem]) {
          m[selectedItem] = {}
        }
        m[selectedItem][month] = { 'value': val }
        //  m[month] ={'value':val}
        let t = {}
        t = secItemRowJson
        if (selectedItem != undefined) {
          t[selectedItem] = { 'code': selectedItem, 'month': month, 'currVal': currSecVal, 'expectedVal': m }
          setExpMonthJson(m)
          setSecItemRow(t)
        }
      }
    }
  }
  const SendCurrRx = (val, itemcode, idx) => {
    let tCurr = 0
    setThrCurrRx(val)
    if (srNo != "add") {
      if (Object.keys(thrItemRowJson).length) {  
        if(itemcode in thrItemRowJson){
          let m = {}
          m = thrRxItemJson
          m[itemcode] = val
          setThrRxval(m);
          let t_to =0
          Object.keys(m).map((item) => {
            t_to = parseInt(t_to) + parseInt(m[item])
           
          })
          setTotalCurrRx(t_to)
         
        }else{ 
        Object.keys(thrItemRowJson).map((item) => {
          if (item == itemcode) {
            thrItemRowJson[item]['currRx'] = val
          }
        })
        let m = {}
        m=thrRxItemJson
        m[itemcode] = val
        setThrRxval(m)
        let t_to =0
        // Object.keys(thrItemRowJson).map((item) => {
        //   t_to = parseInt(t_to) + parseInt(thrItemRowJson[item]['currRx'])
         
        // })
        // console.log("kkk",thrRxItemJson)
        Object.keys(thrRxItemJson).map((item)=>{
          t_to = parseInt(t_to) + parseInt(thrRxItemJson[item])
        })
        
        setTotalCurrRx(t_to)
      }
      } else {
      
        let m = {}
        m = thrRxItemJson

        m[itemcode] = val
        setThrRxval(m)
        let t_to =0
        Object.keys(m).map((item) => {
          // console.log("bbbb",m[item])
          t_to = parseInt(t_to) + parseInt(m[item])
         
        })
        setTotalCurrRx(t_to)
        //console.log("babita",m)
      }
    } else {
      let tCurr = 0
      let m = {}
      m = thrRxItemJson
      m[itemcode] = val
      setThrRxval(m)
      let h ={}
      // console.log("anaya",m)
       Object.keys(m).map((item) => {
         tCurr = parseInt(tCurr) + parseInt(m[item])
       
       })
       setTotalCurrRx(tCurr)
    }

  }
  const sendCurrQty = (val, itemcode, totalval) => {
    //  let tCurrVal = parseInt(oneCurrRx) + parseInt(totalval)
    let tCurr = 0
    let t_to = 0
    if (srNo == "add") {
      let m = {}
      m = threeRowRx
      m[itemcode] = totalval
      setThreeRowRx(m);
      let k ={}
      k= currQtyItem
      k[itemcode] = val
      setThrQtyVal(k)
      Object.keys(k).map((item) => {
       t_to = parseInt(t_to) + parseInt(k[item])
     })
     Object.keys(m).map((item) => {
       tCurr = parseInt(tCurr) + parseInt(m[item])
     })
     
      setThrCurrQty(val)
      setThirdIndval(totalval)
      setCurrOneRx(tCurr)
      setTotalCurrQty(t_to)

    } else {
      if (Object.keys(thrItemRowJson).length > 0) {
        if(itemcode in thrItemRowJson ==  false){
          // console.log("singh1")
          let m = {}
          m = threeRowRx
          m[itemcode] = totalval
          setThreeRowRx(m);
          Object.keys(m).map((item) => {
            // console.log("singh88",m)
            tCurr = parseFloat(tCurr) + parseFloat(m[item])
          })
          let t_to = 0
          let k ={}
          k= currQtyItem
          k[itemcode] = val
          setThrQtyVal(k)
          Object.keys(k).map((item) => {
           t_to = parseInt(t_to) + parseInt(k[item])
         })
          setThrCurrQty(val)
          setThirdIndval(totalval)
          setCurrOneRx(tCurr)
          setTotalCurrQty(t_to)
          // console.log("singh",tCurr)
        }else{
          // console.log("singh2")
        Object.keys(thrItemRowJson).map((item) => {
          if (item == itemcode) {
            thrItemRowJson[item]['currQty'] = val
            thrItemRowJson[item]['currval'] = totalval
          }
        })
        Object.keys(thrItemRowJson).map((item) => {
          tCurr = parseInt(tCurr) + parseInt(thrItemRowJson[item]['currval'])
          setCurrOneRx(tCurr)
        })
        let t_to = 0
        let k ={}
        k= currQtyItem
        k[itemcode] = val
        setThrQtyVal(k)
        Object.keys(k).map((item) => {
         t_to = parseInt(t_to) + parseInt(k[item])
       })
       setTotalCurrQty(t_to)
      }
       
      } else {
        let m = {}
        let t_to = 0
        m = threeRowRx
        m[itemcode] = totalval
        setThreeRowRx(m);
        Object.keys(m).map((item) => {
          tCurr = parseInt(tCurr) + parseInt(m[item])
        })
        let k ={}
      k= currQtyItem
      k[itemcode] = val
      setThrQtyVal(k)
      Object.keys(k).map((item) => {
        t_to = parseInt(t_to) + parseInt(k[item])
      })
        setThrCurrQty(val)
        setThirdIndval(totalval)
        setCurrOneRx(tCurr)
        setTotalCurrQty(t_to)
      }
    }

  }
  const sendCurrValue = (val, id, itemCode) => {
    setCurrSecVal(val)
    if (srNo != "add") {
      let tCurr = 0
      let m = {}
      m = secItemRowJson
      if (Object.keys(secItemRowJson).length > 0) {
        if(itemCode in secItemRowJson == false){
          let tCurrVal = 0
          let tval =0
          let m = {}
          m = rowID
          m[id] = val
          setRowID(m)
          Object.keys(secItemRowJson).map((item) => {
            tval = parseInt(tval) + parseInt(secItemRowJson[item]['currVal'])
          })
          Object.keys(m).map((item) => {
            tCurrVal = parseInt(tCurrVal) + parseInt(m[item])
            
          })
          let total
          // if(Object.keys(secItemRowJson).length > 0){
          //    total = parseFloat(tval) + parseFloat(tCurrVal)
          // }else{
          //   total = tCurrVal
          // }
         
          setCurrOneRx(tCurrVal)
          setTotal1CurrRx(tCurrVal)
          //console.log("total",tval,total,tCurrVal)
        }else{
          Object.keys(secItemRowJson).map((item) => {
          if (item == itemCode) {

            secItemRowJson[item]['currVal'] = val

          }
        })
        Object.keys(secItemRowJson).map((item) => {
          tCurr = parseInt(tCurr) + parseInt(secItemRowJson[item]['currVal'])
        })

        setCurrOneRx(tCurr)
        setSecItemRow(secItemRowJson)
        setTotal1CurrRx(tCurr)
      }
      } else {
        let tCurrVal = 0
        let m = {}
        m = rowID
        m[id] = val
        setRowID(m)
        Object.keys(m).map((item) => {
          tCurrVal = parseInt(tCurrVal) + parseInt(m[item])
        })
        setCurrOneRx(tCurrVal)
        setTotal1CurrRx(tCurrVal)
      }
    } else {
      let tCurrVal = 0
      let m = {}
      m = rowID
      m[id] = val
      setRowID(m)
      let h={}
      Object.keys(m).map((item) => {
        tCurrVal = parseInt(tCurrVal) + parseInt(m[item])
        if(!h[item]) {
                 h[item] =     parseInt(m[item])        
        }else{         
                 h[item] =   parseInt(h[item]) +     parseInt(m[item])     
         }
      })
      setCurrOneRx(tCurrVal)
      setTotal1CurrRx(tCurrVal)
    }


  }

  const sendRx = (val, month, itemcode) => {
    setThirdRx(val)
    if (srNo == "add") {
      let m = {}
      m = expThrRxJson
      m[month] = val
      setExpThrRx(m)
      let p = {}
      p = eThrQtyJson
      if (!p[itemcode]) {
        p[itemcode] = {}
      }
      p[itemcode][month] = { 'rx': val }
      setERxJson(p)
      let h={}
      Object.keys(p).map((item)=>{
        Object.keys(p[item]).map((nitem)=>{  
          //console.log("swetasingh-->",p[item][nitem]['rx'],nitem)
         if(!h[nitem]) {
            h[nitem] =     parseInt(p[item][nitem]['rx'])        
          }else{          
            h[nitem] =   parseInt(h[nitem]) +     parseInt(p[item][nitem]['rx'])       
          }
        })
      })
      setGrpTotal(h)
    } else {
      let m = {}
      m = thrItemRowJson
      if (Object.keys(thrItemRowJson).length) {
        if(itemcode in thrItemRowJson == false) { 
          let m = {}
          m = expThrRxJson
          m[month] = val
          setExpThrRx(m)
          let p = {}
          p = eThrQtyJson
          if (!p[itemcode]) {
            p[itemcode] = {}
          }
          p[itemcode][month] = { 'rx': val }
          setERxJson(p)
        }else{
          if(Object.keys(eThrQtyJson).length != sMonth ){
            let p = {}
            p = eThrQtyJson
            if (!p[itemcode]) {
              p[itemcode] = {}
            }
            p[itemcode][month] = { 'rx': val }
            setERxJson(p)
          }
        Object.keys(thrItemRowJson).map((item) => {
          if (item == itemcode) {
            Object.keys(thrItemRowJson[item]['expectedVal']).map((rr) => {
              if (rr == itemcode) {
                Object.keys(thrItemRowJson[item]['expectedVal']).map(li => {
                  Object.keys(thrItemRowJson[item]['expectedVal'][li]).map(res => {
                    if (res == month) {
                      thrItemRowJson[item]['expectedVal'][rr][month]['rx'] = val
                    }
                    else{
                      let l=thrItemRowJson[item]['expectedVal'][itemcode]
                      l[month]={ 
                        'rx': val, 
                        'qty': thrItemRowJson[itemcode]['expectedVal'][itemcode][month]!=undefined?thrItemRowJson[itemcode]['expectedVal'][itemcode][month]['qty']:"", 
                        'value': thrItemRowJson[itemcode]['expectedVal'][itemcode][month]!=undefined?thrItemRowJson[itemcode]['expectedVal'][itemcode][month]['value']:""
                      }
                    }
                  })
                })
              }
            })
           
            // Object.keys(thrItemRowJson[item]['expectedVal']).map((rr) => {
            //   if (rr == itemcode) {

            //     thrItemRowJson[item]['expectedVal'][rr][month]['rx'] = val

            //   }

            // })
          }
        })
      
        let h={}
        Object.keys(thrItemRowJson).map((item)=>{
          Object.keys(thrItemRowJson[item]['expectedVal'][item]).map((item1)=>{  
            if(!h[item1]) {
              h[item1] =     parseInt(thrItemRowJson[item]['expectedVal'][item][item1]['rx'])
            }else{
                h[item1] =   parseInt(h[item1]) +     parseInt(thrItemRowJson[item]['expectedVal'][item][item1]['rx'])
            }
          })
        })
        setGrpTotal(h)
       
      }
      } else {
        let m = {}
        m = expThrRxJson
        m[month] = val
        setExpThrRx(m)
        let p = {}
        p = eThrQtyJson
        if (!p[itemcode]) {
          p[itemcode] = {}
        }
        p[itemcode][month] = { 'rx': val }
        setERxJson(p)
      }
    }

  }

  const sendQty = (val, month, tval, itemcode) => {
    if (srNo == "add") {
      let m = {}
      m = expThrQtyJson
      if (!m[itemcode]) {
        m[itemcode] = {}
      }
      m[itemcode][month] = { 'rx': thirdRx, 'qty': val, 'value': tval }
      setThirdQty(Math.round(val))
      setExpThrQty(m)
      let t_val = parseFloat(tval) + parseFloat(totalQty)
      setTotalQty(t_val)
      let h = {}
      Object.keys(m).map((item)=>{
        Object.keys(m[item]).map((nitem)=>{
         // console.log("swetasingh-->",m[item][nitem]['qty'],nitem)
          if(!h[nitem]) {
                    h[nitem] =     parseInt(m[item][nitem]['qty'])        
          }else{ 
                     h[nitem] =   parseInt(h[nitem]) +     parseInt(m[item][nitem]['qty'])      
         }
        })
       // console.log()
        setGrpQtyTotal(h)
      })
      let t = {}
      t = thrItemRowJson
      if (selectedItem != undefined) {
        t[selectedItem] = { 'code': selectedItem, 'month': month, 'currRx': thrCurrRx, 'currQty': thrCurrQty, 'currVal': thirdIntval, 'expectedVal': m }
        setThrItemRow(t)
      }

    } else {
     //  let totalQty =0
      let m = {}
      m = thrItemRowJson
      if (Object.keys(thrItemRowJson).length) {
        
        if(itemcode in thrItemRowJson == false){
          // console.log("sweta",thrItemRowJson)
          let m = {}
          m = expThrQtyJson
          if (!m[itemcode]) {
            m[itemcode] = {}
          }
          m[itemcode][month] = { 'rx': thirdRx, 'qty': val, 'value': tval }
          setThirdQty(Math.round(val))
          setExpThrQty(m)
          let totalQty = 0
          let t_val = parseFloat(tval) + parseFloat(totalQty)
          setTotalQty(t_val)
          let h = {}
          
      Object.keys(m).map((item)=>{
        Object.keys(m[item]).map((nitem)=>{
         // console.log("swetasingh-->",m[item][nitem]['qty'],nitem)
          if(!h[nitem]) {
                    h[nitem] =     parseInt(m[item][nitem]['qty'])        
          }else{ 
                     h[nitem] =   parseInt(h[nitem]) +     parseInt(m[item][nitem]['qty'])      
         }
        })
          
            
          })
          setGrpQtyTotal(h)
          //console.log("kirab",h)
          let t = {}
          t = thrItemRowJson
          if (selectedItem != undefined) {
            t[selectedItem] = { 'code': selectedItem, 'month': month, 'currRx': thrCurrRx, 'currQty': thrCurrQty, 'currVal': thirdIntval, 'expectedVal': m }
            setThrItemRow(t)
          }
        }else{
        Object.keys(thrItemRowJson).map((item) => {
          if (item == itemcode) {
            Object.keys(thrItemRowJson[item]['expectedVal']).map((rr) => {
              if (rr == itemcode) {
                Object.keys(thrItemRowJson[item]['expectedVal']).map(li => {
                  Object.keys(thrItemRowJson[item]['expectedVal'][li]).map(res => {
                    if (res == month) {
                      thrItemRowJson[item]['expectedVal'][rr][month]['qty'] = val
                      thrItemRowJson[item]['expectedVal'][rr][month]['value'] = tval
                    }
                    else{
                      let l=thrItemRowJson[item]['expectedVal'][itemcode]
                      l[month]={ 
                        'rx': thrItemRowJson[item]['expectedVal'][rr][month]!=undefined?thrItemRowJson[item]['expectedVal'][rr][month]['rx']:"", 
                        'qty': val, 
                        'value': tval 
                      }
                   
                    }
                  })
                })
                // thrItemRowJson[item]['expectedVal'][rr][month]['qty'] = val
                // thrItemRowJson[item]['expectedVal'][rr][month]['value'] = tval
              }

            })
          }
        })
        let h={}
        Object.keys(thrItemRowJson).map((item)=>{
          Object.keys(thrItemRowJson[item]['expectedVal'][item]).map((item1)=>{  
            if(!h[item1]) {
              h[item1] =     parseInt(thrItemRowJson[item]['expectedVal'][item][item1]['qty'])
            }else{
                h[item1] =   parseInt(h[item1]) +     parseInt(thrItemRowJson[item]['expectedVal'][item][item1]['qty'])
            }
          })
        })
        setGrpQtyTotal(h)
       
      }
      // console.log("lalloo",thrItemRowJson)
        let tTotal = 0
        //let totalQty = 0
        Object.keys(thrItemRowJson).map((pitem) => {
         // if (pitem == itemcode) { console.log("lalloo",thrItemRowJson[pitem]['expectedVal'])
            Object.keys(thrItemRowJson[pitem]['expectedVal']).map((litem) => {
              Object.keys(thrItemRowJson[pitem]['expectedVal'][litem]).map((kItem) => {
                if(newRowtrig == "added"){ 
                let t_Total =  parseInt(thrItemRowJson[pitem]['expectedVal'][litem][kItem]['value'])
                // console.log("hi",t_Total)
                tTotal = parseFloat(t_Total) + parseFloat(totalQty)
               // console.log("hibbb",tTotal)
                }else{
                
                  tTotal = parseInt(tTotal) + parseInt(thrItemRowJson[pitem]['expectedVal'][litem][kItem]['value'])
                  // console.log("hrllo",tTotal,thrItemRowJson[pitem]['expectedVal'][litem][kItem]['value'],totalQty)
                }

              })

              // setTotalQty(tTotal)
            })
         // }
        })
        // console.log("totalQty",tTotal)
        // Object.keys(thrItemRowJson).map((item) => {
        //   if (item == itemcode) {
        //     Object.keys(thrItemRowJson[item]['expectedVal']).map((rr) => {
        //       if (rr == itemcode) {
        //         Object.keys(thrItemRowJson[item]['expectedVal']).map(li => {
        //           Object.keys(thrItemRowJson[item]['expectedVal'][li]).map(res => {
        //             if(newRowtrig == "added"){ 
        //                       let t_Total =  parseInt(thrItemRowJson[item]['expectedVal'][rr][res]['value'] )
        //                       console.log("hi",t_Total)
        //                       tTotal = parseFloat(t_Total) + parseFloat(totalQty)
        //                      // console.log("hibbb",tTotal)
        //                       }else{
        //                         tTotal = parseInt(tTotal) + parseInt(thrItemRowJson[item]['expectedVal'][rr][res]['value'] )
        //                         console.log("hrllo",tTotal)
        //                       }
        //           })
        //         })
        //         // thrItemRowJson[item]['expectedVal'][rr][month]['qty'] = val
        //         // thrItemRowJson[item]['expectedVal'][rr][month]['value'] = tval
        //       }

        //     })
        //   }
        // })
        setTotalQty(tTotal)
      } else { 
        // console.log("sweta55",expThrQtyJson)
        let totalQty =0
        let m = {}
        m = expThrQtyJson
        if (!m[itemcode]) {
          m[itemcode] = {}
        }
        m[itemcode][month] = { 'rx': thirdRx, 'qty': val, 'value': tval }
        setThirdQty(Math.round(val))
        setExpThrQty(m)
        let t_val = parseFloat(tval) + parseFloat(totalQty)
        setTotalQty(t_val)
        let t = {}
        t = thrItemRowJson
        if (selectedItem != undefined) {
          t[selectedItem] = { 'code': selectedItem, 'month': month, 'currRx': thrCurrRx, 'currQty': thrCurrQty, 'currVal': thirdIntval, 'expectedVal': m }
          setThrItemRow(t)
        }
      }
    }

  }
  const sendval = (val, month) => {

  }

  useEffect(() => {
    let t = {}
    let res
    let s ={}
    let  p ={}
    if (localStorage.getItem('roi_det') == "0") {
      editData.map((rxItem,index) => {
        Object.keys(rxItem).map((val) => {
          if (val == 'c_itemcode' || val == 0) {
            res = rxItem[0].split('|')
            setResult(res)
          } else {
            let r_res = rxItem[val].split('|')
            let m = {}
            m = totalLoop
            if (!m[rxItem.c_itemcode]) {
              m[rxItem.c_itemcode] = {}
            }
            m[rxItem.c_itemcode][val] = { 'rx': r_res[0], 'qty': r_res[1] }
            setTotalLop(m)
          }
        
        })
        s = rxoneValJson
        s[rxItem.c_itemcode] =  res[1]
        p=oneRowRxJson
          if(!p[index]){
            p[index] ={}
          }
          p[index][rxItem.c_itemcode] = res[0]
        t = itemRowsJson
        t[rxItem.c_itemcode] = { 'code': rxItem.c_itemcode, 'currRx': res[0], 'currQty': res[1], 'expectedQty': totalLoop }
      })
      //console.log("chauhan1",t)
      setItemRow(t)
    } else if (localStorage.getItem('roi_det') == "1") {
      editData.map((rxItem) => {
        Object.keys(rxItem).map((val) => {
          if (val == 'c_itemcode' || val == 0) {
            res = rxItem[0].split('||')
            setResult(res)
          } else {
            let r_res = rxItem[val].split('||')
            let m = {}
            m = totalLoop
            if (!m[rxItem.c_itemcode]) {
              m[rxItem.c_itemcode] = {}
            }
            m[rxItem.c_itemcode][val] = { 'value': r_res[1] }
            setTotalLop(m)
          }
        })
        s = rowID
        s[rxItem.c_itemcode] = res[1]
        
        t = secItemRowJson
        t[rxItem.c_itemcode] = { 'code': rxItem.c_itemcode, 'currVal': res[1], 'expectedVal': totalLoop }
      })
      // console.log("chauhan1",t)
      setSecItemRow(t)
    } else {
      editData.map((rxItem,index) => {
        Object.keys(rxItem).map((val) => {
          if (val == 'c_itemcode' || val == 0) {
            res = rxItem[0].split('|')
            setResult(res)
          } else {
            let r_res = rxItem[val].split('|')
            let m = {}
            let rate
            let p = []
            itemList.filter(x => x.value == rxItem.c_itemcode).map((a) => p.push(a))
            p.map((item) => {
              rate = item.key
            })
            // console.log("kk",rate)
            m = totalLoop
            //m = expThrQtyJson
            if (!m[rxItem.c_itemcode]) {
              m[rxItem.c_itemcode] = {}
            }
            let tval = parseInt(r_res[1]) * parseInt(rate)
            m[rxItem.c_itemcode][val] = { 'rx': r_res[0], 'qty': r_res[1], 'value': tval }
            setTotalLop(m)
          }
        })
        let rate
        let m = []
        itemList.filter(x => x.value == rxItem.c_itemcode).map((a) => m.push(a))
        m.map((item) => {
          rate = item.key
        })
         let taotal = parseInt(rate) * parseInt(res[1])
      // //  if(index != 0){
      //     s = expThrQtyJson
      //     s[rxItem.c_itemcode] = {"qty":res[1],"rx":res[0] ,'value':taotal}
      //  // }
      // s =threeRowRx
      // s[rxItem.c_itemcode] = taotal
        t = thrItemRowJson
        t[rxItem.c_itemcode] = { 'code': rxItem.c_itemcode, 'currRx': res[0], 'currQty': res[1], 'currval': taotal, 'expectedVal': totalLoop }
      })
      setThrItemRow(t)
    }
  }, [editData, itemList])

  const saveItem = () => {

    setShowLoader(true)
    let string = ''
    //let string1 =''
    if (localStorage.getItem("roi_det") == "0") {
      Object.keys(itemRowsJson).map((item) => {
        let string1 = ''
        let code = itemRowsJson[item]['code']
        Object.keys(itemRowsJson[item]['expectedQty'][code]).map((val) => {
          //  if(itemRowsJson[item]['expectedQty'][code][val]){
          //    alert('ok')
          //  }
          string1 = string1 + itemRowsJson[item]['expectedQty'][code][val]['rx'] + '$' + itemRowsJson[item]['expectedQty'][code][val]['qty'] + '$' + val + "|"
        })
        let str1 = string1.substring(0, string1.length - 1);
        string = string + itemRowsJson[item]['code'] + '~' + itemRowsJson[item]['currRx'] + '$' + itemRowsJson[item]['currQty'] + '~' + str1 + '^'
        // console.log("string",string)
      })
      // return
    } if (localStorage.getItem("roi_det") == "1") {
      Object.keys(secItemRowJson).map((item) => {
        let code = secItemRowJson[item]['code']
        let string1 = ''
        Object.keys(secItemRowJson[item]['expectedVal'][code]).map((pval) => {
          string1 = string1 + secItemRowJson[item]['expectedVal'][code][pval]['value'] + '$' + pval + "|"
        })
        let str1 = string1.substring(0, string1.length - 1);
        // console.log("jj",str1)
        string = string + secItemRowJson[item]['code'] + '~' + secItemRowJson[item]['currVal'] + '~' + str1 + '^'
        // let str = string.substring(0, string.length - 2);
        //console.log("string",string)

      })
      //return
    } else {
      Object.keys(thrItemRowJson).map((item) => {
        let code = thrItemRowJson[item]['code']
        let string1 = ''
        Object.keys(thrItemRowJson[item]['expectedVal'][code]).map((val) => {
          string1 = string1 + thrItemRowJson[item]['expectedVal'][code][val]['rx'] + '$' + thrItemRowJson[item]['expectedVal'][code][val]['qty'] + '$' + val + "|"
        })
        let str1 = string1.substring(0, string1.length - 1);
        //console.log("jj",str1)
        string = string + thrItemRowJson[item]['code'] + '~' + thrItemRowJson[item]['currRx'] + '$' + thrItemRowJson[item]['currQty'] + '~' + str1 + '^'
        // console.log("string",string);return
      })
    }

    let str = string.substring(0, string.length - 1);
    let totalexp = totalQty ? totalQty.toString() : ''
    let totalcurr = oneCurrRx ? oneCurrRx.toString() : ''
    // if(exptectedOneRx == undefined){
    //   showSuccess(true)
    //   showMsg("Please Enter Expected Business")
    // }else

    let qtycount = 0
    let mqtyCount = 0
    let rxcount = 0
    let mrxCount = 0
    let rxcount1 = 0
    let mrxCount1 = 0
    let rxcount2 = 0
    let mrxCount2 = 0
    let tcount
    let pcount
    let lcount
    let ncount
    let len
    if (localStorage.getItem("roi_det") == "0") {
      Object.keys(itemRowsJson).map((item)=>{
        Object.keys(itemRowsJson[item]).map((item2)=>{
          Object.keys(itemRowsJson[item][item2]).map((item3)=>{
            len = Object.keys(itemRowsJson[item][item2][item3]).length
          })
        })
      })
     // console.log("swetadata",len,sMonth)
      Object.keys(expQtyJson).map((item) => {
        qtycount = parseInt(qtycount) + parseInt(Object.keys(expQtyJson[item]).length)
        mqtyCount = parseInt(mqtyCount) + parseInt(sMonth)
      })
      Object.keys(expQtyRow).map((item) => {
        rxcount = parseInt(rxcount) + parseInt(Object.keys(expQtyRow[item]).length)
        mrxCount = parseInt(mrxCount) + parseInt(sMonth)
      })
      rxcount1 = parseInt(rxcount1) + parseInt(Object.keys(oneRowRxJson).length)
      mrxCount1 = parseInt(mrxCount1) + parseInt(Object.keys(noOfRowsrow).length)
      rxcount2 = parseInt(rxcount2) + parseInt(Object.keys(rxoneValJson).length)
      mrxCount2 = parseInt(mrxCount2) + parseInt(Object.keys(noOfRowsrow).length)

      lcount = parseInt(rxcount1) + parseInt(rxcount2)
      ncount = parseInt(mrxCount1) + parseInt(mrxCount2)

      tcount = parseInt(rxcount) + parseInt(qtycount);
      pcount = parseInt(mqtyCount) + parseInt(mrxCount);
      // console.log("chauhan-->",pcount,tcount,expSecMonthJson,sMonth)
     
    }
    if (localStorage.getItem("roi_det") == "1") {
      Object.keys(expSecMonthJson).map((item) => {
        // count = Object.keys(expQtyJson[item]).length
        qtycount = parseInt(qtycount) + parseInt(Object.keys(expSecMonthJson[item]).length)
        mqtyCount = parseInt(mqtyCount) + parseInt(sMonth)
      })
      tcount = parseInt(qtycount);
      pcount = parseInt(mqtyCount)
      // console.log("chauhan-->",pcount,tcount,expSecMonthJson,sMonth)
    }
    if (localStorage.getItem("roi_det") == "2") {
      Object.keys(thrItemRowJson).map((item)=>{
        Object.keys(thrItemRowJson[item]).map((item2)=>{
          Object.keys(thrItemRowJson[item][item2]).map((item3)=>{
            len = Object.keys(thrItemRowJson[item][item2][item3]).length
          })
        })
      })
      Object.keys(expThrQtyJson).map((item) => {
        // count = Object.keys(expQtyJson[item]).length

        qtycount = parseInt(qtycount) + parseInt(Object.keys(expThrQtyJson[item]).length)
        mqtyCount = parseInt(mqtyCount) + parseInt(sMonth)

      })

      Object.keys(eThrQtyJson).map((item) => {
        // count = Object.keys(expQtyJson[item]).length

        rxcount = parseInt(rxcount) + parseInt(Object.keys(eThrQtyJson[item]).length)
        mrxCount = parseInt(mrxCount) + parseInt(sMonth)

      })
      // Object.keys(thrRxItemJson).map((item)=>{
      // count = Object.keys(expQtyJson[item]).length

      rxcount1 = parseInt(rxcount1) + parseInt(Object.keys(thrRxItemJson).length)

      //})
      mrxCount1 = parseInt(mrxCount1) + parseInt(Object.keys(noOfRowsrow).length)
      //Object.keys(threeRowRx).map((item)=>{
      // count = Object.keys(expQtyJson[item]).length

      rxcount2 = parseInt(rxcount2) + parseInt(Object.keys(threeRowRx).length)

      // })
      mrxCount2 = parseInt(mrxCount2) + parseInt(Object.keys(noOfRowsrow).length)

      lcount = parseInt(rxcount1) + parseInt(rxcount2)
      ncount = parseInt(mrxCount1) + parseInt(mrxCount2)

      tcount = parseInt(rxcount) + parseInt(qtycount)
      pcount = parseInt(mqtyCount) + parseInt(mrxCount)
     // console.log("sweta",tcount,pcount,ncount,lcount,thrRxItemJson,threeRowRx)
    }


    
    if (selectedItem == "") {
      setShowLoader(false)
      showSuccess(true)
      showMsg("Please Select Valid Item From List")
      return
    }
   // if (srNo == "add") {
      if (localStorage.getItem("roi_det") == "0") {
         
        // if (setOneRx == "") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data1")
        //   return
        // }
        // if (oneCurrQty == "") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data2")
        //   return
        // }
        // if (exptectedOneRx == "") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data3")
        //   return
        // }
        // if (monthlyQty == "") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data4")
        //   return
        // }
        let hh = parseInt(Object.keys(noOfRowsrow).length) * parseInt(sMonth)
       // console.log("noOfRowsrow",Object.keys(noOfRowsrow).length,Object.keys(itemRowsJson).length)
        if(Object.keys(itemRowsJson).length == 0){
          if(Object.keys(noOfRowsrow).length != Object.keys(itemRowsJson).length) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          // console.log("swetachhn",lcount,ncount,tcount,pcount)
          if (lcount != ncount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          if (tcount != pcount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
        }else{ 
          // console.log("swetachhn11",lcount,ncount,tcount,pcount)
          if(len != sMonth){
            if(Object.keys(noOfRowsrow).length != Object.keys(itemRowsJson).length) {
              setShowLoader(false)
              showSuccess(true)
              showMsg("Please Enter Valid Data")
              return
            }
            if (lcount != ncount) {
              setShowLoader(false)
              showSuccess(true)
              showMsg("Please Enter Valid Data")
              return
            }
            if (tcount != pcount) {
              setShowLoader(false)
              showSuccess(true)
              showMsg("Please Enter Valid Data")
              return
            }
          }else{
            if(newRowtrig == "added"){
              if(Object.keys(noOfRowsrow).length != Object.keys(itemRowsJson).length) {
                setShowLoader(false)
                showSuccess(true)
                showMsg("Please Enter Valid Data")
                return
              }
              
              // if (lcount != ncount) {
              //   showSuccess(true)
              //   showMsg("Please Enter Valid Data")
              //   return
              // }
              if (tcount != pcount) {
                setShowLoader(false)
                showSuccess(true)
                showMsg("Please Enter Valid Data")
                return
              }
            }
          }
          }
          
      }
      if (localStorage.getItem("roi_det") == "1") {
        // if (currSecVal == "0") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data")
        //   return
        // }
        // if (expSecMonth == "0") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data")
        //   return
        // }
        // console.log("swetachhn",tcount,pcount,noOfRowsrow,secItemRowJson)
        if (Object.keys(noOfRowsrow).length != Object.keys(secItemRowJson).length) {
          setShowLoader(false)
          showSuccess(true)
          showMsg("Please Enter Valid Data")
          return
        }
        if (tcount != pcount) {
          setShowLoader(false)
          showSuccess(true)
          showMsg("Please Enter Valid Data")
          return
        }
      }
      if (localStorage.getItem("roi_det") == "2") {
        // if (thrCurrRx == "") {
        //   showSuccess(true)
        //   showMsg("Please Enter Valid Data")
        //   return
        // }
        if(Object.keys(thrItemRowJson).length == 0){
        if (Object.keys(noOfRowsrow).length != Object.keys(thrItemRowJson).length) {
          setShowLoader(false)
          showSuccess(true)
          showMsg("Please Enter Valid Data")
          return
        }
        if (lcount != ncount) {
          setShowLoader(false)
          showSuccess(true)
          showMsg("Please Enter Valid Data")
          return
        }
        if (tcount != pcount) {
          setShowLoader(false)
          showSuccess(true)
          showMsg("Please Enter Valid Data")
          return
        }
       
      }else{
        if(len != sMonth){
          if (Object.keys(noOfRowsrow).length != Object.keys(thrItemRowJson).length) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          if (lcount != ncount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          if (tcount != pcount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
        }else{
          if(newRowtrig == "added"){
          if (Object.keys(noOfRowsrow).length != Object.keys(thrItemRowJson).length) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          if (lcount != ncount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
          if (tcount != pcount) {
            setShowLoader(false)
            showSuccess(true)
            showMsg("Please Enter Valid Data")
            return
          }
        }
        }
      }
      }
      if (totalcurr == "0") {
        setShowLoader(false)
        showSuccess(true)
        showMsg("Please Enter Current Sales ")
        return
      }
      if (totalexp == "0") {
        setShowLoader(false)
        showSuccess(true)
        showMsg("Please Enter Expected Sales ")
        return
      }
      if (pateintByDoc == "") {
        setShowLoader(false)
        showSuccess(true)

        showMsg("Please Enter No Of Patient ")
        return
      }
      if (AvgBussMonth == "") {
        setShowLoader(false)
        showSuccess(true)

        showMsg("Please Enter Average Business")
        return
        // }else if(AlliancesWithComp == ""){
        //   showSuccess(true)

        //   showMsg("Please Enter No Of Patient ")
      }
   // }

    let id = props.match.params.id
    let psrno = localStorage.getItem("rps_srno")
    let p_srno = id == "add" ? psrno : id
    //file uplod save
    if (fileUploaded.length > 0) {
      let token = localStorage.getItem("SFA_TOKEN")
      const data = new FormData();
      Object.values(fileUploaded).map(res => {
        data.append("file", res)
      })
      //data.append("file", res)
      data.append("Token", token);
      data.append("Index", "FileUpload");
      data.append("srno", p_srno);
      data.append("Reqtype", "REQ");
      fileUpload("RpsUploadFiles", data)
    }


    // console.log("string",str)

    //data saving
    let data = {
      "Index": "ItemsdetSave",
      "Data": {
        "srno": p_srno,
        // "srno":"4147~4148",
        "roidetail": localStorage.getItem("roi_det"),
        "itemdetails": str,
        "totalsale": totalcurr,
        "exptotal": totalexp,
        "patients": pateintByDoc,
        "avgbus": AvgBussMonth,
        "Remarks": AlliancesWithComp
      },
      "Token": ""
    }
    // console.log("string",string)
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == "Success") {
        let d = { "Index": "Requestsubmission", "Data": { "srno": p_srno }, "Token": "" }
        postToServer("Rps", d).then((Result) => {
          if (Result.data.Status == "Success") {
            setShowLoader(false)
            setSuccess(true)
            setSuccessMsg(Result.data.data[0].Result)
            window.setTimeout(function () {
              props.history.push('/rps')
          }, 1000);
          }
        }).catch((Error) => {

        })

      }
      //saveDetails(Result.data.setupdata)

    }).catch((Error) => {

    })


  }
  const handleApprovalDet = () => {
    let value = event.target.value
    setApprdetails(value)
  }
  const handleApprove = () => {
    // if (approve_det == "") {
    //   showSuccess(true)
    //   showMsg("Please Enter Note")
    //   return
    // } else {
      setShowAlert(true)
      setAlertMsg('You want to  Continue ? you can not revert it ?')
   // }


  }
  const handleReject = () => {
    let id = props.match.params.id
    if (approve_det == "") {
      showSuccess(true)
      showMsg("Please Enter Note")
      return
    }
    let data = {
      "Index": "RequestApprovalsubmission",
      "Data": {
        "srno": id,
        "txtnote": approve_det,
        "Nextstatus": "A",
        "SetupNo": setupId,
        "APPorReject": "REJ",
        "Appamtdetails": apprAmtStr,
        "Conamtdetails": ""
      },
      "Token": ""
    }
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == "Success") {
        setSuccess(true)
        setSuccessMsg(Result.data.data[0].Result)
        setTimeout(function(){
          props.history.push('/rps/')
         },1000);
      }
    }).catch((Error) => {
    })
  }
  const handleCurrTotal = () => {
    let a = event.target.value
    setCurrOneRx(a)
  }
  const handleExpTotal = () => {
    let a = event.target.value
    setTotalQty(a)
  }
  const onCancelFile = (image) => {
    let result = (imgName).filter(img => img.imgname !== image);
    //this.setState({ imageUploadFile: result })
    setImgName(result)
  }
  const btnResponse = (data) => {
    // console.log("data", data)
    if (data == 'yes') {

      let id = props.match.params.id
      let data = {
        "Index": "RequestApprovalsubmission",
        "Data": {
          "srno": id,
          "txtnote": approve_det,
          "Nextstatus": nextConfirm,
          "SetupNo": setupId,
          "APPorReject": "APP",
          "Appamtdetails": apprAmtStr,
          "Conamtdetails": confirmAmtStr
        },
        "Token": ""
      }
      postToServer("Rps", data).then((Result) => {
        if (Result.data.Status == "Success") {
          setShowAlert(false)
          setSuccess(true)
          setSuccessMsg(Result.data.data[0].Result)
          setTimeout(function(){
            props.history.push('/rps/')
           },1000);
        }

      }).catch((Error) => {
      })
    } else {
      setShowAlert(false)
    }
  }
  const dateChanged = (d) => {
    let tdate = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()
    let tmonth = new Date().getMonth() > 9 ? pareseInt(new Date().getMonth()) + 1 : '0' + parseInt(new Date().getMonth() + 1)
    let currdate = tmonth + '/' + tdate + '/' + new Date().getFullYear();
    let pdate = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
    let sMon = parseInt(d.getMonth()) + 1
    let pMonth = sMon > 9 ? sMon : '0' + sMon
    let selecteddate = pMonth + '/' + pdate + "/" + d.getFullYear();
    // if(selecteddate < currdate){ 
    //   showSuccess(true)
    //   showMsg("Please Enter future Date")
    // }else{
    setDate(d);
    // props.getRpsdate(d)
    //}

  }
  const handleDownload = (image) => {alert()
    // if (img == "No Data") {
    //   this.setState({
    //     showValidModal: !this.state.showValidModal,
    //     validmsg: "No Data Available to Download",
    //     vsuccess: false
    //   })
    // } else {
    //   const data = { "Data": { "srno": srNo, "filename": img } }
    //   return axios.post('http://111.93.190.156:85/RPSPhotDownload', data, { responseType: 'arraybuffer' }).then((response) => {
    //     let image = btoa(
    //       new Uint8Array(response.data)
    //         .reduce((data, byte) => data + String.fromCharCode(byte), '')
    //     );
    //     let a = document.createElement('a');
    //     a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    //     a.download = img;
    //     a.click();
    //   });
    // }
    let image1=image
    let path = URL_BASE +'RPSREQPhotDownload'
  
     if(image == ""){
      alert("No Data Available to Download")
    }else{
   var data = {
    "Data":{ 
      "srno":srNo,
      "filename":image
    }
  }
  return axios.post(path,data,{ responseType: 'arraybuffer' }).then((response) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    let a = document.createElement('a');
    a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    a.download = image1;
    a.click();
  })
}
  }
  const closeSuccsesModal=()=>{
    //setShowAlert(false)
    props.history.push('/rps')
  }


  return ( 

    <>
    
      <SuccessPopup show={modalShow} onHide={() => setModalShow(false)} />
      <div style={{ "overflow-x": "auto", "background": "#fff" }} >
        <div className="rps-tab-sec p-0">
          <div className="rps-wizarditem-title-sec">
            <span>RPS Items Details</span>
            {apprid == "1" ? '' :
              <button className="add-new-btn" onClick={() => handleAddRow()} >Add New Item</button>}
          </div>

          <div className="datatable swetatable outer" >
            <div className="table-responsive inner">
              <Table>
                <thead className="thead-default">
                  <tr className="thead-tr-default">
                    <th className="thead-th-default fix">Item Code</th>
                    <th className="thead-th-default fix">Item Name</th>
                    <th className="thead-th-default fix">Item Rate</th>
                    <th className="thead-th-default">Current Business</th>
                    {expectedBuss.map((item) => (
                      <th className="thead-th-default">{"Expected Business(" + item.val + ")"}</th>
                    ))}
                    {localStorage.getItem("roi_value") == "1" ?
                      <th className="thead-th-default">Total Exp Value</th>
                      : null}
                    {apprid == "0" ? <th></th> : ''}
                  </tr>
                </thead>
                <tbody className="tbody-default">
                  {rows.map((item, idx) => (
                    <AddRowItem
                      itemList={itemList}
                      selectedItem={selectItem}
                      handleChange={handleChange}
                      handleRx={handleRx}
                      rows={rows}
                      handleDelete={handleDelete}
                      expectedBuss={expectedBuss}
                      getCurrOneQty={getCurrOneQty}
                      handleCurrOneRx={handleCurrOneRx}
                      getExpOneRx={getExpOneRx}
                      getExpOneQty={getExpOneQty}
                      sendExpMonthlyvalue={sendExpMonthlyvalue}
                      sendCurrValue={sendCurrValue}
                      sendQty={sendQty}
                      sendRx={sendRx}
                      sendval={sendval}
                      SendCurrRx={SendCurrRx}
                      sendCurrQty={sendCurrQty}
                      idx={idx}
                      selcetdCodeval={selcetdCodeval}
                      srNo={srNo}
                      editOneRx={editOneRx}
                      editOneQty={editOneQty}
                      editData={editData}
                      singleRx={singleRx}
                      itemCode={item.c_itemcode}
                      rxItem={item}
                      apprid={apprid}
                    //  sendJsonValues={sendJsonValues}
                    />
                  ))}
                  <tr>
                  <TotalColoumn 
                      expectedBuss= {expectedBuss}
                      totalERx={t_exp_rx}
                      totalEQty={t_exp_qty}
                      t_currQty={localStorage.getItem("roi_det") == "1" ? '' : t_currQty}
                      t_currrx={localStorage.getItem("roi_det") == "1" ? t_onecurrrx : t_currrx}
                      expQtyRow={expQtyRow}
                      totalRow={t_row}
                      grpTotal={localStorage.getItem("roi_det") == "1" ? valueGrpTotal: grpTotal}
                      grpQtyTotal={localStorage.getItem("roi_det") == "1" ? '' :grpQtyTotal}
                      // valueGrpTotal={valueGrpTotal}
                    />
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

        </div>

        <div className="rps-tab-sec1">
          {/* <Row>
          <Col lg={3} md={4} sm={6} xs={12}>
          <Form.Label className="customized-label">Total <span className="colorRed">*</span></Form.Label>
            <Form.Control 
              type="text" 
              className="customized-input" 
              placeholder="Enter here" 
              value=""
              onChange=""
            />
          </Col>
        </Row> */}
          <Row >
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
              <Form.Label className="customized-label">Total Current Sales From Doctor <span className="colorRed">*</span></Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here"
                value={oneCurrRx}
                onChange={localStorage.getItem("roi_det") == "0" ? handleCurrTotal : ''}
              />
            </Col>
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
              <Form.Label className="customized-label">Total Expected Sales From Doctor <span className="colorRed">*</span></Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here"
                value={totalQty}
                onChange={localStorage.getItem("roi_det") == "0" ? handleExpTotal : ''}
              />
            </Col>
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
              <Form.Label className="customized-label">No Of Patients Treated By Doctor <span className="colorRed">*</span></Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here "
                value={pateintByDoc}
                maxLength={5}
                onChange={apprid == "1" ? '' : () => PatientByDoc()}
              />
            </Col>
            <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mt-3">
              <Form.Label className="customized-label">Average Business Per Month <span className="colorRed">*</span></Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here"
                value={AvgBussMonth}
                maxLength={10}
                onChange={apprid == "1" ? '' : () => BusineesPerMonth()}
              />
            </Col>

            <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mt-3">
              <Form.Label className="customized-label">Specific Alliances With Any Comp
             {/* <span className="colorRed">*</span> */}
              </Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here"
                as="textarea"
                rows="3"
                value={AlliancesWithComp}
                onChange={apprid == "1" ? '' : () => AlliancesComp()}
              />
            </Col>
          </Row>
        </div>
      </div>

      {previousList ? previousList.length > 0 ?
        <div>
          <div className="rps-tab-sec-title mt-2_0 prevDet pt20">Previous Approval Details</div>
          <div className="prevAlist">
            <PrevApproverList prevList={previousList} />
          </div>
        </div> : '' : ''}


        {showLoad == true ? 
        <DashLoader></DashLoader> : <div>
      {/* <Button className="primary mt-5" onClick={() => saveItem()}>Save</Button> */}
      <div className="imgpad20">
        {imgName.length > 0 ?
          imgName.map((res, i) => (
            <div className="attachmentprp imgpadBot">{res.imgname}
              <div className="attachmentdiv">
                <img src="../../public/assets/images/cancel-white.svg" className="closeImg attachmentcancel" onClick={() => onCancelFile(res.imgname)} /></div>
            </div>
          ))
          : ''}
      </div>
      {props.uploadedFiles.length > 0 ? <div>
        <div className="customized-label">Uploaded Documents From Requester</div>
        {props.uploadedFiles.length > 0}{
        props.uploadedFiles.map((item) => (
          <div className="attachmentprp imgpadBot hcursur" onClick={() => handleDownload(item.ImgFilename)}>{item.ImgFilename}</div>
        ))
      }</div> : null}
      {/* {props.uploadedFiles.length > 0}{
        props.uploadedFiles.map((item) => (
          <div className="attachmentprp imgpadBot hcursur" onClick={() => handleDownload(item.ImgFilename)}>{item.ImgFilename}</div>
        ))
      } */}
      <div className="flex-row">
        <div className="relative">
          {sessionStorage.getItem("currentStatus") == "C" ?
            <div>
              <Form.Label className="customized-label">Accountable  Date</Form.Label>
              <InputGroup className="datepickerAligment controls dateWidth">
                <DatePicker
                 selected={  accountDate? accountDate == "Invalid Date"?null: accountDate :null}
                  // onChange={dateChanged}
                  placeholderText="Ex: 09/01/19"
                  dateFormat="dd/MM/yyyy"
                  readOnly={true}
                // readOnly={srNo == "add" ? false : true}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
            : ''}
          {apprid == "1" ? '' :
            uploadFlag == '0' ?
              <input type="file" className="fileupload-input mt-1" multiple accept="image/png, image/jpeg, image/jpg, .doc,.docx,.rtf,.pdf,.xlsx" onChange={(e) => handleUpload(e)} />
              : ''
          }
          {apprid == "1" ? '' :
            uploadFlag == '0' ?
              <div className="secondary secondary-outline uploadfiles mr-3 mt-1">
                <img src="../public/assets/images/attachment.svg" className="mr-2" />Upload File
            </div> : ''
          }
          {apprid == "0" ?
            <Button className={uploadFlag == '0' ? ' primary margin75' : "primary"} onClick={() => saveItem()}>Save</Button> : ''}
          {apprid == "1" ? '' :
            uploadFlag == '0' ?
            <p className="supported-files">Supported Formats: doc, docx, rtf, pdf, jpeg, jpg, png, xlsx upto 2 MB</p>:''
          }
        </div>
        {apprid == "1" && sessionStorage.getItem("view") == "0" ?
          <div>
            <div className="mt20">
              <Form.Label className="customized-label">
                {nextConfirm == "A" ? 'Approval' : 'Confirmation'} Details
          <span className="colorRed">*</span></Form.Label>
              <Form.Control
                type="text"
                className="customized-input"
                placeholder="Enter here"
                as="textarea"
                rows="3"
                cols="75"
                maxLength="200"
                value={approve_det}
                onChange={handleApprovalDet}
              />
            </div>
            <div>
              <Button variant="outline-danger" className=" mt20 pr10" onClick={handleReject}>Reject</Button>
              <Button className="approveBtn mt20" onClick={handleApprove}>
                {nextConfirm == "A" ? "Approve" : "Confirm"}
              </Button>
            </div>
          </div> : ''}

      </div>
      {srNo == "add" ? '' :
        <div>
          {props.printFlag == 0 && sessionStorage.getItem('status') != 'REJECTED' ?
            <div style={{ "text-align": "center", "padding-top": "20px" }}>
              {printArray == true ?
                <button type="button" className="secondary secondary-outline uploadfile btn btn-primary ">
                  <img src="../public/assets/images/print.svg" className="mr-2" />
                  Print
        </button>
                : ''}
            </div> : ''}
        </div>}
        </div>
      }
      <StatusPopup
        show={validStatus}
        success={false}
        message={sValidMsg}
        onClose={() => setValidStatus(false)}
      />
      <StatusPopup
        show={successPop}
        success={false}
        message={sMsg}
        onClose={() => showSuccess(false)}
      />
      <StatusPopup
        show={showSuccessFul}
        success={true}
        message={successMsg}
        onClose={() => setSuccess(false)}
      />
      <ConfirmationBox
        show={showAlert}
        msg={alertMsg}
        btnResponse={(data) => btnResponse(data)}
        // onClose={()=>closeSuccsesModal()}
      />

    </>
  )
}

export default withRouter(WizardItemDetails)