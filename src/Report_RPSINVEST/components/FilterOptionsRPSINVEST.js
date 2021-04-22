import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropRPSINVEST from './FilterOptionDropRPSINVEST'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsRPSINVEST extends Component {
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
            FSName:[],
            Type:[],
            message:"",
            apply:"",
            Division2:'',
            Area2:'',
            Region2:'',
            updatename:'',
            Month2:'',
            Year2:'',
            FSname2:'',
            Type:'',
            Type2:'',
            DRegion1:'',
             DDivision1:'',
         Darea1:'',
        }
        
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        this.getFSname=this.getFSname.bind(this)
        this.getArea=this.getArea.bind(this)
        this.getMonth=this.getMonth.bind(this)
        this.getYear=this.getYear.bind(this)
        this.getType=this.getType.bind(this)
        
        
        
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


      
      
  var brnd = { "index": "ListHq",  data:{ "RegionCode":reg}  }

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
//fs binding
var brand={ "index": "getFSUnderAreaAndRegion",  data:{"AreaCode":this.state.Area2,"DivisionCode":this.state.Division2,"RegionCode":reg,"DesigCode":"-999"} }
    
      
          let FSName=[]
      // console.log(brand,";;;;")
          postToServer("RPS_InvesttHis", brand).then((Result) => {
            if (Result.data.Status == 'Success') {  
              // console.log(Result.data.data,"fs names")
              // console.log(Result,"123")
              Result.data.data.map((item4) => {
                // console.log("inside the fsfilter data");
                FSName.push(
                  {
                    "key": item4.fsname,
                    "text": item4.fscode,
                    "value": item4.fsname,
                 
                  }
                )
              })
              
              this.setState({ FSName: FSName })
            }
      
          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })

    }

    getArea(are,text1){
      let returArray={"name":"Area","rvalue":are,"textval":text1};
      this.setState({Area2:are});
      this.props.funcprops(returArray)
      var brand={ "index": "getFSUnderAreaAndRegion",  data:{"AreaCode":are,"DivisionCode":this.state.Division2,"RegionCode":this.state.Region2,"DesigCode":"-999"} }
    
      
          let FSName=[]
      // console.log(brand,";;;;")
          postToServer("RPS_InvesttHis", brand).then((Result) => {
            if (Result.data.Status == 'Success') {  
              // console.log(Result.data.data,"fs names")
              // console.log(Result,"123")
              Result.data.data.map((item4) => {
                // console.log("inside the fsfilter data");
                FSName.push(
                  {
                    "key": item4.fsname,
                    "text": item4.fscode,
                    "value": item4.fsname,
                 
                  }
                )
              })
              
              this.setState({ FSName: FSName })
            }
      
          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })
      

    }

    getFSname(fs,text1){
      let returArray={"name":"FS Name","rvalue":fs,"textval":text1};
      this.setState({FSname2:fs});
      this.props.funcprops(returArray)
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
    
     //fsbind
     var brand={ "index": "getFSUnderAreaAndRegion",  data:{"AreaCode":this.state.Area2,"DivisionCode":status,"RegionCode":this.state.Region2,"DesigCode":"-999"} }
    
      
     let FSName=[]
 // console.log(brand,";;;;")
     postToServer("RPS_InvesttHis", brand).then((Result) => {
       if (Result.data.Status == 'Success') {  
         // console.log(Result.data.data,"fs names")
         // console.log(Result,"123")
         Result.data.data.map((item4) => {
           // console.log("inside the fsfilter data");
           FSName.push(
             {
               "key": item4.fsname,
               "text": item4.fscode,
               "value": item4.fsname,
            
             }
           )
         })
         
         this.setState({ FSName: FSName })
       }
 
     }).catch((Error) => {
       this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
     })
    //  console.log(status,"Division value")
          //set designcode as -999
     
    }

    getType(tp,text1){
      let returArray={"name":"Type","rvalue":tp,"textval":text1};
      this.setState({Type2:tp});
      this.props.funcprops(returArray)
      
    }
  

    filterApply(){
      
        this.props.filterapply("apply");
    }


    componentDidUpdate(){  
    }

   
  
    componentDidMount(){
//type binding
      this.setState({Type2:"1"});
      var typeprp = { "index": "Type", data: {} }
  
      let Type = []
  
    
      postToServer("RptEceptionalrpsprp", typeprp).then((Result) => {
       
        if (Result.status == '200') {
          
          Result.data.map((item8) => {
  
            Type.push(
              {
                "key": item8.Code,
                "text": item8.Name,
                "value": item8.Code,
              }
            )
          })
  
          this.setState({ Type: Type })
        }
  
      }).catch((Error) => {
  
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
   
   var defre={ "index": "LoginFSDetails",  data:{}  }
let RegionCode=""
let Divisioncode1=""
//let areacode=""
postToServer("PrpDetailsRpt", defre).then((Result) => {
  if (Result.data.Status == 'Success') {   
  //console.log(Result,"LoginFSDetails")
  Result.data.data.map((item1,index) => {
  
     RegionCode=item1['C_Region_Code']
     Divisioncode1=item1['c_div_code']
    // areacode=item1['C_Code']
    
  })
}
//console.log(RegionCode,"defreg1")
this.setState({Region2:RegionCode});
// alert(Divisioncode1)
if(Divisioncode1=="")
{
  Divisioncode1="All"
}

this.setState({Division2:Divisioncode1});
//this.setState({Area2:areacode});
}).catch(() => {
            
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("RPS_InvesttHis", travelModes).then((Result) => {
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


        var regdet = { "index": "ListRegion",  data:{}  }

        let Region=[]

        postToServer("RPS_InvesttHis", regdet).then((Result) => {
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
  
      let returArray = { "name": "Month", "rvalue": val.toString(), "textval":"Jan-Dec"};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: val.toString()})

        // let Month=[]

        // postToServer("RPS_InvesttHis", mnth).then((Result) => {
        //   if (Result.status == "200") { 
        //     Result.data.map((item3) => {
        //         Month.push(
        //         {
        //           "key": item3.Code,
        //           "text": item3.Name,
        //           "value": item3.Code,
               
        //         }
        //       )
        //     })
            
        //     this.setState({ Month: Month })
        //   }

        // }).catch((Error) => {
        
        //   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        // })



        var yr = { "index": "TargetYear",  data:{}  }
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

        

        this.setState({Area2:"All"});
        // brand binding
            var regsel=''
            if(Region=="")
            regsel=""
            else
            regsel=this.state.Region2
        var brnd = { "index": "ListHq",  data:{ "RegionCode":regsel}  }

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


        var defre={ "index": "LoginFSDetails",  data:{}  }

postToServer("PrpDetailsRpt", defre).then((Result) => {
  if (Result.data.Status == 'Success') {   
  //console.log(Result,"LoginFSDetails1")
  Result.data.data.map((item1,index) => {
    
  
    this.setState({ DRegion1:item1['C_Region_Code']})
    this.setState({ DDivision1: item1['c_div_code']})
    this.setState({ Darea1: item1['C_Code']})


    
//console.log(item1['C_Region_Code'],"Default region code")
// fsname binding
this.setState({FSname2:"All"});
var brandsel=''
if(Division=="")
brandsel="All"
else
brandsel=Division

var brnd = { "index": "getFSUnderAreaAndRegion",  data:{"AreaCode":"All","DivisionCode":"","RegionCode":"","DesigCode":"-999"} }

let FSName=[]
// debugger;
postToServer("RPS_InvesttHis", brnd).then((Result) => {
if (Result.data.Status == 'Success') {  
 //console.log(Result.data.data,"fs names")
 //console.log(Result,"ccc")
Result.data.data.map((item4) => {
  FSName.push(
    {
      "key": item4.fsname,
      "text": item4.fscode,
      "value": item4.fsname,
   
    }
  )
})

this.setState({ FSName: FSName })
}

}).catch((Error) => {
this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
    
  })
}
})



    }
   
    render() {
      
     // let Type=[{'key':'PRP', 'text': 'PRP','value': 'PRP'},{'key':'RPS', 'text': 'RPS','value': 'RPS'}];
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
        const {Division,Region,Month,Year,Area,FSName,Type} = this.state;
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
                                                    <Nav.Link eventKey="FSName">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Type">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Type</span>
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
                                                    <FilterOptionDropRPSINVEST 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropRPSINVEST 
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        // parentCallback={this.props.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Area">
                                                    <FilterOptionDropRPSINVEST
                                                        name="Area" 
                                                        options={Area} 
                                                        getData={this.getArea}
                                                        value1={this.state.Area2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSName">
                                                    <FilterOptionDropRPSINVEST 
                                                        name="FS Name"
                                                        options={FSName} 
                                                        getData={this.getFSname}
                                                        value1={this.state.FSname2}
                                                        
                                                    />
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="Type">
                                                    <FilterOptionDropRPSINVEST 
                                                        name="Type"
                                                        options={Type} 
                                                        getData={this.getType}
                                                        value1={this.state.Type2}
                                                        
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropRPSINVEST 
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropRPSINVEST 
                                                        name="Year"
                                                        options={Year} 
                                                        getData={this.getYear}
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

export default FilterOptionsRPSINVEST