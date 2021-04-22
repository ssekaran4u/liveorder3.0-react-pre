import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form, InputGroup } from 'react-bootstrap'
import { postToServer } from '../../../lib/comm-utils'
import { URL_SALES } from '../../../lib/constants'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import Pmastersearchtable from './pmastersearchtable';
import Pmastertable from './pmastertable';
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import { dateFormat } from "dateformat"

import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'


class Pmasterdropdown extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accntDate: "",
      invoiceDate: "",
      paymentDate: "",
      lrDate: "",
      searchtable: false,
      Error: false,
      Errormsg: '',
      depotname: [],
      depotnameValue: "-1",
      depotnameErr: "",
      depotcode: "",
      stateda: [],
      stateValue: "-1",
      stateErr: "",
      statedacode: "",
      divisionlist: [],
      divisionlistValue: "All",
      divisionlistErr: "",
      divisionlistcode: "-1",
      yeardate: [],
      prefix: [],
      docnum: [],
      closingdate: [],
      stockiestname: [],
      stockiestValue: "-1",
      stockistErr: "",
      dateValue: "",
      acntdaterr: "",
      taxamnt: "0.00",
      lrnum: "",
      invoicenum: "",
      invoicedaterr: "",
      loaditems: [],
      account: "",
      fsname: [],
      stockiestcode: "",
      fscode: "",
      invoicErr: "",
      salevalue: "0.00",
      status: false,
      totalInvoice: "0.00",
      showcopytable: false,
      SaleSelectSearchdata: "",
      taxamntErr: '',
      lrnumErr: '',
      searchdata: false

    }
    this.onCheck = this.onCheck.bind(this)
    this.onCheckAll = this.onCheckAll.bind(this)
    this.handleAccntDate = this.handleAccntDate.bind(this);
    this.handleInvoiceDate = this.handleInvoiceDate.bind(this)
    this.handlePaymentDate = this.handlePaymentDate.bind(this)
    this.handleLrDate = this.handleLrDate.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.getDepotnameValue = this.getDepotnameValue.bind(this)
    this.getStateValue = this.getStateValue.bind(this)
    this.getDivisionValue = this.getDivisionValue.bind(this)
    this.getstokistValue = this.getstokistValue.bind(this)
    this.onStockistname = this.onStockistname.bind(this)
    this.onLoaditems = this.onLoaditems.bind(this)
    this.handleInvoiceClick = this.handleInvoiceClick.bind(this)
    this.salesValue = this.salesValue.bind(this)
    this.hideTableCopy = this.hideTableCopy.bind(this)
    this.SaleSelectSearch = this.SaleSelectSearch.bind(this)
    this.getTaxAmount = this.getTaxAmount.bind(this)
    this.getInvoiceNumber = this.getInvoiceNumber.bind(this)
    this.cancel = this.cancel.bind(this)
    this.ValueChangeUpdate = this.ValueChangeUpdate.bind(this)
  }
  ValueChangeUpdate(data) {
    this.setState({ loadItems: data })
  }
  cancel() {
    this.setState({
      accntDate: "",
      invoiceDate: "",
      paymentDate: "",
      lrDate: "",
      depotnameValue: "-1",
      stateValue: "-1",
      divisionlistValue: "All",
      divisionlistcode: "-1",
      stockiestValue: "-1",
      taxamnt: "0.00",
      lrnum: "",
      invoicenum: "",
      showcopytable: false,
      checkallData: false,
      searchtable: false,
      searchdata:false
    })
  }
  getLRNum(e) {
    let lrnum = e.target.value
    let lrnumValidate = /^[0-9a-zA-Z]+$/;
    if (lrnum.length == 0) {
      lrnumValidate = ""
    }
    if (lrnum.length > 0 && !lrnumValidate.test(lrnum)) {
      this.setState({ lrnumErr: "Please Enter Alpha Numeric Values Only!!" });

    } else {
      this.setState({ lrnum: lrnum, lrnumErr: "" });

    }
  }
  getInvoiceNumber(e) {
    let inv = e.target.value
    let invValidate = /^[0-9a-zA-Z]+$/;
    if (inv.length == 0) {
      invValidate = ""
    }
    if (inv.length > 0 && !invValidate.test(inv)) {
      this.setState({ invoicErr: "Please Enter Alpha Numeric Values Only!!" });
    } else {
      this.setState({ invoicenum: inv, invoicErr: "" });
    }
  }
  getTaxAmount(e) {
    let taxamt = e.target.value
    if (taxamt.length > 10) {
      this.setState({ taxamntErr: "Please Enter 10 Digits Only!" })
    } else {
      this.setState({ taxamnt: taxamt, taxamntErr: '' })

    }
  }
  hideTableCopy() {
    var docdata = { "Index": "SalesNextNumber", "Data": {}, }
    postToServer(URL_SALES, docdata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ docnum: response.data.data[0].nextid })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })
    this.setState({
      accntDate: "",
      invoiceDate: "",
      paymentDate: "",
      lrDate: "",
      depotnameValue: "-1",
      stateValue: "-1",
      divisionlistValue: "All",
      divisionlistcode: "-1",
      stockiestValue: "-1",
      taxamnt: "0.00",
      lrnum: "",
      invoicenum: "",
      showcopytable: false,
      salevalue: "0.00",
      totalInvoice: "0.00",
      fscode: '',
      fsname: '',
      searchtable: false,
      searchdata:false
    })
  }
  SaleSelectSearch(docnum, data) {
    if (data.length > 0) {
      if (data[0] != undefined) {
        let loadItems = []
        let checkallData = false
        var stockistdata = {
          "Index": "SalesStockist",
          "Data": {
            "division": data[0].c_div_code == "All" ? "All" : data[0].c_div_code,
            "region": data[0].stateCode
          },
          "Token": ""
        }
        postToServer(URL_SALES, stockistdata).then((response) => {
          if (response.status == 200) {
            this.setState({ stockiestname: response.data.data })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
        })
        //for poolfs/fsname
        var fsnamedata = {
          "Index": "SalesPoolOrFs",
          "Data": {
            "fromdate": data[0].d_date,
            "stockiest": data[0].c_cust_code,
            "division": data[0].c_div_code == "All" ? "All" : data[0].c_div_code
          },
        }
        postToServer(URL_SALES, fsnamedata).then((response) => {

          if (response.status == 200) {
            this.setState({ fsname: response.data.data[0].FSNAME, fscode: response.data.data[0].FSCODE })
          }
        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
        })
        //load items 
        var loaditemdata = {
          "Index": "SalesLoadItem",
          "Data": {
            "fromdate": data[0].d_date,
            "division": data[0].c_div_code == "All" ? "All" : data[0].c_div_code,
            "DocNo": docnum,
            "prefix": this.state.prefix,
            "depcode": data[0].c_dep_code,
            "year": this.state.yeardate
          },
        }
        postToServer(URL_SALES, loaditemdata).then((response) => {
          if (response.status == 200) {
          let qtyEmpty =  response.data.data.filter(res => (res.n_qty == "" || res.n_qty == "0") ? true : false)
          if(qtyEmpty.length > 0){
            checkallData = false
          }else{
            checkallData = true
          }
            response.data.data.map((res, i) => {        
              loadItems.push({
                C_BATCH_NO: res.C_BATCH_NO.trim(),
                C_Code: res.C_Code,
                C_Name: res.C_Name,
                C_Pack: res.C_Pack,
                modi_Rate: res.modi_Rate == "" ? res.rate : res.modi_Rate,
                n_Sch_qty: res.n_Sch_qty,
                n_qty: res.n_qty,
                n_recpt_qty: res.n_recpt_qty,
                n_value: res.n_value,
                rate: res.rate,
                isChecked: (res.n_qty != "" || res.n_Sch_qty != "") ? true : false,
                Rowid: i + 1,

              })
            })
            this.setState({ loaditems: loadItems, docnum: docnum,checkallData:checkallData })
          }
        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
        })
        //for account date
        let d = (data[0].d_date).split('/')
        let a = d[0]
        let b = d[1]
        let c = d[2]
        let rdate = b + '/' + a + '/' + c
        let accountDate = new Date(rdate)

        //for invoice date
        let e = (data[0].d_inv_date).split('/')
        let f = e[0]
        let g = e[1]
        let h = e[2]
        let idate = g + '/' + f + '/' + h
        let invoiceDate = new Date(idate)
        let paymentDueDate = "", lrDate = ""
        //for payment due date
        if (data[0].d_duedate != "") {
          let pdd1 = (data[0].d_duedate).split('/')
          let pdd2 = pdd1[0]
          let pdd3 = pdd1[1]
          let pdd4 = pdd1[2]
          let pdddate = pdd3 + '/' + pdd2 + '/' + pdd4
          paymentDueDate = new Date(pdddate)
        }
        //for lrdate
        if (data[0].d_lrdt != "") {
          let lr = (data[0].d_lrdt).split('/')
          let lr1 = lr[0]
          let lr2 = lr[1]
          let lr3 = lr[2]
          let lrdate = lr2 + '/' + lr1 + '/' + lr3
          lrDate = new Date(lrdate)
        }

        this.setState({
          accntDate: accountDate,
          invoiceDate: invoiceDate,
          lrnum: data[0].C_lRNo,
          stockiestValue: data[0].cust_Name,
          depotnameValue: data[0].DepoName,
          depotcode: data[0].c_dep_code,
          divisionlistValue: data[0].Div_Name == "All" ? "All" : data[0].Div_Name,
          invoicenum: data[0].c_invoice,
          stateValue: data[0].StateName,
          statedacode: data[0].stateCode,
          salevalue: data[0].n_non_tax_amt,
          taxamnt: data[0].n_tax_amt,
          totalInvoice: data[0].n_total,
          paymentDate: paymentDueDate,
          lrDate: lrDate,
          stockiestcode: data[0].c_cust_code,
          showcopytable: true,
          searchdata: true
        });
      }
    }
  }

  handleAccntDate(date) {
    let dateFormat = require('dateformat');
    if (`${dateFormat(date, "dd")}` > this.state.closingdate) {
      this.setState({ acntdaterr: "The Account Date You Entered Is Greater Than The Closing Date You Given", accntDate: date })
    } else {
      this.setState({ accntDate: date, acntdaterr: "" })
    }
  };

  handleInvoiceDate(date) {
    this.setState({ invoiceDate: date, invoicedaterr: "" })
    // if(this.state.accntDate == ""){
    //   this.setState({invoicedaterr:"Please select Acnt Date"})
    // }
    // if (this.state.accntDate != "") {
    //   this.setState({ invoiceDate: date })
    //   if (`${dateFormat(date, "dd")}` >= `${dateFormat(this.state.accntDate, "dd")}`) {
    //     this.setState({ invoicedaterr: "" })
    //   }
    //   else {
    //     this.setState({ invoicedaterr: "Invoice date should not be Lesser than Account Date!" })
    //   }
    // }
  }

  //onclick functionality of invoice date.
  handleInvoiceClick() {
    if (this.state.accntDate == "") {
      this.setState({ invoicedaterr: "Please Select Account date!" })
    }
  }

  handlePaymentDate(date) {
    this.setState({ paymentDate: date })
  }

  handleLrDate(date) {
    this.setState({ lrDate: date })
  }

  salesValue(data) {
    this.setState({ status: true })
    this.setState({ salevalue: data })
    // if(status == true){
    this.setState({ totalInvoice: parseFloat(this.state.taxamnt) + parseFloat(data) })
    // }
  }

  handleSearch() {
    this.setState({ searchtable: true });
    this.setState({ showcopytable: false });
  };

  getDepotnameValue(depotname) {
    this.setState({ depotnameValue: depotname })
    if (depotname != "") {
      this.setState({ depotnameErr: "" })
    }
    this.state.depotname.map((item) => {
      if (item.DepoName == depotname) {
        this.setState({ depotcode: item.DepoCode })
      }
    })
  }

  getStateValue(stateda) {
    if (this.state.searchdata == true) {
      this.setState({
        accntDate: "",
        invoiceDate: "",
        paymentDate: "",
        lrDate: "",
        depotnameValue: "-1",
        divisionlistValue: "All",
        divisionlistcode: "-1",
        stockiestValue: "-1",
        taxamnt: "0.00",
        lrnum: "",
        invoicenum: "",
        showcopytable: false,
        stateValue: stateda,
        fscode: "",
        fsname: "",
        salevalue: "0.00",
        totalInvoice: "0.00"

      })
      // var docdata = { "Index": "SalesNextNumber", "Data": {}, }
      // postToServer(URL_SALES, docdata)
      //   .then((response) => {
      //     if (response.status == 200) {
      //       this.setState({ docnum: response.data.data[0].nextid })
      //     }

      //   }).catch((Error) => {
      //     this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      //   })
    } else {
      this.setState({
        stateValue: stateda
      })
    }

    if (stateda != "") {
      this.setState({ stateErr: "" })
    }
    //if search true statevalue and call api  else also call api
    if (this.state.searchdata == true) {
      this.state.stateda.map((item) => {
        if (item.RegionName == this.state.stateValue) {
          this.setState({ statedacode: item.RegionCode })
          var stockistdata = {
            "Index": "SalesStockist",
            "Data": {
              "division": this.state.divisionlistValue == "All" ? "All" : this.state.divisionlistcode,
              "region": item.RegionCode
            },
            "Token": ""
          }
          postToServer(URL_SALES, stockistdata).then((response) => {
            if (response.status == 200) {
              this.setState({ stockiestname: response.data.data })
            }

          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
          })
        }
      })
    } else {
      this.state.stateda.map((item) => {
        if (item.RegionName == stateda) {
          this.setState({ statedacode: item.RegionCode })
          var stockistdata = {
            "Index": "SalesStockist",
            "Data": {
              "division": this.state.divisionlistValue == "All" ? "All" : this.state.divisionlistcode,
              "region": item.RegionCode
            },
            "Token": ""
          }
          postToServer(URL_SALES, stockistdata).then((response) => {
            if (response.status == 200) {
              this.setState({ stockiestname: response.data.data })
            }

          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
          })
        }
      })
    }
  }

  //   if (this.state.stateda.length > 0) {
  //     this.state.stateda.map((item) => {
  //       if (item.RegionName == stateda) {
  //      var stockistdata = { "Index": "SalesStockist", "Data": { "division": this.state.divisionlistValue == "-1" ? "All" : this.state.divisionlistcode, "region":item.RegionCode }, }
  //     postToServer(URL_SALES, stockistdata)
  //       .then((response) => {
  //         if (response.status == 200 ) {
  //           this.setState({ stockiestname: response.data.data })
  //         }

  //       }).catch((Error) => {
  //         this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
  //       })
  //     }
  //   })
  // }


  getDivisionValue(divisionlist) {
    this.setState({ stockiestValue: '-1', stockiestcode: '' })

    this.setState({ divisionlistValue: divisionlist })
    if (divisionlist != "") {
      this.setState({ divisionlistErr: "" })
    }
    if (this.state.searchdata == true) {
      this.setState({ stockiestValue: '-1', stockiestcode: '' })
    }
    this.state.divisionlist.map((item) => {
      if (item.text.trim() == divisionlist.trim()) {
        this.setState({ divisionlistcode: item.key })
        var stockistdata = {
          "Index": "SalesStockist",
          "Data": {
            "division": divisionlist == "All" ? "All" : item.key,
            "region": this.state.statedacode
          },
          "Token": ""
        }
        postToServer(URL_SALES, stockistdata).then((response) => {
          if (response.status == 200) {
            this.setState({ stockiestname: response.data.data })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
        })
      }
    })

  }

  getstokistValue(stockiestname) {
    this.setState({ stockiestValue: stockiestname })
    if (stockiestname != "") {
      this.setState({ stockistErr: "" })
    }
    this.state.stockiestname.map((item) => {
      if (item.StkName == stockiestname) {
        this.setState({ stockiestcode: item.StkCode })
      }
    })

    // if (this.state.stateda.length > 0) {
    //   this.state.stateda.map((item) => {
    //     if (item.RegionName == stateda) {
    //       var stockistdata = { "Index": "SalesStockist", "Data": { "division": this.state.divisionlistValue == "-1" ? "All" : this.state.divisionlistcode, "region": item.RegionCode }, }
    //       postToServer(URL_SALES, stockistdata)
    //         .then((response) => {
    //           if (response.status == 200) {
    //             this.setState({ stockiestname: response.data.data })
    //           }

    //         }).catch((Error) => {
    //           this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
    //         })
    //     }
    //   })
    // }
  }

  onStockistname() {
    if (this.state.stateValue == "-1") {
      this.setState({ stateErr: "Please Select the State !" })
    }
    // else if (this.state.stateErr == "") {
    //   var stockistdata = { "Index": "SalesStockist", "Data": { "division": this.state.divisionlistValue == "-1" ? "All" : this.state.divisionlistcode, "region": this.state.statedacode }, }
    //   postToServer(URL_SALES, stockistdata)
    //     .then((response) => {
    //       if (response.status == 200 ) {
    //         this.setState({ stockiestname: response.data.data })
    //       }

    //     }).catch((Error) => {
    //       this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
    //     })
    // }
  }

  onLoaditems() {
    let loadItems = [];
    let checkallData = false
    if (this.state.depotnameValue == "-1" || this.state.stockiestValue == "-1" || this.state.accntDate == "" || this.state.invoiceDate == "" || this.state.invoicenum == "") {
      if (this.state.depotnameValue == "-1") {
        this.setState({ depotnameErr: "Please Select the Depot Name!" })
      }
      if (this.state.stateValue == "-1") {
        this.setState({ stateErr: "Please Select the State!" })
      }
      if (this.state.stockiestValue == "-1") {
        this.setState({ stockistErr: "Please Select the Stockist Name!" })
      }
      if (this.state.accntDate == "") {
        this.setState({ acntdaterr: "Please Select the Account Date!" })
      }
      if (this.state.invoiceDate == "") {
        this.setState({ invoicedaterr: "Please Select the Invoice Date!" })
      }
      if (this.state.invoicenum == "") {
        this.setState({ invoicErr: "Please Enter an Invoice Number!" })
      }
    }
    else if (this.state.depotnameErr == "" && this.state.stockistErr == "" && this.state.acntdaterr == "" && this.state.invoicedaterr == "" && this.state.invoicErr == "") {
      let dateFormat = require('dateformat');
      let account = `${dateFormat(this.state.accntDate, "dd/mm/yyyy")}`

      //for poolfs/fsname
      var fsnamedata = {
        "Index": "SalesPoolOrFs",
        "Data": {
          "fromdate": account,
          "stockiest": this.state.stockiestcode,
          "division": this.state.divisionlistcode == "-1" ? "All" : this.state.divisionlistcode,
        },
      }
      postToServer(URL_SALES, fsnamedata).then((response) => {

        if (response.status == 200) {
          this.setState({ fsname: response.data.data[0].FSNAME, fscode: response.data.data[0].FSCODE })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
      })
      //for loaditems
      var loaditemdata = {
        "Index": "SalesLoadItem", "Data": {
          "fromdate": account,
          "division": this.state.divisionlistcode == "-1" ? "All" : this.state.divisionlistcode,
          "DocNo": this.state.docnum,
          "prefix": this.state.prefix,
          "depcode": this.state.depotcode,
          "year": this.state.yeardate
        },
      }

      postToServer(URL_SALES, loaditemdata).then((response) => {
        if (response.status == 200) {
          let qtyEmpty =  response.data.data.filter(res => (res.n_qty == "" || res.n_qty == "0") ? true : false)
          if(qtyEmpty.length > 0){
            checkallData = false
          }else{
            checkallData = true
          }
          response.data.data.map((res, i) => {
            loadItems.push({
              C_BATCH_NO: res.C_BATCH_NO.trim(),
              C_Code: res.C_Code,
              C_Name: res.C_Name,
              C_Pack: res.C_Pack,
              modi_Rate: res.modi_Rate == "" ? res.rate : res.modi_Rate,
              n_Sch_qty: res.n_Sch_qty,
              n_qty: res.n_qty,
              n_recpt_qty: res.n_recpt_qty,
              n_value: res.n_value,
              rate: res.rate,
              isChecked: false,
              Rowid: i + 1,
            })
          })
          this.setState({ loaditems: loadItems ,showcopytable: true,checkallData:checkallData,searchtable:false })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
      })
    }

  }

  // CheckAll functionality
  onCheckAll(event) {
    let loaditems = this.state.loaditems
    let checkallData = event.target.checked
    let qtyEmpty = loaditems.filter(res => res.n_qty == "" ? true : false)
    let qtyValid = loaditems.filter(res => (res.n_qty == 0 || res.n_qty == 0.00) ? true : false)
    let RateValid = loaditems.filter(res => (res.modi_Rate == "0" || res.modi_Rate == "0.00") ? true : false)
    if (qtyEmpty.length > 0) {
      checkallData = false
      alert("Please Enter Qty!!")
    } else if (qtyValid.length > 0) {
      checkallData = false
      alert("Please Enter Valid Qty!!")
    } else if (RateValid.length > 0) {
      checkallData = false
      alert("Please Enter Valid Rate!!")
    }
    else {
      loaditems.map(res => {
        checkallData = checkallData
        res.isChecked = checkallData
      })
    }

    this.setState({ loaditems: loaditems, checkallData: checkallData })

  }

  // Individual checkbox functionality
  onCheck(event) {
    let loaditems = this.state.loaditems
    loaditems.forEach(res => {
      if (res.C_Code == event.target.value) {
        res.isChecked = event.target.checked
      }
    })

    loaditems.map(res => {

      if (res.isChecked == true) {
        if (res.n_qty == "") {
          alert("Please Enter Qty !")
          res.isChecked = false
        } else if (res.n_qty == 0) {
          alert("Please Enter Valid Qty !")
          res.isChecked = false
        } else if (res.modi_Rate == "0" || res.modi_Rate == "0.00") {
          alert("Rate Should Be Greater Than 0!!!")
          res.isChecked = false
        }
        // if (res.n_qty != "") {
        //   res.isChecked = true
        // }else if(res.modi_Rate != "0" || res.modi_Rate != "0.00"){
        //   res.isChecked = true
        // }
        //  else if (res.n_qty == "") {

        //   alert("Please Select Qty !")
        //   res.isChecked = false
        // }else if(res.modi_Rate == "0" || res.modi_Rate == "0.00"){
        //   alert("Rate Should be greater than 0!!!").
        //   res.isChecked = false
        // }
        // if (res.n_qty == "" && res.C_BATCH_NO == "") {
        //   alert("Please Select Batch No and Qty !")
        //   res.isChecked = false
        // }

        // else if (res.C_BATCH_NO == "") {
        //   alert("Please Select Branch No !")
        //   res.isChecked = false
        // }
        // }
      }
    })
    this.setState({ loaditems: loaditems })

  }

  componentDidMount() {


    var depotnamedata = { "Index": "DepotName", "Data": {}, }
    postToServer(URL_SALES, depotnamedata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ depotname: response.data.data })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var statedata = { "Index": "StateList", "Data": {}, }
    postToServer(URL_SALES, statedata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ stateda: response.data.data })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var divisiondata = { "Index": "DevisionList", "Data": {}, }
    postToServer(URL_SALES, divisiondata)
      .then((response) => {
        if (response.status == 200) {
          let divisionList = []
          divisionList.push({
            "key": '-1',
            "text": 'All',
            "value": 'All',
          })
          response.data.data.map(item => {
            divisionList.push(
              {
                "key": item.DivisionCode,
                "text": item.DivisionName,
                "value": item.DivisionName.toLowerCase()
              })
          })
          this.setState({ divisionlist: divisionList })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var yeardata = { "Index": "SalesYear", "Data": {}, }
    postToServer(URL_SALES, yeardata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ yeardate: response.data.data[0].N_year })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var prefixdata = { "Index": "SalesPrefix", "Data": {}, }
    postToServer(URL_SALES, prefixdata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ prefix: response.data.data[0].c_prefixGDN })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var docdata = { "Index": "SalesNextNumber", "Data": {}, }
    postToServer(URL_SALES, docdata)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ docnum: response.data.data[0].nextid })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var closingday = { "Index": "SalesCloseDay", "Data": {}, }
    postToServer(URL_SALES, closingday)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ closingdate: response.data.data[0].n_closingday })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })
  }

  render() {
    let depotnamedropdown = []
    let statedropdown = []
    let divisiondropdown = []
    let stockistdropdown = []



    if (this.state.depotname.length > 0) {
      this.state.depotname.map((item) => {
        depotnamedropdown.push(

          {
            "key": item.DepoCode,
            "text": item.DepoName,
            "value": item.DepoName.toLowerCase()
          })
      })
    }



    if (this.state.stateda.length > 0) {
      this.state.stateda.map((item) => {
        statedropdown.push({
          "key": item.RegionCode,
          "text": item.RegionName,
          "value": item.RegionName.toLowerCase()
        })
      })
    }

    // if (this.state.divisionlist.length > 0) {
    //   divisiondropdown.push({
    //     "key": '-1',
    //     "text": 'All',
    //     "value": 'All',
    // }),
    //   this.state.divisionlist.map((item) => {

    //     divisiondropdown.push(
    //     {
    //       "key": item.DivisionCode,
    //       "text": item.DivisionName,
    //       "value": item.DivisionName.toLowerCase()
    //     })
    //   })
    // }

    if (this.state.stockiestname.length > 0) {
      this.state.stockiestname.map((item) => {
        stockistdropdown.push({
          "key": item.StkCode,
          "text": item.StkName,
          "value": item.StkName.toLowerCase()
        })
      })
    }

    return (
      <React.Fragment>

        <div className="pullleft KamClaimTablesfc">
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers campaign-dd">
                <SearchDropdown
                  className="designation"
                  labelName="Depot Name"
                  important={true}
                  errorMessage={this.state.depotnameErr}
                  placeholder="Select Depot Name"
                  Selected={this.state.depotnameValue}
                  dropdownList={depotnamedropdown}
                  getValue={this.getDepotnameValue}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="State"
                  important={true}
                  errorMessage={this.state.stateErr}
                  placeholder="Select State"
                  Selected={this.state.stateValue}
                  dropdownList={statedropdown}
                  getValue={this.getStateValue}
                />
              </div>
            </div>
            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Division"
                  important={true}
                  placeholder="Select Division"
                  Selected={this.state.divisionlistValue}
                  dropdownList={this.state.divisionlist}
                  getValue={this.getDivisionValue}
                />
              </div>
            </div>
            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Stockist Name"
                  important={true}
                  errorMessage={this.state.stockistErr}
                  placeholder="Select Stockist "
                  Selected={this.state.stockiestValue}
                  dropdownList={stockistdropdown}
                  getValue={this.getstokistValue}
                // onClickDropdown={this.onStockistname}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">

                <div className="selectlocation">
                  <Form.Label className="customized-label">Account Date <span className="colorRed">*</span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.accntDate}
                      onChange={this.handleAccntDate}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="pSales-daterror-msg"> {this.state.acntdaterr} </div>
              </div>

            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Sales Value </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.salevalue}
                    placeholder=""
                    disabled={true}
                    min="0"
                  //   onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Tax Amount  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="number"
                    className="customized-input"
                    onChange={(e) => { this.getTaxAmount(e) }}
                    value={this.state.taxamnt}
                    placeholder="0.00"
                    min="0"
                    pattern="\d*"
                    maxlength="10"
                  // onWheel={event => event.currentTarget.blur()}
                  /></div>
                </div>
                <div className="pSales-inverror-msg">{this.state.taxamntErr}</div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Total Invoice Amount </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.totalInvoice}
                    placeholder="0.00"
                    disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">

                <div className="selectlocation">
                  <Form.Label className="customized-label">Invoice Date <span className="colorRed">*</span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.invoiceDate}
                      onChange={this.handleInvoiceDate}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="pSales-daterror-msg"> {this.state.invoicedaterr} </div>
              </div>

            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">

                <div className="selectlocation">
                  <Form.Label className="customized-label">Payment Due Date</Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.paymentDate}
                      onChange={this.handlePaymentDate}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                {/* <div className="pSales-daterror-msg"> {this.state.acntdaterr} </div> */}
              </div>

            </div>
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Year </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    placeholder={this.state.yeardate}
                    disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Prefix </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    placeholder={this.state.prefix}
                    disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Doc No. </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    placeholder={this.state.docnum}
                    disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">

                <div className="selectlocation">
                  <Form.Label className="customized-label">LR Date</Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.lrDate}
                      onChange={this.handleLrDate}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">LR No. </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.getLRNum(e) }}
                    value={this.state.lrnum}
                    placeholder=""
                    min="0"
                    maxlength="10"
                    onWheel={event => event.currentTarget.blur()}
                  /></div>
                </div>
                <div className="pSales-inverror-msg">{this.state.lrnumErr}</div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">Invoice No.<span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.getInvoiceNumber(e) }}
                    value={this.state.invoicenum}
                    placeholder=""
                    min="0"
                    pattern="\d*"
                    maxlength="10"
                    onWheel={event => event.currentTarget.blur()}
                  /></div>
                </div>
                <div className="pSales-inverror-msg">{this.state.invoicErr}</div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation">FS Name/Pool Name </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    placeholder=""
                    value={this.state.fscode == "" ? this.state.fsname : this.state.fsname + "(" + this.state.fscode + ")"}
                    disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>
            <Button className="sfcAddBtn-loaditem" onClick={this.onLoaditems}>Load Items</Button>

            <Button className="sfcAddBtn-loaditem" onClick={this.handleSearch}>Search</Button>
            <Button variant="outline-danger" className="qw" onClick={this.cancel}>Cancel</Button>

          </div>
        </div>
        {this.state.searchtable == true ?
          <div className="pullleft KamClaimTablesfc">
            <Pmastersearchtable
              SaleSelectSearch={this.SaleSelectSearch}
              //  onLoaditems={this.onLoaditems}
              salesValue={this.salesValue}

            /></div> : null}
        {this.state.showcopytable == true ?
          <Pmastertable
            loaditems={this.state.loaditems}
            depotcode={this.state.depotcode}
            year={this.state.yeardate}
            prefix={this.state.prefix}
            docnum={this.state.docnum}
            accntDate={this.state.accntDate}
            stockiestcode={this.state.stockiestcode}
            depotnameValue={this.state.depotnameValue}
            // totalvalue
            taxamnt={this.state.taxamnt}
            // invoiceamount
            lrnum={this.state.lrnum}
            lrDate={this.state.lrDate}
            fscode={this.state.fscode}
            invoicenum={this.state.invoicenum}
            paymentDate={this.state.paymentDate}
            DivisionCode={this.state.divisionlistcode}
            invoiceDate={this.state.invoiceDate}
            onCheckAll={this.onCheckAll}
            onCheck={this.onCheck}
            checkallData={this.state.checkallData}
            salesvalue={this.salesValue}
            hideTableCopy={this.hideTableCopy}
            ValueChangeUpdate={this.ValueChangeUpdate}
            searchdata={this.state.searchdata}
          />
          : null}
      </React.Fragment>
    )
  }
}
export default Pmasterdropdown;







{/* <React.Fragment>

<div className="pullleft KamClaimTablesfc">
  {/* <div className="primarysale-target">HQ/FS Wise Primary Sales Target</div> 
  <div className="alldropsfclocation">
    <div className="locationsfa">
      <div className="pvalue user-heirarchy-field-containers pmast">
        <SearchDropdown
          labelName="Depot Name"
          errorMessage={this.state.depotnameErr}
          disabled={true}
          important={true}
          placeholder="Please Select"
          Selected={this.state.depotnameValue}
          dropdownList={depotnamedropdown}
          getValue={this.getDepotnameValue}
        />
      </div>
    </div>
    <div className="locationsfa">
      <div className="pvalue user-heirarchy-field-containers pmast">
        <SearchDropdown
          labelName="State"
          errorMessage={this.state.stateErr}
          disabled={true}
          important={true}
          placeholder="Please Select"
          Selected={this.state.stateValue}
          dropdownList={statedropdown}
          getValue={this.getStateValue}
        />
      </div>
    </div>

    <div className="locationsfa">
      <div className="pvalue user-heirarchy-field-containers pmast">
        <SearchDropdown
          labelName="Division"
          errorMessage={this.state.divisionlistErr}
          disabled={true}
          important={true}
          placeholder="All"
          Selected={this.state.divisionlistValue}
          dropdownList={divisiondropdown}
          getValue={this.getDivisionValue}
        />
      </div>
    </div>
    {/* <div  className = "alldropsfclocation1"> 
    <div className="locationsfa">
      <div className="pvalue user-heirarchy-field-containers pmast">
        <SearchDropdown
          labelName="Stockist Name"
          errorMessage={this.state.stockistErr}
          disabled={true}
          important={true}
          placeholder="Please Select"
          Selected={this.state.stockiestValue}
          dropdownList={stockistdropdown}
          getValue={this.getstokistValue}
          onClickDropdown={this.onStockistname}
        />
      </div>
    </div>
    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Account Date<span className="colorRed">*</span> </p>
        </div>
        <div className="selectlocation">
          <div className="datepickerAligment">
            <DatePicker
              selected={this.state.accntDate }
              onChange={this.handleAccntDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
            />
          </div>
        </div>
        <div className="daterror-msg"> {this.state.acntdaterr} </div>
      </div>

    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Sales Value<span className="colorRed">*</span> </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            value={this.state.salevalue}
            placeholder="0.00"
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Tax Amount  </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="number"
            className="customized-input"
            onChange={(e) => { this.setState({ taxamnt: e.target.value }) }}
            value={this.state.taxamnt}
            placeholder="0.00"
            min="0"
            pattern="\d*"
            maxlength="10"
            onWheel={event => event.currentTarget.blur()}
          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Total Invoice Amount </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            value={this.state.status == true ? parseFloat(this.state.totalInvoice) : parseFloat(this.state.salevalue)}
            placeholder="0.00"
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Invoice Date<span className="colorRed">*</span> </p>
        </div>
        <div className="selectlocation">
          <div className="datepickerAligment" onClick={this.handleInvoiceClick}>
            <DatePicker
              selected={this.state.invoiceDate}
              onChange={this.handleInvoiceDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
            />
          </div>
        </div>
        <div className="daterror-msg"> {this.state.invoicedaterr} </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Payment Due Date </p>
        </div>
        <div className="selectlocation">
          <div className="datepickerAligment">
            <DatePicker
              selected={this.state.paymentDate}
              onChange={this.handlePaymentDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Year </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            placeholder={this.state.yeardate}
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">prefix </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            placeholder={this.state.prefix}
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Doc No. </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            placeholder={this.state.docnum}
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">LR Date </p>
        </div>
        <div className="selectlocation">
          <div className="datepickerAligment">
            <DatePicker
              selected={this.state.lrDate}
              onChange={this.handleLrDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">LR No. </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            onChange={(e) => { this.setState({ lrnum: e.target.value }) }}
            value={this.state.lrnum}
            placeholder="0.00"
            min="0"
            pattern="\d*"
            maxlength="10"
            onWheel={event => event.currentTarget.blur()}
          /></div>
        </div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">Invoice No.<span className="colorRed">*</span> </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            onChange={(e) => { this.setState({ invoicenum: e.target.value }); this.setState({ invoicErr: "" }) }}
            value={this.state.invoicenum}
            placeholder="0.00"
            min="0"
            pattern="\d*"
            maxlength="10"
            onWheel={event => event.currentTarget.blur()}
          /></div>
        </div>
        <div className="daterror-msg">{this.state.invoicErr}</div>
      </div>
    </div>

    <div className="locationsfa">
      <div className="user-heirarchy-field-containers">
        <div className="distributorClaimListsfc">
          <p className="paralocation">FS Name/Pool Name </p>
        </div>
        <div className="selectlocation">
          <div><input
            type="text"
            className="customized-input"
            placeholder={this.state.fsname}
            disabled={true}
            min="0"
            onWheel={event => event.currentTarget.blur()}

          /></div>
        </div>
      </div>
    </div>

    <Button className="sfcAddBtn-loaditem" onClick={this.onLoaditems}>Load Items</Button>

    <Button  className="sfcAddBtn-loaditem" onClick={this.handleSearch}>Search</Button>

  </div>
  {/* <div  className="primarysale-target1">Target On: Price To Retailer</div> 
</div>
<div>
{this.state.searchtable == true ?
  <div className="pullleft KamClaimTablesfc">
    <Pmastersearchtable 
    SaleSelectSearch={this.SaleSelectSearch}
    onLoaditems={this.onLoaditems}
    /></div> :null} 
    </div>
    <div>
    {this.state.showcopytable == true ?
  <Pmastertable
    loaditems={this.state.loaditems}
    depotcode={this.state.depotcode}
    year={this.state.yeardate}
    prefix={this.state.prefix}
    docnum={this.state.docnum}
    accntDate={this.state.accntDate}
    stockiestcode={this.state.stockiestcode}
    // totalvalue
    taxamnt={this.state.taxamnt}
    // invoiceamount
    lrnum={this.state.lrnum}
    lrDate={this.state.lrDate}
    fscode={this.state.fscode}
    invoicenum={this.state.invoicenum}
    paymentDate={this.state.paymentDate}
    DivisionCode={this.state.divisionlistcode}
    invoiceDate={this.state.invoiceDate}
    onCheckAll={this.onCheckAll}
    onCheck={this.onCheck}
    salesvalue={this.salesValue}
    hideTableCopy={this.hideTableCopy}
  />
  :null}
  </div>

</React.Fragment> */}