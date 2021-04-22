import React from 'react';
import { Component } from 'react';
import SearchDropdown from "./../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import OthetprpType from "./otherprptype";
import NewentryPrpType from "./newentryprptype";
import Loader from '../../lib/Loader'


class Newentry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prpvalue: "-1",
      prpErr: "",
      prpdata: [],
      Date: new Date(),
      data: "-1",
      Prptype: [{
        "key": '1',
        "text": 'PRP Type',
        "value": 'PRP Type',
      },
      {
        "key": '2',
        "text": 'Other Type',
        "value": 'Other Type',
      }],
      selctnamevalue: "-1",
      selcenameErr: "",
      selectypeErr: "",
      selectnamecode: "",
      selectypecode: "",
      selcttype: "",
      golistdata: [],
      hidetab: false,
      hidetabbb: false,
      // showLoader : true
    }
    this.getPrpValue = this.getPrpValue.bind(this)
    this.getSelectnameValue = this.getSelectnameValue.bind(this)
    this.onClickSelectName = this.onClickSelectName.bind(this)
    this.onClickGo = this.onClickGo.bind(this)
  }



  getSelectnameValue(prpdata) {
    this.setState({ selctnamevalue: prpdata })
    if (prpdata != "") {
      this.setState({ selcenameErr: "" })
       this.setState({ hidetabbb: false })
      this.setState({ hidetab: false })

    }

    this.state.prpdata.map((item) => {
      if (item.C_NAME == prpdata) {
        this.setState({ selectnamecode: item.C_CODE })
      }
    })

     
  }

  onClickSelectName() {
    if (this.state.prpvalue == "-1") {
      this.setState({ selectypeErr: "Please Select The Type" })
    }
  }


  getPrpValue(prpvalue) {
    // console.log(prpvalue,"prpvalue")
    this.setState({ prpvalue: prpvalue , selctnamevalue : "-1"})
    if (this.state.prpvalue != "") {
      this.setState({ selectypeErr: " " })
      this.setState({ hidetabbb: false })
      this.setState({ hidetab: false })
    }

    this.state.Prptype.map((item) => {
      if (item.text == prpvalue) {
        this.setState({ selectypecode: item.key }),
          this.setState({ selcttype: item.text })
      }
    })

  

    if (this.state.Prptype.length > 0) {
      this.setState({showLoader:true})
      this.state.Prptype.map((item) => {
        // console.log(prpvalue, item, "prpvalue")
        if (item.text == prpvalue) {
          var prptypedata = { "Index": "prpSetupDet", "Data": { "PrpType": item.text }, }
          postToServer(URL_PRP, prptypedata)
            .then((response) => {
              // console.log(response,prptypedata, "prptypedata")
              // this.setState({showLoader:true})
              if (response.status == 200) {
                this.setState({ prpdata: response.data.data, showLoader: false })
              }

            }).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error In App At MRPRP", showLoader: false })
            })
        }
      })
    }


  }

  onClickGo() {
    // console.log("onclick go", this.state.selcenameErr, this.state.selectypeErr,this.state.selectypecode)
    // if (this.state.selctnamevalue == "-1") {
      if (this.state.selctnamevalue == "-1") {
        this.setState({ selcenameErr: "Please Select The Name !" })
        // alert("Please Select Name")
      }
     else if (this.state.prpvalue == "-1") {
        this.setState({ selectypeErr: "Please Select The Type !" })
        // alert("Please Select Type")
      }


    // }

  
    else if (this.state.selcenameErr == "") {
     this.setState({showLoader:true})
      // console.log("SetupOnchange")
      var srnum = this.props.srnum.trim() != '' ? this.props.srnum : ""
      var godata = {
        "Index": "SetupOnchange", "Data": { "Setupid": this.state.selectnamecode, "PrpType": this.state.selectypecode, "Srno": srnum },
      }
      postToServer(URL_PRP, godata).then((response) => {
        // console.log(response, godata, "godata")
        // this.setState({showLoader:true})
        if (response.status == 200) {
          this.setState({ golistdata: response.data, showLoader: false })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Api At MRPRP", showLoader: false })
      })

      if (this.state.selectypecode == "2") {
        this.setState({ hidetab: true })
        this.setState({ hidetabbb: false })
      }
      else if (this.state.selectypecode == "1") {
        this.setState({ hidetabbb: true })
        this.setState({ hidetab: false })
      }
    }

  }

  componentDidMount() {
    // console.log(this.props.srnum ,"this.props.srnum ")
    if (this.props.srnum.trim() != '') {
     this.setState({showLoader:true})

      var edit = {
        "Index": "RequestSrnoClick", "Data": { "srno": this.props.srnum },
      }
      // var SetupOnchange = {
      //   "Index": "SetupOnchange", "Data": { "srno": this.props.srnum },
      // }
      let selectedsubArea = []
      postToServer(URL_PRP, edit).then((response) => {
        // console.log(response, "editedit")
        // this.setState({showLoader:true})
        if (response.status == 200 && response.statusText == "OK") {


          // if (this.state.Prptype.length > 0) {
          //   this.state.Prptype.map((item) => {
          //     console.log(prpvalue, item, "prpvalue")
          //     if (item.text == prpvalue) {
          var prptypedata = { "Index": "prpSetupDet", "Data": { "PrpType": response.data.Details[0].OthertypeName }, }
          postToServer(URL_PRP, prptypedata)
            .then((response) => {
              // console.log(response, "prptypedata")
              if (response.status == 200) {
                this.setState({ prpdata: response.data.data, showLoader: false })
              }
              this.onClickGo()

            }).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error In App At MRPRP", showLoader: false })
            })
          //     }
          //   })
          // }
          this.setState({
            prpvalue: response.data.Details[0].OthertypeName,
            selcenameErr: "",
            selctnamevalue: response.data.Details[0].prpName,
            selectnamecode: response.data.Details[0].c_PrpCode,
            selectypecode: response.data.Details[0].n_prp_other_type,
          })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Edit" })
      })
      postToServer(URL_PRP, edit).then((response) => {

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
      })
    }
  }



  render() {
    // console.log(  this.state.prpvalue,this.state.selctnamevalue,"selctnamevalue")
    // console.log('pp',this.props.srnum, this.props.type, this.state.selctnamevalue,"srnum")
    // console.log(this.state.selctnamevalue,this.state.hidetabbb,this.state.hidetab, "tab")
    // console.log(this.props.hideshowbtn,"hideshowbtn")

    let selctname = []

    this.state.prpdata.map((item) => {
      selctname.push({
        "key": item.C_CODE,
        "text": item.C_NAME,
        "value": item.C_NAME.toLowerCase()
      })
    })

    // console.log(this.state.Prptype, "prptype")
    // console.log(this.state.selectypecode, this.state.selectnamecode, this.state.golistdata,"selectypecode")
    // console.log(this.state.prpvalue, "prpvalue")
    // console.log(this.state.prpdata, "prpdata")
    // console.log(this.state.golistdata,"golistdata")

    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc newentryprp">
          <div className="alldropsfclocation">
            <div className="locationsfa">
            {this.props.hideshowbtn == false ?

              <div className="user-heirarchy-field-containers">
                <SearchDropdown
                  labelName="Select Type"
                  errorMessage={this.state.selectypeErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.prpvalue}
                  dropdownList={this.state.Prptype}
                  getValue={this.getPrpValue}
                  disable={true}
                />
              </div>:
              <div className="user-heirarchy-field-containers">
                          <Form.Label className="customized-label">Select Type<span className="colorRed">*</span></Form.Label>
                          <div className="campaign-name">
                            <input type="text" className="dropdown-input input-text" value={this.state.prpvalue} />
                            <img className="image-1" src="../../public/assets/images/Path 2590.svg" alt="" />
                          </div>
                        </div>}
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <SearchDropdown
                  labelName="Select Name"
                  errorMessage={this.state.selcenameErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.selctnamevalue}
                  dropdownList={selctname}
                  getValue={this.getSelectnameValue}
                  onClickDropdown={this.onClickSelectName}
                />
              </div>
            </div>



            <Button className="sfcAddBtn-loaditem" onClick={this.onClickGo}>Go</Button>
          </div>

        </div>
        {this.state.hidetab == true || this.props.type == "Other Type" ?
          <div>
            <OthetprpType
             golist={this.state.golistdata} 
             namevalue={this.state.selctnamevalue} 
             srnum={this.props.srnum} 
             onClickGo={this.onClickGo} 
            //  hideshowbtn={this.props.hideshowbtn} 
             />

          </div> : null}

        {this.state.hidetabbb == true || this.props.type == "Prp Type" ?
          <div>
            <NewentryPrpType 
            golist={this.state.golistdata} 
            namevalue={this.state.selctnamevalue}
             srnum={this.props.srnum} 
            //  hideshowbtn={this.props.hideshowbtn}
              />
          </div> : null}
          <Loader show={this.state.showLoader} />
      </React.Fragment>
    )
  }
}
export default Newentry;