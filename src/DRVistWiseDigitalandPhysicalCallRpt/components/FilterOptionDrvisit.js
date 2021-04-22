import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropDrvisit from '../components/FilterOptionDropDrvisit'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class FilterOptionDrvisit extends Component {
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
            FSName:[],
            FSArea:[],
            message:"",
            apply:"",

            Division2:'',
            Region2:'',
            Month2:'',
            DistanceCall2:'',
            FS2:'',
           Area2:''
            
        }
         this.getMonth = this.getMonth.bind(this)
          this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
         this.getRegion=this.getRegion.bind(this)
         this.getDistanceCall=this.getDistanceCall.bind(this)
         this.getCategory=this.getCategory.bind(this)
         this.getFSName=this.getFSName.bind(this)
        this.getArea=this.getArea.bind(this)
        
        
    }
//filter of division
    callbackFunction(childData) {
     

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
    
    
    getDivision(div){
      let returArray={"name":"Division","rvalue":div};
      this.setState({Division2:div});
      this.props.funcprops(returArray)  
      //bindfs
    var fs1 = { "Report":"DrVisitWiseDigitalPhyCall","index": "FsList",  data:{"RegionCode":this.state.Region2,"DivCode":div,"AreaCode":this.state.Area2}  }

let fs=[]

postToServer("Reportsapi", fs1).then((Result) => {
if (Result.data.Status == 'Success') {  
 Result.data.Data.map((item4) => {
  fs.push(
    {
      "key": item4.C_Code,
      "text": item4.C_name,
      "value": item4.C_Code,
   
    }
  )
})

this.setState({ FSName: fs })
}

}).catch((Error) => {
this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})

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

//bindarea
      var ar = { "Report":"DrVisitWiseDigitalPhyCall","index": "Areas",  data:{"RegionCode":reg}  }

      let fsar=[]
      
      postToServer("Reportsapi", ar).then((Result) => {
      if (Result.data.Status == 'Success') {  
       Result.data.Areas.map((item4) => {
        fsar.push(
          {
            "key": item4.c_code,
            "text": item4.c_name,
            "value": item4.c_code,
         
          }
        )
      })
      
      this.setState({ FSArea: fsar })
      }
      
      }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
//bindfs
var fs1 = { "Report":"DrVisitWiseDigitalPhyCall","index": "FsList",  data:{"RegionCode":reg,"DivCode":this.state.Division2,"AreaCode":this.state.Area2}  }

let fs=[]

postToServer("Reportsapi", fs1).then((Result) => {
if (Result.data.Status == 'Success') {  
 Result.data.Data.map((item4) => {
  fs.push(
    {
      "key": item4.C_Code,
      "text": item4.C_name,
      "value": item4.C_Code,
   
    }
  )
})

this.setState({ FSName: fs })
}

}).catch((Error) => {
this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})


    }
    getFSName(fs){
      let returArray={"name":"FSName","rvalue":fs};
      this.setState({FS2:fs});
      this.props.funcprops(returArray)  
    }
    getArea(area){
      let returArray={"name":"FSArea","rvalue":area};
      this.setState({Area2:area});
      this.props.funcprops(returArray)  
      //bindfs
var fs1 = { "Report":"DrVisitWiseDigitalPhyCall","index": "FsList",  data:{"RegionCode":this.state.Region2,"DivCode":this.state.Division2,"AreaCode":area}  }

let fs=[]

postToServer("Reportsapi", fs1).then((Result) => {
if (Result.data.Status == 'Success') {  
  console.log(Result,"fslist")
 Result.data.Data.map((item4) => {
  fs.push(
    {
      "key": item4.C_Code,
      "text": item4.C_name,
      "value": item4.c_code,
   
    }
  )
})

this.setState({ FSName: fs })
}

}).catch((Error) => {
this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})

    }

    filterApply(){
      
        this.props.filterapply("apply");
        

    }


    componentDidUpdate(olsprops,oldstate){
        if(olsprops.selecteddiv != this.props.selecteddiv){
          
        }
    }
  
    componentDidMount(){
     // this.setState({Division2:"-999"});
   
        // var travelModes = { "index": "Divisions"}

        let Division=[]

        var travelModes = {"Report":"DrVisitWiseDigitalPhyCall","index": "Divisions",  data:{}  }

     

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

        //this.setState({Region2:"-999"});
        var regdet = {"Report":"DrVisitWiseDigitalPhyCall","index": "Regions",  data:{}  }

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
      
      
          this.setState({Month: Month, Month2: Month[currentMonth].value})
  
      let returArray = { "name": "Month", "rvalue": currentMonth.toString()};
       this.props.funcprops(returArray)
       this.setState({Month: Month, Month2: currentMonth.toString()})


        

       

        // distance binding
        this.setState({DistanceCall2:"-999"});
    var brnd = {"Report":"DrVisitWiseDigitalPhyCall","index": "DistanceCall",  data:{}  }

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
var ca = { "Report":"DrVisitWiseDigitalPhyCall","index": "Category",  data:{}  }

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
this.setState({Category2:"-999"});

//FSArea binding
this.setState({Area2:"-999"});
var ar = { "Report":"DrVisitWiseDigitalPhyCall","index": "Areas",  data:{"RegionCode":this.state.Region2}  }

let fsar=[]

postToServer("Reportsapi", ar).then((Result) => {
if (Result.data.Status == 'Success') {  
 Result.data.Areas.map((item4) => {
  fsar.push(
    {
      "key": item4.c_code,
      "text": item4.c_name,
      "value": item4.c_code,
   
    }
  )
})

this.setState({ FSArea: fsar })
}

}).catch((Error) => {
this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
})
//FSName binding
this.setState({FS2:"-999"});
var fs1 = { "Report":"DrVisitWiseDigitalPhyCall","index": "FsList",  data:{"RegionCode":this.state.Region2,"DivCode":this.state.Division2,"AreaCode":this.state.Area2}  }

let fs=[]

postToServer("Reportsapi", fs1).then((Result) => {
if (Result.data.Status == 'Success') {  
 Result.data.Data.map((item4) => {
  fs.push(
    {
      "key": item4.c_code,
      "text": item4.c_name,
      "value": item4.c_code,
   
    }
  )
})

this.setState({ FSName: fs })
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
        const {Division,Region,Month,DistanceCall,Category,FSArea,FSName} = this.state;
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
                                                <Nav.Item>
                                                    <Nav.Link eventKey="FSArea">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Area</span>
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
                                                    <FilterOptionDropDrvisit 
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        //parentCallback={this.callbackFunction}
                                                        update={this.props.update}

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropDrvisit
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="DistanceCall">
                                                    <FilterOptionDropDrvisit
                                                        name="DistanceCall" 
                                                        options={DistanceCall} 
                                                        getData={this.getDistanceCall}
                                                        value1={this.state.DistanceCall2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Category">
                                                    <FilterOptionDropDrvisit
                                                        name="Category" 
                                                        options={Category} 
                                                        getData={this.getCategory}
                                                        value1={this.state.Category2}
                                                        //parentCallback={this.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDropDrvisit
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        value1={this.state.Month2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSArea">
                                                    <FilterOptionDropDrvisit
                                                        name="FSArea"
                                                        options={FSArea} 
                                                        getData={this.getArea}
                                                        value1={this.state.Area2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSName">
                                                    <FilterOptionDropDrvisit
                                                        name="Month"
                                                        options={FSName} 
                                                        getData={this.getFSName}
                                                        value1={this.state.FS2}
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

export default FilterOptionDrvisit