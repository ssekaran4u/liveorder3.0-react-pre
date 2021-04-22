import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import MeWisePhyandDigitalOptionDrop from '../components/MeWisePhyandDigitalOptionDrop'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class MeWisePhyandDigitalOptions extends Component {
  constructor(props){
      super(props)
      this.state={
        
          status:'',
        
          msgStatus:'',
          success:false,
          smsg:'',
          showStatusModal:false,
         
          Division:[],
          Region:[],
          Category:[],
          FSName:[],
          Month:[],
         
          Division2:"",
          Region2:"",
          Category2:"",
          FSName2:"",
          Month2:"",
         
          message:"",
          apply:"",
      
          
      }
     
      this.filterApply= this.filterApply.bind(this)
      this.getDivision=this.getDivision.bind(this)
     this.getRegion=this.getRegion.bind(this)

     this.getCategory=this.getCategory.bind(this)
     this.getMonth=this.getMonth.bind(this)
     this.getFSName=this.getFSName.bind(this)     
      
      
  }
  callbackFunction(childData) {
}



  hideStatusModal(){
      this.setState({
          showStatusModal:!this.state.showStatusModal,
      })
      
  }

 

  getDivision(div){
    let returArray={"name":"Division","rvalue":div};
    this.setState({Division2:div});
   this.props.funcprops(returArray)

   var regdet = { "Report":"MeWisePhyAndDigital","index": "FsList",  data:{"RegionCode":this.state.Region2,"DivCode":div,"AreaCode":""}  }

let fs=[]

postToServer("Reportsapi", regdet).then((Result) => {
  if (Result.data.Status == 'Success') {  
    Result.data.FsList.map((item2) => {
   
        fs.push(
        {
          "key": item2.c_code,
          "text": item2.c_name,
          "value": item2.c_code,
        }
      )
    })

    this.setState({ FSName: fs })
  }

}).catch((Error) => {

  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
  }
  getRegion(reg){
    
    let returArray={"name":"Region","rvalue":reg};
    this.setState({Region2:reg});
    this.props.funcprops(returArray)

    var regdet = { "Report":"MeWisePhyAndDigital","index": "FsList",  data:{"RegionCode":reg,"DivCode":this.state.Division2,"AreaCode":""}  }

let fs=[]

postToServer("Reportsapi", regdet).then((Result) => {
  if (Result.data.Status == 'Success') {  
    Result.data.FsList.map((item2) => {
   
        fs.push(
        {
          "key": item2.c_code,
          "text": item2.c_name,
          "value": item2.c_code,
        }
      )
    })

    this.setState({ FSName: fs })
  }

}).catch((Error) => {

  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
  }
  getCategory(cat){
    
    let returArray={"name":"Category","rvalue":cat};
    this.setState({Category2:cat});
    this.props.funcprops(returArray)
  }
  getMonth(mnth){
    
    let returArray={"name":"Month","rvalue":mnth};
    this.setState({Month2:mnth});
    this.props.funcprops(returArray)
  }
  getFSName(name){
    
    let returArray={"name":"FSName","rvalue":name};
    this.setState({FSName2:name});
    this.props.funcprops(returArray)
  }

  filterApply(){
    
      this.props.filterapply("apply");
    

  }


  componentDidUpdate(){
     
  }

  componentDidMount(){
    //debugger;

    console.log("Division")
      var travelModes = { "Report":"MeWisePhyAndDigital","index": "Divisions",  data:{}  }

      let Division=[]

      postToServer("Reportsapi", travelModes).then((Result) => {
        console.log(Result,"division")
        if (Result.data.Status == 'Success') {    ;
          Result.data.Divisions.map((item1) => {
         
          Division.push(
              {
                "key": item1.c_code,
                "text": item1.c_name,
                "value": item1.c_code,
              }
            )
          })
  
          this.setState({ Division: Division })
        }

      }).catch((Error) => {
        
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })

//region binding

console.log("Region")
      var regdet = { "Report":"MeWisePhyAndDigital","index": "Regions",  data:{}  }

      let Region=[]

      postToServer("Reportsapi", regdet).then((Result) => {
        if (Result.data.Status == 'Success') {  
          Result.data.Regions.map((item2) => {
         
              Region.push(
              {
                "key": item2.c_code,
                "text": item2.c_name,
                "value": item2.c_code,
              }
            )
          })
  
          this.setState({ Region: Region })
        }

      }).catch((Error) => {
      
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
//category
//this.setState({Category2:"-999"});
var regdet = { "Report":"MeWisePhyAndDigital","index": "Category" }

let cate=[]

postToServer("Reportsapi", regdet).then((Result) => {
  if (Result.data.Status == 'Success') {  
    Result.data.Data.map((item2) => {
   
        cate.push(
        {
          "key": item2.c_code,
          "text": item2.c_name,
          "value": item2.c_code,
        }
      )
    })

    this.setState({ Category: cate })
  }

}).catch((Error) => {

  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
//fsname
//this.setState({FSName2:"-999"});
var regdet = { "Report":"MeWisePhyAndDigital","index": "FsList",  data:{"RegionCode":"-999","DivCode":"-999","AreaCode":"-999"}  }

let fs=[]

postToServer("Reportsapi", regdet).then((Result) => {
  if (Result.data.Status == 'Success') {  
    Result.data.Data.map((item2) => {
   
        fs.push(
        {
          "key": item2.C_Code,
          "text": item2.C_name,
          "value": item2.C_Code,
        }
      )
    })

    this.setState({ FSName: fs })
  }

}).catch((Error) => {

  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
    //debugger;
    let date = new Date();
    let currentMonth = date.getMonth();
    currentMonth=currentMonth+1;
    console.log(currentMonth,"current month")
        let Month = [{
          key: "1",
          text: "January",
          value: "1"
        },
        {
          key: "2",
          text: "February",
          value: "2"
        },
        {
          key: "3",
          text: "March",
          value: "3"
        }, {
          key: "4",
          text: "April",
          value: "4"
        }, {
          key: "5",
          text: "May",
          value: "5"
        }, {
          key: "6",
          text: "June",
          value: "6"
        }, {
          key: "7",
          text: "July",
          value: "7"
        }, {
          key: "8",
          text: "August",
          value: "8"
        }, {
          key: "9",
          text: "September",
          value: "9"
        }, {
          key: "10",
          text: "October",
          value: "10"
        }, {
          key: "11",
          text: "November",
          value: "11"
        }, {
          key: "12",
          text: "December",
          value: "12"
        }]
    
        // let returArray = { "name": "Month", "rvalue":  Month[currentMonth].value };
        // this.props.funcprops(returArray);
    
    
        this.setState({Month: Month, Month2: Month[currentMonth].value})
  
      let returArray = { "name": "Month", "rvalue": currentMonth.toString()};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: currentMonth.toString()})

  

  }
 
  render() {    
      const {Division,Region,FSName,Month,Category} = this.state;


      return (
          <div>
              <Dropdown className="myDropdown">
                  <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{backgroundColor:"white", color: '#6c757d', border:"1px solid #dfdfdf", fontSize:"0.875em", borderRadius:"10px", padding:"8px 12px"}}>
                          <img src="../public/assets/images/filtering.svg" />
                          <span> Filter Option</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="Repothers-dropdown1">
                              <Tab.Container id="left-tabs-example">
                                  <div>
                                      <div className='retrival-left'>
                                          <Nav variant="pills" className="flex-column">
                                              
                                              <Nav.Item>
                                                  <Nav.Link eventKey="Division">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>Division</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                              <Nav.Item>
                                                  <Nav.Link eventKey="Region">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>Region</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                              <Nav.Item>
                                                  <Nav.Link eventKey="Category">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>Category</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                              <Nav.Item>
                                                  <Nav.Link eventKey="Month">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>Month</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                              <Nav.Item>
                                                  <Nav.Link eventKey="FSName">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>FS Name</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                          </Nav>
                                      </div>

                                      <div className='retrival-right '>
                                          <Tab.Content>
                                              <Tab.Pane eventKey="Division">
                                                  <MeWisePhyandDigitalOptionDrop 
                                                      name="Division" 
                                                      options={Division} 
                                                      getData={this.getDivision}
                                                      // update={this.props.update}
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="Region">
                                                  <MeWisePhyandDigitalOptionDrop 
                                                      name="Region" 
                                                      options={Region} 
                                                      getData={this.getRegion}
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="Category">
                                                  <MeWisePhyandDigitalOptionDrop 
                                                      name="Category" 
                                                      options={Category} 
                                                      getData={this.getCategory}
                                                      value1={this.state.Category2}
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="Month">
                                                  <MeWisePhyandDigitalOptionDrop 
                                                      name="Month" 
                                                      options={Month} 
                                                      getData={this.getMonth}
                                                      value1={this.state.Month2}
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="FSName">
                                                  <MeWisePhyandDigitalOptionDrop 
                                                      name="FSName" 
                                                      options={FSName} 
                                                      getData={this.getFSName}
                                                      value1={this.state.FSName2}
                                                  />
                                              </Tab.Pane>                            
                                          </Tab.Content>
                                      </div>
                                      
                                  </div> 
                          </Tab.Container> 
                          <span  style={ {"color":"red" } } >{this.state.msgStatus} </span>       
                          <Dropdown.Item eventKey="1">
                                  <button className="gradient-btn " onClick={this.filterApply}>Apply</button>
                          </Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              <StatusPopup
                  message={this.state.smsg}
                  show={this.state.showStatusModal}
                  onClose={this.hideStatusModal}
                  success={this.state.success}
              />
          </div>
      );
  }
}
export default MeWisePhyandDigitalOptions