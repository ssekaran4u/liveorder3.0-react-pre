import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import DistanceCallOptionDrop from '../components/DistanceCallOptionDrop'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class DistanceCallOptions extends Component {
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
         
          TypeofDistanceCall:[],
         
          Division2:"",
          Region2:"",
          TypeofDistanceCall2:"",
         
         
          message:"",
          apply:"",
      
          
      }
     
       this.getDistanceCall = this.getDistanceCall.bind(this)
      this.filterApply= this.filterApply.bind(this)
      this.getDivision=this.getDivision.bind(this)
     this.getRegion=this.getRegion.bind(this)
      
      
      
  }
//filter of division
  callbackFunction(childData) {
     // console.log(childData.rvalue, "callback")
   //   console.log(childData.name, "name")
      if(childData.name=="Division")
      {
      }
      else 
      //if(childData.name=="Region")
      {
      }

}



  hideStatusModal(){
      this.setState({
          showStatusModal:!this.state.showStatusModal,
      })
      
  }

 
  getDistanceCall(distancecall){
    let returArray={"name":"Area","rvalue":distancecall};
    this.setState({TypeofDistanceCall2:distancecall});
    this.props.funcprops(returArray)
  }
  getDivision(div){
   // debugger;
    let returArray={"name":"Division","rvalue":div};
    this.setState({Division2:div});
   
   
   this.props.funcprops(returArray)
  }
  getRegion(reg){
    
    let returArray={"name":"Region","rvalue":reg};
    this.setState({Region2:reg});
    this.props.funcprops(returArray)
  }

  filterApply(){
    
      this.props.filterapply("apply");
    

  }


  componentDidUpdate(){
     
  }

  componentDidMount(){

      var travelModes = { "index": "ListDivision",  data:{}  }

      let Division=[]

      postToServer("RPSBrandWiseRpt", travelModes).then((Result) => {
        if (Result.data.Status == 'Success') {    ;
          Result.data.data.map((item1) => {
         
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

      var regdet = { "index": "ListRegion",  data:{}  }

      let Region=[]

      postToServer("RPSBrandWiseRpt", regdet).then((Result) => {
        if (Result.data.Status == 'Success') {  
          Result.data.data.map((item2) => {
         
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
  }
 
  render() {    
      const {Division,Region,TypeofDistanceCall} = this.state;
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
                                                  <Nav.Link eventKey="TypeofDistanceCall">
                                                      <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                      <span>Type of Distance Call</span>
                                                  </Nav.Link>
                                              </Nav.Item>
                                          </Nav>
                                      </div>

                                      <div className='retrival-right '>
                                          <Tab.Content>
                                              <Tab.Pane eventKey="Division">
                                                  <DistanceCallOptionDrop 
                                                      name="Division" 
                                                      options={Division} 
                                                      getData={this.getDivision}
                                                      update={this.props.update}

               
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="Region">
                                                  <DistanceCallOptionDrop 
                                                      name="Region" 
                                                      options={Region} 
                                                      getData={this.getRegion}
                                                  />
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="TypeofDistanceCall">
                                                  <DistanceCallOptionDrop 
                                                      name="TypeofDistanceCall" 
                                                      options={TypeofDistanceCall} 
                                                      getData={this.getDistanceCall}
                                                      // value1={this.state.Area2}
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
export default DistanceCallOptions