import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropRPSAct from '../components/FilterOptionDropRPSAct'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsRPSAct extends Component {
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
            message:"",
            Division2:"",
            Region2:"",
            RPSname2:"",
            Month2:"",
            apply:""
        }
        this.getMonth = this.getMonth.bind(this)
        this.getYear= this.getYear.bind(this)
        // this.getRpsname = this.getRpsname.bind(this)
        // this.getBrand = this.getBrand.bind(this)
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        this.getRpsname=this.getRpsname.bind(this)
        // this.getRegion=this.getRegion.bind(this)
        
        
        
    }
//filter of division
    callbackFunction(childData) {
       // console.log(childData.rvalue, "callback")
     //   console.log(childData.name, "name")
        if(childData.name=="Division")
        {
           // console.log(childData.name,"Division chage call")
            var brnd = { "index": "ListBrandName",  data:{ "DivisionCode":childData.rvalue}  }

            let Brand1=[]

                    postToServer("RpsActivityRpt", brnd).then((Result) => {
                    if (Result.data.Status == 'Success') {  
                        Result.data.data.map((item4) => {
                            Brand.push(
                            {
                            "key": item4.c_code,
                            "text": item4.c_name,
                            "value": item4.c_code,
                        
                            }
                        )
                        })
                        
                        this.setState({ Brand: Brand1 })
                    }

                    }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
                    })
            


                    //rpsname filter
                    var reg=''
                    if(Region=="")
                    reg="All"
                    else
                    reg=Region
                    var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":childData.rvalue,"RegionCode":reg}  }

                let RPSname=[]
       
                    postToServer("RpsActivityRpt", brnd).then((Result) => {
                    if (Result.data.Status == 'Success') {  
                        Result.data.data.map((item4) => {
                            RPSname.push(
                            {
                            "key": item4.c_code,
                            "text": item4.c_name,
                            "value": item4.c_code,
                        
                            }
                        )
                        })
                        
                        this.setState({ RPSname: RPSname })
                    }

                    }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
                    })
        }
        else 
        //if(childData.name=="Region")
        {
            //console.log(childData.name,"Region chage call")
             //rpsname filter
            var reg=''
            if(Region=="")
            reg="All"
            else
            reg=childData.rvalue
            var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":Division,"RegionCode":reg}  }

            let RPSname=[]
            
            postToServer("RpsActivityRpt", brnd).then((Result) => {
            if (Result.data.Status == 'Success') {  
                Result.data.data.map((item4) => {
                    RPSname.push(
                    {
                    "key": item4.c_code,
                    "text": item4.c_name,
                    "value": item4.c_code,
                
                    }
                )
                })
                
                this.setState({ RPSname: RPSname })
            }

            }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
            })
        }

  }
  
//rps name bind in region filter
getRegion(reg,text1){
    let returArray={"name":"Region","rvalue":reg,"textval":text1};
    this.setState({Region2:reg});
    this.props.funcprops(returArray)

    

    //console.log(reg,"regte");


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

 
 


//debugger;
var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":divi,"RegionCode":regsel}  }
//var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }
console.log(brnd,"region change ")
let rps=[]

postToServer("RpsActivityRpt", brnd).then((Result) => {
    console.log(Result,"stat")
  if (Result.data.Status == 'Success') {  
  // console.log(Result,"stat")
  Result.data.data[0].map((item14) => {
      //console.log(Result,"fsnew")
      rps.push(
        {
          "key": item14.c_code,
          "text": item14.c_name,
          "value": item14.c_code,
       
        }
      )
    })
    
    this.setState({ RPSname: rps })
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

    getDivision(div,text1){
        let returArray={"name":"Division","rvalue":div,"textval":text1};
       this.setState({Division2:div});
      
      
      this.props.funcprops(returArray)
    }
    getRpsname(rps,text1)
    {
        let returArray={"name":"RPSname","rvalue":rps,"textval":text1};
        this.setState({RPSname2:rps});
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
        // var travelModes={ "index": "ListDivision",  data:{"DivisionCode":"All","RegionCode":"All","rpscode":"All","Brandcode":"All","monthtype":"1","year":"2018"}  }
        // postToServer("RPSBrandWiseRpt", travelModes).then((Result) => {
        //     if (Result.data.Status == 'Success') {    ;
        //       Result.data.data.map((item1) => {
             
        //       Division.push(
        //           {
        //             "key": item1.c_code,
        //             "text": item1.c_name,
        //             "value": item1.c_code,
        //           }
        //         )
        //       })
      
        //       this.setState({ Division: Division })
        //     }
  
        //   }).catch((Error) => {
            
        //     this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        //   })
       
            // this.state.Division,
            //  this.state.Region,
            //  this.state.RPSname,
            //  this.state.Brand,
            //  this.state.month,
            //  this.state.year,

    }


    componentDidUpdate(olsprops,oldstate){
        if(olsprops.selecteddiv != this.props.selecteddiv){
          
        }
    }
  
    componentDidMount(){
      //this.setState({Division2:"All"});
      var defre={ "index": "LoginFSDetails",  data:{}  }
      let divcode=""
       postToServer("PrpDetailsRpt", defre).then((Result) => {
       if (Result.data.Status == 'Success') {   
        console.log(Result,"fsde")
        Result.data.data.map((item1,index) => {
      
          divcode=item1['c_div_code']
        
       })
      }
    //console.log(divcode,"defreg1")
     this.setState({Division2:(divcode=="")?"All":divcode});
      }).catch(() => {
                
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
     })
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("RpsActivityRpt", travelModes).then((Result) => {
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
        this.setState({Region2:"All"});
        let Region=[]

        postToServer("RpsActivityRpt", regdet).then((Result) => {
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
  
      let returArray = { "name": "Month", "rvalue": val.toString(),"textval":"Jan-Dec"};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: val.toString()})

        // let Month=[]

        // postToServer("RpsActivityRpt", mnth).then((Result) => {
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

        // let Year=[]

        // postToServer("RpsActivityRpt", yr).then((Result) => {
        //   if (Result.status == "200") {  
        //     Result.data.map((item4) => {
        //         Year.push(
        //         {
        //           "key": item4.Code,
        //           "text": item4.Name,
        //           "value": item4.Code,
               
        //         }
        //       )
        //     })
            
        //     this.setState({ Year: Year })
        //   }

        // }).catch((Error) => {
        //   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        // })


        

        // rpsname binding
        var brandsel=''
        if(this.state.Division2=="")
        brandsel="All"
        else
        brandsel=this.state.Division2
        var regi=""
        if(this.state.Region2=="")
        regi=""
        else
        regi=this.state.Region2
    var brnd = { "index": "ListRpsName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }
    this.setState({RPSname2:"All"});
    let RPSname=[]

    postToServer("RpsActivityRpt", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
       // console.log(Result,"full data")
        Result.data.data[0].map((item5) => {
         // alert(item4['c_code']);
         //console.log(item5,"llll")
            RPSname.push(
            {
              "key": item5.c_code,
              "text": item5.c_name,
              "value": item5.c_code,
           
            }
          )
        })
        
        this.setState({ RPSname: RPSname })
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
        const {Division,Region,Month,Year,Brand,RPSname} = this.state;
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
                                                    <Nav.Link eventKey="RPSname">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>RPS Name</span>
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
                                                    <FilterOptionDropRPSAct 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropRPSAct
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="RPSname">
                                                    <FilterOptionDropRPSAct
                                                        name="RPSname" 
                                                        options={RPSname} 
                                                        getData={this.getRpsname}
                                                        value1={this.state.RPSname2}
                                                    />
                                                </Tab.Pane>
                                              
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropRPSAct
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropRPSAct 
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

export default FilterOptionsRPSAct