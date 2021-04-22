import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropRPSDocWiseInvDet from './FilterOptionDropRPSDocWiseInvDet'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import MultiSelectAll from '../components/MultiSelectAll'
// import MultiSelect from '../components/MultiSelect'
// import { Multiselect } from 'multiselect-react-dropdown'; 
import MultiSelect from 'react-multi-select-component';

class FilterOptionsRPSDocWiseInvDet extends Component {
 
  
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
            currmonth:new Date().getMonth()+1,
           
            Division:[],
            Region:[],
            Month:[],
            Year:[],
            Area:[],
            FSName:[],
            Type:[],

            FSDesignation:[],
            DoctorGrade:[],
            DoctorCategory:[],
            DoctorName:[],

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
            selected: [],
            FsDes:'',
            Doccode:'',
            Docgra:'',
            Doccat:'',
            Type2:'',
            DivisionCode:'',
            options: [{label: 'January', value: 1},{label: 'February', value: 2},{label: 'March', value: 3}] 
           

        }
        
        this.filterApply= this.filterApply.bind(this)
        this.getDivision=this.getDivision.bind(this)
        this.getRegion=this.getRegion.bind(this)
        this.getFSname=this.getFSname.bind(this)
        this.getArea=this.getArea.bind(this)
        this.getMonth=this.getMonth.bind(this)
        this.getYear=this.getYear.bind(this)
        this.getType=this.getType.bind(this)

        this.FSDesignation=this.FSDesignation.bind(this)
        this.DoctorGrade=this.DoctorGrade.bind(this)
        this.DoctorCategory=this.DoctorCategory.bind(this)
        this.DoctorName=this.DoctorName.bind(this)
        this.onSelect=this.onSelect.bind(this)
        this.onRemove=this.onRemove.bind(this)
        
        
        
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

     
     
  var brnd = { "index": "ListArea",  data:{ "RegionCode":reg}  }

  let Area=[]

  postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
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

  //doccode
  var brnd = { "index": "ListDocName",  data:{"FsCode":this.state.FSname2,"AreaCode":this.state.Area2,"RegionCode":reg,"Grade":this.state.Docgra,"categoryCode":this.state.Doccat }  }
  console.log(brnd,"doc names")
  let DN1=[]

  postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
    if (Result.data.Status == 'Success') {  
      
      Result.data.data.map((item4) => {
       DN1.push(
          {
            "key": item4.c_cust_code,
            "text": item4.c_name,
            "value": item4.c_cust_code,
         
          }
        )
      })
      
      this.setState({ DoctorName: DN1 })
    }

  }).catch((Error) => {
    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
  })
  //fs name binding
  var brnd = { "index": "LstFswithdivarearegtype",  data:{"AreaCode":this.state.Area2,"DivisionCode":this.state.Division2,"RegionCode":reg,"DesigCode":this.state.FsDes} }

    let FSName=[]

    postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
        // console.log(Result.data.data,"fs names")
        // console.log(Result,"ccc")
        Result.data.data.map((item4) => {
          FSName.push(
            {
              "key": item4.fscode,
              "text": item4.fsname,
              "value": item4.fscode,
           
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
      var brand={ "index": "LstFswithdivarearegtype",  data:{"AreaCode":are,"DivisionCode":this.state.Division2,"RegionCode":this.state.Region2,"DesigCode":this.state.FsDes} }
    
      
          let FSName=[]
      // console.log(brand,";;;;")
          postToServer("RptRPSDocWiseInvDet", brand).then((Result) => {
            if (Result.data.Status == 'Success') {  
               console.log(Result.data.data,"fs names")
              // console.log(Result,"ccc")
              Result.data.data.map((item4) => {
                // console.log("inside the fsfilter data");
                FSName.push(
                  {
                    "key": item4.fscode,
                    "text": item4.fsname,
                    "value": item4.fscode,
                 
                  }
                )
              })
              
              this.setState({ FSName: FSName })
            }
      
          }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })
      

//doccode
var brnd = { "index": "ListDocName",  data:{"FsCode":this.state.FSname2,"AreaCode":are,"RegionCode":this.state.Region2,"Grade":this.state.Docgra,"categoryCode":this.state.Doccat }  }
      console.log(brnd,"doc names")
      let DN2=[]

      postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
        if (Result.data.Status == 'Success') {  
          
          Result.data.data.map((item4) => {
           DN2.push(
              {
                "key": item4.c_cust_code,
                "text": item4.c_name,
                "value": item4.c_cust_code,
             
              }
            )
          })
          
          this.setState({ DoctorName: DN2 })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })


    }

    getFSname(fs,text1){
      let returArray={"name":"FS Name","rvalue":fs,"textval":text1};
      this.setState({FSname2:fs});
      this.props.funcprops(returArray)
      
      //doccode
      var brnd = { "index": "ListDocName",  data:{"FsCode":fs,"AreaCode":this.state.Area2,"RegionCode":this.state.Region2,"Grade":this.state.Docgra,"categoryCode":this.state.Doccat }  }
      console.log(brnd,"doc names")
      let DN5=[]

      postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
        if (Result.data.Status == 'Success') {  
          
          Result.data.data.map((item4) => {
           DN5.push(
              {
                "key": item4.c_cust_code,
                "text": item4.c_name,
                "value": item4.c_cust_code,
             
              }
            )
          })
          
          this.setState({ DoctorName: DN5 })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })

    }

    getMonth(mnth,text1){
      let returArray={"name":"Month","rvalue":mnth,"textval":text1};
      this.setState({Month2:mnth});
      this.props.funcprops(returArray)
     console.log(returArray);
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
    
//fs name binding
var brnd = { "index": "LstFswithdivarearegtype",  data:{"AreaCode":this.state.Area2,"DivisionCode":status,"RegionCode":this.state.Region2,"DesigCode":this.state.FsDes} }

    let FSName=[]

    postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
        // console.log(Result.data.data,"fs names")
        // console.log(Result,"ccc")
        Result.data.data.map((item4) => {
          FSName.push(
            {
              "key": item4.fscode,
              "text": item4.fsname,
              "value": item4.fscode,
           
            }
          )
        })
        
        this.setState({ FSName: FSName })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
     
    }


    onSelect(selectedList, selectedItem) {
      // console.log(selectedList,"selected list")
      // console.log(selectedItem,"selected Item")
      let returArray={"name":"Month","rvalue":selectedList};
      console.log(returArray,"selected")
      // this.setState({Month2:1});
      this.props.funcprops(returArray)
  }
   
  onRemove(selectedList, removedItem) {
    let returArray={"name":"Month","rvalue":selectedList};
    // console.log(returArray,"cancel")
      // this.setState({Month2:2});
      this.props.funcprops(returArray)
      // console.log("cancel")
      // console.log(selectedList,"selected list")
      // console.log(selectedItem,"selected Item")
  }

    getType(tp,text1){
      let returArray={"name":"Type","rvalue":tp,"textval":text1};
      this.setState({Type2:tp});
      this.props.funcprops(returArray)
     }

    FSDesignation(fsd,text1){
      let returArray={"name":"FSDesignation","rvalue":fsd,"textval":text1};
      this.setState({FsDes:fsd});
      this.props.funcprops(returArray)
      //fsname binding
      var brnd = { "index": "LstFswithdivarearegtype",  data:{"AreaCode":this.state.Area2,"DivisionCode":this.state.Division2,"RegionCode":this.state.Region2,"DesigCode":fsd} }

    let FSName=[]

    postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
        // console.log(Result.data.data,"fs names")
        // console.log(Result,"ccc")
        Result.data.data.map((item4) => {
          FSName.push(
            {
              "key": item4.fscode,
              "text": item4.fsname,
              "value": item4.fscode,
           
            }
          )
        })
        
        this.setState({ FSName: FSName })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
      
    }
    DoctorGrade(dg,text1){
      let returArray={"name":"DoctorGrade","rvalue":dg,"textval":text1};
      this.setState({Docgra:dg});
      this.props.funcprops(returArray)
      

      var brnd = { "index": "ListDocName",  data:{"FsCode":this.state.FSname2,"AreaCode":this.state.Area2,"RegionCode":this.state.Region2,"Grade":dg,"categoryCode":this.state.Doccat }  }
      console.log(brnd,"doc names")
      let DN3=[]

      postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
        if (Result.data.Status == 'Success') {  
          
          Result.data.data.map((item4) => {
           DN3.push(
              {
                "key": item4.c_cust_code,
                "text": item4.c_name,
                "value": item4.c_cust_code,
             
              }
            )
          })
          
          this.setState({ DoctorName: DN3 })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
    }
    DoctorCategory(dc,text1){
      let returArray={"name":"DoctorCategory","rvalue":dc,"textval":text1};
      this.setState({Doccat:dc});
      this.props.funcprops(returArray)

      var brnd = { "index": "ListDocName",  data:{"FsCode":this.state.FSname2,"AreaCode":this.state.Area2,"RegionCode":this.state.Region2,"Grade":this.state.Docgra,"categoryCode":dc }  }
      console.log(brnd,"doc names")
      let DN4=[]

      postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
        if (Result.data.Status == 'Success') {  
          
          Result.data.data.map((item4) => {
           DN4.push(
              {
                "key": item4.c_cust_code,
                "text": item4.c_name,
                "value": item4.c_cust_code,
             
              }
            )
          })
          
          this.setState({ DoctorName: DN4 })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
      
    }
    DoctorName(dn,text1){
      let returArray={"name":"DoctorName","rvalue":dn,"textval":text1};
      this.setState({Doccode:dn});
      this.props.funcprops(returArray)
      
           
    }
  

    filterApply(){
      
        this.props.filterapply("apply");
    }


    componentDidUpdate(){  
    }

   
  
    componentDidMount(){
     // this.setState({Division2:"All"});
     var defre={ "index": "LoginFSDetails",  data:{}  }
     let RegionCode=""
     let DivisionCode=""
    // let areacode=""
     postToServer("PrpDetailsRpt", defre).then((Result) => {
       if (Result.data.Status == 'Success') {   
       console.log(Result,"fsde")
       Result.data.data.map((item1,index) => {
       
          RegionCode=item1['C_Region_Code']
          DivisionCode=item1['c_div_code']
         // areacode=item1['C_Code']
       })
     }
     //console.log(RegionCode,"defreg1")
     //this.setState({Region2:RegionCode});
     this.setState({Division2:(DivisionCode=="")?"All":DivisionCode});
     this.setState({Region2:RegionCode});
     //this.setState({Area2:areacode});
     }).catch(() => {
                 
       this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
     })
        var travelModes = { "index": "ListDivision",  data:{}  }

        let Division=[]

        postToServer("RPS_InvesttHis", travelModes).then((Result) => {
          if (Result.data.Status == 'Success') {    
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


        var mnth = { "index": "GetMonth",  data:{}  }

        let Month=[]

        postToServer("RptRPSDocWiseInvDet", mnth).then((Result) => {
          if (Result.status == "200") { 
            Result.data.map((item3) => {
                Month.push(
                {
                  "key": item3.Code,
                  "text": item3.Name,
                  "value": item3.Code,
               
                }
              )
            })
            
            this.setState({ Month: Month })
          }

        }).catch((Error) => {
        
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        


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
        //Type binding
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

        // area binding
        this.setState({Area2:"All"});
            var regsel=''
            
        var brnd = { "index": "ListArea",  data:{ "RegionCode":regsel}  }

        let Area=[]

        postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
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

//fs design
this.setState({FsDes:"-999"});
        var brnd = { "index": "LstFsDesign",  data:{ }  }

        let FSD=[]

        postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
          if (Result.data.Status == 'Success') {  
            
            Result.data.data.map((item4) => {
              FSD.push(
                {
                  "key": item4.N_Type,
                  "text": item4.C_Name,
                  "value": item4.N_Type,
               
                }
              )
            })
            
            this.setState({ FSDesignation: FSD })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        //doc grade
        this.setState({Docgra:"All"});
        var brnd = { "index": "ListDocGrade",  data:{ }  }

        let DG=[]

        postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
          if (Result.data.Status == 'Success') {  
            
            Result.data.data.map((item4) => {
              DG.push(
                {
                  "key": item4.c_code,
                  "text": item4.C_description,
                  "value": item4.c_code,
               
                }
              )
            })
            
            this.setState({ DoctorGrade: DG })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })


         //doc category
         this.setState({Doccat:"All"});
         var brnd = { "index": "ListDocCategory",  data:{ }  }

         let DC=[]
 
         postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
           if (Result.data.Status == 'Success') {  
             
             Result.data.data.map((item4) => {
              DC.push(
                 {
                   "key": item4.c_code,
                   "text": item4.c_name,
                   "value": item4.c_code,
                
                 }
               )
             })
             
             this.setState({ DoctorCategory: DC })
           }
 
         }).catch((Error) => {
           this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
         })

// doc names
this.setState({Doccode:"All"});
let ar=''
let regi=''
         var brnd = { "index": "ListDocName",  data:{"FsCode":"","AreaCode":ar,"RegionCode":regi,"Grade":"All","categoryCode":"All" }  }

         let DN=[]
 
         postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
           if (Result.data.Status == 'Success') {  
             
             Result.data.data.map((item4) => {
              DN.push(
                 {
                   "key": item4.c_cust_code,
                   "text": item4.c_name,
                   "value": item4.c_cust_code,
                
                 }
               )
             })
             
             this.setState({ DoctorName: DN })
           }
 
         }).catch((Error) => {
           this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
         })
 

        // fsname binding


    var brnd = { "index": "LstFswithdivarearegtype",  data:{"AreaCode":"All","DivisionCode":"","RegionCode":"","DesigCode":"-999"} }

    let FSName=[]

    postToServer("RptRPSDocWiseInvDet", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {  
        // console.log(Result.data.data,"fs names")
         console.log(Result,"ccc")
        Result.data.data.map((item4) => {
          FSName.push(
            {
              "key": item4.fscode,
              "text": item4.fsname,
              "value": item4.fscode,
           
            }
          )
        })
        
        this.setState({ FSName: FSName })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
    }


    



   
    render() {
        
      //let Type=[{'key':'PRP', 'text': 'PRP','value': 'PRP'},{'key':'RPS', 'text': 'RPS','value': 'RPS'}];
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
        this.state.Month.options= this.state.currmonth;
        const {selected} = this.state;
        const {Division,Region,Month,Year,Area,FSName,FSDesignation,DoctorGrade,DoctorCategory,DoctorName,Division2,Area2,Region2,Type} = this.state;
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
                                                    <Nav.Link eventKey="FSDesignation">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Designation</span>
                                                    </Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="FSName">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="DoctorGrade">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Doctor Grade</span>
                                                    </Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="DoctorCategory">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Doctor Category</span>
                                                    </Nav.Link>
                                                </Nav.Item>

                                                <Nav.Item>
                                                    <Nav.Link eventKey="DoctorName">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Doctor Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>

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
                                                    <FilterOptionDropRPSDocWiseInvDet
                                                        name="Division" 
                                                        options={Division} 
                                                        getData={this.getDivision}
                                                        value1={this.state.Division2}
                                                        value="select"

                 
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Region">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="Region" 
                                                        options={Region} 
                                                        getData={this.getRegion}
                                                        value1={this.state.Region2}
                                                        // parentCallback={this.props.callbackFunction}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Area">
                                                    <FilterOptionDropRPSDocWiseInvDet
                                                        name="Area" 
                                                        options={Area} 
                                                        getData={this.getArea}
                                                        value1={this.state.Area2}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSDesignation">
                                                    <FilterOptionDropRPSDocWiseInvDet
                                                        name="FSDesignation" 
                                                        options={FSDesignation} 
                                                        getData={this.FSDesignation}
                                                        value1={this.state.FsDes}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="FSName">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="FS Name"
                                                        options={FSName} 
                                                        getData={this.getFSname}
                                                        
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="DoctorGrade">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="DoctorGrade"
                                                        options={DoctorGrade} 
                                                        getData={this.DoctorGrade}
                                                        value1={this.state.Docgra}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="DoctorCategory">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="DoctorCategory"
                                                        options={DoctorCategory} 
                                                        getData={this.DoctorCategory}
                                                        value1={this.state.Doccat}
                                                    />
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="DoctorName">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="DoctorName"
                                                        options={DoctorName} 
                                                        getData={this.DoctorName}
                                                        value1={this.state.Doccode}
                                                    />
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="Type">
                                                    <FilterOptionDropRPSDocWiseInvDet 
                                                        name="Type"
                                                        options={Type} 
                                                        getData={this.getType}
                                                        value1={this.state.Type2}
                                                        
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Month">
                                                <MultiSelectAll 
                                                  getData={this.getMonth}
                                                />
                                                {/* <Multiselect
                                                  options={this.state.options} // Options to display in the dropdown
                                                  selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                  onSelect={this.onSelect} // Function will trigger on select event
                                                  onRemove={this.onRemove} // Function will trigger on remove event
                                                  displayValue="name" // Property name to display in the dropdown options
                                                  /> */}
                                                  {/* <MultiSelect
                                                        options={this.state.options}
                                                        value={this.state.selected}
                                                        onChange={this.state.setSelected}
                                                        labelledBy={"Select"} 
                                                  //       options={this.state.options} // Options to display in the dropdown
                                                  // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                  // onSelect={this.onSelect} // Function will trigger on select event
                                                  // onRemove={this.onRemove} // Function will trigger on remove event
                                                  // displayValue="name" // Property name to display in the dropdown options
                                                      />
                                                    {/* <FilterOptionDropRPSDocWiseInvDet  
                                                        name="Month"
                                                        options={Month} 
                                                        getData={this.getMonth}
                                                        defaultValue={10}
                                                    // /> */}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDropRPSDocWiseInvDet 
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

export default FilterOptionsRPSDocWiseInvDet