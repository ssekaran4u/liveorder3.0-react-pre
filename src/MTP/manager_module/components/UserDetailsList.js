import React,{Component} from 'react'
import {Breadcrumb,Tabs,Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import {postToServer} from '../../../lib/comm-utils'
import UserDetailAccor from './UserDetailAccor';
import { Form } from 'react-bootstrap';
import Spinner from '../../../BasicComponet/sfaSpinner'
class UserDetailsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key: "1",
            wrkType:[],
            downlineDoc:[],
            fscode:'',
            proList:[],
           selected:{},
           dayworkwith:'',
           loader:false
        }
        this.redirectPage = this.redirectPage.bind(this)
        this.Loadselected=this.Loadselected.bind(this)

        this.selectWorkwithAllday=this.selectWorkwithAllday.bind(this)
        this.updateWorkwithAllday=this.updateWorkwithAllday.bind(this)

        this.showNote=this.showNote.bind(this)
        this.onClose=this.onClose.bind(this)
        
    }

    onClose(){
        this.setState({
            showNotePopup:!this.state.showNotePopup
        })
    }


    showNote(){
        this.setState({ showNotePopup:!this.state.showNotePopup })


        let date = localStorage.getItem("day")
        let mon = localStorage.getItem("monthCode")
        let year = localStorage.getItem("year")
        let day = localStorage.getItem("day")
        let fscode = localStorage.getItem("fscode")

        let areaCode= localStorage.getItem("areaCode")

        var data = {"Data":{
        "Year":year,
        "Month":mon,
        "day":day,
        "subarea":areaCode,
        "FSCode":fscode,
        "Workwith":this.state.key
    },

       
        "index":"MTP_getsubnote_other","Token":"",
        "menuid":"38"
}  

postToServer("MTP", data).then((result) => {

    const kl= result.data[0]["C_Subarea_Note"]

    //alert(kl)

    this.setState({ Areanote:kl })
})
    }

    selectWorkwithAllday(){

        let date = localStorage.getItem("day")
        let mon = localStorage.getItem("monthCode")
        let year = localStorage.getItem("year")
        let day = localStorage.getItem("day")
        let fscode = localStorage.getItem("fscode")
        var data = {"Data": {
            "Month": mon,
            "FSCode": fscode,
            "Year": year,
            "day":date,
            
        },
        "index": "selectWorkwithAllday",
        "menuid": "38"
     }
    postToServer("MTP_Manager",data).then( (Result)=>{ 

        console.log(Result)
        if(Result.data.Status == 'Success'){ 
          
                // this.setState({ 
                //     this.state.dayworkwith: Result.data 
                // })
              }
      //  }
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })


    }

updateWorkwithAllday(event){
    let date = localStorage.getItem("day")
    let mon = localStorage.getItem("monthCode")
    let year = localStorage.getItem("year")
    let day = localStorage.getItem("day")
    let fscode = localStorage.getItem("fscode")


    var data = {"Data": {
        "Month": mon,
        "FSCode": fscode,
        "Year": year,
        "day":date,
        
    },
    "index": "updateWorkwithAllday",
    "menuid": "38"
 }
postToServer("MTP_Manager",data).then( (Result)=>{ 
    //if(Result.data.Status == 'Success'){ 
        if(Result.data == null){
            this.setState({ 
                downlineDoc:[]
            })
          }else{
            this.setState({ 
                downlineDoc: Result.data 
            })
          }
  //  }
}).catch(  (Error)=> {  
    this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
})


    }

    Loadselected(){

  

    }
    
    keyload(key,code){

        this.setState({key:key})
    }
    componentDidMount(){
        this.setState({loader:true})
        let date = localStorage.getItem("day")
        let mon = localStorage.getItem("monthCode")
        let year = localStorage.getItem("year")
        let day = localStorage.getItem("day")
        let fscode = localStorage.getItem("fscode")

        let areaCode  = localStorage.getItem("areaCode")
        this.setState({
            date:date,
            month:mon,
            year:year,
            day:day,
            fscode:fscode
        })
        var worktype = {"index":"work_type","Token":""}
        postToServer("MTP",worktype).then( (Result)=>{ 
            if(Result.data.Status == 'Success'){ 

                this.setState({ wrkType: Result.data.Grade_mst })
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
        var data = {"Data": {
                "Month": mon,
                "FSCode": fscode,
                "Year": year,
                "day":date,
                "subarea":areaCode
            },
            "index": "MTP_Downline_details",
            "menuid": "38"
         }
        postToServer("MTP_Manager",data).then( (Result)=>{ 
            //if(Result.data.Status == 'Success'){ 
                if(Result.data == null){
                    this.setState({ 
                        downlineDoc:[]
                    })
                  }else{
                    this.setState({ 
                        downlineDoc: Result.data 
                    })
                  }
          //  }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })

        var data ={"Data": {
            "Month": mon,
            "FSCode":fscode,
            "Year": year,
            "day":date
        },
        "index": "MTP_Downline_Product_Details",
        "Token": "",
        "menuid": "38"
    }
    postToServer("MTP_Manager",data).then( (Result)=>{ 
    // if(Result.data.Status == 'Success'){ 
        
           this.setState({ loader :false ,proList: Result.data })
     //   }
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })

    this.Loadselected()
  //  this.selectWorkwithAllday()
    }
    redirectPage(data){
        localStorage.setItem("latestmonth",data);

        this.props.history.push('/downlineview/'+this.props.match.params.code+'/'+this.props.match.params.fscode+'/'+this.props.match.params.MONTH+'/'+this.props.match.params.YEAR)
        //this.props.history.push("/downlineview")
    }
    
    render(){ 


       
        let nextdateContext = localStorage.getItem("nextdateContext");
        let status = localStorage.getItem("status")
        let m=[]
        { this.state.downlineDoc.filter(x => x.N_Type == this.state.key).map((a)=>m.push(a))}
        
        return(
            <React.Fragment>
                <div className="content-spacing">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Day Wise TP </h4>
                            </div>
                            {/* <div className="plan-for-meeting-btn">
                                <div className="tourP" onClick={this.showNote}> 
                                    <div style={{"font-size":"13px","padding":"6px 0px"}}>NOTE</div>
                                </div>
                            </div> */}
                            
                            <div>
                            
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item href="#">
                                        <Link to='#'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/manager-mtp">Tour Plan Submission List</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="#">
                                        {/* <Link to='/downlineview'>TP Calendar</Link> */}
                                        <span onClick={()=>this.redirectPage(nextdateContext)}>TP Calendar</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Day Wise TP 
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        <div className="managerTabs">


                        {/* <Form.Check
                                custom
                                type="checkbox"
                                // id={item.C_Doc_Code}
                                label="Working With All Day"
                                name=""
                             checked= {this.state.dayworkwith!='' ?  true : null }
                                // className="workingCheck"
                             onChange={ (event)=>{ this.updateWorkwithAllday(this.state.dayworkwith) }}
                            /> */}
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                    >
                      
                        {   this.state.wrkType.map((typekey, index) => (
                            <Tab
                                key={this.state.key}
                                onSelect={() => {this.keyload(typekey.N_Type)}}
                                eventKey={typekey.N_Type}
                                title={typekey.C_Name == "Worktype OTHERS"  ? "Other Work Type" :typekey.C_Name.toLowerCase()}
                            >
                              
                            
                                    <UserDetailAccor 
                                        Datakey={this.state.selected}
                                        date={this.state.date}
                                        month={this.state.month}
                                        year={this.state.year}
                                        day={this.state.day}
                                        fscode={this.state.fscode}
                                        N_Type={typekey.N_Type}
                                        downlineDoc={this.state.downlineDoc}
                                        status={status}
                                        proList={this.state.proList}
                                    />
                                
                            </Tab>
                            
                            
                        ))}
                    </Tabs>
                    </div>
                </div>
            </div>


            {/* <NotePopup 
                    show={this.state.showNotePopup } 
                    Savearea={this.Savearea}
                    onClose={this.onClose}
                    areachange={this.areachange}
                    Areanote={this.state.Areanote}
                /> */}

               {this.state.loader==true? <Spinner></Spinner> :null}

            </React.Fragment>
        )
    }
}

export default withRouter(UserDetailsList)