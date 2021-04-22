import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropPRPACTIVITY from './FilterOptionDropPRPACTIVITY'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsPRPACTIVITY extends Component {
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
            Prpname:[],
           
            message:"",
            apply:"",
            Division2:'',
            prpname2:'',
            Region2:'',
            Month2:'',
            Year2:'',           

        }
        
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        this.getPrpname=this.getPrpname.bind(this)
        this.getMonth=this.getMonth.bind(this)
        this.getYear=this.getYear.bind(this)
        
        
        
    }
//filter of division
    callbackFunction(childData) {

  }
  
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }
    getRegion(reg,text1){
      let returArray={"name":"Region","rvalue":reg,"textval":text1};
      this.setState({Region2:reg});
      this.props.funcprops(returArray)
      var div2="All"
      if(this.state.Division2!="")
      {
        div2=this.state.Division2
      }

      var prpn = { "index": "ListPrpName",  data:{"DivisionCode":div2,"RegionCode":reg}  }

      let Rpsnames=[]

      postToServer("PRP_Activity_Rpt", prpn).then((Result) => {
        if (Result.data.Status == 'Success') {  
          Result.data.data.map((item2) => {
         
            Rpsnames.push(
              {
                "key": item2.c_code,
                "text": item2.c_name,
                "value": item2.c_code,
              }
            )
          })
  
          this.setState({ Prpname: Rpsnames })
        }

      }).catch((Error) => {
      
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
    }


    getPrpname(are,text1){
      let returArray={"name":"Prpname","rvalue":are,"textval":text1};
      this.setState({prpname2:are});
      this.props.funcprops(returArray)
      var brand={ "index": "LstFswithdivarearegtype",  data:{"AreaCode":are,"DivisionCode":this.state.Division2,"RegionCode":this.state.Region2,"DesigCode":"-999"} }
    
      
      

    }

    getMonth(mnth,text1){
      let returArray={"name":"Month","rvalue":mnth,"textval":text1};
      this.setState({Month2:mnth});
      this.props.funcprops(returArray)
     
    }

    getYear(yr,text1){
      let returArray={"name":"Year","rvalue":yr,"textval":text1};
      this.setState({Year2:yr});
      this.props.funcprops(returArray)
      
    }


    getDivision(status,text1){
      let returArray={"name":"Division","rvalue":status,"textval":text1};
      this.setState({Division2:status});
      this.props.funcprops(returArray)
      var reg2="All"
      if(this.state.Region2!="")
      {
        reg2=this.state.Region2
      }

      var prpn = { "index": "ListPrpName",  data:{"DivisionCode":status,"RegionCode":reg2}  }

      let Rpsnames=[]

      postToServer("PRP_Activity_Rpt", prpn).then((Result) => {
        if (Result.data.Status == 'Success') {  
          Result.data.data.map((item2) => {
         
            Rpsnames.push(
              {
                "key": item2.c_code,
                "text": item2.c_name,
                "value": item2.c_code,
              }
            )
          })
  
          this.setState({ Prpname: Rpsnames })
        }

      }).catch((Error) => {
      
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
     
    }

   

    filterApply(){
      
        this.props.filterapply("apply");
    }


    componentDidUpdate(){  
    }

   
  
    componentDidMount(){

      this.setState({Division2:"All"});
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("PRP_Activity_Rpt", travelModes).then((Result) => {
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

        this.setState({Region2:"All"});
        var regdet = { "index": "ListRegion",  data:{}  }

        let Region=[]

        postToServer("PRP_Activity_Rpt", regdet).then((Result) => {
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
        var prpn = { "index": "ListPrpName",  data:{"DivisionCode":"All","RegionCode":"All"}  }

        let Rpsnames=[]
        this.setState({prpname2:"All"});
        postToServer("PRP_Activity_Rpt", prpn).then((Result) => {
          if (Result.data.Status == 'Success') {  
            console.log(Result.data)
            Result.data.data.map((item2) => {
           
              Rpsnames.push(
                {
                  "key": item2.c_code,
                  "text": item2.c_name,
                  "value": item2.c_code,
                }
              )
            })
    
            this.setState({ Prpname: Rpsnames })
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
  
      let returArray = { "name": "Month", "rvalue": val.toString(),"textval":"Jan-Dec"};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: val.toString()})

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
        let status =[]
        let fname = []
        this.state.fname.map((item)=>{
            fname.push({
                'key':item.FSCODE,
                'text':item.FSNAME,
                'value':item.FSCODE,
            })
        })
        const {Division,Region,Month,Year,Prpname} = this.state;
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
                                                    <Nav.Link eventKey="Prpname">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>PRP Name</span>
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
                                                    <FilterOptionDropPRPACTIVITY
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropPRPACTIVITY
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        // parentCallback={this.props.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Prpname">
                                                    <FilterOptionDropPRPACTIVITY
                                                        name="Prpname" 
                                                        options={Prpname} 
                                                        getData={this.getPrpname}
                                                        value1={this.state.prpname2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropPRPACTIVITY 
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                        
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropPRPACTIVITY
                                                        name="Year"
                                                        options={Year} 
                                                        getData={this.getYear}
                                                        value1={this.state.Year2}
                                                        className="customized-input"
                                                        
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

export default FilterOptionsPRPACTIVITY