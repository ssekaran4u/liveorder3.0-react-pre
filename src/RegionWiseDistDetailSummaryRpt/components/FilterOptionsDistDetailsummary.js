import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropDistDetailsummary from '../components/FilterOptionDropDistDetailsummary'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionsDistDetailsummary extends Component {
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
            DistanceCall:[],
            message:"",
            apply:"",

            Division2:'',
            Region2:'',
            Month2:'',
            DistanceCall2:'',
            
        }
         this.getMonth = this.getMonth.bind(this)
          this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
         this.getRegion=this.getRegion.bind(this)
         this.getDistanceCall=this.getDistanceCall.bind(this)
         this.getCategory=this.getCategory.bind(this)
         
        
        
        
    }
//filter of division
  //   callbackFunction(childData) {
  //      // console.log(childData.rvalue, "callback")
  //    //   console.log(childData.name, "name")
  //       if(childData.name=="Division")
  //       {
  //          // console.log(childData.name,"Division chage call")
  //           var brnd = { "index": "ListBrand",  data:{ "DivisionCode":childData.rvalue}  }

  //           let Brand1=[]

  //                   postToServer("PRPBrndWisRpt", brnd).then((Result) => {
  //                   if (Result.data.Status == 'Success') {  
  //                       Result.data.data.map((item4) => {
  //                           Brand.push(
  //                           {
  //                           "key": item4.c_code,
  //                           "text": item4.c_name,
  //                           "value": item4.c_code,
                        
  //                           }
  //                       )
  //                       })
                        
  //                       this.setState({ Brand: Brand1 })
  //                   }

  //                   }).catch((Error) => {
  //                   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
  //                   })
            


  //                   //rpsname filter
  //                   var reg=''
  //                   if(Region=="")
  //                   reg="All"
  //                   else
  //                   reg=Region
  //                   var brnd = { "index": "ListPrpName",  data:{ "DivisionCode":childData.rvalue,"RegionCode":reg}  }

  //               let RPSname=[]
       
  //                   postToServer("PRPBrndWisRpt", brnd).then((Result) => {
  //                   if (Result.data.Status == 'Success') {  
  //                       Result.data.data.map((item4) => {
  //                           RPSname.push(
  //                           {
  //                           "key": item4.c_code,
  //                           "text": item4.c_name,
  //                           "value": item4.c_code,
                        
  //                           }
  //                       )
  //                       })
                        
  //                       this.setState({ RPSname: RPSname })
  //                   }

  //                   }).catch((Error) => {
  //                   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
  //                   })
  //       }
  //       else 
  //       //if(childData.name=="Region")
  //       {
  //           console.log(childData.name,"Region chage call")
  //            //rpsname filter
  //           var reg=''
  //           if(Region=="")
  //           reg="All"
  //           else
  //           reg=childData.rvalue
  //           var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":Division,"RegionCode":reg}  }

  //           let RPSname=[]
            
  //           postToServer("PRPBrndWisRpt", brnd).then((Result) => {
  //           if (Result.data.Status == 'Success') {  
  //               Result.data.data.map((item4) => {
  //                   RPSname.push(
  //                   {
  //                   "key": item4.c_code,
  //                   "text": item4.c_name,
  //                   "value": item4.c_code,
                
  //                   }
  //               )
  //               })
                
  //               this.setState({ RPSname: RPSname })
  //           }

  //           }).catch((Error) => {
  //           this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
  //           })
  //       }

  // }
  


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
    
    
    getDivision(div){
      let returArray={"name":"Division","rvalue":div};
      this.setState({Division2:div});
      this.props.funcprops(returArray)  
    }
    getDistanceCall(dis){
      let returArray={"name":"DistanceCall","rvalue":dis};
      this.setState({DistanceCall2:dis});
      this.props.funcprops(returArray)  
    }
    getCategory(categ){
      let returArray={"name":"Category","rvalue":categ};
      this.setState({Category2:categ});
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
      
      this.setState({Division2:"-999"});
   
        // var travelModes = { "index": "Divisions"}

        let Division=[]

        var travelModes = {"Report":"RegionWiseDistDetailsSummary","index": "Divisions",  data:{}  }

     

      postToServer("Reportsapi", travelModes).then((Result) => {
        
          if (Result.data.Status == 'Success') { 
             
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

        this.setState({Region2:"-999"});
        var regdet = {"Report":"RegionWiseDistDetailsSummary","index": "Regions",  data:{}  }

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


        var mnth = { "index": "MonthType",  data:{}  }

       
        let val=1;
      
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
      
      
          this.setState({Month: Month, Month2: Month[currentMonth]})
  
      let returArray = { "name": "Month", "rvalue": currentMonth.toString()};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: currentMonth.toString()})


        

       

        // distance binding
       
    var brnd = {"Report":"RegionWiseDistDetailsSummary","index": "DistanceCall",  data:{}  }

    let distance=[]

    postToServer("Reportsapi", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
            Result.data.DistanceCall.map((item4) => {
          distance.push(
            {
              "key": item4.n_srno,
              "text": item4.c_name,
              "value": item4.n_srno,
           
            }
          )
        })
        
        this.setState({ DistanceCall: distance })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })

//category

this.setState({Category2:"-999"});
var ca = { "Report":"RegionWiseDistDetailsSummary","index": "Category",  data:{}  }

let cate=[]

postToServer("Reportsapi", ca).then((Result) => {
if (Result.data.Status == 'Success') {  
 Result.data.Data.map((item4) => {
  cate.push(
    {
      "key": item4.c_code,
      "text": item4.c_name,
      "value": item4.c_code,
   
    }
  )
})

this.setState({ Category: cate })
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
        const {Division,Region,Month,DistanceCall,Category} = this.state;
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
                                                    <Nav.Link eventKey="DistanceCall">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Type Of Distance Call</span>
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
                                            </Nav>
                                        </div>

                                        <div className='retrival-right '>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Division">
                                                    <FilterOptionDropDistDetailsummary 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropDistDetailsummary
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="DistanceCall">
                                                    <FilterOptionDropDistDetailsummary
                                                        name="DistanceCall" 
                                                        options={DistanceCall} 
                                                        getData={this.getDistanceCall}
                                                        value1={this.state.DistanceCall2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Category">
                                                    <FilterOptionDropDistDetailsummary
                                                        name="Category" 
                                                        options={Category} 
                                                        getData={this.getCategory}
                                                        value1={this.state.Category2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropDistDetailsummary
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
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

export default FilterOptionsDistDetailsummary