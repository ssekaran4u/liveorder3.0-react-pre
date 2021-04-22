import React from 'react'
import { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import '../../../../../public/assets/css/sfcstyle.css'
import '../../../../../public/assets/css/transactionmodule.css'
import { postToServer } from '../../../../lib/comm-utils'
import SSalesApprovalLoadTable from './SSalesApprovalLoadTable'
import SearchDropdown from "../../../../BasicComponet/searchDropdown";
import { withRouter, Redirect } from 'react-router-dom'
import { Modal, Table } from "react-bootstrap";


class SSalesApprovalDropdown extends Component {

  constructor(props) {
    super(props)
    this.state = {
      SelectedFS: '-1',
      SelectedFscode: '',
      SelectMonth: '',
      SelectedYear: '',
      SelectedStockist: '-1',
      SelectedStockistCode: '',
      FS: [],
      Month: [],
      Year: [],
      SecSalesTypr: [],
      LoadDatalist: [],
      loadDataListTotal: [],
      loadItemTableShow: false,
      nonoptStockist: '',
      selecSecSalesTyprCode: '',
      salesValueEdit: "",
      FlagForLoadItems: [],


    }
    this.getDivision = this.getDivision.bind(this)
    this.loadItems = this.loadItems.bind(this)
    this.salesValueEdit = this.salesValueEdit.bind(this)
    this.ItemRate = this.ItemRate.bind(this)


  }
  ItemRate(data, dataTotal) {
    this.setState({ LoadDatalist: data, loadDataListTotal: dataTotal })
  }
  salesValueEdit() {

    var data = { "index": "GetSecSalesvalueEdit", "Data": {}, "Token": "" }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ salesValueEdit: Result.data.data[0].N_secvalue })
      }
    })
      .catch(e => {
      })
  }
  getDivision(fscode) {
    var data = { "index": "secondSalesdivision", "Data": { "SelectedFscode": fscode } }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ getDivisionstr: Result.data.data[0].Division })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })



  }
  loadItems(fs, month, year, stockist, entertype) {
    var data = {
      "index": "SecSalesLoadItem",
      "Data": {
        "month": month.toString(),
        "year": year.toString(),
        "selectedFs": fs,
        "stockist": stockist,
        "SalesType": entertype
      }

    }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        var data2 = {
          "index": "secondSalesOtherFlag",
          "Data": {},
          "Token": ""
        }
        this.setState({ loadItemTableShow: true, LoadDatalist: Result.data["data"][0], loadDataListTotal: Result.data.data[1] })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })

  }
  componentDidMount() {
    this.salesValueEdit()
    //for sales tyep
    let selecSecSalesTypr = ''
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
            selecSecSalesTypr = a.c_code,
              this.setState({ selecSecSalesTypr: a.c_name, selecSecSalesTyprCode: a.c_code })
          }
        }, this.setState({ SecSalesTypr: SecSalesTypr }))
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
    var data2 = {
      "index": "secondSalesOtherFlag",
      "Data": {},
      "Token": ""
    }
    postToServer("Sales", data2).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ FlagForLoadItems: Result.data.data[0] })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
    //header 
    var data = {
      "index": "SecSalesApprovalheader",
      "Data": {
        "srno": this.props.data.match.params.id
      },
      "Token": ""
    }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.getDivision(Result.data.data[0].c_enteredby)
        //for fs
        let FS = []
        FS.push({
          key: Result.data.data[0].c_enteredby,
          text: Result.data.data[0].fsname,
          value: Result.data.data[0].fsname,
        })
        //for month
        var d = new Date();
        var n = d.getMonth() + 1;
        let monthsArray = ["Select Month", "January", "Febrarury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const Month = [
          {
            key: Result.data.data[0].n_month,
            value: Result.data.data[0].n_month,
            text: monthsArray[Result.data.data[0].n_month]
          },
        ]
        //for year
        let Year = []
        Year.push({
          key: Result.data.data[0].n_year,
          text: Result.data.data[0].n_year,
          value: Result.data.data[0].n_year,
        })
        //for stockist
        let Stockist = []
        Stockist.push({
          key: Result.data.data[0].c_stockist_code,
          text: Result.data.data[0].stockiestname + "(" + Result.data.data[0].c_stockist_code + ")",
          value: Result.data.data[0].stockiestname + "(" + Result.data.data[0].c_stockist_code + ")",
        })
        this.loadItems(Result.data.data[0].c_enteredby, Result.data.data[0].n_month, Result.data.data[0].n_year, Result.data.data[0].c_stockist_code, selecSecSalesTypr)
        this.setState({
          FS: FS,
          Month: Month,
          Year: Year,
          Stockist: Stockist,
          SelectedFS: Result.data.data[0].fsname,
          SelectedFscode: Result.data.data[0].c_enteredby,
          SelectMonth: Result.data.data[0].n_month,
          SelectedYear: Result.data.data[0].n_year,
          SelectedStockist: Result.data.data[0].stockiestname + "(" + Result.data.data[0].c_stockist_code + ")",
          SelectedStockistCode: Result.data.data[0].c_stockist_code,


        })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
    //non-operating stockist
    var data2 = {
      "index": "SecSalesApprovalNonOpStckst",
      "Data": {
        "srno": this.props.data.match.params.id
      },
      "Token": ""
    }
    postToServer("Sales", data2).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ nonoptStockist: Result.data["data"][0].Result })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc">
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
              <div className="user-heirarchy-field-containers campaign-dd">
                <SearchDropdown
                  className="designation"
                  labelName="Month"
                  important={true}
                  placeholder="Select Month"
                  Selected={this.state.SelectMonth}
                  dropdownList={this.state.Month}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers campaign-dd">
                <SearchDropdown
                  className="designation"
                  labelName="Year"
                  important={true}
                  placeholder="Select Year"
                  Selected={this.state.SelectedYear}
                  dropdownList={this.state.Year}
                />
              </div>
            </div>
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers campaign-dd">
                <SearchDropdown
                  className="designation"
                  labelName="Stockist"
                  important={true}
                  placeholder="Select Stockist"
                  Selected={this.state.SelectedStockist}
                  dropdownList={this.state.Stockist}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers campaign-dd">
                <SearchDropdown
                  className="designation"
                  labelName="Enter"
                  important={true}
                  placeholder="Select Type"
                  Selected={this.state.selecSecSalesTypr}
                  dropdownList={this.state.SecSalesTypr}
                />
              </div>
            </div>

            <div className="locationsfa dropdown-1">
              <div className="distributorClaimListsfc">
                <p className="paralocation">Division<span className="colorRed">*</span> </p>
              </div>
              <div className="selectlocation">
                <p className="sec-division">
                  {this.state.getDivisionstr}

                </p>
              </div>
            </div>
          </div>
        </div>
        {this.state.loadItemTableShow ?
          <SSalesApprovalLoadTable
            selecSecSalesTypr={this.state.selecSecSalesTyprCode}
            data={this.state.LoadDatalist}
            stockist={this.state.SelectedStockistCode}
            fs={this.state.SelectedFscode}
            dataTotal={this.state.loadDataListTotal}
            month={this.state.SelectMonth}
            year={this.state.SelectedYear}
            nonoptStockist={this.state.nonoptStockist}
            salesValueEdit={this.state.salesValueEdit}
            ItemRate={this.ItemRate}
            FlagForLoadItems={this.state.FlagForLoadItems}


          //  poolFlag = {this.state.poolFlag}
          //  salesValueEdit ={this.state.salesValueEdit}
          // prevmonthEdit = {this.state.prevmonthEdit} 
          //   ItemRate ={this.ItemRate}
          //   loadItemTable={this.loadItemTable}
          />
          : null}
      </React.Fragment>
    )
  }
}
export default SSalesApprovalDropdown;        