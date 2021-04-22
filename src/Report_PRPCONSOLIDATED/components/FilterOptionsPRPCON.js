import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropPRPCON from '../components/FilterOptionDropPRPCON'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsPRPCON extends Component {
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
            Division2:'',
            Region2:'',
            Month2:'',
            Year2:'',
            message:"",
            apply:""
        }
         this.getMonth = this.getMonth.bind(this)
         this.getYear= this.getYear.bind(this)
        // this.getRpsname = this.getRpsname.bind(this)
        // this.getBrand = this.getBrand.bind(this)
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        
        
        
    }
//filter of division
    callbackFunction(childData) {
       // console.log(childData.rvalue, "callback")
     //   console.log(childData.name, "name")
      

  }
  


    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }

    getMonth(mnth,text1) {
      //debugger;
      let returArray={"name":"Month","rvalue":mnth,"textval":text1};
      this.setState({Month2:mnth});
      this.props.funcprops(returArray)
        
    }
    getYear(year,text1){
      let returArray={"name":"Year","rvalue":year,"textval":text1};
      this.setState({Year2:year});
      this.props.funcprops(returArray)
    }
    // getRpsname(fsname){
    //     this.props.funcprops(status)
    // }
    // getBrand(status){
    //     this.props.funcprops(status)
    // }
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
      //let returArray={"name":"Division","rvalue":div};
      this.setState({Division2:"All"});
      //this.props.funcprops(returArray)
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]
        
        postToServer("Consolidatedprp", travelModes).then((Result) => {
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

        postToServer("Consolidatedprp", regdet).then((Result) => {
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

//Month
let date = new Date();
let stringlabel="";
let currentMonth = date.getMonth();
let currmnth=currentMonth+1;
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

    if(currmnth==1)
    {
      
      stringlabel= "January";
  }
  else if (currmnth==2) {

   
    stringlabel= "February"
  }
  else if (currmnth==3) {
 
   
    stringlabel= "March"
  }
  else if (currmnth==4){

   
    stringlabel= "April"
  }
  else if (currmnth==5){
  
    
    stringlabel= "May"
  }else if (currmnth==6){

    
    stringlabel= "June"
  }else if (currmnth==7){
 
   
    stringlabel= "July"
  }else if (currmnth==8){

    
    stringlabel= "August"
  }else if (currentMonth==9){
  
   
    stringlabel= "September"
  }else if (currmnth==10){

   
    stringlabel= "October"
  }else if (currmnth==11){
 
   
    stringlabel= "November"
  }else if (currmnth==12){
 
    
    stringlabel= "December"
  }


    let returArray = { "name": "Month", "rvalue":  Month[currentMonth].value,"textval":stringlabel };
    this.props.funcprops(returArray);


    this.setState({Month: Month, Month2: Month[currentMonth].value})
        // var mnth = { "index": "MonthType",  data:{}  }

        // let Month=[]

        // postToServer("Consolidatedprp", mnth).then((Result) => {
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


//Year

let date1 = new Date();
let currentYear = date1.getFullYear();
    let abc = [{
      key: "1",
      text: "2015",
      value: "2015"
    },
    {
      key: "2",
      text: "2016",
      value: "2016"
    },
    {
      key: "3",
      text: "2017",
      value: "2017"
    }, {
      key: "4",
      text: "2018",
      value: "2018"
    }, {
      key: "5",
      text: "2019",
      value: "2019"
    }, {
      key: "6",
      text: "2020",
      value: "2020"
    }, {
      key: "7",
      text: "2021",
      value: "2021"
    }, {
      key: "8",
      text: "2022",
      value: "2022"
    }, {
      key: "9",
      text: "2023",
      value: "2023"
    }, {
      key: "10",
      text: "2024",
      value: "2024"
    }]
    let returArray1 = { "name": "Year", "rvalue": currentYear.toString() };
this.setState({Year: abc, Year2: currentYear.toString() });
this.props.funcprops(returArray1)
        // var yr = { "index": "TargetYear",  data:{}  }

        // let Year=[]

        // postToServer("Consolidatedprp", yr).then((Result) => {
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
                                                    <FilterOptionDropPRPCON 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropPRPCON
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                
                                              
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropPRPCON
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropPRPCON 
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

export default FilterOptionsPRPCON