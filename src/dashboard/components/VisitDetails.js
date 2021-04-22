/*
* This code will display VisitDetails inside Dashboardpage
* Request url=url/Dashboardpage
* Index=VisitDetails
* Request string={"Token":"","Index":"VisitDetails","Data":{"Doctor":"D026408"}}
* Response string={
    c_image:mastericon.svg
    c_name:All Master
    n_id:1
}
* Response Error={}



*/

import React,{Component} from 'react'
import {Tabs, Tab} from 'react-bootstrap'

import LastVisitList from './LastVisitList'
import RCPA from './RCPA'
import { postToServer } from '../../lib/comm-utils'


class VisitDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            key2: 'Last 3 Visit Details',
            visitList:[]
        }
        this.getVisitDetails = this.getVisitDetails.bind(this)
    }
    componentDidMount(){
        this.getVisitDetails()
    }
    getVisitDetails() { 
        var data =  {"Token": "" ,"Index":"VisitDetails","Data":{"Doctor":this.props.docCode}}
        postToServer("DashBoardPage", data).then((result) => {
           
            if (result.data["Status"] == "Success") { 
                this.setState({ visitList: result.data.data })

                //console.log('log test',result)
            } else {

                this.setState({ visitList:[] })
            }


        }).catch((error) => {
            this.setState({ visitList:[] })
           console.log(error)
        
        })

    }
    render(){
        let DSCName = this.props.DSCName
        let visitList = this.state.visitList

        // if(!visitList || visitList == undefined)
        //     return null
        return(
            <div className="visit-details cal-scrollbar" >
                <div className="visited-docter">
                    {DSCName}
                    <span className="pull-right pointer"><img src='../public/assets/images/cancel-white.svg' onClick={this.props.closeBar}/></span>
                </div>
                <Tabs
                    id="controlled-tab-example"
                    className="visit-details-nav"
                    activeKey={this.state.key2}
                    onSelect={key2 => this.setState({ key2 })}
                >
                    <Tab eventKey="Last 3 Visit Details" title="Visit Details">
                        <div className="slide-up"><LastVisitList DSCName={DSCName} visitDetail={visitList} /></div>
                    </Tab>
                    <Tab eventKey="RCPA" title="RCPA">
                        <div className="slide-up"><RCPA  dcode={ this.props.docCode}   DSCName={DSCName}   /></div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default VisitDetails

