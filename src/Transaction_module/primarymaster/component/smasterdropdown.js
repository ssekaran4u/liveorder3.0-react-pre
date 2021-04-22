import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import DatePicker from "react-datepicker";
import { Modal,Table } from "react-bootstrap";
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import StatusPopup from '../../../lib/StatusPopup'
import SmasterTable from './smastertable';
import UploadFileSecondarySale from '../popup/UploadFileSecondarySale'
import SearchDropdown from "../../../BasicComponet/searchDropdown";


class Smasterdropdown extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      searchtable: false,
      selectall:false,
      FS: [],
      SelectedFS: '-1',
      SelectedFsCode:'',
      Month: [],
      SelectMonth: '-1',
      Year: [],
      SelectedYear: new Date().getFullYear(),
      Stockist: [],
      SelectedStockist: '-1',
      stockistCode:'',
      SecSalesTypr: [],
      SecSalesTyprCode:'',
      selecSecSalesTypr: '',
      getDivisionstr: '',
      LoadDatalist: [],
      selecteditem: {},
      message: 'oko',
      success: false,
      showStatusModal: false,
      primaryimport: [],
      onpopup: false,
      loadItemsClick:false,
      checkTrnQty:true,
      FlagForLoadItems:[],
      loadDataListTotal:[],
      poolFlag:"",
      showUploadFileModal:false,
      salesValueEdit:"",
      srnumUpload:'',
      documentList:[],
      prevmonthEdit:'',
      importpopupButtonDisable:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.getfs = this.getfs.bind(this)
    this.ChangeFs = this.ChangeFs.bind(this)
    this.getMonth = this.getMonth.bind(this)
    this.getYear = this.getYear.bind(this)
    this.getStockist = this.getStockist.bind(this)
 //   this.getSecSalesTypr = this.getSecSalesTypr.bind(this)
    this.getDivision = this.getDivision.bind(this)
    this.loadDate = this.loadDate.bind(this)
    this.ChangeMonth = this.ChangeMonth.bind(this)
    this.ChangeYear = this.ChangeYear.bind(this)
    this.SecSalesTypr = this.SecSalesTypr.bind(this)
    this.ChangeStockist = this.ChangeStockist.bind(this)
    this.hideStatusModal = this.hideStatusModal.bind(this)
    this.primaryDatapopup = this.primaryDatapopup.bind(this)
    this.loadprimary = this.loadprimary.bind(this)
    this.modoleclose = this.modoleclose.bind(this)
    this.selectAllInvoices = this.selectAllInvoices.bind(this)
    this.importtotable = this.importtotable.bind(this)
    this.refresh = this.refresh.bind(this)
    this.loadItemTable = this.loadItemTable.bind(this)
    this.editPoolFS = this.editPoolFS.bind(this)
    this.salesValueEdit = this.salesValueEdit.bind(this)
    this.getSrNoForUpload = this.getSrNoForUpload.bind(this)
    this.getUploadedDocumentList = this.getUploadedDocumentList.bind(this)
    this.editDataAllow = this.editDataAllow.bind(this)
    this.ItemRate = this.ItemRate.bind(this)
    this.closeuploadFilePopup = this.closeuploadFilePopup.bind(this)
    this.importpopupButton = this.importpopupButton.bind(this)
  }
  importpopupButton(columnstatus){
    if(columnstatus == "2"){
      this.setState({importpopupButtonDisable:true})
    }
  }
  ItemRate(data,dataTotal){
    this.setState({LoadDatalist:data,loadDataListTotal:dataTotal})
  }
  refresh(){
   let primaryimport = this.state.primaryimport
   if (primaryimport.length > 0) {
   primaryimport.forEach(res => {    
       res.isChecked = false
   })
  } 
   this.setState({ primaryimport: primaryimport,selectall:false })
   this.primaryDatapopup()
  }
  loadprimary(e,data1,division,index) {
    console.log(e.target.checked,data1,"import")
    let primaryimport = this.state.primaryimport
   primaryimport.forEach((res,i) => {
     if (res.c_invoice == data1 && res.c_name == division && i == index) {
       res.isChecked = e.target.checked
     }
   })
   this.setState({ primaryimport: primaryimport })


    if (this.state.SelectedStockist == "-1") {
      this.setState({
        message: 'Please  Select Stockist ',
        success: false,
        showStatusModal: true
      })
      return
    }



    if (this.state.SelectedYear == "") {
      this.setState({
        message: 'Please  Select Year ',
        success: false,
        showStatusModal: true
      })
      return
    }




    if (this.state.SelectMonth == "-1") {
      this.setState({
        message: 'Please  Select Month ',
        success: false,
        showStatusModal: true
      })
      return
    }






    if (this.state.SelectedFS == "-1") {
      this.setState({
        message: 'Please  Select FS ',
        success: false,
        showStatusModal: true
      })
      return
    }



    if (this.state.selecSecSalesTypr == "-1") {
      this.setState({
        message: 'Please  Select Sales Type ',
        success: false,
        showStatusModal: true
      })
      return
    }
  }
  importtotable(){
    let data1 = "",data2 =""
    let trnQty = "0"
    this.state.primaryimport.map(res=>{
      if(res.isChecked == true){
        data1 = data1 + res.c_invoice + ","+  res.c_code +  "|"
        trnQty ="0"
      }
    })
    this.state.primaryimport.map(res=>{
      if(res.isChecked == false){
        data2 = data2 + res.c_invoice + ","+  res.c_code +  "|"
        trnQty ="1"
      }
    })
    let selecteditem = {


      "month": this.state.SelectMonth.toString(),
      "year": this.state.SelectedYear.toString(),
      "selectedFs": this.state.SelectedFsCode,
      "stockist": this.state.stockistCode,
      "SalesType": this.state.SecSalesTyprCode,

    }

    var data = {
      "index": "SecLoadItemFromImportSales",
      "Data": {
        "nmonth": this.state.SelectMonth.toString(),
        "nyear": this.state.SelectedYear.toString(),
        "selectedFs": this.state.SelectedFsCode,
        "stkCode": this.state.stockistCode,
        "selectedInv":data1,
        "salesType": this.state.SecSalesTyprCode,
        "trninv":trnQty,
        "selectedTrn":data2

      },
      "Token":""

    }
    let selected = ''
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
         this.setState({ selecteditem: selecteditem,onpopup:false,loadItemsClick:true,LoadDatalist: Result.data.data[0],loadDataListTotal: Result.data.data[1] })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })

  }
  
  modoleclose() {


    this.setState({ onpopup: false })
  }
  closeuploadFilePopup(){
    this.setState({showUploadFileModal:false,SelectedStockist:'-1'})
  }
  primaryDatapopup() {

    var data = {
      "index": "SecLoadItemFromImportPopup",
      "Data": {
        "nmonth": this.state.SelectMonth.toString(),
        "nyear": this.state.SelectedYear.toString(),
        "selectedFs": this.state.SelectedFsCode,
        "stkCode": this.state.stockistCode,

      }

    }
    let selected = ''
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {

        let primaryimport = []
        Result.data.data.map(res=>{
          primaryimport.push({
            c_code: res.c_code,
            c_invoice: res.c_invoice,
            c_name: res.c_name,
            d_date: res.d_date,
            inv_date: res.inv_date, 
            n_srno: res.n_srno,
            isChecked: res.impmnth == "1" ? true : false
           })
        })
        

        this.setState({ onpopup: true, primaryimport: primaryimport,selectall:false })
        //   Result.data["data"][0].map((a)=>{

        //   })


      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })


  }



  hideStatusModal() {
    this.setState({ showStatusModal: false })
  }

  SecSalesTypr(event, values) {
    const value = event
    this.state.SecSalesTypr.map(res=>{
      if(res.value == event){
        this.setState({SecSalesTyprCode:res.key})  
      }
        })
    this.setState({ selecSecSalesTypr: event })
  }

  getDivision(fscode) {
    let SecSalesTypr = ''
    var data = { "index": "secondSalesdivision", "Data": {"SelectedFscode":fscode} }
    let selected = ''
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        // Result.data["data"].map((a) => {
        //   SecSalesTypr = SecSalesTypr + a.division + ','
        // })

        this.setState({ getDivisionstr: Result.data.data[0].Division })
      }
    }).catch((Error) => {



      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })



  }






  loadDate(event) {
    let selecteditem = {


      "month": this.state.SelectMonth.toString(),
      "year": this.state.SelectedYear.toString(),
      "selectedFs": this.state.SelectedFsCode,
      "stockist": this.state.stockistCode,
      "SalesType": this.state.SecSalesTyprCode,

    }


    if (this.state.SelectedStockist == "-1") {
      this.setState({
        message: 'Please  Select Stockist ',
        success: false,
        showStatusModal: true,
        loadItemsClick:false
      })
      return
    }



    if (this.state.SelectedYear == "") {
      this.setState({
        message: 'Please  Select Year ',
        success: false,
        showStatusModal: true,
        loadItemsClick:false

      })
      return
    }




    if (this.state.SelectMonth == "-1") {
      this.setState({
        message: 'Please  Select Month ',
        success: false,
        showStatusModal: true,
        loadItemsClick:false

      })
      return
    }






    if (this.state.SelectedFS == "-1") {
      this.setState({
        message: 'Please  Select FS ',
        success: false,
        showStatusModal: true,
        loadItemsClick:false

      })
      return
    }



    if (this.state.selecSecSalesTypr == "-1") {
      this.setState({
        message: 'Please  Select Sales Type ',
        success: false,
        showStatusModal: true,
        loadItemsClick:false

      })
      return
    }
     //button hide - import from pp-- call one api which is having number all data and then call import load items
     
     //else  normal flow
     console.log( this.state.FlagForLoadItems.PriSalesimportReceiptColumn,"vvvvvvvvv")
     if(this.state.FlagForLoadItems.PriSalesimportReceiptColumn == "1"){
       //first call psales data
       var data = {
        "index": "SecLoadItemFromImportPopup",
        "Data": {
          "nmonth": this.state.SelectMonth.toString(),
          "nyear": this.state.SelectedYear.toString(),
          "selectedFs": this.state.SelectedFsCode,
          "stkCode": this.state.stockistCode,
  
        }
  
      }
      postToServer("Sales", data).then((Result) => {
        if (Result.data.Status == 'Success') {
            this.setState({loadItemsClick:true})
          let primaryimport = []
          Result.data.data.map(res=>{
            primaryimport.push({
              c_code: res.c_code,
              c_invoice: res.c_invoice,
              c_name: res.c_name,
              d_date: res.d_date,
              inv_date: res.inv_date, 
              n_srno: res.n_srno,
              isChecked: res.impmnth == "1" ? true : false
             })
          })
          console.log(primaryimport,"pssssssssssssssssssssssssss")
          let data1 = ""
          let trnQty = "0"
          primaryimport.map(res=>{
           // if(res.isChecked == true){
              data1 = data1 + res.c_invoice + ","+  res.c_code +  "|"
              trnQty ="0"
          //  }
          })
          let selecteditem = {
      
      
            "month": this.state.SelectMonth.toString(),
            "year": this.state.SelectedYear.toString(),
            "selectedFs": this.state.SelectedFsCode,
            "stockist": this.state.stockistCode,
            "SalesType": this.state.SecSalesTyprCode,
      
          }
      
          var data = {
            "index": "SecLoadItemFromImportSales",
            "Data": {
              "nmonth": this.state.SelectMonth.toString(),
              "nyear": this.state.SelectedYear.toString(),
              "selectedFs": this.state.SelectedFsCode,
              "stkCode": this.state.stockistCode,
              "selectedInv": data1,
              "salesType": this.state.SecSalesTyprCode,
              "trninv":trnQty,
              "selectedTrn": ""
      
            },
            "Token":""
      
          }
          let selected = ''
          postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == 'Success') {
           this.setState({selecteditem: selecteditem,LoadDatalist: Result.data["data"][0],loadDataListTotal:Result.data.data[1] })
           }
          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: " Contact to admin" })
          })
      
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: " Contact to admin" })
      })
  
  
     }else{
    var data = {
      "index": "SecSalesLoadItem",
      "Data": {
        "month": this.state.SelectMonth.toString(),
        "year": this.state.SelectedYear.toString(),
        "selectedFs": this.state.SelectedFsCode,
        "stockist": this.state.stockistCode,
        "SalesType": this.state.SecSalesTyprCode
      }

    }
    // let selected = ''
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        if(this.state.prevmonthEdit != ""){
          alert(`${this.state.prevmonthEdit}`)

        }
        this.setState({ loadItemsClick:true})
        let SecSalesTypr = []

        this.props.senddata(Result.data["data"][0], selecteditem)
       // alert(`${this.state.prevmonthEdit}`)
        this.setState({selecteditem: selecteditem, LoadDatalist: Result.data["data"][0],loadDataListTotal:Result.data.data[1] })
        


      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
  }
    
  }

  // getSecSalesTypr(month, year, stkCode, SelectedFs) {
  //   var data = { "index": "SecSalesTypr", "Data": { nmonth: month, Nyear: year, stkCode: stkCode, SelectedFs: SelectedFs } }
  //   let selected = ''
  //   postToServer("Sales", data).then((Result) => {
  //     if (Result.data.Status == 'Success') {

  //       let SecSalesTypr = []
  //       Result.data["data"].map((a) => {
  //         SecSalesTypr.push({
  //           key: a.c_code,
  //           text: a.c_name,
  //           value: a.c_code,
  //         })

  //         if (Result.data["data"].length == 1) {
  //           this.setState({ selecSecSalesTypr: a.c_code })
  //         }



  //       }, this.setState({ SecSalesTypr: SecSalesTypr }))


  //     }
  //   }).catch((Error) => {
  //     this.setState({ Error: true, Errormsg: " Contact to admin" })
  //   })


  // }

editDataAllow(month,year,fs){
  var data = {
    "index": "SecSalesPrevMonthEntry",
    "Data": {
        "selectedfs": fs,
        "month": month,
        "year":year
    },
    "Token": ""
}
postToServer("Sales", data).then((Result) => {
  if (Result.data.Status == 'Success') {
    this.setState({prevmonthEdit:Result.data.data[0].Result})
  }
}).catch((Error) => {
  this.setState({ Error: true, Errormsg: " Contact to admin" })
})
}

  ChangeStockist(event, values) {
    const value = event
    this.state.Stockist.map(res=>{
      if(res.value.trim() == event.trim()){
      //  this.getSrNoForUpload(this.state.SelectMonth.toString(), this.state.SelectedYear.toString(), res.key)
        this.getUploadedDocumentList(this.state.SelectMonth.toString(), this.state.SelectedYear.toString(), res.key)
        this.enterfs(this.state.SelectMonth.toString(), this.state.SelectedYear.toString(), res.key, this.state.SelectedFsCode)
        this.setState({stockistCode:res.key})  
      }
        })
   // this.editPoolFS(this.state.SelectMonth.toString(), this.state.SelectedYear.toString(), value, this.state.SelectedFS)
   // this.getSecSalesTypr(this.state.SelectMonth.toString(), this.state.SelectedYear.toString(), value, this.state.SelectedFS)
    this.setState({ SelectedStockist: event,loadItemsClick:false })
  }
  enterfs(month,year,stockist,fs){
   var data =  {
     "index":"SecSalesEnterfs",
     "Data":{
       "custcode":stockist,
       "month":month,
       "year":year
      },
      "Token":""
    }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') { 
        if(Result.data.data[0].enterfs == "1"){
      this.editPoolFS(month,year,stockist,fs)
        }
      }
    }).catch(e=>{
    })
  }
  editPoolFS(month,year,stockist,fs){
   var editpool =  {
     "index":"Editpoolfs",
     "Data":{
      "custcode":stockist,
     "selectfscode":fs,
     "month":month,
     "year":year},
     "Token":""}
     postToServer("Sales", editpool).then((Result) => {
      if (Result.data.Status == 'Success') { 
        this.setState({poolFlag:Result.data.data[0].editflag})
      }
    }).catch(e=>{
    })
  }
  salesValueEdit(){

   var data =  {"index":"GetSecSalesvalueEdit","Data":{},"Token":""}
   postToServer("Sales", data).then((Result) => {
    if (Result.data.Status == 'Success') { 
     this.setState({salesValueEdit:Result.data.data[0].N_secvalue})
    }
   })
   .catch(e=>{
  })
  }
  getStockist(fscode, month, year) {


    var data = { "index": "secondSalesStk", "Data": { "nmonth": month, "nyear": year,selectedfs:fscode } }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {

        let Stockist = []
        Result.data["data"].map((a) => {
          Stockist.push({
            key: a.c_code,
            text: a.c_name,
            value: a.c_name,
          })

          // if(Result.data["data"].length==1){
          //   this.setState({  Stockist:Stockist })
          // }


        }, this.setState({ Stockist: Stockist }))


      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })

  }
  ChangeYear(event, values) {
    const value = event
    this.getStockist(this.state.SelectedFsCode,this.state.SelectMonth.toString(), value.toString())
    this.editDataAllow(this.state.SelectMonth.toString(),value.toString(),this.state.SelectedFsCode)
    this.setState({ SelectedYear: value,loadItemsClick:false,SelectedStockist:'-1' })
  }

  getYear() {

    var d = new Date();
    var n = d.getFullYear();
    var SelectedYear = n
    var m = n - 5
    let Year = []
    for (var i = m; i < m + 7; i++) {
      Year.push(
        {
          key: i,
          text: i,
          value: i,
        }
      )
    }
    this.setState({ Year: Year, SelectedYear: SelectedYear })

  }


  ChangeMonth(event, values) {
    const value = event
    this.getStockist(this.state.SelectedFsCode,value.toString(), this.state.SelectedYear.toString())
    this.editDataAllow(value.toString(),this.state.SelectedYear.toString(),this.state.SelectedFsCode)
    this.setState({ SelectMonth: event,loadItemsClick:false,SelectedStockist:'-1' })
  }
  getMonth() {

     var d = new Date();
     var n = d.getMonth() + 1;

    const Month = [
      {
        key: 1,
        value: 1,
        text: 'January',
      },
      {
        key: 2,
        value: 2,
        text: 'February',
      },
      {
        key: 3,
        value: 3,
        text: 'March',
      },
      {
        key: 4,
        value: 4,
        text: 'April',
      },
      {
        key: 5,
        value: 5,
        text: 'May',
      },
      {
        key: 6,
        value: 6,
        text: 'June',
      },
      {
        key: 7,
        value: 7,
        text: 'July',
      },
      {
        key: 8,
        value: 8,
        text: 'August',
      },
      {
        key: 9,
        value: 9,
        text: 'September',
      },
      {
        key: 10,
        value: 10,
        text: 'October',
      },
      {
        key: 11,
        value: 11,
        text: 'November',
      },
      {
        key: 12,
        value: 12,
        text: 'December',
      },
    ]

     this.setState({ Month: Month, SelectMonth: n })




  }


  ChangeFs(event, values) {
    const value = event
    this.setState({ SelectedFS: event })
    this.state.FS.map(res=>{
      if(res.value == event){
        this.getDivision(res.key)
        this.getStockist(res.key,this.state.SelectMonth.toString(), this.state.SelectedYear.toString())
        this.setState({SelectedFsCode:res.key})
      }
    })
   
  }

  getfs() {
    var d = new Date();
    var nmonth = d.getMonth() + 1;
    var nyear = d.getFullYear();
    var data = { "index": "GetFS", "Token": "" }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        let FS = []
        Result.data["data"].map((a) => {
          FS.push({
            key: a.FSCODE,
            text: a.C_Name,
            value: a.C_Name,
          })

          if (Result.data["data"].length == 1) {
            this.getStockist(Result.data.data[0].FSCODE,nmonth.toString(), nyear.toString())
            this.editDataAllow(nmonth.toString(),nyear.toString(),Result.data.data[0].FSCODE)
            var data1 = { "index": "secondSalesdivision", "Data": {"SelectedFscode":a.FSCODE} }
    let selected = ''
    postToServer("Sales", data1).then((Result) => {
      if (Result.data.Status == 'Success') {
        // Result.data["data"].map((a) => {
        //   SecSalesTypr = SecSalesTypr + a.division + ','
        // })

        this.setState({ getDivisionstr: Result.data.data[0].Division })
      }
    }).catch((Error) => {



      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })

            this.setState({ SelectedFS: a.C_Name ,SelectedFsCode:Result.data.data[0].FSCODE})
          }


        }, this.setState({ FS: FS }))


      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
  }





getSrNoForUpload(month,year,stockist){
 var data =  {
   "index":"SecSalesGetSrnoForUpload",
   "Data":{"month":month,
   "year":year,
   "stockiestcode":stockist
  },
    "Token":""}
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') { 
        this.setState({srnumUpload:Result.data.data[0].n_srno})
      }
    }).catch(e=>{
    })

}

getUploadedDocumentList(month,year,stockist){
 var data =  {
     "index":"GetshowuploaddocList",
      "Data":{
         "month":month,
         "year":year,
         "stockiestcode":stockist
        },
        "Token":""
      }
      postToServer("Sales", data).then((Result) => {
        if (Result.data.Status == 'Success') { 
         this.setState({documentList:Result.data.data})
        }
      }).catch(e=>{
      })
}

  componentDidMount() {
    this.getfs()
    this.getMonth()
    this.getYear()

    var d = new Date();
    var nmonth = d.getMonth() + 1;
    var nyear = d.getFullYear();
    this.salesValueEdit()
    // this.getDivision()
    //flags
    var data2 =  {
      "index":"secondSalesOtherFlag",
      "Data":{},
      "Token":""
    }
    postToServer("Sales", data2).then((Result) => {
      if (Result.data.Status == 'Success') {
          this.setState({FlagForLoadItems:Result.data.data[0]})
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
    var data = { "index": "SecSalesTypr", "Data": {} }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {

        let SecSalesTypr = []
        Result.data["data"].map((a) => {
          SecSalesTypr.push({
            key: a.c_code,
            text: a.c_name,
            value: a.c_name,
          })

          if (Result.data["data"].length == 1) {
            this.setState({ selecSecSalesTypr: a.c_name,SecSalesTyprCode:a.c_code })
          }



        }, this.setState({ SecSalesTypr: SecSalesTypr }))


      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  };

  selectAllInvoices(event){
    let primaryimport = this.state.primaryimport
    let selectall = false
       if (primaryimport.length > 0) {
        primaryimport.forEach(res => {
          res.isChecked = event.target.checked
        })
      let a =   primaryimport.filter(res=>res.isChecked == true ? true : false)
      console.log(a,"ddddddddddddddddddddd")
        this.setState({ primaryimport: primaryimport,selectall: event.target.checked })
       }
    }
   
  loadItemTable(){
    this.setState({loadItemsClick:false,showUploadFileModal: true})
  }

  render() {
     const {primaryimport} = this.state


    return (
      <React.Fragment>

        <div className="pullleft KamClaimTablesfc">
          {/* <div className="primarysale-target">HQ/FS Wise Primary Sales Target</div> */}
          <div className="alldropsfclocation">
            <div className="locationsfa">
            <div className="user-heirarchy-field-containers campaign-dd">
            <SearchDropdown
                            className="designation"
                            labelName="FS"
                            important={true}
                            placeholder="Select FS"
                            Selected={this.state.SelectedFS}
                            dropdownList={this.state.FS}
                            getValue={this.ChangeFs}
                          />
                        </div>
                        </div>
            <div className="locationsfa">
              {/* <div className="distributorClaimListsfc">
                <p className="paralocation">Month <span className="colorRed">*</span></p>
              </div>
              <div className="selectlocation">
                <Dropdown placeholder='Select'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  onChange={this.ChangeMonth}
                  value={this.state.SelectMonth}
                  options={this.state.Month} />
                {/* <Drop /> 
              </div> */}
              <div className="user-heirarchy-field-containers campaign-dd">
            <SearchDropdown
                            className="designation"
                            labelName="Month"
                            important={true}
                            placeholder="Select Month"
                            Selected={this.state.SelectMonth}
                            dropdownList={this.state.Month}
                            getValue={this.ChangeMonth}
                          />
                        </div>
            </div>

            <div className="locationsfa">
              {/* <div className="distributorClaimListsfc">
                <p className="paralocation">Year<span className="colorRed">*</span></p>
              </div>
              <div className="selectlocation">
                <Dropdown placeholder='Select'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  onChange={this.ChangeYear}
                  value={this.state.SelectedYear}
                  options={this.state.Year} />
           
              </div> */}
                <div className="user-heirarchy-field-containers campaign-dd">
            <SearchDropdown
                            className="designation"
                            labelName="Year"
                            important={true}
                            placeholder="Select Year"
                            Selected={this.state.SelectedYear}
                            dropdownList={this.state.Year}
                            getValue={this.ChangeYear}
                          />
                        </div>
            </div>
            {/* <div  className = "alldropsfclocation1"> */}
            <div className="locationsfa">
              {/* <div className="distributorClaimListsfc">
                <p className="paralocation">Stockist<span className="colorRed">*</span> </p>
              </div>

              <div className="selectlocation smastddl">
                <Dropdown placeholder='Select'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  value={this.state.SelectedStockist}
                  onChange={this.ChangeStockist}
                  options={this.state.Stockist} />
              </div> */}
               <div className="user-heirarchy-field-containers campaign-dd">
            <SearchDropdown
                            className="designation"
                            labelName="Stockist"
                            important={true}
                            placeholder="Select Stockist"
                            Selected={this.state.SelectedStockist}
                            dropdownList={this.state.Stockist}
                            getValue={this.ChangeStockist}
                          />
                        </div>
            </div>

            <div className="locationsfa">
              {/* <div className="distributorClaimListsfc">
                <p className="paralocation">Enter<span className="colorRed">*</span> </p>
              </div>
              <div className="selectlocation">
                <Dropdown placeholder='Select'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  onChange={this.SecSalesTypr}
                  value={this.state.selecSecSalesTypr}
                  options={this.state.SecSalesTypr} />
              </div> */}
               <div className="user-heirarchy-field-containers campaign-dd">
            <SearchDropdown
                            className="designation"
                            labelName="Enter"
                            important={true}
                            placeholder="Select Type"
                            Selected={this.state.selecSecSalesTypr}
                            dropdownList={this.state.SecSalesTypr}
                            getValue={this.SecSalesTypr}
                          />
                        </div>
            </div>

            <div className="locationsfa">
              <div className="distributorClaimListsfc">
                <p className="paralocation">Division<span className="colorRed">*</span> </p>
              </div>
              <div className="selectlocation">
                <p className="sec-division">
                  {this.state.getDivisionstr}

                </p>


              </div>
            </div>



            <Button onClick={this.loadDate} className="sfcAddBtn-loaditem">Load Items</Button>
           
            {
              this.state.FlagForLoadItems.PriSalesimportReceiptColumn == "0" && this.state.loadItemsClick ?
            
            <Button onClick={this.primaryDatapopup}  disabled = {this.state.importpopupButtonDisable} className="sfcAddBtn-loaditem">Import From Primary Sales</Button>
             : null } 


          </div>
         
          {/* <div  className="primarysale-target1">Target On: Price To Retailer</div> */}
        </div>
        {/* {this.state.searchtable == true ?
          <div className="pullleft KamClaimTablesfc">
          <Pmastersearchtable/></div>: <Pmastertable/>} */}
        <StatusPopup
          message={this.state.message}
          show={this.state.showStatusModal}
          onClose={this.hideStatusModal}
          success={this.state.success}
        />
  <Modal
        show={this.state.onpopup}
        size="lg"
        onHide = {this.modoleclose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="master-success-sfcaddexpense"
      >

        <Modal.Header closeButton onClick={this.modoleclose}>
          <Modal.Title className="expentry-headertitle" id="contained-modal-title-vcenter">
           Invoice List
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="expentry-body">
          {this.state.primaryimport.length ? (
          <div className ="selectall-checkbox">
                                  <label className="table-checkbox-label mt-checkbox  doctor-name">
                                    <input
                                      type="checkbox"
                                      className="table-customized-checkbox"
                                      checked={this.state.selectall == false ? false : true}
                                       value={primaryimport["c_invoice"] + primaryimport["c_name"]}
                                      onClick= {this.selectAllInvoices}
                                    />
                                     <span className="table-checkbox-custom mt-checkbox"></span>
                                    <span className="select-invoice">Select All</span>
                                  </label>
                                </div>) : null}
         
          {/* <Table responsive>
          {this.state.primaryimport.length ? 
          <div>
              <tr>  
                <th className ="table-heading"></th>
                <th className ="table-heading">Invoice Number</th>
                <th className ="table-heading">Acc.Date</th>
                <th className ="table-heading">Inv.Date</th>
                <th className ="table-heading">Division</th>
                <th className ="table-heading">Trn</th>
              </tr>
              <tr>
              
              </tr>
              </div> : null}
              {
                this.state.primaryimport.length ?
                 this.state.primaryimport.map((a, index) => {
                  return (
                    <tr>
                      
                      <td className ="table-body">  <input  
                      readOnly
                      type="checkbox"
                      checked={a["isChecked"]}
                      value={a["c_invoice"]}
                      onClick={(e) => { this.loadprimary(e,a.c_invoice) }}
                      className="table-customized-checkbox"
                        />
                         </td>
                       <td className ="table-body">{a.c_invoice}</td>
                       <td className ="table-body">{a.d_date}</td>
                       <td className ="table-body">{a.inv_date}</td>
                       <td className ="table-body">{a.impmnth}</td>
                       <td className ="table-body">
                      <input
                                      readOnly
                                      type="checkbox"
                                      className="table-customized-checkbox"
                                      checked={!a["isChecked"]}
                                      value={a["c_invoice"]}
                                      disabled
                                    />
                        </td>
                      
                      
                    </tr>
                  )
                }) : <div className ="no-records">No Records Found</div>
              }
              </Table> */}
            
            <table id="example" class="stripe row-border order-column"  >
            { this.state.primaryimport.length > 0?
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="table-heading"> </th>
                                            <th rowspan="1" colspan="1" className="table-heading">Invoice Number</th>
                                            <th rowspan="1" colspan="1" className="table-heading">Acc.Date</th>
                                            <th rowspan="1" colspan="1" className="table-heading">Inv.Date</th>
                                            <th rowspan="1" colspan="1" className="table-heading">Division</th>
                                            <th rowspan="1" colspan="1" className="table-heading">Trn</th>

                                        </tr>
                                       
                                        </thead>
             : null}
                                        { this.state.primaryimport.length ? this.state.primaryimport.map((a, index) => 
                                        <tbody>
                                   
                                        <tr>
                                            <th className="table-body">
                                            <input  
                      readOnly
                      type="checkbox"
                      checked={a["isChecked"]}
                      value={index + a["c_invoice"] + a["c_name"]}
                      onClick={(e) => { this.loadprimary(e,a.c_invoice,a["c_name"],index) }}
                      className="table-customized-checkbox"
                        />
                                            </th>
                                            <th className="table-body">{a.c_invoice}</th>
                                            <th className="table-body">{a.d_date}</th>
                                            <th className="table-body">{a.inv_date}</th>
                                            <th className="table-body">{a.c_name}</th>
                                            <th className="table-body"> <input
                                      readOnly
                                      type="checkbox"
                                      className="table-customized-checkbox"
                                      checked={!a["isChecked"]}
                                      value={index + a["c_invoice"] + a["a.c_name"]}
                                      disabled
                                    /></th>
                                        </tr>
                                      
                                     
                                        </tbody> 
                                         ):<div>No records found</div>
                                        } 

                                </table>
            </div>
            </Modal.Body>
              <Modal.Footer>
                {this.state.primaryimport.length ? 
                <div>
                <Button variant="outline-danger" className ="ml-1" onClick ={this.refresh}>REFRESH</Button>
                <Button variant="primary" className ="ml-1" onClick ={this.importtotable}>IMPORT</Button>
                </div> : null}               
              </Modal.Footer>
            </Modal>
        
            {
          
          this.state.loadItemsClick ?
             <SmasterTable  
             selecSecSalesTypr = {this.state.SecSalesTyprCode} 
             selecteddata={this.props.selecteddata} 
             data={this.state.LoadDatalist} 
             stockist ={this.state.stockistCode} 
             fs = {this.state.SelectedFsCode}
              dataTotal = {this.state.loadDataListTotal} 
              month ={this.state.SelectMonth} 
              year ={this.state.SelectedYear} 
              FlagForLoadItems ={this.state.FlagForLoadItems} 
              poolFlag = {this.state.poolFlag}
              salesValueEdit ={this.state.salesValueEdit}
              prevmonthEdit = {this.state.prevmonthEdit} 
              ItemRate ={this.ItemRate}
              loadItemTable={this.loadItemTable}
              getSrNoForUpload = {this.getSrNoForUpload}
              importpopupButton = {this.importpopupButton}/>
             : null
          }
                
                {this.state.srnumUpload != "-99" ?
                 <UploadFileSecondarySale showUploadFileModal = {this.state.showUploadFileModal}  srno ={this.state.srnumUpload} stockist ={this.state.stockistCode} month ={this.state.SelectMonth} year ={this.state.SelectedYear} documentList ={this.state.documentList} getUploadedDocumentList ={this.getUploadedDocumentList}  onHide ={this.closeuploadFilePopup} /> : null
                }






      </React.Fragment>
    )
  }
}
export default Smasterdropdown;  


{/* <div className="distributorClaimListsfc"> */}
                {/* <p className="paralocation">Select FS<span className="colorRed">*</span></p> */}
              
              {/* <div className="selectlocation"> */}
                {/*  <SearchDropdown
                            className="designation"
                            labelName="Campaign"
                            important={true}
                            placeholder="Select FS"
                            Selected={this.state.SelectedFS}
                            dropdownList={this.state.FS}
                            getValue={this.ChangeFs}
                          /> */}
                {/* <Dropdown placeholder='Select'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  onChange={this.ChangeFs}
                  value={this.state.SelectedFS}
                  options={this.state.FS} /> */}
                  {/* <SearchDropdown
                            className="customized-input cal-scrollbar"
                            labelName="Select FS"
                            important={true}
                            placeholder="Select FS"
                            Selected={this.state.SelectedFS}
                            dropdownList={this.state.FS}
                            getValue={this.ChangeFs}
                          /> */}
                {/* <Drop /> */}
            {/* </div> */}
            {/* </div> */}