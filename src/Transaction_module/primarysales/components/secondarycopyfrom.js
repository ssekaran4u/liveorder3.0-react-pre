import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../../lib/comm-utils'
import Drop from '../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from '../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import '../../../../public/assets/css/transactionmodule.css'
import SearchDropdown from "./../../../BasicComponet/searchDropdown";
import { URL_SALES } from '../../../lib/constants'



class SecondaryCopyfrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Error: false,
      Errormsg: '',
      copyfrom: [],
      copyfromValue: "-1",
      copyfromErr: "",
      copyfromcode: "",
      copyfromyear: "",
      fshqcode: [],
      targetypecode: [],
      descode: [],
      regioncode: [],
      typedatcode: [],
      yeardatcode: [],
      fshqnamecode: [],
      loaditems: [],
    }
    // this.getCopyfromValue = this.getCopyfromValue.bind(this)
    this.OnCopyfrom = this.OnCopyfrom.bind(this)
  }

  // getCopyfromValue(copyfrom) {
  //   this.setState({ copyfromValue: copyfrom })
  //   if (copyfrom != "") {
  //     this.setState({ copyfromErr: "" })
  //   }
  //   this.state.copyfrom.map((item) => {
  //     // console.log(copyfrom,"data")
  //     if (item.c_name == copyfrom) {
  //       // this.setState({ copyfromcode: item.c_code })
  //       // this.setState({ copyfromyear: item.c_year })
  //       // console.log(this.state.descode, this.state.regioncode, this.state.fshqcode, this.state.typedatcode,this.state.yeardatcode, this.state.targetypecode, this.state.fshqnamecode,item.c_code,  item.c_year,"codde")
  //       var loaditemdata = {
  //         "Index": "SecondarySalesListTargetItem", "Data": {
  //           "hqFsCode": item.c_code,
  //           "region": this.state.regioncode,
  //           "yearType": this.state.typedatcode,
  //           "Designation": this.state.descode,
  //           "targetType": this.state.targetypecode,
  //           "hqOrFS": this.state.fshqcode,
  //           "nYear": item.c_year
  //         },
  //       }
  //       postToServer(URL_SALES, loaditemdata).then((response) => {
  //         // console.log(response, "loaditemdata")
  //         if (response.status == 200 ) {
  //           this.setState({ loaditems: response.data.data })
  //           this.props.target(response.data.data)
  //         }
  //       }).catch((Error) => {
  //         this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
  //       })
  //     }
  //   })
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.fshqcode.length) {
      this.setState({ fshqcode: nextProps.fshqcode })
    }
    if (nextProps.targetypecode.length) {
      this.setState({ targetypecode: nextProps.targetypecode })
    }
    if (nextProps.descode.length) {
      this.setState({ descode: nextProps.descode })
    }
    if (nextProps.regioncode.length) {
      this.setState({ regioncode: nextProps.regioncode })
    }
    if (nextProps.typedatcode.length) {
      this.setState({ typedatcode: nextProps.typedatcode })
    }
    if (nextProps.yeardatcode.length) {
      this.setState({ yeardatcode: nextProps.yeardatcode })
    }
    if (nextProps.fshqnamecode.length) {
      this.setState({ fshqnamecode: nextProps.fshqnamecode })
    }
  }

  OnCopyfrom() {
    // console.log(this.state.fshqcode, this.state.targetypecode, "code")
    var copyfromdata = { "Index": "SecondarySalesCopyFrom", "Data": { "TargetType": this.state.targetypecode, "fshq": this.state.fshqcode }, }
    postToServer(URL_SALES, copyfromdata)
      .then((response) => {
        // console.log(response, "copyfromdata")
        if (response.status == 200 ) {
          this.setState({ copyfrom: response.data.data })

          //  console.log(this.state.descode, this.state.regioncode, this.state.fshqcode, this.state.typedatcode,
          // this.state.yeardatcode, this.state.targetypecode, this.state.fshqnamecode,this.state.copyfromcode, this.state.copyfromyear,"codde")
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
      })



  }
  render() {
    let copyfromdropdown = []

    if (this.props.copyfrom.length > 0) {
      this.props.copyfrom.map((item) => {
        copyfromdropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    if (this.props.showcopy == true) {

      // console.log(this.props.descode, this.props.regioncode, this.props.fshqcode, this.props.typedatcode,
      //   this.props.yeardatcode, this.props.targetypecode, this.props.fshqnamecode, "code")
      // console.log(this.state.copyfrom, copyfromdropdown, this.state.copyfromValue, "copyfrom")
      // console.log(this.state.copyfromcode, this.state.copyfromyear ,"copycode")
      // console.log(this.state.loaditems, "items")

      return (
        <React.Fragment>

          <div className="pullleft KamClaimTablesfc">
            <div className="primarysale-target">OR</div>
            <div className="alldropsfclocation">
              <div className="locationsfa">
                <div className="user-heirarchy-field-containers copyoptionwidth">
                  <SearchDropdown
                    labelName="Copy From"
                    // errorMessage={this.state.designationErr}
                    disabled={true}
                    // important={true}
                    placeholder="Please Select FS/Year Target"
                    Selected={this.props.copyfromValue}
                    dropdownList={copyfromdropdown}
                    getValue={this.props.getCopyfromValue}
                    onClickDropdown={this.props.CopyFromdata}
                  />
                </div>
              </div>
            </div>
          </div>




        </React.Fragment>
      )
    }
    else return null
  }
}
export default SecondaryCopyfrom;        