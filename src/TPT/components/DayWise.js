import React, { Component } from 'react';
import {Breadcrumb,Tabs,Tab,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DoctorName from './DoctorName';
import ChemistName from './ChemistName';
import StockistName from './StockistName';
import HospitalName from './HospitalName';
import NoDetailList from './NoDetailList';
import Others from '../components/Others';
import { postToServer } from '../../lib/comm-utils'
import {connect} from 'react-redux'
import CustomCheckbox from '../components/CustomCheckbox'
class DayWise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "1",
            toggleTable : false,
            data:[],
            wrkType:[],
            Selectedsubarea:'',
            Selectedkey:{},
            SelectedStp:{},
            list:[],
            selectionVal:false,
            selectedData:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.getAllData = this.getAllData.bind(this)
    }        
    componentDidMount(){ 
        let thisweek = parseInt(localStorage.getItem("week"))+1
        let thisday = localStorage.getItem("day")
        let area = localStorage.getItem("subarea")
        let areaType = localStorage.getItem("subareaType")
        
        const subarea=this.props.match.params.id;
         this.setState({Selectedsubarea:subarea,key:'1',area:area,areaType:areaType})
      

        var worktype = {"index":"work_type","Token":""}
        postToServer("TPT",worktype).then( (Result)=>{ 
            if(Result.data.Status == 'Success'){ 
              
                this.setState({ wrkType: Result.data.Grade_mst })
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
        const data={"index":"Cal_details", "Data":{ "subarea":area } }
        postToServer("TPT",data).then( (Result)=>{ 
            if(Result.data.Status == 'Success'){ 
              if(Result.data.Nodetails){
                Result.data.Nodetails.map((item)=>{
                    let weekVal = item.week
                    let dayVal = item.day
                    if(weekVal == thisweek && dayVal == thisday){
                        this.setState({
                            toggleTable:true,
                            selectionVal:true,
                            selectedData:item
                        })
                    }
                })
              }
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
        

    }

    handleChange(event) {


        const ll=event.target.checked
        if(ll==true){
            this.setState({
                toggleTable : !this.state.toggleTable
            })
        }else{
            const thisweek = parseInt(localStorage.getItem("week"))+1 + ''
            const thisday = localStorage.getItem("day")
            let area = localStorage.getItem("subarea")
            
            const data = {"index":"Save_NoStp_Delete",
            "Data":{ 
               "subarea":area,
               "week":thisweek,
               "day" : thisday    }
        }
    
    
            postToServer("TPT",data).then( (Result)=>{
               if(Result.data.Status == 'Success'){
                
            
                this.setState({    toggleTable : !this.state.toggleTable, Error: true, Errormsg: "Deleted NO  Detail TPT" ,Messagetype:true})
               
                   
               }
        })
    }
    }
    getAllData(data,list ,SelectedStp){ 
        this.setState({
            Selectedkey:data,
            list:list,SelectedStp:SelectedStp
        })
    }
    render() { 
        return (
            <React.Fragment>
                    <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report"> Template</h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <div className="tourP"> 
                                        {/* <input type="checkbox" className="myCheck" onClick={ this.handleChange } />No Details */}
                                        <Form.Check 
                                            custom
                                            type="checkbox"
                                            checked={this.state.selectionVal?this.state.selectionVal:null}
                                            id="day12"
                                            label="No Details"
                                            name="No Details"
                                            onChange={this.handleChange}
                                        />
                                        {/* <CustomCheckbox
                                        item={item}
                                        check={this.state.checked}
                                        getData={this.getData}
                                        id={item.c_cust_code}
                                        slectcheck={selection}
                                    /> */}
                                    </div>
                                    <Breadcrumb.Item href="#">
                                        <Link to='#'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="tpt">TPT Template</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                         Template
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        
                        { this.state.toggleTable ?<NoDetailList selectedData={this.state.selectedData} Info={this.props.areainfo}    data={this.state.wrkType} /> :
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab stptab"
                        activeKey={this.state.key}
                        onSelect={  key =>  this.setState({ key })  } 
                    >
                        {this.state.wrkType.map((typekey, index) => (
                            <Tab
                                key={index}
                                eventKey={typekey.N_Type}
                                title={typekey.C_Name == "OTHERS" ? "Other Work Type" : typekey.C_Name.toLowerCase()}
                            >
                               {typekey.C_Name == "OTHERS" ?  
                                    <Others Info={this.props.areainfo} /> 
                                    :typekey.N_Type ==this.state.key ? 
                                        <DoctorName 
                                            list={this.state.list} 
                                            SelectedStp={this.state.SelectedStp} 
                                            Selectedkey={this.state.Selectedkey} 
                                            getAllData={this.getAllData}  
                                            N_Type={typekey.N_Type} 
                                            subarea={this.state.Selectedsubarea} 
                                            area={this.state.area} 
                                            areaType={this.state.areaType}
                                        /> 
                                        :null}
                            </Tab>
                        ))}
                        {/* <Tab eventKey="OT" title="Others">
                            <Others Info={this.props.areainfo} />
                        </Tab> */}
                        {/* <Tab eventKey="OT" title="Others">
                            {this.state.key == "CAMP" ? (
                               
                                <Others />
                            ) : null}
                        </Tab> */}
                        
                        {/* <Tab eventKey="DN" title="Doctor Name">
                            {this.state.key == "field-work" ? (
                                <DoctorName data={this.state.data ? this.state.data :''}/>
                            ) : null}
                        </Tab>
                        <Tab eventKey="CN" title="Chemist Name">
                            {this.state.key == "field-work" ? (
                                // <ChemistName />
                                <DoctorName data={this.state.data ? this.state.data :''}/>
                            ) : null}
                        </Tab>
                        <Tab eventKey="SN" title="Stockist Name">
                            {this.state.key == "field-work" ? (
                                // <StockistName />
                                <DoctorName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="HN" title="Hospital Name">
                            {this.state.key == "field-work" ? (
                                // <HospitalName />
                                <DoctorName />
                            ) : null}
                        </Tab>
                        <Tab eventKey="OT" title="Others">
                            {this.state.key == "field-work" ? (
                               
                                <Others />
                            ) : null}
                        </Tab> */}
                    </Tabs>  }
                </div>
            </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    areainfo : state.STP.areainfo
   
})

export default connect(mapStateToProps,null)(DayWise);
