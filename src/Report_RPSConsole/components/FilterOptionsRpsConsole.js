import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropRpsConsole from '../components/FilterOptionDropRpsConsole'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsRpsConsole extends Component {
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
            message:"",
            apply:"",

            Division2:'',
            Region2:'',
            Month2:'',
            Year2:'',
        }
         this.getMonth = this.getMonth.bind(this)
         this.getyear= this.getyear.bind(this)
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
           // console.log(childData.name,"Division chage call")
            var brnd = { "index": "ListBrand",  data:{ "DivisionCode":childData.rvalue}  }

            let Brand1=[]

                    postToServer("PRPBrndWisRpt", brnd).then((Result) => {
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
                    var brnd = { "index": "ListPrpName",  data:{ "DivisionCode":childData.rvalue,"RegionCode":reg}  }

                let RPSname=[]
       
                    postToServer("PRPBrndWisRpt", brnd).then((Result) => {
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
            console.log(childData.name,"Region chage call")
             //rpsname filter
            var reg=''
            if(Region=="")
            reg="All"
            else
            reg=childData.rvalue
            var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":Division,"RegionCode":reg}  }

            let RPSname=[]
            
            postToServer("PRPBrndWisRpt", brnd).then((Result) => {
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
  


    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }

    getMonth(month,text1){
      let returArray={"name":"Month","rvalue":month,"textval":text1};
      this.setState({Month2:month});
      this.props.funcprops(returArray)        
    }
    getyear(year,text1){
      let returArray={"name":"Year","rvalue":year,"textval":text1};
      this.setState({Year2:year});
      this.props.funcprops(returArray)  
    }
    
    getDivision(div,text1){
      let returArray={"name":"Division","rvalue":div,"textval":text1};
      this.setState({Division2:div});
      this.props.funcprops(returArray)  
    }
    getRegion(reg,text1){
      let returArray={"name":"Region","rvalue":reg,"textval":text1};
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
      //this.setState({Division2:"All"});
      var defre={ "index": "LoginFSDetails",  data:{}  }
//let RegionCode=""
let DivisionCode=""
postToServer("PrpDetailsRpt", defre).then((Result) => {
  if (Result.data.Status == 'Success') {   
  console.log(Result,"fsde")
  Result.data.data.map((item1,index) => {
  
     //RegionCode=item1['C_Region_Code']
     DivisionCode=item1['c_div_code']
    
  })
}
//console.log(RegionCode,"defreg1")
//this.setState({Region2:RegionCode});
this.setState({Division2:(DivisionCode=="")?"All":DivisionCode});
}).catch(() => {
            
  this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("PRPBrndWisRpt", travelModes).then((Result) => {
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

        postToServer("PRPBrndWisRpt", regdet).then((Result) => {
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
        let stringlabel="";
      let date = new Date();
      let currentMonth = date.getMonth();
      currentMonth=currentMonth+1;
      //console.log(currentMonth,"current month")
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
      

          if(currentMonth==1)
    {
      
      stringlabel= "January";
  }
  else if (currentMonth==2) {

   
    stringlabel= "February"
  }
  else if (currentMonth==3) {
 
   
    stringlabel= "March"
  }
  else if (currentMonth==4){

   
    stringlabel= "April"
  }
  else if (currentMonth==5){
  
    
    stringlabel= "May"
  }else if (currentMonth==6){

    
    stringlabel= "June"
  }else if (currentMonth==7){
 
   
    stringlabel= "July"
  }else if (currentMonth==8){

    
    stringlabel= "August"
  }else if (currentMonth==9){
  
   
    stringlabel= "September"
  }else if (currentMonth==10){

   
    stringlabel= "October"
  }else if (currentMonth==11){
 
   
    stringlabel= "November"
  }else if (currentMonth==12){
 
    
    stringlabel= "December"
  }
          // let returArray = { "name": "Month", "rvalue":  Month[currentMonth].value };
          // this.props.funcprops(returArray);
      
      
         // this.setState({Month: Month, Month2: Month[currentMonth].value})
  
      let returArray = { "name": "Month", "rvalue": currentMonth.toString(),"textval":stringlabel};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: currentMonth.toString()})


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
        

        // brand binding
            var brandsel=''
            if(Division=="")
            brandsel="All"
            else
            brandsel=Division
        var brnd = { "index": "ListBrand",  data:{ "DivisionCode":brandsel}  }

        let Brand=[]

        postToServer("PRPBrndWisRpt", brnd).then((Result) => {
          if (Result.data.Status == 'Success') {  
            console.log(Result,"ccc")
            Result.data.data.map((item4) => {
                Brand.push(
                {
                  "key": item4.c_code,
                  "text": item4.c_name,
                  "value": item4.c_code,
               
                }
              )
            })
            
            this.setState({ Brand: Brand })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })


        // rpsname binding
        var brandsel=''
        if(Division=="")
        brandsel="All"
        else
        brandsel=Division
    var brnd = { "index": "ListPrpName",  data:{ "DivisionCode":"All","RegionCode":"All"}  }

    let RPSname=[]

    postToServer("PRPBrndWisRpt", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
        console.log(Result.data.data,"prp names")
        console.log(Result,"ccc")
        Result.data.data.map((item4) => {
            RPSname.push(
            {
              "key": item4.c_name,
              "text": item4.c_code,
              "value": item4.c_name,
           
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
        const {Division,Region,Month,Year} = this.state;
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
                                                    <FilterOptionDropRpsConsole 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropRpsConsole 
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropRpsConsole 
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropRpsConsole 
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

export default FilterOptionsRpsConsole