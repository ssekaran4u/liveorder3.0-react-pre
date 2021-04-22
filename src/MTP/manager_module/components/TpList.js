import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import MtpList from './MtpList';
import DownlineList from './DownlineList';
import {postToServer} from '../../../lib/comm-utils'
import Spinner from '../../../BasicComponet/sfaSpinner'
class TpList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "field-work",
            downLineTp:[],
            myTp:[],
            selectedMonth:'',
            loader:false
        }
        this.getDownLineData= this.getDownLineData.bind(this)
        this.getFilterData = this.getFilterData.bind(this)
        this.getmylist=this.getmylist.bind(this)
    } 
    
    
    getmylist(){
        this.setState({loader:true})
        var data = {"index":"my_MTP",
                    "menuid":"38",
                    "Token":""
                }
        postToServer("MTP_Manager", data).then((result) => {
           // const message=result.data[0]["Result"]
           if (result.data!=null){
            this.setState({
                myTp:result.data,
                loader:false
            })
           }
          
        }).catch( (Error)=>{
            console.log(Error)
            this.setState({  loader:false,Error: true, Errormsg: "Error in App" })
        })
    }  
    componentDidMount(){
        this.getmylist()
    }
    getDownLineData(month,year,FSCode,status){

        this.setState({loader:true})
        month = month == 0 ? "": month
        year = year == 0 ? " ": year
        FSCode = FSCode == 0 ? "" : FSCode
        status = status == 0 ? "":status
        var data = {"Data":{"Month":month.toString(),"Year":year.toString(),"FSCode":FSCode,"status":status},
                    "index":"MTP_downline_filter",
                    "menuid":"38",
                    "Token":""
                }
        postToServer("MTP_Manager", data).then((result) => {
           // const message=result.data[0]["Result"]
           if(result.data == null){
            this.setState({
                downLineTp:[],loader:false
            })
           }else{
            this.setState({
                downLineTp:result.data,loader:false
            })
           }
            
        }).catch( (Error)=>{
            console.log(Error)
            this.setState({ loader:false,  Error: true, Errormsg: "Error in App" })
        })
    }  
    getFilterData(month,year,fsname,status){
       
        this.getDownLineData(month,year,fsname,status)
      
    }
    render() {
        let d = new Date()
        let mon = d.getMonth() > 9 ? d.getMonth()+1 : '0'+parseInt(d.getMonth()+1)
        let currDate=mon+'/01/'+d.getFullYear()

       
        return (
            <React.Fragment>
                { this.state.loader==true? <Spinner></Spinner> :null}
                <div >
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                        onClick={()=>this.getDownLineData('','','','')}
                    >
                        <Tab eventKey="BL" title="My Tour Plan List">
                            {this.state.key == "field-work" ? (
                                <MtpList myTp={this.state.myTp}
                                date={currDate} 
                                getmylist={this.getmylist}
                                />
                            ) : null}
                        </Tab>
                        <Tab eventKey="HL" title="My Downline Approval List" >
                            {this.state.key == "field-work" ? (
                                <DownlineList  
                                    downlianetp={this.state.downLineTp}
                                    getFilterData={this.getFilterData}
                                />
                            ) : null}
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}

export default TpList;