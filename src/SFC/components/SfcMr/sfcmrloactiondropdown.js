import React from 'react'
import { Component } from 'react';
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

class SfcmrLoactiondrpdn extends Component {
  constructor(props) {
    super(props)
    //location:locFrom,locasub:locasub 
    this.state = {
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
      fromarea: '-1',
      Toarea:'',
      subareafrom: [],
      subareaTo:[],
      SFCLOCKED:false,
      travedrop:true,
      setup_id:'',
      hidearea:false,
      HQName : ''
    }

    this.saveSFC = this.saveSFC.bind(this)
    this.selectedProduct = this.selectedProduct.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onHide = this.onHide.bind(this)
    this.Errorclose = this.Errorclose.bind(this)
    this.selectedText = this.selectedText.bind(this)
    this.handleDistance = this.handleDistance.bind(this)
    this.distance = this.distance.bind(this)
    //window.initMap = this.initMap.bind(this)
    this.showLocation = this.showLocation.bind(this)
    this.getFromLatLong = this.getFromLatLong.bind(this)
    this.getToLatLong = this.getToLatLong.bind(this)
    this.getDirection = this.getDirection.bind(this)
    this.getloadData = this.getloadData.bind(this)
    this.Get_area = this.Get_area.bind(this)
    this.fromareachange = this.fromareachange.bind(this)
    this.getfromsubarea = this.getfromsubarea.bind(this)
    this.getTosubarea = this.getTosubarea.bind(this)
    this.getareachageTo=this.getareachageTo.bind(this)
    this.getTravel=this.getTravel.bind(this)
   
  }







  getTravel(distance ){
    let requireddistance = ""
    {distance != "" ? requireddistance=distance: requireddistance="0"}
    let travel = []
    travel.push(
      {
        "key": '-1',
        "text": 'Please Select',
        "value": '-1',
      }
    )

    // if(distance  ==  undefined  && distance.trim()  =='' ){
    //   distance=0
    // }
    // var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    // if(distance.match(decimal)) {
      
    // }else{
    //   return
    // }
    


   
    var travelModes = { "index": "TravelMode",  data:{  "distance":requireddistance, "sfcno" : this.props.match.params.id }  }

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

  getareachageTo(value, type,name){
    this.setState({Toarea :value })
  }
  getTosubarea(areacode) {

    
    var data = {
      "index": "getSubarea",
      "Data": {
        "area": areacode,
        "subareakk":"oko"
      },

    }
    postToServer("SFC", data).then((Result) => {
      let subareaTo = []
      let locasub={}
      locasub=this.state.locasub
      let locFrom = []
      locFrom=this.state.locFrom
      subareaTo.push({
        "key": '-1',
        "text": 'Search & Select',
        "value": '-1',
      })
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {
          subareaTo.push({
            "key": key["C_Code"],
            "text": key["C_Name"],
            "value": key["C_Code"],
          })
          locasub[key["C_Code"] ]= key["C_Name"]
        }, this.setState({  locFrom:subareaTo, subareaTo: subareaTo,locasub:locasub }))



     
    //console.log(Result, ' sinha')
    })

  }


  getfromsubarea(areacode) {


    var data = {
      "index": "getSubarea",
      "Data": {

        "area": areacode
      },

    }
    postToServer("SFC", data).then((Result) => {
      let subareafrom = []
      let locasub={}
      locasub=this.state.locasub

      let locFrom = []
      locFrom=this.state.locFrom
     
      subareafrom.push({
        "key": '-1',
        "text": 'Search & Select',
        "value": '-1',
      })
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {

          locasub[key["C_Code"] ]= key["C_Name"]
          subareafrom.push({
            "key": key["C_Code"],
            "text": key["C_Name"],
            "value": key["C_Code"],
          })

        }, this.setState({   locFrom:subareafrom, subareafrom: subareafrom ,locasub:locasub}))



      
        
    })

  }

  fromareachange(value, type,name) {
    this.setState({ fromarea: value })
   
  }




  componentDidUpdate(old, olds) {
    // console.log("From subarea is ", this.state.fromarea)
    // console.log("To subarea is ", this.state.Toarea)
    // if (olds.fromarea != this.state.fromarea) {
    //   debugger
    //   this.getfromsubarea(this.state.fromarea)
    // }

    // //Toarea

    // if (olds.Toarea != this.state.Toarea) {
    //   this.getTosubarea(this.state.Toarea)
    // }


  }



  Get_area() {
    var data = {
      "index": "SFC_AREA",
      "Data": {
      },

    }
    postToServer("SFC", data).then((Result) => {

      let StateArea = []
      let ToAreaList = []
      StateArea.push({
        "key": this.state.fromarea,
        "text": this.state.HQName,
        "value": this.state.fromarea,
      })
      ToAreaList.push({
        "key": this.state.Toarea,
        "text": this.state.HQName,
        "value": this.state.Toarea,
      })
      if (Result.data["Status"] == "Success")
        Result.data["Result"].map((key) => {
          StateArea.push({
            "key": key["c_code"],
            "text": key["c_name"],
            "value": key["c_code"],
          })
          ToAreaList.push({
            "key": key["c_code"],
            "text": key["c_name"],
            "value": key["c_code"],
          })
        }, this.setState({ StateArea: StateArea, ToAreaList:ToAreaList }))
        this.setState({   Toarea : Result.data["HQ"],  fromarea: Result.data["HQ"], HQName: Result.data["HQName"]})
    })
  }

  selectedText(Id, values) {
    let Textval = this.state.Textval
    // console.log(this.state.Textval)
    Textval[Id] = values
    this.setState({ Textval: Textval })
  }
  handleClose() {
    this.setState({
      showModal: false
    })
  }
  Errorclose() {
    this.setState({
      showModal: false, Error: false,
    })
    this.getloadData()
  }
  onHide() {
    this.setState({
      showModal: false
    })
  }
  getloadData() {
    //this.props.getloadData()
  }
  saveSFC() {
    let distance = ''
    let from = ''
    let to = ''
    let areatype = ''
    let Type = ''
    if (this.state.EditArray[1]) {
      if (this.state.EditArray[1]["from"] && this.state.EditArray[1]["from"] != -1) {
        from = this.state.EditArray[1]["from"]
      }
      else {
        this.setState({ Messagetype: false, Error: true, Errormsg: "Please Enter from" })
        return
      }
      if (this.state.EditArray[1]["to"] && this.state.EditArray[1]["to"] != -1) {
        to = this.state.EditArray[1]["to"]
      }
      else {
        this.setState({ Messagetype: false, Error: true, Errormsg: "Please Enter To" })
        return
      }
      if (this.state.Textval && this.state.Textval != -1) {
        if(this.state.Textval % 1 != 0){
          distance = (Math.round((this.state.Textval + Number.EPSILON) * 100) / 100).toString()
        }
        else{
          distance = this.state.Textval
        }
      } else {
        distance="0"
        //this.setState({ Messagetype: false, Error: true, Errormsg: "Please Enter Distance" })
        //return
      }
      if (this.state.EditArray[1]["Area"] && this.state.EditArray[1]["Area"] != -1) {
        areatype = this.state.EditArray[1]["Area"]
      } else {
        this.setState({ Messagetype: false, Error: true, Errormsg: "Please Enter Area Type" })
        return
      }
      if (this.state.EditArray[1]["Type"] && this.state.EditArray[1]["Type"] != -1) {
        Type = this.state.EditArray[1]["Type"]
      }
      else {
        // this.setState({ Messagetype:false,  Error: true, Errormsg: "Please Enter Travel Type" })
        // return
        Type = ''
      }

      var data = {
        "index": "SFC_Save",
        "Data": {
          "travelmode": Type,
          "subarea_from": from,
          "subarea_to": to,
          "distance": distance,
          "rowid": '',
          "areaType": areatype,
          "n_srno": this.props.match.params.id,
          "stpSetupNo":this.state.setup_id

        },

      }
      postToServer("SFC", data).then((Result) => {
        if (Result.data.Status == 'Success') {
          let res = 'Saved SFC'
          if (Result.data.Result[0]["result"]) {
            res = Result.data.Result[0]["result"]
            // this.componentDidMount();
            this.setState({
              reload: !this.state.reload,
              defaultVal: "-2",
              Textval: ''
            })

          }
          this.setState({ Messagetype: true, Error: true, Errormsg: res })

        } else {
          this.setState({ Messagetype: false, Error: true, Errormsg: "Something wrong" })
        }
      }).catch((Error) => {
        // console.log(Error)
        this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
      })

    } else {
      this.setState({ Messagetype: false, Error: true, Errormsg: "Please Select given Input" })

      return
    }
    this.componentDidMount();
  }
  selectedProduct(id, type, name) {
    //  console.log( this.state.locasub,'kl')
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
          this.getFromLatLong(lat, lng)
        } else if (name == 'to') {
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
  getFromLatLong(lat, lng) {
    this.setState({
      fromLat: lat,
      fromlong: lng
    })
    this.distance(lat, lng, this.state.toLat, this.state.tolong, 'K')
  }
  getToLatLong(lat, lng) {
    this.setState({
      toLat: lat,
      tolong: lng
    })
    this.distance(this.state.fromLat, this.state.fromlong, lat, lng, 'K')
  }
  componentDidMount() {
    this.getfromsubarea('')
    this.getTosubarea('')
    let sfc_no
    if (this.props.data) {
      this.props.data.map((item) => {
        sfc_no = item.N_Srno

      })
    }
    // var data = { "index": "SFC_Validation","Data":{ "sfcno": this.props.match.params.id}}
    var data = {
      "Index":"SFC_Validation",
      "Data":{"sfcno":this.props.match.params.id},
      // "Token":""
    }
   




    postToServer("SFC", data).then((Result) => {


 
  
       if (Result.data.Status == 'Success') {
        const  travedrop=Result.data.trave

        if (travedrop=="1"){
          this.setState({travedrop:true })
        }else{
          this.setState({travedrop:false })
        }
        // if(Result.data.SetupId){
        //SetupId
        //{"AREA_display":"True","SetupId":"2","Status":"Success","Status_Message":"SFC","trave":""}
          if (Result.data.SetupId==''){  
          //  this.setState({ setup_id:'5',   SFCLOCKED:false }) 
           this.setState({  SFCLOCKED:true }) 
          }else{
            this.setState({ setup_id:Result.data.SetupId,   SFCLOCKED:false }) 
          }
        //}

   if(Result.data.AREA_display=="True"){

  this.setState({  hidearea: true })
this.Get_area();
   }else{

    this.setState({  hidearea: false })
  //this.Get_area();
   }

         


       } }).catch( (Error)=> { 
        //  console.log('ErrorSFC428',Error) 
        })



    let locasub = {}
    // postToServer("SFC", data).then((Result) => {
    //   if (Result.data.Status == 'Success') {
    //     Result.data.Result.Result.map((item) => {
    //     locasub[item.C_Code]=item.C_Name
    //     locFrom.push(
    //       {
    //         "key": item.C_Code,
    //         "text": item.C_Name,
    //         "value": item.C_Code,
    //       })
    //     })
    //     this.setState({ location:locFrom,locasub:locasub  })
    //   }
    // }).catch((Error) => {
    //   this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    // })
    Geocode.setApiKey("AIzaSyDDv6ZlRqW6ETcFPQWVe_hlKjjCKjsm6jY");
    Geocode.setLanguage("en");
   this.getTravel("0")
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      this.setState({
        Textval: 0
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
        Textval: dist
      })
      //return dist;
    } else {
      this.setState({
        Textval: 0
      })
    }
  }
  handleDistance(event, Id) {
    var data = ""
    if(event.target.value == ""){
      data = ""
    }
    else{
      data = event.target.value;
    }


if(this.state.travedrop==true){
  this.getTravel(data)
}

    this.setState({ Textval: data })
  }
  showLocation(areaname) {
    //alert(areaname)
    this.setState({
      showmap: true
    })
  }
  getDirection() {
    localStorage.setItem("fromlat", this.state.fromLat)
    localStorage.setItem("fromlng", this.state.fromlong)
    localStorage.setItem("tolat", this.state.toLat)
    localStorage.setItem("tolng", this.state.tolong)
    //this.props.history.push('/Sfcmap')
  }

  render() {
  

    let modeOfVehical = []
    modeOfVehical.push(
      {
        "key": '-1',
        "text": 'Search & Select',
        "value": '-1',
      },
      {
        "key": '01',
        "text": 'Bus',
        "value": '01',
      },
      {
        "key": '02',
        "text": 'By Air',
        "value": '02',
      },
      {
        "key": '03',
        "text": 'Cycle',
        "value": '03',
      }
    )
    let typeOfArea = []
    typeOfArea.push(
      {
        "key": '-1',
        "text": 'Search & Select',
        "value": '-1',
      },
      {
        "key": '100',
        "text": 'HQ',
        "value": '100',
      },
      {
        "key": '101',
        "text": 'EX',
        "value": '101',
      },
      {
        "key": '102',
        "text": 'OS',
        "value": '102',
      }
    )





    return (
      <React.Fragment>

        <div className="pullleft sfcNewTab">
       { this.state.SFCLOCKED==false   ?    
       <div className="alldropsfclocation">
            <div className="from-too">
              <div>
                {/* <div className="distributorClaimListsfc"> */}
                <p className="paralocation">Location (From)<span className="colorRed">*</span></p>
                {/* </div> */}
                <div className="from-too-box">

                  {this.state.hidearea ==true ?
                  <div className="locationsfa">
                    <div className="distributorClaimListsfc">
                <p className="paralocation">Area  </p>

                      {/* <p className="paralocation">Location (From) Area<span className="colorRed">*</span></p> */}
                    </div>
                    <div className="selectlocation  selectlength">
                      <Drop name={"fromarea"} Type={1} Selected={this.state.fromarea} selectedProduct={this.fromareachange} data={this.state.StateArea} />
                    </div>
                  </div>:null}

                  <div className="locationsfa">
                    <div className="distributorClaimListsfc">
                <p className="paralocation">Sub Area  </p>

                      {/* <p className="paralocation">Location (From) SubArea <span className="colorRed">*</span></p> */}
                    </div>
                    <div className="selectlocation selectlength">
                      <Drop name={"from"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.selectedProduct} data={this.state.subareafrom} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* <div className="distributorClaimListsfc"> */}
                <p className="paralocation">Location (To)<span className="colorRed">*</span></p>
                {/* </div> */}
                <div className="from-too-box">
                  
                  
                {this.state.hidearea ==true ?
                  <div className="locationsfa">
                    <div className="distributorClaimListsfc">
                <p className="paralocation">Area  </p>

                      {/* <p className="paralocation">Location (To) Area <span className="colorRed">*</span></p> */}
                    </div>
                    <div className="selectlocation  selectlength">
                      <Drop name={"areato"} Type={1} Selected={this.state.Toarea} selectedProduct={this.getareachageTo} data={this.state.ToAreaList} />
                    </div>
                  </div> :null}

                  <div className="locationsfa">
                    <div className="distributorClaimListsfc">
                <p className="paralocation">Sub Area  </p>

                      {/* <p className="paralocation">Location (To) SubArea <span className="colorRed">*</span></p> */}
                    </div>
                    <div className="selectlocation selectlength">
                      <Drop name={"to"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.selectedProduct} data={this.state.subareaTo} />
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
            <div className="locationsfa">
              <div className="distributorClaimListsfc">
                <p className="paralocation">Type of Area <span className="colorRed">*</span></p>
              </div>
              <div className="selectlocation selectlength">
                {/* <Dropdown   placeholder='Enter or Select the Type' 
                className="customized-input cal-scrollbar"
                 fluid
                 selection
                 options={typeOfArea}/>            */}
                <Drop name={"Area"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.selectedProduct} data={typeOfArea} />
              </div>
            </div>
            {/* <div  className = "alldropsfclocation1"> */}
          { this.state.travedrop==true ?  <div className="locationsfa">
              <div className="distributorClaimListsfc">
                <p className="paralocation">Mode of Travel
                {/* <span className="colorRed">*</span>  */}
                </p>
              </div>
              <div className="selectlocation selectlength">
                {/* <Dropdown placeholder='Select mode of travel'
                  className="customized-input cal-scrollbar"
                  fluid
                  selection
                  options={modeOfVehical} /> */}
                <Drop name={"Type"} Type={1} Selected={this.state.defaultVal} selectedProduct={this.selectedProduct} data={this.state.travelMode} />
              </div>
            </div> :null}
            <Button onClick={this.saveSFC} className="sfcAddBtn">ADD</Button>
          
           
          </div>:null }
        </div>
    
        <StatusPopup
          message={this.state.Errormsg}
          show={this.state.Error}
          onClose={this.Errorclose}
          success={this.state.Messagetype}
        />
        <Newsfchart  hidearea={this.state.hidearea} setup_id={this.state.setup_id} travedrop={this.state.travedrop} SFCLOCKED={this.state.SFCLOCKED}  data={this.props.data} reload={this.state.reload} sfcno={this.props.match.params.id} />


      </React.Fragment>
    )
  }
}
export default withRouter(SfcmrLoactiondrpdn)