import React, { Component } from "react";
import Footer from "../../../landing-page/components/Footer";
import "../css/day_wise_tp_template.css";
import "../css/responsive.css";
import DayWiseTpTemplate from "./dayWiseTpTemplate";
import TpHeading from "./dayWiseTpTemplateHeading";
import TourPlanMrmodule from "./tourPlanMrmodule";
import {postToServer} from '../../../lib/comm-utils'

class DayWiseTp extends Component {
    constructor(){
        super();
        this.state={
            manualEntry: false,
            no_detail_list:[],
            wrkType:[],
            data:[],
            docmandatory:''
        }
        this.onShowEntry = this.onShowEntry.bind(this)
        this.getDocMandory = this.getDocMandory.bind(this)
    }
    componentDidMount(){
        var worktype = {"index":"work_type","Token":""}
        postToServer("MTP",worktype).then( (Result)=>{ 
            if(Result.data.Status == 'Success'){ 
              
                this.setState({ wrkType: Result.data.Grade_mst })
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    onShowEntry(isChecked,item){ 
        if(isChecked == 'A'){
            this.setState({
                manualEntry: true,
                data:item
            })
        }else{
           this.setState({
                manualEntry:!this.state.manualEntry
           })
        }
        
    }
    getDocMandory(data){
        
        this.setState({
            docmandatory:data
        })
    }
    render() { 
    let day = localStorage.getItem("day")
    let month = localStorage.getItem("month")
    let year = localStorage.getItem("year")
    let area = localStorage.getItem("selectedarea")
    let type  = localStorage.getItem("selectedareaType")
    let monthCode =  localStorage.getItem("monthCode")
    let areaCode =  localStorage.getItem("areaCode")
    let mtpLock = localStorage.getItem("mtpLock");
    let nextdateContext = localStorage.getItem("nextdateContext");
    let weekday = localStorage.getItem("weekday");
    let weekNo = localStorage.getItem("weekNo");
    let mtpType = localStorage.getItem("mtpType")
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="mr-module-page">
                                <TpHeading 
                                    onShowEntry={this.onShowEntry}
                                    monthCode={monthCode}
                                    year={year}
                                    areaCode={areaCode}
                                    day={day}
                                    docmandatory={this.state.docmandatory}
                                    month={nextdateContext}
                                    mtpType={mtpType}
                                />
                                    {this.state.manualEntry==true ?
                                        <DayWiseTpTemplate 
                                            wrkType={this.state.wrkType}
                                            areaCode={areaCode}
                                            monthCode={monthCode}
                                            day={day}
                                            year={year}
                                            data={this.state.data}
                                            mtpLock={mtpLock}
                                        />
                                    :
                                        <TourPlanMrmodule 
                                            day={day}  
                                            month={month} 
                                            year={year} 
                                            area={area}
                                            type={type}
                                            weekday={weekday}
                                            wrkType={this.state.wrkType}
                                            monthCode={monthCode}
                                            areaCode={areaCode}
                                            mtpLock={mtpLock}
                                            getDocMandory={this.getDocMandory}
                                            mtpType={mtpType}
                                            weekNo={weekNo}
                                        />
                                    }
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DayWiseTp;