import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropPRPDetails from '../components/FilterOptionDropPRPDetails'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsPRPDetails extends Component {
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
            Brand:[],
            RPSname:[],
            Area:[],
            message:"",
            Division2:"",
            Region2:"",
            FSname2:"",
            Area2:"",
            Month2:"",
            RegCode:"",
            apply:"",
            selitem:"",
        }
        this.getMonth = this.getMonth.bind(this)
        this.getYear= this.getYear.bind(this)
        // this.getRpsname = this.getRpsname.bind(this)
        // this.getBrand = this.getBrand.bind(this)
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        this.getFSname=this.getFSname.bind(this)
        this.getArea=this.getArea.bind(this)
        
        
        
    }
//filter of division
    callbackFunction(childData) {
       // console.log(childData.rvalue, "callback")
     //   console.log(childData.name, "name")
       

  }
  
//fs name bind in region filter
getRegion(reg,text1){
    let returArray={"name":"Region","rvalue":reg,"textval":text1};
    this.setState({Region2:reg});
    this.props.funcprops(returArray)

    console.log(returArray,"array")

   //fsbind


    var regsel=""
    if((reg=="")||(reg=="All"))
    regsel="All"
    else
    regsel=reg

   
  var divi=""
  if((this.state.Division2=="")||(this.state.Division2=="All"))
 divi="All"
 else
 divi=this.state.Division2

 
 
 var are=""
 if((this.state.Area2=="")||(this.state.Area2=="All"))
are="All"
else
are=this.state.Area2

//debugger;
var brnd = { "index": "ListFSUnderareadivireg",  data:{"AreaCode":this.state.Area2 ,"DivisionCode":this.state.Division2,"RegionCode":reg}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":divi,"RegionCode":regsel}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }
//console.log(brnd,"region change ")
let FSname=[]

postToServer("PrpDetailsRpt", brnd).then((Result) => {
  if (Result.data.Status == 'Success') {  
   //console.log(Result,"full data23")
    Result.data.data.map((item5) => {
     // alert(item4['c_code']);
    // console.log(Result,"llll")
     FSname.push(
        {
          "key": item5.fscode,
          "text": item5.fsname,
          "value": item5.fscode,
       
        }
      )
    })
    
    this.setState({ FSname: FSname })
  }
}).catch((Error) => {
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})

//area
var travelModes = { "index": "ListArea",  data:{"RegionCode":regsel}  }

        let Area=[]
        postToServer("PrpDetailsRpt", travelModes).then((Result) => {
         // console.log(Result,"rpt")
          if (Result.data.Status == 'Success') {    ;
            Result.data.data.map((item1) => {
           
            Area.push(
                {
                  "key": item1.c_code,
                  "text": item1.c_name,
                  "value": item1.c_code,
                }
              )
            })
    
            this.setState({ Area: Area })
          }

        }).catch((Error) => {
          
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })


}



    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }

    // getMonth(month){
    //     this.props.funcprops(status)
        
    // }
    // getyear(year){
    //     this.props.funcprops(status)
    // }
    // getRpsname(fsname){
    //     this.props.funcprops(status)
    // }
     getArea(area,text1){
      let returArray={"name":"Area","rvalue":area,"textval":text1};
      this.setState({Area2:area});
     this.props.funcprops(returArray)
    
    
     var regsel=""
    if((this.state.Region2=="")||(this.state.Region2=="All"))
    regsel="All"
    else
    regsel=this.state.Region2

   
  var divi=""
  if((this.state.Division2=="")||(this.state.Division2=="All"))
 divi="All"
 else
 divi=this.state.Division2

 
 
 var are=""
 if((area=="")||(area=="All"))
are="All"
else
are=area

//debugger;
var brnd = { "index": "ListFSUnderareadivireg",  data:{"AreaCode":area ,"DivisionCode":this.state.Division2,"RegionCode":this.state.Region2}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":divi,"RegionCode":regsel}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }
//console.log(brnd,"region change ")
let FSname=[]

postToServer("PrpDetailsRpt", brnd).then((Result) => {
  if (Result.data.Status == 'Success') {  
   console.log(Result,"full data")
    Result.data.data.map((item5) => {
     // alert(item4['c_code']);
    // console.log(Result,"llll")
     FSname.push(
        {
          "key": item5.fscode,
          "text": item5.fsname,
          "value": item5.fscode,
       
        }
      )
    })
    
    this.setState({ FSname: FSname })
  }
}).catch((Error) => {
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
     }



    getDivision(div,text1){
        let returArray={"name":"Division","rvalue":div,"textval":text1};
       this.setState({Division2:div});
        this.props.funcprops(returArray)
        var regsel=""
   
var brnd = { "index": "ListFSUnderareadivireg",  data:{"AreaCode":this.state.Area2 ,"DivisionCode":div,"RegionCode":this.state.Region2}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":divi,"RegionCode":regsel}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }
//console.log(brnd,"region change ")
let FSname=[]

postToServer("PrpDetailsRpt", brnd).then((Result) => {
  if (Result.data.Status == 'Success') {  
   console.log(Result,"full data")
    Result.data.data.map((item5) => {
     // alert(item4['c_code']);
    // console.log(Result,"llll")
     FSname.push(
        {
          "key": item5.fscode,
          "text": item5.fsname,
          "value": item5.fscode,
       
        }
      )
    })
    
    this.setState({ FSname: FSname })
  }
}).catch((Error) => {
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
    }
    getFSname(fs,text1)
    {
        let returArray={"name":"FS Name","rvalue":fs,"textval":text1};
        this.setState({FSname2:fs});
        this.props.funcprops(returArray)
    }
    getMonth(mnth,text1)
    {
      let returArray={"name":"Month","rvalue":mnth,"textval":text1};
      this.setState({Month2:mnth});
      this.props.funcprops(returArray)
    }
    getYear(yr,text1){
        let returArray={"name":"Year","rvalue":yr,"textval":text1};
        this.setState({Year2:yr});
        this.props.funcprops(returArray)
    }  
    // getRegion(status){
    //     this.props.funcprops(status)
    // }

    filterApply(){
      
        this.props.filterapply("apply");
       

    }


    componentDidUpdate(olsprops,oldstate){
        if(olsprops.selecteddiv != this.props.selecteddiv){
          
        }
    }
  
    componentDidMount(){
      //division
      //this.setState({Division2:"All"});
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("PrpDetailsRpt", travelModes).then((Result) => {
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

//region
var defre={ "index": "LoginFSDetails",  data:{}  }
let RegionCode=""
let DivisionCode=""
//let areacode=""
postToServer("PrpDetailsRpt", defre).then((Result) => {
  if (Result.data.Status == 'Success') {   
  console.log(Result,"fsde")
  Result.data.data.map((item1,index) => {
  
     RegionCode=item1['C_Region_Code']
     DivisionCode=item1['c_div_code']
    //areacode=item1['C_Code']
  })
}
//console.log(RegionCode,"defreg1")
this.setState({Region2:RegionCode});
this.setState({Division2:(DivisionCode=="")?"All":DivisionCode});
//this.setState({Area2:areacode});
}).catch(() => {
            
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
//const {RegCode}=this.state;
//console.log(RegionCode,"defreg2")
//debugger;
      //  this.setState({Region2:RegionCode.toString()});
        var regdet = { "index": "ListRegion",  data:{}  }

        let Region=[]

        postToServer("PrpDetailsRpt", regdet).then((Result) => {
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
      

//area
this.setState({Area2:"All"});
var reg=''
var travelModes = { "index": "ListArea",  data:{"RegionCode":reg}  }

        let Area=[]
        postToServer("PrpDetailsRpt", travelModes).then((Result) => {
         // console.log(Result,"rpt")
          if (Result.data.Status == 'Success') {    ;
            Result.data.data.map((item1) => {
           
            Area.push(
                {
                  "key": item1.c_code,
                  "text": item1.c_name,
                  "value": item1.c_code,
                }
              )
            })
    
            this.setState({ Area: Area })
          }

        }).catch((Error) => {
          
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })
//month
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

       


//Year
        var yr = { "index": "TargetYear",  data:{}  }
        let date1 = new Date();
    let currentYear = date1.getFullYear();
        let abc = [{
          key: "1",
          text: "2010",
          value: "2010"
        }, {
          key: "2",
          text: "2011",
          value: "2011"
        }, {
          key: "3",
          text: "2012",
          value: "2012"
        }, {
          key: "4",
          text: "2013",
          value: "2013"
        }, {
          key: "5",
          text: "2014",
          value: "2014"
        }, {
          key: "15",
          text: "2015",
          value: "2015"
        }, {
          key: "16",
          text: "2016",
          value: "2016"
        }, {
          key: "17",
          text: "2017",
          value: "2017"
        }, {
          key: "18",
          text: "2018",
          value: "2018"
        }, {
          key: "19",
          text: "2019",
          value: "2019"
        }, {
          key: "20",
          text: "2020",
          value: "2020"
        }, {
          key: "21",
          text: "2021",
          value: "2021"
        }, {
          key: "22",
          text: "2022",
          value: "2022"
        }, {
          key: "23",
          text: "2023",
          value: "2023"
        }, {
          key: "24",
          text: "2024",
          value: "2024"
        }, {
          key: "25",
          text: "2025",
          value: "2025"
        }, {
          key: "26",
          text: "2026",
          value: "2026"
        }, {
          key: "27",
          text: "2027",
          value: "2027"
        }, {
          key: "28",
          text: "2028",
          value: "2028"
        }]
        let returArray1 = { "name": "Year", "rvalue": currentYear.toString() };
    this.setState({Year: abc, Year2: currentYear.toString() });
    this.props.funcprops(returArray1)

       

        

        // fsname binding
        this.setState({FSname2:"All"});
        var area1=""
        var divis=""
        var re=""
    var brnd = { "index": "ListFSUnderareadivireg",  data:{"AreaCode":"All" ,"DivisionCode":divis,"RegionCode":re}  }

    let FSname=[]

    postToServer("PrpDetailsRpt", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
       console.log(Result,"full data")
        Result.data.data.map((item5) => {
         // alert(item4['c_code']);
        // console.log(Result,"llll")
         FSname.push(
            {
              "key": item5.fscode,
              "text": item5.fsname,
              "value": item5.fscode,
           
            }
          )
        })
        
        this.setState({ FSname: FSname })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })







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
        const {Division,Region,Area,Month,Year,Brand,FSname} = this.state;
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
                                                    <Nav.Link eventKey="FSname">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Name</span>
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
                                                    <FilterOptionDropPRPDetails 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropPRPDetails
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                       //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Area">
                                                    <FilterOptionDropPRPDetails
                                                        name="Area" 
                                                        options={Area} 
                                                        getData={this.getArea}
                                                        value1={this.state.Area2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSname">
                                                    <FilterOptionDropPRPDetails
                                                        name="FS Name" 
                                                        options={FSname} 
                                                        getData={this.getFSname}
                                                        value1={this.state.FSname2}
                                                    />
                                                </Tab.Pane>
                                              
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropPRPDetails
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropPRPDetails 
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

export default FilterOptionsPRPDetails