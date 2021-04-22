import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import Stckst_Value_sec_saleOptionDrop from '../components/Stckst_Value_sec_saleOptionDrop'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class Stckst_Value_sec_saleOptions extends Component {
    constructor(props){
        super(props)
        this.state={
            year:'',
            fsname:'',
            status:'',
            fname:[],
            msgStatus:'',
            success:false,
            smsg:'',
            showStatusModal:false,
           
            Division:[],
            Region:[],
            Month:[],
            Year:[],
            Area:[],
            Designation:[],
            Division2:"",
            Region2:"",
            Month2:"",
            Year2:"",
            Area2:"",
            Designation2:"",
            message:"",
            apply:"",
            currmonth:new Date().getMonth()+1,
            
        }
         this.getMonth = this.getMonth.bind(this)
         this.getyear= this.getyear.bind(this)
         this.getDesignation = this.getDesignation.bind(this)
         this.getArea = this.getArea.bind(this)
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

    getMonth(month){
      let returArray={"name":"Month","rvalue":month};
      this.setState({Month2:month});
      this.props.funcprops(returArray)
        
    }
    getyear(year){
      let returArray={"name":"Year","rvalue":year};
      this.setState({Year2:year});
      this.props.funcprops(returArray)
    }
    getDesignation(Design){
     // console.log(rpsname,"rpsval")
      let returArray={"name":"Designation","rvalue":Design};
      this.setState({Designation2:Design});
      this.props.funcprops(returArray)
     
    }
    getArea(area){
      let returArray={"name":"Area","rvalue":area};
      this.setState({Area2:area});
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


    componentDidUpdate(olsprops,oldstate){
        if(olsprops.selecteddiv != this.props.selecteddiv){
          
        }
    }
  
    componentDidMount(){
      var defre={ "index": "LoginFSDetails",  data:{}  }
  let divcode=""
   postToServer("PrpDetailsRpt", defre).then((Result) => {
   if (Result.data.Status == 'Success') {   
    // console.log(Result,"fsde")
    Result.data.data.map((item1,index) => {
  
      divcode=item1['c_div_code']
    
   })
  }
//console.log(divcode,"defreg1")
 this.setState({Division2:(divcode=="")?"All":divcode});
  }).catch(() => {
            
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
 })
     // this.setState({Division2:"All"});
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
        this.setState({Region2:"All"});
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

        

        this.setState({Area2:"All"});
        // brand binding
            
        var brnd = { "index": "ListHq",  data:{ "RegionCode":"-000"}  }

        let Area=[]

        postToServer("RPS_InvesttHis", brnd).then((Result) => {
          if (Result.data.Status == 'Success') {  
            
            Result.data.data.map((item4) => {
              Area.push(
                {
                  "key": item4.c_code,
                  "text": item4.c_name,
                  "value": item4.c_code,
               
                }
              )
            })
            
            this.setState({ Area: Area })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        var mnth = { "index": "MonthType",  data:{}  }

        let val=1;
      //  let currentMonth = date.getMonth();
    let Month = [{
      key: "1",
      text: "Jan-Dec",
      value: "1"
    },
    {
      key: "0",
      text: "Apr-Mar",
      value: "0"
    }]

    let returArray = { "name": "Month", "rvalue": val.toString()};
     this.props.funcprops(returArray)
     this.setState({Month: Month, Month2: val.toString()})

        var yr = { "index": "TargetYear",  data:{}  }

       // let Year=[]
        let date1 = new Date();
    let currentYear = date1.getFullYear();
        let abc = [{
          key: "1",
          text: "2005",
          value: "2005"
        },
        {
          key: "2",
          text: "2006",
          value: "2006"
        },
        {
          key: "3",
          text: "2007",
          value: "2007"
        }, {
          key: "4",
          text: "2008",
          value: "2008"
        }, {
          key: "5",
          text: "2009",
          value: "2009"
        }, {
          key: "6",
          text: "2010",
          value: "2010"
        }, {
          key: "7",
          text: "2011",
          value: "2011"
        }, {
          key: "8",
          text: "2012",
          value: "2012"
        }, {
          key: "9",
          text: "2013",
          value: "2013"
        }, {
          key: "10",
          text: "2014",
          value: "2014"
        }, {
          key: "11",
          text: "2015",
          value: "2015"
        }, {
          key: "12",
          text: "2016",
          value: "2016"
        }, {
          key: "13",
          text: "2017",
          value: "2017"
        }, {
          key: "14",
          text: "2018",
          value: "2018"
        }, {
          key: "15",
          text: "2019",
          value: "2019"
        }, {
          key: "16",
          text: "2020",
          value: "2020"
        }, {
          key: "17",
          text: "2021",
          value: "2021"
        }, {
          key: "18",
          text: "2022",
          value: "2022"
        }]
        let returArray1 = { "name": "Year", "rvalue": currentYear.toString() };
    this.setState({Year: abc, Year2: currentYear.toString() });
    this.props.funcprops(returArray1)
    }
   
    render() {
        

        let months=[]
        let years = []
       
        
        
        let status =[
            
        ]
        let fname = []
        this.state.fname.map((item)=>{
            fname.push({
                'key':item.FSCODE,
                'text':item.FSNAME,
                'value':item.FSCODE,
            })
        })
        const {Division,Region,Month,Year,Area,Designation} = this.state;
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
                                                    <Nav.Link eventKey="Area">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Area</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Designation">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Designation</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Month">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Month</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Year">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Year</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>

                                        <div className='retrival-right '>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Division">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Area">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Area" 
                                                        options={Area} 
                                                        getData={this.getArea}
                                                        value1={this.state.Area2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Designation">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Designation"
                                                        options={Designation} 
                                                        getData={this.getDesignation}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <Stckst_Value_sec_saleOptionDrop 
                                                        name="Year"
                                                        options={Year} 
                                                        getData={this.getyear}
                                                        value1={this.state.Year2}
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

export default Stckst_Value_sec_saleOptions