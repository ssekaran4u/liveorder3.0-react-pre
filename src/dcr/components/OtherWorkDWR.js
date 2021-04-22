/* 
* This file will display otherworktype inside dcrapi 
* Request URL=url/DCRAPI
* Index=DCR_Other_worktype
* Request string={"index":"DCR_Other_worktype","Token":""}
* Response string={
    c_code:0000002
    c_name:Meeting 
}
* Response Error=null

*/





import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import OtherTypeMeeting from "../components/OtherTypeMeeting";
import OtherTypeCamp from "../components/OtherTypeCamp";
import OtherTypeAdmin from "../components/OtherTypeAdmin";
import OthersDWR from "../components/OthersDWR";
import { postToServer } from "../../lib/comm-utils";
import StatusPopup from "../../lib/StatusPopup";
class OtherWorkDWR extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "MEETING",
            Worktype: []
        };

        this.funcWorktype = this.funcWorktype.bind(this);
        this.Errorclose=this.Errorclose.bind(this)
    }

    Errorclose() {
        this.setState({ Error: false })
    }


    componentDidUpdate(oldprops,newstate){

        if(oldprops.Editmodedata!=this.props.Editmodedata){
          
           
                if(this.props.Editmodedata)
                {
                
                    if( this.props.Editmodedata['DWR']){
                        let m={}
                        if(this.props.Editmodedata['DWR'][0]){
                        if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                        const key=this.props.Editmodedata['DWR'][0]["c_name"].trim()
                        this.setState({ key: key})  
                    }
                    }
                }
                   
                }
        }
     }

    /*
      this function featch   worktype from api and 
      load component  accoding to featched data 


       Api name Android

       
       idx:"downloadworkType"
       token:" from take from log in"


        



    */

    funcWorktype() {
        var data = {  index: "DCR_Other_worktype" };
        postToServer("DCRAPI", data)
            .then(result => {
                if (result.data["Status"] == "success") {
                    this.setState({ Worktype: result.data.Data });

                    // console.log(result.data.Data, 'kunal ')
                } else {
                    // Need to call Error   func
                }
            })
            .catch(error => {
              //  console.log(error, "kunal sinha");
            });
    }

    componentDidMount() {
        this.funcWorktype();

       
          
           
            if(this.props.Editmodedata)
            {
                if( this.props.Editmodedata['DWR']){
                    let m={}
                    if(this.props.Editmodedata['DWR'][0]){
                    if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                    const key=this.props.Editmodedata['DWR'][0]["c_name"].trim()
                    this.setState({ key: key}) 
                   //alert(key) 
                }
                }
            }
               
            
    }
    }
    render() {
        const { Worktype } = this.state;
        return (
            <React.Fragment>
                <div className="marginTop16 dcrworkPanel">
                    <div className="dcrboxhead">
                        Select Type Of Work Given Below
                    </div>

                    <Tabs
                        id="controlled-tab-example"
                        className="dcrWork"
                        activeKey={this.state.key}
                        onSelect={  key => this.props.Editmode==null?  this.setState({ key })  : this.setState({ Error: true, Errormsg: "Tab Switch Not Allowed  In Edit Mode" }) } 
                    >
                        {Worktype.map((typekey, index) => (
                            <Tab
                                key={index}
                                eventKey={typekey.c_name.trim()}
                                title={
                                    <div className="otherWorkMeetingImg">
                                        <img
                                            src="../public/assets/images/meeting-grey.svg"
                                            className="meetingImg"
                                        />
                                        <div className="otherTypeMeeting">
                                            {typekey.c_name.trim() }
                                        </div>
                                    </div>
                                }
                            >
                               { typekey.c_name.trim() ==this.state.key ? <OtherTypeMeeting 
                                    Editmodedata={  this.props.Editmodedata }
                                    key={this.state.key}
                                    index={index}
                                    worktype={typekey.c_code.trim()}
                                    comtype={typekey.c_name.trim()}
                                /> :null}
                            </Tab>
                        ))}

                        {/* <Tab eventKey="Admin" 
                            title=<div className='otherWorkAdminImg'><img src='../public/assets/images/admin-grey.svg' className="adminImg" /><div className='otherTypeAdmin'>Admin</div></div>
                        >
                        <OtherTypeAdmin />
                        </Tab>
                        <Tab eventKey="Marketing" 
                            title=<div className='otherWorkMarketingImg'><img src='../public/assets/images/campaign.svg' className="marketingImg" /><div className='otherTypemarketing'>Campaign</div></div>
                        >
                             
                        </Tab>
                        <Tab eventKey="Camp" 
                            title=<div className='otherWorkCampImg'><img src='../public/assets/images/CAMP.svg' className="campImg" /><div className='otherTypeCamp'>Camp</div></div>
                        >
                        <OtherTypeCamp />
                        </Tab>
                        <Tab eventKey="Others" 
                            title=<div className='otherWorkOtherImg'><img src='../public/assets/images/others.svg' className="OtherImg" /><div className='otherTypeOther'>Others</div></div>
                        >
                        <OthersDWR />
                        </Tab> */}
                    </Tabs>

                        <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default OtherWorkDWR;
