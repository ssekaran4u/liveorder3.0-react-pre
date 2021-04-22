import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../../lib/comm-utils'
import { URL_SALES } from '../../../lib/constants'
import Drop from './../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import SearchDropdown from "./../../../BasicComponet/searchDropdown";

import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import SecondaryCopyfrom from './secondarycopyfrom';
import Secondarytargetable from './secondarytargetable';
import SfaSpinner from "./../../../BasicComponet/sfaSpinner";

class Secondarydropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Error: false,
      Errormsg: '',
      designation: [],
      designationValue: "-1",
      designationErr: "",
      descode: "",
      region: [],
      regionValue: "-1",
      regionErr: "",
      regioncode: "",
      fshq: [],
      fshqValue: "-1",
      fshqErr: "",
      fshqcode: "",
      typedat: [],
      typeValue: "-1",
      typeErr: "",
      typedatcode: "",
      yeardat: [],
      yearValue: "-1",
      yearErr: "",
      yeardatcode: "",
      targetype: [],
      targetypeValue: "-1",
      targetpyeErr: "",
      targetypecode: "",
      fshqname: [],
      fshqnameValue: "-1",
      fshqnameErr: "",
      fshqnamecode: "",
      loaditems: [],
      showcopytable: false,
      spinner: false,
      secondaryheader : "",

      copyfromValue: "-1",
      copyfromErr: "",
      copyfromcode: "",
      copyfromyear: "",
      copyfrom:[],
    }
    this.getDesignationValue = this.getDesignationValue.bind(this)
    this.getRegionValue = this.getRegionValue.bind(this)
    this.getFshqValue = this.getFshqValue.bind(this)
    this.getTypeValue = this.getTypeValue.bind(this)
    this.getYearValue = this.getYearValue.bind(this)
    this.getTargetpyeValue = this.getTargetpyeValue.bind(this)
    this.onClickTargetpte = this.onClickTargetpte.bind(this)
    this.getFshqnameValue = this.getFshqnameValue.bind(this)
    this.onClickFshqname = this.onClickFshqname.bind(this)
    this.OnLoaditem = this.OnLoaditem.bind(this)
    this.target = this.target.bind(this)
    this.hideTableCopy = this.hideTableCopy.bind(this)
    this.CopyFromdata = this.CopyFromdata.bind(this)
    this.getCopyfromValue = this.getCopyfromValue.bind(this)

  }


  hideTableCopy() {
    this.setState({ showcopytable: false })
  }

  target(data) {
    this.setState({ loaditems: data })
  }

  getDesignationValue(designation) {
    this.setState({ designationValue: designation , showcopytable : false})
    if (designation != "") {
      this.setState({ designationErr: "" })
    }
    this.state.designation.map((item) => {
      if (item.c_name == designation) {
        this.setState({ descode: item.n_type })
      }
    })
  }

  getRegionValue(region) {
    this.setState({ regionValue: region , showcopytable : false})
    if (region != "") {
      this.setState({ regionErr: "" })
    }
    this.state.region.map((item) => {
      if (item.c_name == region) {
        this.setState({ regioncode: item.c_code })
      }
    })
  }

  getFshqValue(fshq) {
    this.setState({ fshqValue: fshq , showcopytable : false})
    if (fshq != "") {
      this.setState({ fshqErr: "" })
    }
    this.state.fshq.map((item) => {
      if (item.Name == fshq) {
        this.setState({ fshqcode: item.Code, targetypeValue: "-1" })
      }
    })

    if (this.state.fshq.length > 0) {
      this.state.fshq.map((item) => {
        // console.log(fshq, "fsshhqq")
        if (item.Name == fshq) {
          var targetpyedata = { "Index": "SecondarySalesTargetType", "Data": { "FSHQType": item.Code }, }
          postToServer(URL_SALES, targetpyedata).then((response) => {
            // console.log(response, "targetpyedata")
            if (response.status == 200) {
              this.setState({ targetype: response.data.data, fshqnameValue: "-1" })

            }
          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
          })
        }
      })
    }
  }

  getTypeValue(typedat) {
    this.setState({ typeValue: typedat , showcopytable : false})
    if (typedat != "") {
      this.setState({ typeErr: "" })
    }
    this.state.typedat.map((item) => {
      if (item.Name == typedat) {
        this.setState({ typedatcode: item.Code })
      }
    })
  }

  getYearValue(yeardat) {
    this.setState({ yearValue: yeardat , showcopytable : false})
    if (yeardat != "") {
      this.setState({ yearErr: "" })
    }
    this.state.yeardat.map((item) => {
      if (item.Name == yeardat) {
        this.setState({ yeardatcode: item.Code })
      }
    })
  }

  getTargetpyeValue(targetype) {
    this.setState({ targetypeValue: targetype , showcopytable : false})
    if (targetype != "") {
      this.setState({ targetpyeErr: "" })
    }
    this.state.targetype.map((item) => {
      if (item.c_name == targetype) {
        this.setState({ targetypecode: item.c_code })
      }
    })
  }

  onClickTargetpte() {
    if (this.state.fshqValue == "-1") {
      this.setState({ fshqErr: "Please Select the FS/HQ !" })
    }
  }

  getFshqnameValue(fshqname) {
    this.setState({ fshqnameValue: fshqname , showcopytable : false})
    if (fshqname != "") {
      this.setState({ fshqnameErr: "" })
    }
    this.state.fshqname.map((item) => {
      if (item.c_name == fshqname) {
        this.setState({ fshqnamecode: item.c_code })
      }
    })
  }

  onClickFshqname() {
    if (this.state.fshqValue == "-1" || this.state.designationValue == "-1" || this.state.regionValue == "-1") {
      if (this.state.fshqValue == "-1") {
        this.setState({ fshqErr: "Please Select the FS/HQ !" })
      }
      if (this.state.designationValue == "-1") {
        this.setState({ designationErr: "Please Select the Designation !" })
      }
      if (this.state.regionValue == "-1") {
        this.setState({ regionErr: "Please Select the Region !" })
      }
    }
    else if (this.state.designationErr == "" && this.state.regionErr == "" && this.state.fshqErr == "") {
      var fshqnamedata = { "Index": "SalesFSName", "data": { "region": this.state.regioncode, "fsType": this.state.descode, "fsHQ": this.state.fshqcode } }
      postToServer(URL_SALES, fshqnamedata).then((response) => {
        // console.log(response, "fshqnamedata")
        if (response.status == 200) {
          this.setState({ fshqname: response.data.data })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
      })
    }
  }

  OnLoaditem() {
    if (this.state.fshqValue == "-1" || this.state.designationValue == "-1" || this.state.regionValue == "-1" || this.state.typeValue == "-1" || this.state.yearValue == "-1" || this.state.targetypeValue == "-1" || this.state.fshqnameValue == "-1") {
      if (this.state.fshqValue == "-1") {
        this.setState({ fshqErr: "Please Select the FS/HQ !" })
      }
      if (this.state.designationValue == "-1") {
        this.setState({ designationErr: "Please Select the Designation !" })
      }
      if (this.state.regionValue == "-1") {
        this.setState({ regionErr: "Please Select the Region !" })
      }
      if (this.state.typeValue == "-1") {
        this.setState({ typeErr: "Please Select the Type !" })
      }
      if (this.state.yearValue == "-1") {
        this.setState({ yearErr: "Please Select the Year !" })
      }
      if (this.state.targetypeValue == "-1") {
        this.setState({ targetpyeErr: "Please Select the TargetType !" })
      }
      if (this.state.fshqnameValue == "-1") {
        this.setState({ fshqnameErr: "Please Select the FS/HQ Name !" })
      }
    }
    else if (this.state.typeErr == "" && this.state.yearErr == "" && this.state.targetpyeErr == "" && this.state.fshqnameErr == "") {
    this.setState({ spinner: true })
     
      var loaditemdata = {
        "Index": "SecondarySalesListTargetItem", "Data": {
          "hqFsCode": this.state.fshqnamecode,
          "region": this.state.regioncode,
          "yearType": this.state.typedatcode,
          "Designation": this.state.descode,
          "targetType": this.state.targetypecode,
          "hqOrFS": this.state.fshqcode,
          "nYear": this.state.yeardatcode
        },
      }
      postToServer(URL_SALES, loaditemdata).then((response) => {
        // console.log(response, "loaditemdata")
        if (response.status == 200) {
          this.setState({ loaditems: response.data.data })
          this.setState({ showcopytable: true })
          this.setState({ spinner: false ,copyfromValue : "-1"})
          this.CopyFromdata()
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
      })
    }
  }

  getCopyfromValue(copyfrom) {
    this.setState({ copyfromValue: copyfrom })
    if (copyfrom != "") {
      this.setState({ copyfromErr: "" })
    }
    this.state.copyfrom.map((item) => {
      // console.log(copyfrom,"data")
      if (item.c_name == copyfrom) {
        // this.setState({ copyfromcode: item.c_code })
        // this.setState({ copyfromyear: item.c_year })
        // console.log(this.state.descode, this.state.regioncode, this.state.fshqcode, this.state.typedatcode,this.state.yeardatcode, this.state.targetypecode, this.state.fshqnamecode,item.c_code,  item.c_year,"codde")
        var loaditemdata = {
          "Index": "ListTargetItem", "Data": {
            "hqFsCode": item.c_code,
            "region": this.state.regioncode,
            "yearType": this.state.typedatcode,
            "Designation": this.state.descode,
            "targetType": this.state.targetypecode,
            "hqOrFS": this.state.fshqcode,
            "nYear": item.c_year
          },
        }
        postToServer(URL_SALES, loaditemdata).then((response) => {
          // console.log(response, "loaditemdata")
          if (response.status == 200 ) {
            this.setState({ loaditems: response.data.data })
            this.props.target(response.data.data)
          }
        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
        })
      }
    })
  }
  CopyFromdata(){
    console.log("CopyFromdata")
    var copyfromdata = { "Index": "CopyFrom", "Data": { "TargetType": this.state.targetypecode, "fshq": this.state.fshqcode }, }
    postToServer(URL_SALES, copyfromdata)
      .then((response) => {
        // console.log(response, "copyfromdata")
        if (response.status == 200 ) {
          this.setState({ copyfrom: response.data.data })
        // alert("ppp")
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })
  }

  componentDidMount() {
    var desgdata = { "Index": "ListDesignation" }
    postToServer(URL_SALES, desgdata)
      .then((response) => {
        // console.log(response, "desgdata")
        if (response.status == 200) {
          this.setState({ designation: response.data.data })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })

    var regiondata = { "Index": "ListRegion" }
    postToServer(URL_SALES, regiondata).then((response) => {
      // console.log(response, "regiondata")
      if (response.status == 200) {
        this.setState({ region: response.data.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
    })

    var fsdata = { "Index": "FSHQ" }
    postToServer(URL_SALES, fsdata).then((response) => {
      // console.log(response, "fsdata")
      if (response.status == 200) {
        this.setState({ fshq: response.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
    })

    var typedata = { "Index": "YearType" }
    postToServer(URL_SALES, typedata).then((response) => {
      // console.log(response, "typedata")
      if (response.status == 200) {
        this.setState({ typedat: response.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
    })

    var yeardata = { "Index": "TargetYear" }
    postToServer(URL_SALES, yeardata).then((response) => {
      // console.log(response, "yeardata")
      if (response.status == 200) {
        this.setState({ yeardat: response.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
    })

    var header = { "Index":"GetSecSalesHead","Data":{}, }
    postToServer(URL_SALES, header).then((response) => {
      console.log(response, "header")
      if (response.status == 200) {
        this.setState({ secondaryheader: response.data.data[0].SecSalesHeading })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
    })


  }

  render() {
    let designationdropdown = []
    let regiondropdown = []
    let fshqdropdown = []
    let typedropdown = []
    let yeardropdown = []
    let targetypedropdown = []
    let fshqnamedropdown = []

    if (this.state.designation.length > 0) {
      this.state.designation.map((item) => {
        designationdropdown.push({
          "key": item.n_type,
          "text": item.c_name,
          "value": item.c_name,
        })
      })
    }

    if (this.state.region.length > 0) {
      this.state.region.map((item) => {
        regiondropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    if (this.state.fshq.length > 0) {
      this.state.fshq.map((item) => {
        fshqdropdown.push({
          "key": item.Code,
          "text": item.Name,
          "value": item.Name.toUpperCase()
        })
      })
    }

    if (this.state.typedat.length > 0) {
      this.state.typedat.map((item) => {
        typedropdown.push({
          "key": item.Code,
          "text": item.Name,
          "value": item.Name.toLowerCase()
        })
      })
    }

    if (this.state.yeardat.length > 0) {
      this.state.yeardat.map((item) => {
        yeardropdown.push({
          "key": item.Code,
          "text": item.Name,
          "value": item.Name.toLowerCase()
        })
      })
    }

    if (this.state.targetype.length > 0) {
      this.state.targetype.map((item) => {
        targetypedropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    if (this.state.fshqname.length > 0) {
      this.state.fshqname.map((item) => {
        fshqnamedropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    // console.log(this.state.designation, designationdropdown,this.statedesignationValue,"designationdropdown")
    // console.log(this.state.region, regiondropdown, this.state.regionValue, "regiondropdown")
    // console.log(this.state.fshq, fshqdropdown, this.state.fshqValue, "regiondropdown")
    // console.log(this.state.typedat, typedropdown, this.state.typeValue, "typedropdown")
    // console.log(this.state.yeardat, yeardropdown, this.state.yearValue, "yeardropdown")
    // console.log(this.state.targetype, targetypedropdown, this.state.targetypeValue, "targetypedropdown")
    // console.log(this.state.fshqname,fshqnamedropdown,this.state.fshqnameValue,"fshqnamedropdown")
    // console.log(this.state.descode, this.state.regioncode, this.state.fshqcode, "descode")
    // console.log(this.state.descode, this.state.regioncode, this.state.fshqcode, this.state.typedatcode, this.state.yeardatcode, this.state.targetypecode, this.state.fshqnamecode, "descode")
    // console.log(this.state.loaditems, "loaditems")

    return (
      <React.Fragment>
        {this.state.spinner == true &&
          <SfaSpinner />
        }
        <div className="pullleft KamClaimTablesfc">
          <div className="primarysale-target">HQ/FS Wise Secondary Sales Target</div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              {/* <div className="distributorClaimListsfc"> */}
              {/* <p className="paralocation">Designation <span className="colorRed">*</span></p> */}
              {/* </div> */}
              {/* <div className="selectlocation"> */}
              {/* <Dropdown placeholder='Select'
                className="customized-input cal-scrollbar"
                fluid
                selection
                options={this.state.fs} 
                />  */}
              <div className={this.state.designationValue == -1 ? "user-heirarchy-field-containers jhd" : "jhd user-heirarchy-field-containers xyz"}>
                <SearchDropdown
                  labelName="Designation"
                  errorMessage={this.state.designationErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.designationValue}
                  dropdownList={designationdropdown}
                  getValue={this.getDesignationValue}
                />
              </div>
              {/* </div> */}
            </div>
            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Region"
                  errorMessage={this.state.regionErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.regionValue}
                  dropdownList={regiondropdown}
                  getValue={this.getRegionValue}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="FS/HQ"
                  errorMessage={this.state.fshqErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.fshqValue}
                  dropdownList={fshqdropdown}
                  getValue={this.getFshqValue}
                />
              </div>
            </div>
            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Type"
                  errorMessage={this.state.typeErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.typeValue}
                  dropdownList={typedropdown}
                  getValue={this.getTypeValue}
                />
              </div>
            </div>
            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Year"
                  errorMessage={this.state.yearErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.yearValue}
                  dropdownList={yeardropdown}
                  getValue={this.getYearValue}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="Target Type"
                  errorMessage={this.state.targetpyeErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.targetypeValue}
                  dropdownList={targetypedropdown}
                  getValue={this.getTargetpyeValue}
                  onClickDropdown={this.onClickTargetpte}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="pvalue user-heirarchy-field-containers pmast">
                <SearchDropdown
                  labelName="FS/HQ Name"
                  errorMessage={this.state.fshqnameErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.fshqnameValue}
                  dropdownList={fshqnamedropdown}
                  getValue={this.getFshqnameValue}
                  onClickDropdown={this.onClickFshqname}
                />
              </div>
            </div>
            <Button className="sfcAddBtn-loaditem" onClick={this.OnLoaditem}>Load Items</Button>
          </div>
          <div className="primarysale-target1">Target On: {this.state.secondaryheader}</div>
        </div>


        <div>
          <SecondaryCopyfrom showcopy={this.state.showcopytable} target={this.target} fshqcode={this.state.fshqcode} targetypecode={this.state.targetypecode}
            descode={this.state.descode} regioncode={this.state.regioncode} typedatcode={this.state.typedatcode}
            yeardatcode={this.state.yeardatcode} fshqnamecode={this.state.fshqnamecode}
            getCopyfromValue = {this.getCopyfromValue} 
            CopyFromdata = {this.CopyFromdata}
            copyfromValue = {this.state.copyfromValue}
            copyfrom = {this.state.copyfrom} />

          {this.state.showcopytable == true ?
            <Secondarytargetable loaditems={this.state.loaditems} hidecopy={this.hidecopy} hideTableCopy={this.hideTableCopy}
              fshqcode={this.state.fshqcode} targetypecode={this.state.targetypecode} typedatcode={this.state.typedatcode}
              yeardatcode={this.state.yeardatcode} fshqnamecode={this.state.fshqnamecode} /> : null}

        </div>

      </React.Fragment>
    )
  }
}
export default Secondarydropdown;        