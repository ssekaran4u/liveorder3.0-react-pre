import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import Lottie from 'react-lottie'
import { Button, Col, Row, Form } from 'react-bootstrap'
import Newsfchart from './newsfccharttable'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import StatusPopup from './../../../lib/StatusPopup'
import { withRouter } from 'react-router-dom'
import Sfcmap from '../SfcMr/Sfcmap'
// import { de } from 'date-fns/locale';



class EditModel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mysfclist: [],
      location: [],
      distance: '',
      showmap: false,
      fromlong: '',
      fromLat: '',
      EditArray: {}, Messagetype: true, Error: false, Errormsg: '', Textval: '', TextvalD: '',
      distance: '',
      toLat: '',
      tolong: '', locasub: {},
      travelMode: [],
      reload: false,
      defaultVal: '-1',
      StateArea: [],
      fromarea: '',
      Toarea: '',
      subareafrom: [],
      subareaTo: [],
      SFCLOCKED: false,
      travedrop: this.props.travedrop,
      setup_id: this.props.setup_id,
      hidearea: this.props.hidearea,
      from: '-1',
      to: '-1',
      areatype: '',
      traveltype: '',
      ToMainArea : [],
      travelway : "",
      travelwaycode : "",
      typeOfArea: [{
        "key": '100',
        "text": 'HQ',
        "value": 'HQ',
      },
      {
        "key": '101',
        "text": 'EX',
        "value": 'EX',
      },
    {
        "key": '102',
        "text": 'OS',
        "value": 'OS',
    }],
    selcttype: "",
    }
    this.selectedProduct = this.selectedProduct.bind(this)
    this.distance = this.distance.bind(this)
    this.showLocation = this.showLocation.bind(this)
    this.getFromLatLong = this.getFromLatLong.bind(this)
    this.getToLatLong = this.getToLatLong.bind(this)
    this.getDirection = this.getDirection.bind(this)
    // this.getloadData = this.getloadData.bind(this)
    this.Get_area = this.Get_area.bind(this)
    this.fromareachange = this.fromareachange.bind(this)
    this.getfromsubarea = this.getfromsubarea.bind(this)
    this.getTosubarea = this.getTosubarea.bind(this)
    this.getareachageTo = this.getareachageTo.bind(this)
    this.saveSFC = this.saveSFC.bind(this)
    this.cancleEdit = this.cancleEdit.bind(this)
    this.handleDistance = this.handleDistance.bind(this)
    this.changearea = this.changearea.bind(this)
    this.changetravel = this.changetravel.bind(this)
  }



  handleDistance(event, Id) {
    let data = ""
    if (event.target.value != "") {
      data = event.target.value
    }
    else {
      data = ""
    }

    if (this.state.travedrop == true) {
      this.getTravel(data)
    }

    this.setState({ Textval: data,travelway : "",travelwaycode: ""})
  }





  cancleEdit() {
    this.props.onClose("ok", "")
  }


  saveSFC() {
    let from = ''
    let to = ''
    let Type = this.state.travelwaycode
    let areatype = this.props.Editdata.areatype
    let distance = ''
    if (this.state.Textval && this.state.Textval != -1) {
      if (typeof(this.state.Textval) == "number") {
        distance = (Math.round((this.state.Textval + Number.EPSILON) * 100) / 100).toString()
      }
      else {
        distance = this.state.Textval
      }
    } else {
      distance = "0"
      //this.setState({ Messagetype: false, Error: true, Errormsg: "Please Enter Distance" })
      //return
    }
    if (this.state.areatype == '') {
      if(this.props.Editdata.areatype){
        areatype = this.props.Editdata.areatype
      }
      else{
        areatype = this.props.sfclisteditdata.areatype
      }
    } else {
      areatype = this.state.areatype
    }

    if (this.state.from == "-1") {
      if(this.props.Editdata.from_code){
        from = this.props.Editdata.from_code
      }
      else{
        from = this.props.sfclisteditdata.from_code
      }
    } else {
      from = this.state.from
    }
    if (this.state.to == "-1") {
      if(this.props.Editdata.To_code){
        to = this.props.Editdata.To_code
      }
      else{
        to = this.props.sfclisteditdata.To_code
      }
      
    } else {
      to = this.state.to
    }
    if (this.state.travedrop == false) {
      Type = '0'
    }

    if (this.state.traveltype != '') {
      Type = this.state.traveltype
    }
    // else if(this.props.Editdata.TravelModeCode && !this.state.Textval && this.state.Textval != -1){
    //   Type = this.props.Editdata.TravelModeCode
    // }


    let SRNO = ""
    if (this.props.n_srno) {
      SRNO = this.props.n_srno
    }
    else {
      SRNO = this.props.Editdata.N_Srno
    }

    //N_Srno
    var data = {
      "index": "SFC_Save",
      "Data": {
        "travelmode": Type,
        "subarea_from": from,
        "subarea_to": to,
        "distance": distance,
        "rowid": this.props.Editdata.N_RowID,
        "areaType": areatype,
        "n_srno": SRNO,
        "stpSetupNo": this.state.setup_id

      },

    }




    postToServer("SFC", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        let res = 'Saved SFC sucessfully'
        if (Result.data.Result[0]["result"]) {
          res = Result.data.Result[0]["result"]
          // this.componentDidMount();
          // this.setState({
          //   reload: !this.state.reload,
          //   defaultVal: "-2",
          //   Textval: ''
          // })
          this.props.onClose(true, res)
        }
        this.props.onClose(true, res)

      } else {
        this.props.onClose(false, res)
      }
    }).catch((Error) => {
      // console.log(Error)
      this.props.onClose(false, "Plese Try Again Data  Not Saved")
    })











  }


  getareachageTo(value, type, name) {
    this.setState({ Toarea: value })
  }
  getDirection() {
    localStorage.setItem("fromlat", this.state.fromLat)
    localStorage.setItem("fromlng", this.state.fromlong)
    localStorage.setItem("tolat", this.state.toLat)
    localStorage.setItem("tolng", this.state.tolong)
    //this.props.history.push('/Sfcmap')
  }
  getFromLatLong(lat, lng) {
    this.setState({
      fromLat: lat,
      fromlong: lng
    })
    this.distance(lat, lng, this.state.toLat, this.state.tolong, 'K')
  }
  showLocation(areaname) {
    //alert(areaname)
    this.setState({
      showmap: true
    })
  }


  selectedProduct(id, type, name) {
    // if (name == 'Area') {
    //   this.setState({ areatype: id._targetInst._debugOwner.key })
    // }
    // if (name == 'Type') {
    //   this.setState({ traveltype: id._targetInst._debugOwner.key, travelwaycode : id._targetInst._debugOwner.key })
    // }
    let areaname = this.state.locasub[id]
    let EditArray = {}
    EditArray = this.state.EditArray


    if (EditArray[type]) {
      let k = {}
      k[name] = id
      EditArray[type][name] = id
    } else {
      EditArray[type] = {}
      EditArray[type][name] = id
    }
    Geocode.fromAddress(areaname).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        if (name == 'from') {
          this.setState({ from: id })
          this.getFromLatLong(lat, lng)
        } else if (name == 'to') {
          this.setState({ to: id })
          this.getToLatLong(lat, lng)
        }
      },
      error => {
        // console.error(error);
      }
    );

    this.setState({
      EditArray: EditArray,
    })




  }


  getToLatLong(lat, lng) {


    this.setState({
      toLat: lat,
      tolong: lng
    })
    this.distance(this.state.fromLat, this.state.fromlong, lat, lng, 'K')
  }

  fromareachange(value, type, name) {


    // console.log(value)
    this.setState({ fromarea: value })

  }


  Get_area() {
    var data = {
      "index": "SFC_AREA",
      "Data": {
      },

    }
    postToServer("SFC", data).then((Result) => {


      let StateArea = []
      if(this.props.Editdata.Frmareaname){
        StateArea.push({
          "key": '-1',
          "text":  this.props.Editdata.Frmareaname,
          "value": '-1',
        })
      }
      else{
        StateArea.push({
          "key": '-1',
          "text":  this.props.sfclisteditdata.Frmareaname,
          "value": '-1',
        })
      }
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {
          StateArea.push({
            "key": key["c_code"],
            "text": key["c_name"],
            "value": key["c_code"],
          })

        }, this.setState({ StateArea: StateArea }))

        let ToMainArea = []
        if(this.props.Editdata.Toareaname){
          ToMainArea.push({
            "key": '-1',
            "text":  this.props.Editdata.Toareaname,
            "value": '-1',
          })
        }
        else{
          ToMainArea.push({
            "key": '-1',
            "text":  this.props.sfclisteditdata.Toareaname,
            "value": '-1',
          })
        }
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {
          ToMainArea.push({
            "key": key["c_code"],
            "text": key["c_name"],
            "value": key["c_code"],
          })

        }, this.setState({ ToMainArea: ToMainArea }))
    })

    // console.log(this.props.sfclisteditdata)
  }

  getfromsubarea(areacode) {
    this.setState({ from: '-1' })
    const from = this.props.Editdata.from_code
    const to = this.props.Editdata.To_code

    var data = {
      "index": "getSubarea",
      "Data": {

        "area": areacode
      },

    }
    postToServer("SFC", data).then((Result) => {
      let subareafrom = []
      let locasub = {}
      locasub = this.state.locasub

      let locFrom = []
      locFrom = this.state.locFrom
      if(this.props.Editdata.From){
        subareafrom.push({
          "key": '-1',
          "text": this.props.Editdata.From,
          "value": '-1',
        })
      }
      else{
        subareafrom.push({
          "key": '-1',
          "text": this.props.sfclisteditdata.From,
          "value": '-1',
        })
      }
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {

          locasub[key["C_Code"]] = key["C_Name"]
          subareafrom.push({
            "key": key["C_Code"],
            "text": key["C_Name"],
            "value": key["C_Code"],
          })

        }, this.setState({
          locFrom: subareafrom, subareafrom: subareafrom, locasub: locasub
        }))


    })

  }


  getTosubarea(areacode) {


    this.setState({ to: '-1' })
    var data = {
      "index": "getSubarea",
      "Data": {
        "area": areacode
      },

    }
    const from = this.props.Editdata.from_code
    const to = this.props.Editdata.To_code
    postToServer("SFC", data).then((Result) => {
      let subareaTo = []
      let locasub = {}
      locasub = this.state.locasub
      let locFrom = []
      locFrom = this.state.locFrom
      if(this.props.Editdata.To){
        subareaTo.push({
          "key": '-1',
          "text": this.props.Editdata.To,
          "value": '-1',
        })
      }
      else{
        subareaTo.push({
          "key": '-1',
          "text": this.props.sfclisteditdata.To,
          "value": '-1',
        })
      }
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {
          subareaTo.push({
            "key": key["C_Code"],
            "text": key["C_Name"],
            "value": key["C_Code"],
          })
          locasub[key["C_Code"]] = key["C_Name"]
        }, this.setState({
          locFrom: subareaTo, subareaTo: subareaTo, locasub: locasub
        }))


      //     console.log(this.props.Editdata,'kunal sinha')
      //  this.setState({ 


      //  })

      //console.log(Result, ' sinha')
    })

  }
  componentDidUpdate(old, olds) {


    if (olds.fromarea != this.state.fromarea) {

      this.getfromsubarea(this.state.fromarea)
    }

    //Toarea

    if (olds.Toarea != this.state.Toarea) {
      this.getTosubarea(this.state.Toarea)
    }


    // if (this.state.subareaTo!=olds.subareaTo){
    //   const to  =this.props.Editdata.To_code
    //  this.setState({to:to})
    // }


    // if (this.state.subareafrom!=olds.subareafrom){
    //   const from =this.props.Editdata.from_code
    //  this.setState({from:from})
    // }
  }


  getTravel(distance) {
    let travel = []
    let requireddistance = ""
    { distance != "" ? requireddistance = distance : requireddistance = "0" }
    travel.push(
      {
        "key": '-1',
        "text": 'Please Select',
        "value": '-1',
      }
    )

    // if(distance  ==  undefined  && distance.trim()  =='' ){
    //   distance=0
    //   this.setState({Textval:'0'})
    // }
    // var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    // if(distance.match(decimal)) {

    // }else{

    //   this.setState({Textval:'0'})
    //   return
    // }
    var travelModes = { "index": "TravelMode", data: { "distance": requireddistance, "sfcno": this.props.n_srno } }

    postToServer("SFC", travelModes).then((Result) => {
      if (Result.data.Status == 'Success') {
        Result.data.Result.map((item) => {

          travel.push(
            {
              "key": item.n_id,
              "text": item.c_name,
              "value": item.n_id,
            }
          )
        })

        this.setState({ travelMode: travel })
      }
    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
  }


  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      this.setState({
        Textval: 0,
        travelway : "",
        travelwaycode: ""
      })
    }
    else if (lat1 != "" && lon1 != "" && lat2 != "" && lon2 != "") {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;

      // if (unit=="K") { 
      dist = parseInt(dist) * 1.609344
      // }
      // if (unit=="N") { 
      //   dist = parseInt(dist) * 0.8684
      //  }
      //  console.log("distance",dist)
      //  let TextVal ={}
      //   TextVal = this.state.Textval
      // TextVal[0]=dist
      this.getTravel(dist.toString())
      this.setState({
        Textval: dist,
        travelway : "",
        travelwaycode: ""
      })
      //return dist;
    } else {
      this.setState({
        Textval: 0,
        travelway : "",
        travelwaycode: ""
      })
    }
  }
  componentDidMount() {
    let  travelway = this.props.Editdata.TravelMode
    let travelwaycode = this.props.Editdata.TravelModeCode
    // if(this.props.Editdata.TravelMode){
    //   travelway = this.props.Editdata.TravelMode
    // }
    // else{
    //   travelway = this.props.sfclisteditdata.TravelMode
    // }
    // if(this.props.Editdata.TravelModeCode){
    //   travelwaycode = this.props.Editdata.TravelModeCode
    // }
    // else{
    //   travelwaycode =  this.props.sfclisteditdata.TravelModeCode
    // }
    const Textval = this.props.Editdata.Distance
    this.setState({
      Textval: Textval,
      travelway :travelway,
      travelwaycode : travelwaycode
    })
    //alert(this.props.EditKey)
    this.Get_area()
    this.getfromsubarea('')
    this.getTosubarea('')
    this.getTravel(this.props.Editdata.Distance)
    Geocode.setApiKey("AIzaSyDDv6ZlRqW6ETcFPQWVe_hlKjjCKjsm6jY");
    Geocode.setLanguage("en");


    let EditArray = {}
    EditArray["1"] = {}
    EditArray["1"] = { "from": this.props.Editdata.from_code, "to": this.props.Editdata.To_code }


    this.setState({ EditArray: EditArray })
  }
  changearea(event){
    this.state.typeOfArea.map((item) => {
      if (item.text == event.target.innerText) {
        this.setState({ areatype: item.key })
      }
    })
  }
  changetravel(event){
    this.state.travelMode.map((item) => {
      if (item.text == event.target.innerText) {
        this.setState({ traveltype: item.key })
      }
    })
  }
  render() {
    // let typeOfArea = []
    // typeOfArea.push(
    //   // {
    //   //   "key": '-1',
    //   //   "text": this.props.Editdata.C_a_type,
    //   //   "value": '-1',
    //   // },
    //   {
    //     "key": '100',
    //     "text": 'HQ',
    //     "value": 'HQ',
    //   },
    //   {
    //     "key": '101',
    //     "text": 'EX',
    //     "value": 'EX',
    //   },
    //   {
    //     "key": '102',
    //     "text": 'OS',
    //     "value": 'OS',
    //   }
    // )
    return (
      <div>
        <Modal size="lg" centered show={this.props.show} onHide={this.props.onClose}>
          <Form>
            <Modal.Header className="plan-this-task">
              <Modal.Title className="modalTitle">
                Edit SFC
                    <span
                  className="modalCancelBtn"
                  onClick={this.cancleEdit}
                >
                  <img src="../public/assets/images/cancel.png" />
                </span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div className="alldropsfclocation popupmargin">
                <div className="from-too">
                  <div>

                    <p className="paralocation">Location (From)<span className="colorRed">*</span></p>
                    {/* </div> */}
                    <div className="from-too-box">

                      {this.state.hidearea == true ?
                        <div className="locationsfa">
                          <div className="distributorClaimListsfc">
                            <p className="paralocation">Area  </p>

                            {/* <p className="paralocation">Location (From) Area<span className="colorRed">*</span></p> */}
                          </div>
                          <div className="selectlocation selectlength">
                            <Drop name={"fromarea"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.fromareachange} data={this.state.StateArea} />
                          </div>
                        </div> : null}

                      <div className="locationsfa">
                        <div className="distributorClaimListsfc">
                          <p className="paralocation">Sub Area  </p>

                          {/* <p className="paralocation">Location (From) SubArea <span className="colorRed">*</span></p> */}
                        </div>
                        <div className="selectlocation selectlength">
                          {/* <Dropdown   onChange={this.selectedProduct} 
                search fluid selection options={this.state.subareafrom} 
                className={this.state.from == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "}
                value={this.state.from}
               
                 /> */}
                          <Drop name={"from"} Type={1} Selected={this.state.from} selectedProduct={this.selectedProduct} data={this.state.subareafrom} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* <div className="distributorClaimListsfc"> */}
                    <p className="paralocation">Location (To)<span className="colorRed">*</span></p>
                    {/* </div> */}
                    <div className="from-too-box">


                      {this.state.hidearea == true ?
                        <div className="locationsfa">
                          <div className="distributorClaimListsfc">
                            <p className="paralocation">Area  </p>

                            {/* <p className="paralocation">Location (To) Area <span className="colorRed">*</span></p> */}
                          </div>
                          <div className="selectlocation selectlength">
                            <Drop name={"areato"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.getareachageTo} data={this.state.ToMainArea} />
                          </div>
                        </div> : null}

                      <div className="locationsfa">
                        <div className="distributorClaimListsfc">
                          <p className="paralocation">Sub Area  </p>

                          {/* <p className="paralocation">Location (To) SubArea <span className="colorRed">*</span></p> */}
                        </div>
                        <div className="selectlocation selectlength">
                          <Drop name={"to"} Type={1} Selected={this.state.to} selectedProduct={this.selectedProduct} data={this.state.subareaTo} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="locationsfa">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation">Distance (Kms) <span className="colorRed">*</span></p>
                  </div>
                  <div className="selectlocationmap">
                    {/* <Text   selectedText={this.selectedText} id={"0"}  Textval={  this.state.TextvalD} /> */}
                    {/* <Dropdown placeholder='Enter or Calculate Distance '
                  className="customized-input cal-scrollbar distance-dd"
                  fluid
                  selection
                //  options={friendOptions}
                /> */}
                    <Form.Control
                      type="text"
                      className="customized-input "
                      placeholder="Enter or Calculate Distance"
                      value={this.state.Textval}
                      onChange={(event) => this.handleDistance(event, "0")}
                    // selectedText={this.selectedText} id={"0"}  Textval={  this.state.TextvalD}
                    /><div className="ui basic lable mapLeftBorder">
                      <img src="../../public/assets/images/gps.png" className="mapImgae" onClick={this.getDirection} />
                    </div>
                  </div>
                </div>
                {/* </Col>
            </Row> */}
                
                {this.state.travedrop == true ? <div className="locationsfa">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation">Mode of Travel
                    </p>
                  </div>
                  <div className="selectlocation selectlength">
                   <Dropdown placeholder={this.state.travelway}
                    className="customized-input cal-scrollbar"
                    fluid
                    selection
                    options={this.state.travelMode}
                    name={"Type"} Type={1} Selected={this.state.defaultVal}  onChange={(event) => this.changetravel(event)} />
                    {/* <Drop name={"Type"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.selectedProduct} data={this.state.travelMode} /> */}
                  </div>
                </div> : null}
                <div className="locationsfa">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation">Type of Area <span className="colorRed">*</span></p>
                  </div>
                  <div className="selectlocation selectlength">
                    <Dropdown placeholder={this.props.Editdata.C_a_type}
                      className="customized-input cal-scrollbar"
                      fluid
                      selection
                      options={this.state.typeOfArea} name={"Area"} Type={1} onChange={(event) => this.changearea(event)} Selected={this.state.defaultVal} placeholder={this.props.Editdata.C_a_type ? this.props.Editdata.C_a_type : this.props.Editdata.type} />
                    {/* <Drop name={"Area"} Type={1}   selectedProduct={this.selectedProduct} data={typeOfArea} Selected={this.state.defaultVal}  /> */}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="plan-this-task">
              <Button onClick={this.saveSFC} className="planBtn" variant="primary">ADD</Button>
              <Button onClick={this.cancleEdit} className="cancelBtn" variant="secondary">Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <StatusPopup
          message={this.state.Errormsg}
          show={this.state.Error}
          onClose={this.Errorclose}
          success={this.state.Messagetype}
        />
      </div>
    )
  }
}
export default EditModel
